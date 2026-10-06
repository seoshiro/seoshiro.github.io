import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const url=process.argv[2]||'http://127.0.0.1:5317',out=process.argv[3]||'evidence/gallery';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(!process.env.CI?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{})});
const errors=[],records=[];
for(const [width,height] of [[320,900],[390,844],[768,1024],[1440,1000],[1920,1080]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  for(const locale of ['en','ru','kk']){
    await page.goto(`${url}/?lang=${locale}`);await page.locator('.gallery-ready').waitFor();await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(80);await page.screenshot({path:`${out}/${width}-${locale}-home.png`});
    const metrics=await page.locator('canvas').evaluate(c=>({width:c.width,height:c.height,calls:Number(c.dataset.calls),triangles:Number(c.dataset.triangles),frames:Number(c.dataset.frames)}));
    records.push({width,locale,...metrics,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1)});
  }
  for(const panel of ['work','about','contact','project-lumen','project-reson','project-perch','project-orbit','project-forme','project-selvedge','project-guidecheck','project-archiveguard']){
    await page.goto(`${url}/?lang=en#${panel}`);await page.locator('dialog[open]').waitFor();await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('dialog img')].filter(i=>i.getBoundingClientRect().top<window.innerHeight&&i.getBoundingClientRect().bottom>0).map(i=>i.decode().catch(()=>{})));});
    await page.screenshot({path:`${out}/${width}-${panel}.png`});
  }
  await page.goto(`${url}/?lang=en`);await page.locator('.gallery-ready').waitFor();await page.locator('[data-view="tools"]').click();await page.screenshot({path:`${out}/${width}-tools.png`});
  await page.close();
}
await browser.close();await writeFile(`${out}/manifest.json`,JSON.stringify({url,records,errors},null,2));
await writeFile(`${out}/index.html`,`<!doctype html><meta charset="utf-8"><title>Portfolio visual evidence</title><style>body{font:16px system-ui;background:#f4f1e9;color:#292f27;margin:30px}img{width:100%;max-width:1000px;display:block;margin:12px 0 50px}a{color:inherit}</style><h1>Project pavilion: visual verification</h1>${records.map(r=>`<h2>${r.width}px / ${r.locale}</h2><a href="${r.width}-${r.locale}-home.png"><img src="${r.width}-${r.locale}-home.png" loading="lazy"></a>`).join('')}`);
console.log(JSON.stringify({captures:75,errors,records},null,2));

