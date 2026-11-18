export const APP = 'bevops-brew-day';
export const VERSION = 1;
export const TEMPLATE = 'punkin-monkey-v1';
export const STORAGE_KEY = 'bevops.brew-day.v1';
export const MAX_FILE_BYTES = 1024 * 1024;

const field = (id, label, value = '', type = 'text', extra = {}) => ({id, label, value, type, ...extra});
export const BATCH_FIELDS = [
  field('recipe', 'Beer / recipe', 'Punkin’ Monkey Festbier'),
  field('recipeVersion', 'Recipe version', '1.0.0'),
  field('batchId', 'Batch ID', '', 'text', {placeholder: 'e.g. PM-2026-003'}),
  field('brewDate', 'Brew date', '', 'date'),
  field('brewer', 'Brewer'),
  field('equipment', 'Equipment', 'BrewZilla')
];

// Adapted from the current Punkin’ Monkey Festbier v1 runbook. This is a
// recording aid, not a recipe calculator or a replacement for that runbook.
export const STAGES = [
  {id:'prep', title:'Water & setup', short:'Setup', intro:'Stage the ingredients and equipment. Leave room for the realities of your own setup.',
    steps:[
      ['equipment', 'Inspect the kettle and stage pump, recirculation hardware, and chiller.'],
      ['ingredients', 'Stage grains, rice hulls, roasted pumpkin, hops, spices, and yeast.'],
      ['water', 'Prepare strike water and any treatment appropriate to your source water.'],
      ['sparge', 'Heat sparge water separately; use only what is needed to reach pre-boil volume.']
    ],
    measures:[['strike', 'Strike water', '5.25', 'gal'], ['spargeTemp', 'Sparge-water temperature', '168', '°F']],
    fields:[field('ingredientsNotes', 'Ingredients, substitutions & water additions', '', 'textarea', {placeholder:'What went into this batch? Note any changes from the recipe.'})]
  },
  {id:'mash', title:'Mash', short:'Mash', intro:'Punkin’ Monkey uses a two-step mash. Keep recirculation gentle through the pumpkin-heavy grain bed.',
    steps:[
      ['dough', 'Slowly add grains, rice hulls, and roasted pumpkin; stir out dry pockets.'],
      ['settle', 'Let the grain bed settle, then begin gentle recirculation.'],
      ['rest1', 'Complete the first mash rest.'],
      ['rest2', 'Complete the second mash rest.'],
      ['out', 'Complete mash-out.']
    ],
    measures:[['rest1Temp','First rest temperature','147','°F'], ['rest1Minutes','First rest duration','45','min'], ['rest2Temp','Second rest temperature','156','°F'], ['rest2Minutes','Second rest duration','15','min'], ['mashOutTemp','Mash-out temperature','168','°F'], ['mashOutMinutes','Mash-out duration','10','min'], ['mashPh','Mash pH','5.2–5.4','pH']],
    fields:[]
  },
  {id:'lauter', title:'Lauter & pre-boil', short:'Pre-boil', intro:'Measure both volume and gravity before deciding whether anything needs adjusting.',
    steps:[
      ['lift', 'Turn off the pump, lift the malt pipe slowly, and allow it to drain.'],
      ['sparge', 'Sparge gently and stop at the planned pre-boil volume.'],
      ['sample', 'Stir the wort and take a representative gravity sample.'],
      ['record', 'Record pre-boil volume and gravity; note sample temperature or correction.']
    ],
    measures:[['preVolume','Pre-boil volume','6.5','gal'], ['preGravity','Pre-boil gravity','','SG']],
    fields:[field('gravityMethod','Gravity instrument / sample correction', '', 'text', {placeholder:'e.g. hydrometer; sample cooled to calibration temperature'})]
  },
  {id:'boil', title:'Boil & flameout', short:'Boil', intro:'Times below are minutes remaining in the boil. Check your recipe and product directions for additions.',
    steps:[
      ['start', 'Establish a steady boil and start the boil timer.'],
      ['hop60', '60 min remaining: add 1.0 oz Hallertau Mittelfrüh.'],
      ['hop20', '20 min remaining: add 0.5 oz Hallertau Mittelfrüh; sanitize the immersion chiller.'],
      ['fining10', '10 min remaining: add the planned fining and optional nutrient.'],
      ['flameout', 'At flameout: turn off heat and add the planned spices.'],
      ['steep', 'Finish the spice steep before chilling.']
    ],
    measures:[['boilMinutes','Boil duration','60','min'], ['steepMinutes','Flameout steep','10','min']],
    fields:[field('hopAlpha','Actual hop alpha acids (%)'), field('additionNotes','Boil additions & actual times', '', 'textarea', {value:'Planned at 10 min: ½ Whirlfloc tablet; optional 2–2.5 g Fermaid O.\nFlameout: 1 cinnamon stick, ¼ tsp fresh nutmeg, 1 tsp fresh ginger, ¼ tsp allspice.\nActual additions / changes:'})]
  },
  {id:'transfer', title:'Chill, transfer & pitch', short:'Transfer', intro:'Confirm the wort has reached the planned pitch temperature before pitching. A delay can be recorded here.',
    steps:[
      ['sanitize', 'Confirm the fermenter, transfer tubing, and sampling equipment are sanitized.'],
      ['chill', 'Chill toward the planned pitch temperature; finish chilling in the chamber if needed.'],
      ['transfer', 'Transfer to the fermenter and record the volume.'],
      ['og', 'Measure and record original gravity, with sample correction if needed.'],
      ['pitch', 'Confirm pitch temperature and add yeast according to the chosen yeast instructions.'],
      ['control', 'Seal the fermenter, fit the airlock, and place it under temperature control.'],
      ['cleanup', 'Clean equipment and record anything worth changing next time.']
    ],
    measures:[['fermenterVolume','Volume into fermenter','5.0','gal'], ['og','Original gravity','1.058–1.060','SG'], ['pitchTemp','Pitch temperature','48–50','°F'], ['chamberTemp','Initial chamber setting','50','°F']],
    fields:[field('yeast','Yeast / amount', '2 × 11.5 g SafLager W-34/70'), field('pitchTime','Pitch date & time','','datetime-local')]
  }
];

