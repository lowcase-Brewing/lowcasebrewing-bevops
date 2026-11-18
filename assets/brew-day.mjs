import {BATCH_FIELDS,STAGES,WRAP_FIELDS,UNITS_NOTE,checklistProgress,formatStageStamp,STORAGE_KEY,MAX_FILE_BYTES,createBatch,parseBatch,serializeBatch,batchFilename,saveDraft} from './brew-day-core.mjs';

const $=id=>document.getElementById(id);
const el=(tag,text,className)=>{
  const node=document.createElement(tag);
  if (text!==undefined) node.textContent=text;
  if (className) node.className=className;
  return node;
};
let batch=createBatch();
let paused=false;
let recoveryText=null;
let storage=null;
let pending=null;
$('units-note').textContent=UNITS_NOTE;

function message(text) {
  $('notebook-message').textContent=text;
  $('notebook-message').hidden=!text;
}
function setSaved(ok) {
  const label=ok?'Saved in this browser · '+new Date(batch.updatedAt).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'}):'Not autosaved — export to keep this batch';
  $('save-status').textContent=label;
  document.querySelector('.brew-day-save').classList.toggle('unsaved',!ok);
}
function persist() {
  const ok=!paused && storage && saveDraft(storage,batch);
  setSaved(Boolean(ok));
  if(ok) message('');
  if (!ok && !paused) message('Browser storage is unavailable or full. Your entries remain in this tab. Export a batch file before closing or reloading.');
  return ok;
}
function fieldControl(def) {
  const label=el('label',undefined,'brew-field'+(def.type==='textarea'?' full-width':''));
  label.htmlFor='field-'+def.id;
  label.append(el('span',def.label));
  const input=el(def.type==='textarea'?'textarea':'input');
  input.id='field-'+def.id;
  input.name=def.id;
  if(def.type!=='textarea') input.type=def.type;
  else input.rows=3;
  input.maxLength=def.type==='textarea'?10000:300;
  if(def.placeholder) input.placeholder=def.placeholder;
  input.value=batch.fields[def.id];
  label.append(input);
  return label;
}
function addFields(container,defs) { for(const def of defs) container.append(fieldControl(def)); }
function renderForm() {
  $('batch-details').replaceChildren();
  addFields($('batch-details'),BATCH_FIELDS);
  $('brew-stages').replaceChildren();
  $('stage-nav').querySelectorAll('a').forEach(a=>a.remove());
  for (const [index,stage] of STAGES.entries()) {
    const link=el('a',String(index+1).padStart(2,'0')+' / '+stage.short);
    link.href='#stage-'+stage.id;
    $('stage-nav').append(link);
    const section=el('section',undefined,'brew-panel brew-stage');
    section.id='stage-'+stage.id;
    section.setAttribute('aria-labelledby',stage.id+'-title');
    const heading=el('div',undefined,'brew-section-heading');
    const number=el('span',String(index+1).padStart(2,'0'),'brew-stage-number');
    number.setAttribute('aria-hidden','true');
    const title=el('h2',stage.title); title.id=stage.id+'-title';
    heading.append(number,title); section.append(heading,el('p',stage.intro,'brew-stage-intro'));
    const times=el('div',undefined,'brew-times');
    addFields(times,[{id:stage.id+'StartDate',label:'Start date',type:'date'},{id:stage.id+'Start',label:'Start time',type:'time'},{id:stage.id+'FinishDate',label:'Finish date',type:'date'},{id:stage.id+'Finish',label:'Finish time',type:'time'}]);
    section.append(times);
    const checks=el('div',undefined,'brew-checks');
    for (const [id,text] of stage.steps) {
      const key=stage.id+'-'+id;
      const row=el('div',undefined,'brew-check-row'); row.dataset.step=key;
      const label=el('label',undefined,'brew-check');
      const input=el('input'); input.type='checkbox'; input.name=key; input.checked=batch.checks[key]; input.dataset.check=key;
      label.append(input,el('span',batch.stepLabels[key]));
      const na=el('button','N/A','brew-na');na.type='button';na.dataset.na=key;
      na.setAttribute('aria-label','N/A — '+batch.stepLabels[key]);na.title='Not applicable';
      row.append(label,na);checks.append(row);
      row.classList.toggle('is-na',batch.notApplicable[key]);
      input.disabled=batch.notApplicable[key];
      na.setAttribute('aria-pressed',String(batch.notApplicable[key]));
    }
    section.append(checks);
    const table=el('table',undefined,'brew-measurements');
    const caption=el('caption',stage.title+' measurements'); caption.className='visually-hidden'; table.append(caption);
    const head=el('thead'); const row=el('tr');
    for(const text of ['Measurement','Target','Actual']) {const th=el('th',text);th.scope='col';row.append(th);}
    head.append(row); table.append(head);
    const body=el('tbody');
    for (const [id,label,,unit] of stage.measures) {
      const tr=el('tr'); const th=el('th',label+' ('+unit+')'); th.scope='row';tr.append(th);
      for (const kind of ['Target','Actual']) {
        const td=el('td'); const input=el('input');
        input.type='text'; input.inputMode='decimal'; input.maxLength=300;
        input.name=id+kind; input.id='field-'+id+kind; input.value=batch.fields[id+kind];
        input.setAttribute('aria-label',label+' '+kind.toLowerCase()+' ('+unit+')');
        if(kind==='Actual') input.placeholder='—';
        td.append(input); tr.append(td);
      }
      body.append(tr);
    }
    table.append(body);section.append(table);
    const fields=el('div',undefined,'brew-fields');
    addFields(fields,[...stage.fields,{id:stage.id+'Notes',label:stage.title+' notes',type:'textarea',placeholder:'Observations, changes, or steps you chose to skip.'}]);
    section.append(fields);$('brew-stages').append(section);
  }
  $('wrap-up-fields').replaceChildren();addFields($('wrap-up-fields'),WRAP_FIELDS);
  updateProgress();
}
function updateProgress() {
  const progress=checklistProgress(batch);
  $('checklist-progress').textContent=progress.checked+' of '+progress.applicable+' applicable steps checked · '+progress.notApplicable+' N/A. Use what helps.';
}
function download(text,filename) {
  const blob=new Blob([text],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=el('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function exportBatch() {
  try {
    download(serializeBatch(batch),batchFilename(batch));
    $('file-status').textContent='Batch download requested. Keep the JSON file to reopen this record.';
  } catch(err) { $('file-status').textContent=err.message; }
}
function replaceDraft(next) {
  batch=next;paused=false;recoveryText=null;$('recover-draft').hidden=true;message('');
  renderForm();persist();
  $('field-recipe').focus();
}
function askReplace(action) {
  pending=action;
  const importing=action.kind==='import';
  $('replace-title').textContent=importing?'Import this batch?':'Start a new batch?';
  $('replace-description').textContent=importing?'Import “'+(action.batch.fields.batchId||action.batch.fields.recipe||'Untitled batch')+'” and replace the draft currently open in this browser.':'Start a fresh checklist with blank batch details, targets, and actuals, and unchecked steps. This replaces the current draft.';
  $('confirm-replace').textContent=importing?'Import and replace':'Start new batch';
  $('replace-dialog').showModal();
}
function printRecord() {
  const root=$('print-record');root.replaceChildren();
  root.append(el('p','lowcase Brewing / BevOps','print-eyebrow'),el('h1','Brew-day record'),el('p','Brew-day checklist · use what helps.'),el('p',UNITS_NOTE),el('p','[x] Checked · [ ] Not recorded · [N/A] Not applicable'));
  const details=el('dl',undefined,'print-details');
  for(const f of BATCH_FIELDS) {details.append(el('dt',f.label),el('dd',batch.fields[f.id]||'Not recorded'));}
  root.append(details);
  for(const stage of STAGES) {
    const section=el('section',undefined,'print-stage');section.append(el('h2',stage.title));
    section.append(el('p','Started: '+formatStageStamp(batch,stage.id,'Start')+' / Finished: '+formatStageStamp(batch,stage.id,'Finish')));
    const steps=el('ul');
    for(const [id,text] of stage.steps) steps.append(el('li',(batch.notApplicable[stage.id+'-'+id]?'[N/A] ':batch.checks[stage.id+'-'+id]?'[x] ':'[ ] ')+batch.stepLabels[stage.id+'-'+id]));
    section.append(steps);
    const table=el('table');const head=el('tr');
    for(const text of ['Measurement','Target','Actual']) head.append(el('th',text));
    const thead=el('thead');thead.append(head);table.append(thead);
    const tbody=el('tbody');
    for(const [id,label,,unit] of stage.measures) {
      const tr=el('tr');tr.append(el('td',label+' ('+unit+')'),el('td',batch.fields[id+'Target']||'—'),el('td',batch.fields[id+'Actual']||'Not recorded'));tbody.append(tr);
    }
    table.append(tbody);section.append(table);
    for(const f of [...stage.fields,{id:stage.id+'Notes',label:stage.title+' notes'}]) {
      section.append(el('h3',f.label),el('p',batch.fields[f.id]||'Not recorded','print-notes'));
    }
    root.append(section);
  }
  root.append(el('h2','For next time'));
  for(const f of WRAP_FIELDS) root.append(el('h3',f.label),el('p',batch.fields[f.id]||'Not recorded','print-notes'));
  root.append(el('p','Record updated: '+new Date(batch.updatedAt).toLocaleString()+'. Unchecked steps are not evidence of completion.','print-footnote'));
}

try {
  storage=window.localStorage;
  const text=storage.getItem(STORAGE_KEY);
  if(text) {
    try { batch=parseBatch(text); }
    catch {recoveryText=text;paused=true;message('The stored draft could not be read. It has been left untouched. Download it for recovery, or start a new batch to replace it. Edits in this session are not autosaved.');$('recover-draft').hidden=false;}
  }
} catch { message('Browser storage is unavailable. You can still use the notebook and export a batch file before closing this tab.'); }

renderForm();$('notebook').hidden=false;persist();
$('batch-form').addEventListener('submit',event=>event.preventDefault());
$('batch-form').addEventListener('input',event=>{
  const input=event.target;
  if(input.dataset.check) batch.checks[input.dataset.check]=input.checked;
  else if(Object.hasOwn(batch.fields,input.name)) batch.fields[input.name]=input.value;
  else return;
  batch.updatedAt=new Date().toISOString();updateProgress();persist();
});
$('batch-form').addEventListener('click',event=>{
  const button=event.target.closest('button[data-na]');
  if(!button) return;
  const key=button.dataset.na;
  batch.notApplicable[key]=!batch.notApplicable[key];
  if(batch.notApplicable[key]) batch.checks[key]=false;
  const row=button.closest('.brew-check-row');
  const input=row.querySelector('input');
  input.checked=batch.checks[key];input.disabled=batch.notApplicable[key];
  row.classList.toggle('is-na',batch.notApplicable[key]);
  button.setAttribute('aria-pressed',String(batch.notApplicable[key]));
  batch.updatedAt=new Date().toISOString();updateProgress();persist();
});
$('export-batch').addEventListener('click',exportBatch);
$('new-batch').addEventListener('click',()=>askReplace({kind:'new'}));
$('import-batch').addEventListener('click',()=>{ $('import-file').value='';$('import-file').click(); });
$('import-file').addEventListener('change',async event=>{
  const file=event.target.files[0];if(!file) return;
  try {
    if(file.size>MAX_FILE_BYTES) throw new Error('That file is too large. Choose a batch JSON file smaller than 1 MB.');
    const imported=parseBatch(await file.text());askReplace({kind:'import',batch:imported});
  } catch(err) {$('file-status').textContent=err.message;}
});
$('cancel-replace').addEventListener('click',()=>$('replace-dialog').close());
$('export-before-replace').addEventListener('click',exportBatch);
$('confirm-replace').addEventListener('click',()=>{
  const action=pending;$('replace-dialog').close();
  if(!action)return;
  replaceDraft(action.kind==='import'?action.batch:createBatch());
  $('file-status').textContent=action.kind==='import'?'Batch imported. Continue recording whenever you’re ready.':'Fresh batch started.';
});
$('replace-dialog').addEventListener('close',()=>{pending=null;});
$('recover-draft').addEventListener('click',()=>{if(recoveryText!==null)download(recoveryText,'bevops-draft-recovery.json');});
$('print-batch').addEventListener('click',()=>{printRecord();window.print();});
window.addEventListener('beforeprint',printRecord);
window.addEventListener('storage',event=>{
  if(event.key!==STORAGE_KEY && event.key!==null)return;
  paused=true;setSaved(false);
  message('Another tab changed or cleared this draft. Your current entries are still here, but autosave is paused to avoid overwriting that work. Export this batch, then reload to open the latest stored draft.');
});
