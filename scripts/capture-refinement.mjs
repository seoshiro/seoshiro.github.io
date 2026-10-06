import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
await mkdir('evidence/refinement',{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
for(const width of [320,390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  page.on('console',m=>{if(['warning','error'].includes(m.type()))console.log(m.type(),m.text());});
  await page.goto('http://127.0.0.1:5317');await page.locator('.gallery-ready').waitFor();await page.locator('canvas[data-frames]').waitFor();await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`evidence/refinement/${width}-home.png`});
  for(const view of ['objects','tools']){await page.locator(`[data-view="${view}"]`).click();await page.waitForTimeout(150);await page.locator('.gallery-stage').screenshot({path:`evidence/refinement/${width}-${view}.png`});}
  await page.close();
}
await browser.close();