export const WRAP_FIELDS = [
  field('deviations','Deviations, happy accidents & other observations','','textarea'),
  field('nextTime','What would you repeat or change next time?','','textarea'),
  field('handoff','Fermentation handoff notes','','textarea', {placeholder:'Planned temperature, next check, or anything the next person should know.'})
];

export const FIELD_DEFS = [
  ...BATCH_FIELDS,
  ...STAGES.flatMap(stage => [
    field(stage.id+'Start', stage.title+' start', '', 'time'),
    field(stage.id+'Finish', stage.title+' finish', '', 'time'),
    ...stage.measures.flatMap(([id,label,target,unit])=>[
      field(id+'Target',label+' target',target,'text',{unit}),
      field(id+'Actual',label+' actual','','text',{unit})
    ]),
    ...stage.fields,
    field(stage.id+'Notes',stage.title+' notes','','textarea')
  ]),
  ...WRAP_FIELDS
];
export const CHECK_IDS = STAGES.flatMap(s=>s.steps.map(([id])=>s.id+'-'+id));
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const validTimestamp = value => typeof value === 'string' && value.length <= 40 && !Number.isNaN(Date.parse(value));
const validDay = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number(value.slice(0,4))>0 && !Number.isNaN(Date.parse(value+'T00:00:00Z')) && new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;

export function createBatch(now = new Date()) {
  const stamp=now.toISOString();
  const localDate = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
  return {app:APP,version:VERSION,templateId:TEMPLATE,createdAt:stamp,updatedAt:stamp,
    fields:Object.fromEntries(FIELD_DEFS.map(f=>[f.id,f.id==='brewDate'?localDate:f.value])),
    checks:Object.fromEntries(CHECK_IDS.map(id=>[id,false]))};
}

export function validateBatch(raw) {
  if (!isRecord(raw) || raw.app!==APP || raw.version!==VERSION || raw.templateId!==TEMPLATE) {
    throw new Error('Choose a BevOps brew-day batch file exported by this version of the prototype.');
  }
  if (!validTimestamp(raw.createdAt) || !validTimestamp(raw.updatedAt) || !isRecord(raw.fields) || !isRecord(raw.checks)) {
    throw new Error('The batch file is incomplete or has invalid dates. Your current draft is unchanged.');
  }
  const fieldKeys=FIELD_DEFS.map(f=>f.id);
  const exactKeys=(obj,keys)=>Object.keys(obj).length===keys.length && keys.every(key=>Object.hasOwn(obj,key));
  if (!exactKeys(raw.fields,fieldKeys) || !exactKeys(raw.checks,CHECK_IDS)) {
    throw new Error('The batch file has missing or unrecognized fields. Your current draft is unchanged.');
  }
  const fields={};
  for (const f of FIELD_DEFS) {
    const value=raw.fields[f.id];
    if (typeof value!=='string' || value.length>(f.type==='textarea'?10000:300)) {
      throw new Error('The batch file has an invalid or oversized field. Your current draft is unchanged.');
    }
    // Native date controls normalize invalid values to blank. Reject them rather
    // than silently losing imported information in the form.
    if (value && f.type==='date' && !validDay(value)) throw new Error('A brew date is invalid. Your current draft is unchanged.');
    if (value && f.type==='time' && !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) throw new Error('A stage time is invalid. Your current draft is unchanged.');
    if (value && f.type==='datetime-local' && (!/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d$/.test(value) || !validDay(value.slice(0,10)))) throw new Error('The pitch date or time is invalid. Your current draft is unchanged.');
    fields[f.id]=value;
  }
  const checks={};
  for (const id of CHECK_IDS) {
    if (typeof raw.checks[id]!=='boolean') throw new Error('A checklist entry is invalid. Your current draft is unchanged.');
    checks[id]=raw.checks[id];
  }
  return {app:APP,version:VERSION,templateId:TEMPLATE,createdAt:raw.createdAt,updatedAt:raw.updatedAt,fields,checks};
}

export function parseBatch(text) {
  if (new TextEncoder().encode(text).length>MAX_FILE_BYTES) throw new Error('That file is too large. Choose a batch JSON file smaller than 1 MB.');
  let data;
  try { data=JSON.parse(text); } catch { throw new Error('That is not a readable JSON batch file. Your current draft is unchanged.'); }
  return validateBatch(data);
}
export const serializeBatch = batch => JSON.stringify(validateBatch(batch),null,2)+'\n';
export function batchFilename(batch) {
  const label=[batch.fields.brewDate,batch.fields.batchId||batch.fields.recipe||'batch'].filter(Boolean).join('-');
  return label.normalize('NFKD').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/-{2,}/g,'-').replace(/^-+|-+$/g,'').slice(0,100)+'.bevops.json';
}

// Storage is injected so blocked storage and failed writes can be tested without
// relying on a browser's privacy settings.
export function saveDraft(storage, batch) {
  try { storage.setItem(STORAGE_KEY,serializeBatch(batch)); return true; } catch { return false; }
}
