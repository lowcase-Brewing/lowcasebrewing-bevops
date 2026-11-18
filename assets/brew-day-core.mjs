export const APP = 'bevops-brew-day';
export const VERSION = 3;
export const TEMPLATE = 'generic-brew-day-v1';
// Keep the existing storage key so earlier drafts can be restored and migrated.
export const STORAGE_KEY = 'bevops.brew-day.v1';
export const MAX_FILE_BYTES = 1024 * 1024;
export const UNITS_NOTE = 'Measurement fields use US gallons (US gal), degrees Fahrenheit (°F), specific gravity (SG), and minutes. Include units with ingredient amounts. Dates and times are local, with no timezone conversion.';

const field = (id, label, value = '', type = 'text', extra = {}) => ({id, label, value, type, ...extra});
export const BATCH_FIELDS = [
  field('recipe', 'Beer / recipe'),
  field('recipeVersion', 'Recipe version'),
  field('batchId', 'Batch ID'),
  field('brewDate', 'Brew date', '', 'date'),
  field('brewer', 'Brewer'),
  field('equipment', 'Equipment')
];

// Optional recording checkpoints: targets and actuals are supplied by the brewer.
export const STAGES = [
  {id:'prep', title:'Water & setup', short:'Setup', intro:'Stage your ingredients and equipment, and prepare the water for your brewing process.',
    steps:[
      ['equipment', 'Inspect and stage the equipment needed for this batch.'],
      ['ingredients', 'Measure and stage fermentables, hops, yeast, and any other planned ingredients.'],
      ['water', 'Prepare brewing water and any treatment appropriate to your source water.'],
      ['sparge', 'Prepare additional water for sparging or volume adjustments, if needed.']
    ],
    measures:[['strike', 'Initial brewing water', '', 'US gal'], ['spargeTemp', 'Sparge-water temperature', '', '°F']],
    fields:[
      field('grainBill', 'Grain bill / fermentables', '', 'textarea', {since:2, placeholder:'Ingredient · amount. Include grains, malt extracts, sugars, or other fermentables used in this batch.'}),
      field('ingredientsNotes', 'Water treatments & ingredient substitutions', '', 'textarea', {placeholder:'Record water additions and treatments, substitutions, and anything you prepared differently.'})
    ]
  },
  {id:'mash', title:'Mash', short:'Mash', intro:'Use the rests that apply to your recipe. Skip this stage if you are not mashing; note any additional rests below.',
    steps:[
      ['dough', 'Combine the grain and water according to your recipe; stir out dry pockets.'],
      ['settle', 'Set up the grain bed and any recirculation appropriate to your equipment.'],
      ['rest1', 'Complete the main mash rest.'],
      ['rest2', 'Complete an additional mash rest, if planned.'],
      ['out', 'Complete mash-out, if used.']
    ],
    measures:[['rest1Temp','First rest temperature','','°F'], ['rest1Minutes','First rest duration','','min'], ['rest2Temp','Second rest temperature','','°F'], ['rest2Minutes','Second rest duration','','min'], ['mashOutTemp','Mash-out temperature','','°F'], ['mashOutMinutes','Mash-out duration','','min'], ['mashPh','Mash pH','','pH']],
    fields:[]
  },
  {id:'lauter', title:'Lauter & pre-boil', short:'Pre-boil', intro:'For an all-grain batch, record your wort collection here. Skip grain-separation steps if they do not apply.',
    steps:[
      ['lift', 'Separate the wort from the grain using your brewing setup.'],
      ['sparge', 'Sparge if needed, stopping at the planned pre-boil volume.'],
      ['sample', 'Mix the wort thoroughly and take a representative gravity sample.'],
      ['record', 'Record pre-boil volume and gravity; note sample temperature or correction.']
    ],
    measures:[['preVolume','Pre-boil volume','','US gal'], ['preGravity','Pre-boil gravity','','SG']],
    fields:[field('gravityMethod','Gravity instrument / sample correction', '', 'text', {placeholder:'e.g. hydrometer; sample cooled to calibration temperature'})]
  },
  {id:'boil', title:'Boil & flameout', short:'Boil', intro:'Record your own hop and other-additions schedule below, including amounts and timing. Skip additions or holds that are not part of this batch.',
    steps:[
      ['start', 'Establish a steady boil and start the planned boil timer.'],
      ['hop60', 'Make the first planned hop addition at its scheduled time.'],
      ['hop20', 'Make later hop additions and prepare the chilling equipment, as applicable.'],
      ['fining10', 'Add any planned finings, nutrients, or other kettle additions at their scheduled times.'],
      ['flameout', 'Turn off the heat and make any planned flameout additions.'],
      ['steep', 'Complete any planned steep or whirlpool hold before chilling.']
    ],
    measures:[['boilMinutes','Boil duration','','min'], ['steepMinutes','Flameout / whirlpool hold','','min'], ['whirlpoolTemp','Whirlpool / hop-stand temperature','','°F',3]],
    fields:[field('hopAlpha','Hop varieties / actual alpha acids (%)'), field('additionNotes','Hop schedule & other additions', '', 'textarea', {placeholder:'Ingredient · amount · timing (say whether minutes remaining or elapsed). Record actual additions and any changes, too.'})]
  },
  {id:'transfer', title:'Chill, transfer & pitch', short:'Transfer', intro:'Use the conditions appropriate to your recipe and chosen yeast. If topping up, record the water added, mix the wort thoroughly, and record final volume and OG after the addition.',
    steps:[
      ['sanitize', 'Confirm the fermenter, transfer tubing, and sampling equipment are sanitized.'],
      ['chill', 'Chill the wort to the planned pitch temperature.'],
      ['transfer', 'Transfer to the fermenter and record the volume.'],
      ['og', 'After any top-up, confirm the wort is thoroughly mixed and record final volume and original gravity.'],
      ['pitch', 'Confirm pitch temperature and add yeast according to the chosen yeast instructions.'],
      ['control', 'Seal the fermenter and set up the planned fermentation conditions.'],
      ['cleanup', 'Clean equipment and record anything worth changing next time.']
    ],
    measures:[['topUpVolume','Top-up water (if used)','','US gal',3], ['fermenterVolume','Volume into fermenter','','US gal'], ['og','Original gravity','','SG'], ['pitchTemp','Pitch temperature','','°F'], ['chamberTemp','Fermentation temperature setting','','°F']],
    fields:[field('yeast','Yeast / amount'), field('pitchTime','Pitch date & time','','datetime-local')]
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
    field(stage.id+'StartDate', stage.title+' start date', '', 'date', {since:3}),
    field(stage.id+'Start', stage.title+' start time', '', 'time'),
    field(stage.id+'FinishDate', stage.title+' finish date', '', 'date', {since:3}),
    field(stage.id+'Finish', stage.title+' finish time', '', 'time'),
    ...stage.measures.flatMap(([id,label,target,unit,since=1])=>[
      field(id+'Target',label+' target',target,'text',{unit,since}),
      field(id+'Actual',label+' actual','','text',{unit,since})
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
  return {app:APP,version:VERSION,templateId:TEMPLATE,createdAt:stamp,updatedAt:stamp,
    fields:Object.fromEntries(FIELD_DEFS.map(f=>[f.id,f.value])),
    checks:Object.fromEntries(CHECK_IDS.map(id=>[id,false])),
    notApplicable:Object.fromEntries(CHECK_IDS.map(id=>[id,false])),
    stepLabels:Object.fromEntries(STAGES.flatMap(s=>s.steps.map(([id,text])=>[s.id+'-'+id,text])))};
}

// Preserve the historical checklist wording when reopening version-1 records.
const LEGACY_STEP_LABELS = {
  "prep-equipment": "Inspect the kettle and stage pump, recirculation hardware, and chiller.",
  "prep-ingredients": "Stage grains, rice hulls, roasted pumpkin, hops, spices, and yeast.",
  "prep-water": "Prepare strike water and any treatment appropriate to your source water.",
  "prep-sparge": "Heat sparge water separately; use only what is needed to reach pre-boil volume.",
  "mash-dough": "Slowly add grains, rice hulls, and roasted pumpkin; stir out dry pockets.",
  "mash-settle": "Let the grain bed settle, then begin gentle recirculation.",
  "mash-rest1": "Complete the first mash rest.",
  "mash-rest2": "Complete the second mash rest.",
  "mash-out": "Complete mash-out.",
  "lauter-lift": "Turn off the pump, lift the malt pipe slowly, and allow it to drain.",
  "lauter-sparge": "Sparge gently and stop at the planned pre-boil volume.",
  "lauter-sample": "Stir the wort and take a representative gravity sample.",
  "lauter-record": "Record pre-boil volume and gravity; note sample temperature or correction.",
  "boil-start": "Establish a steady boil and start the boil timer.",
  "boil-hop60": "60 min remaining: add 1.0 oz Hallertau Mittelfrüh.",
  "boil-hop20": "20 min remaining: add 0.5 oz Hallertau Mittelfrüh; sanitize the immersion chiller.",
  "boil-fining10": "10 min remaining: add the planned fining and optional nutrient.",
  "boil-flameout": "At flameout: turn off heat and add the planned spices.",
  "boil-steep": "Finish the spice steep before chilling.",
  "transfer-sanitize": "Confirm the fermenter, transfer tubing, and sampling equipment are sanitized.",
  "transfer-chill": "Chill toward the planned pitch temperature; finish chilling in the chamber if needed.",
  "transfer-transfer": "Transfer to the fermenter and record the volume.",
  "transfer-og": "Measure and record original gravity, with sample correction if needed.",
  "transfer-pitch": "Confirm pitch temperature and add yeast according to the chosen yeast instructions.",
  "transfer-control": "Seal the fermenter, fit the airlock, and place it under temperature control.",
  "transfer-cleanup": "Clean equipment and record anything worth changing next time."
};

export function validateBatch(raw) {
  const legacy=isRecord(raw) && raw.version===1 && raw.templateId==='punkin-monkey-v1';
  if (!isRecord(raw) || raw.app!==APP || (!legacy && (![2,VERSION].includes(raw.version) || raw.templateId!==TEMPLATE))) {
    throw new Error('Choose a BevOps brew-day batch file exported by this version of the prototype.');
  }
  if (!validTimestamp(raw.createdAt) || !validTimestamp(raw.updatedAt) || !isRecord(raw.fields) || !isRecord(raw.checks)) {
    throw new Error('The batch file is incomplete or has invalid dates. Your current draft is unchanged.');
  }
  const fieldKeys=FIELD_DEFS.filter(f=>(f.since||1)<=raw.version).map(f=>f.id);
  const exactKeys=(obj,keys)=>Object.keys(obj).length===keys.length && keys.every(key=>Object.hasOwn(obj,key));
  if (!exactKeys(raw.fields,fieldKeys) || !exactKeys(raw.checks,CHECK_IDS)) {
    throw new Error('The batch file has missing or unrecognized fields. Your current draft is unchanged.');
  }
  const fields={};
  for (const f of FIELD_DEFS) {
    const value=(f.since||1)>raw.version?f.value:raw.fields[f.id];
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
  const rawNA=raw.version<3?Object.fromEntries(CHECK_IDS.map(id=>[id,false])):raw.notApplicable;
  if (!isRecord(rawNA) || !exactKeys(rawNA,CHECK_IDS)) throw new Error('The batch file has invalid N/A entries. Your current draft is unchanged.');
  const notApplicable={};
  for(const id of CHECK_IDS) {
    if(typeof rawNA[id]!=='boolean' || (rawNA[id] && checks[id])) throw new Error('A step cannot be both checked and not applicable. Your current draft is unchanged.');
    notApplicable[id]=rawNA[id];
  }
  const labels=legacy?LEGACY_STEP_LABELS:raw.stepLabels;
  if (!isRecord(labels) || !exactKeys(labels,CHECK_IDS)) throw new Error('The batch file has an invalid checklist. Your current draft is unchanged.');
  const stepLabels={};
  for (const id of CHECK_IDS) {
    if (typeof labels[id]!=='string' || !labels[id].trim() || labels[id].length>500) throw new Error('The batch file has an invalid checklist label. Your current draft is unchanged.');
    stepLabels[id]=labels[id];
  }
  return {app:APP,version:VERSION,templateId:TEMPLATE,createdAt:raw.createdAt,updatedAt:raw.updatedAt,fields,checks,notApplicable,stepLabels};
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


export function checklistProgress(batch) {
  const notApplicable=CHECK_IDS.filter(id=>batch.notApplicable[id]).length;
  return {checked:CHECK_IDS.filter(id=>batch.checks[id]).length,applicable:CHECK_IDS.length-notApplicable,notApplicable};
}

export function formatStageStamp(batch,stageId,kind) {
  const date=batch.fields[stageId+kind+'Date'];
  const time=batch.fields[stageId+kind];
  if(date && time) return date+' '+time;
  if(date) return date+' (time not recorded)';
  if(time) return time+' (date not recorded)';
  return 'Not recorded';
}
