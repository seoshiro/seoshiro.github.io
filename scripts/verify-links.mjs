/* global fetch, AbortSignal */
import {projects} from '../src/content.ts';
import {mkdir,writeFile} from 'node:fs/promises';
const records=[];
for(const p of projects)for(const [kind,url] of [['demo',p.live],['source',p.source]]){
  const r=await fetch(url,{method:'HEAD',redirect:'follow',signal:AbortSignal.timeout(30000)});
  records.push({project:p.id,kind,url,status:r.status,resolved:r.url});
}
await mkdir('evidence',{recursive:true});await writeFile('evidence/links.json',JSON.stringify(records,null,2));console.log(records);
if(records.some(r=>r.status!==200))process.exitCode=1;

