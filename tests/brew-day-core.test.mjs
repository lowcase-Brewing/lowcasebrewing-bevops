import test from 'node:test';
import assert from 'node:assert/strict';
import {createBatch,parseBatch,serializeBatch,validateBatch,saveDraft,batchFilename,STORAGE_KEY,MAX_FILE_BYTES} from '../assets/brew-day-core.mjs';

test('a fresh batch has the runbook targets but no claimed actuals or completed steps',()=>{
  const batch=createBatch(new Date(2026,10,18,12));
  assert.equal(batch.fields.brewDate,'2026-11-18');
  assert.equal(batch.fields.rest1TempTarget,'147');
  assert.equal(batch.fields.rest2TempTarget,'156');
  assert.equal(batch.fields.ogTarget,'1.058–1.060');
  assert.equal(batch.fields.rest1TempActual,'');
  assert.equal(batch.fields.ogActual,'');
  assert.ok(Object.values(batch.checks).every(value=>value===false));
});

test('an exported batch round-trips measured values, amended targets, checks, Unicode, and long multiline notes',()=>{
  const batch=createBatch();
  batch.fields.batchId='PM-003';
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
  assert.equal(original.fields.recipe,'Punkin’ Monkey Festbier');
  assert.equal(original.checks['prep-water'],false);
});

test('unsupported formats and future schema versions are rejected',()=>{
  for(const raw of [null,[],{},'text',{...createBatch(),version:2},{...createBatch(),templateId:'other'}]) assert.throws(()=>validateBatch(raw));
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
  const batch=createBatch();batch.fields.batchId='../../PM / 003';
  assert.match(batchFilename(batch),/^\d{4}-\d{2}-\d{2}-PM-003\.bevops\.json$/);
});
