import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createBatch,parseBatch,serializeBatch,validateBatch,saveDraft,batchFilename,STORAGE_KEY,MAX_FILE_BYTES} from '../assets/brew-day-core.mjs';

test('a fresh batch has no prescribed details, targets, ingredients, actuals, or completed steps',()=>{
  const batch=createBatch(new Date(2026,10,18,12));
  assert.ok(Object.values(batch.fields).every(value=>value===''));
  assert.ok(Object.values(batch.checks).every(value=>value===false));
  assert.ok(Object.values(batch.stepLabels).every(value=>!(/Punkin|pumpkin|Hallertau|W-34|BrewZilla|60 min remaining|20 min remaining/.test(value))));
});

test('an exported batch round-trips measured values, amended targets, checks, Unicode, and long multiline notes',()=>{
  const batch=createBatch();
  batch.fields.recipe='A different beer';
  batch.fields.batchId='BATCH-003';
  batch.fields.grainBill='Pale malt · 10 lb\nWheat malt · 1 lb';
  batch.fields.additionNotes='Cascade · 1 oz · 30 minutes remaining';
  batch.fields.yeast='Brewer-selected yeast';
  batch.fields.rest1TempTarget='148';
  batch.fields.rest1TempActual='147.8';
  batch.fields.ogActual='1.059';
  batch.fields.deviations='Happy accident 🐒\n'+ 'A long note with <tags> & “quotes”.\n'.repeat(200);
  batch.checks['mash-rest1']=true;
  assert.deepEqual(parseBatch(serializeBatch(batch)),batch);
});

test('normalizing an import creates an independent record',()=>{
  const original=createBatch();
  const restored=validateBatch(original);
  restored.fields.recipe='Different batch';
  restored.checks['prep-water']=true;
  assert.equal(original.fields.recipe,'');
  assert.equal(original.checks['prep-water'],false);
});

test('unsupported formats and future schema versions are rejected',()=>{
  for(const raw of [null,[],{},'text',{...createBatch(),version:999},{...createBatch(),templateId:'other'}]) assert.throws(()=>validateBatch(raw));
  assert.throws(()=>parseBatch('not JSON'),/readable JSON/);
});

test('missing fields, unknown fields, and non-boolean checks fail before replacing a draft',()=>{
  const missing=createBatch();delete missing.fields.ogActual;
  const extra=createBatch();extra.fields.surprise='will not silently disappear';
  const badCheck=createBatch();badCheck.checks['prep-water']='false';
  for(const batch of [missing,extra,badCheck]) assert.throws(()=>validateBatch(batch));
});

test('field size and file byte limits are enforced',()=>{
  const batch=createBatch();batch.fields.deviations='x'.repeat(10001);
  assert.throws(()=>validateBatch(batch),/oversized/);
  assert.throws(()=>parseBatch(' '.repeat(MAX_FILE_BYTES+1)),/too large/);
});

test('invalid native date/time values cannot silently disappear on import',()=>{
  for(const [key,value] of [['brewDate','2026-02-31'],['brewDate','0000-01-01'],['mashStart','25:00'],['pitchTime','2026-02-31T12:00'],['pitchTime','tomorrow']]){
    const batch=createBatch();batch.fields[key]=value;
    assert.throws(()=>validateBatch(batch),key+' should reject '+value);
  }
  const batch=createBatch();batch.fields.brewDate='2028-02-29';batch.fields.pitchTime='2028-02-29T23:59';
  assert.deepEqual(parseBatch(serializeBatch(batch)),batch);
});

test('blocked or full storage reports failure, while a successful write retains the entire record',()=>{
  const batch=createBatch();
  assert.equal(saveDraft({setItem(){throw new Error('QuotaExceededError');}},batch),false);
  let saved;
  assert.equal(saveDraft({setItem(key,value){assert.equal(key,STORAGE_KEY);saved=value;}},batch),true);
  assert.deepEqual(parseBatch(saved),batch);
});

test('export filenames stay useful and cannot contain path separators',()=>{
  const batch=createBatch();batch.fields.brewDate='2026-11-18';batch.fields.batchId='../../BATCH / 003';
  assert.match(batchFilename(batch),/^\d{4}-\d{2}-\d{2}-BATCH-003\.bevops\.json$/);
});


test('earlier batch files retain their values and original checklist wording during migration',()=>{
  const legacy=JSON.parse(readFileSync(new URL('./fixtures/punkin-monkey-v1.json',import.meta.url),'utf8'));
  const migrated=parseBatch(JSON.stringify(legacy));
  assert.equal(migrated.version,2);
  assert.equal(migrated.templateId,'generic-brew-day-v1');
  for(const [id,value] of Object.entries(legacy.fields)) assert.equal(migrated.fields[id],value,id);
  assert.deepEqual(migrated.checks,legacy.checks);
  assert.equal(migrated.fields.grainBill,'');
  assert.equal(migrated.stepLabels['boil-hop60'],'60 min remaining: add 1.0 oz Hallertau Mittelfrüh.');
  assert.equal(migrated.stepLabels['mash-dough'],'Slowly add grains, rice hulls, and roasted pumpkin; stir out dry pockets.');
  assert.deepEqual(parseBatch(serializeBatch(migrated)),migrated);
});

test('invalid historical files and damaged label snapshots are rejected',()=>{
  const legacy=JSON.parse(readFileSync(new URL('./fixtures/punkin-monkey-v1.json',import.meta.url),'utf8'));
  delete legacy.fields.mashNotes;
  assert.throws(()=>validateBatch(legacy));
  const batch=createBatch();
  delete batch.stepLabels['prep-water'];
  assert.throws(()=>validateBatch(batch));
});
