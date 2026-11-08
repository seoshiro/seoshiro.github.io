import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from '@playwright/test';
const out='evidence/save-slot-integration';await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const records=[];
try {
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]) for(const locale of ['ru','en','kk']) {
  const context=await browser.newContext({viewport});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:5320/index.html?lang=${locale}`);
  await page.waitForFunction(()=>document.body.dataset.model==='ready');
  await page.waitForFunction(()=>document.querySelector('.soft-canvas')?.dataset.animating==='false');
  await page.screenshot({path:`${out}/${locale}-${viewport.width}-overview.png`});
  if(await page.locator('.scene-index button').first().getAttribute('id')!=='index-save-slot')throw Error('Wrong first petal');
  await page.locator('#index-save-slot').click();await page.waitForTimeout(1250);
  if(await page.locator('#preview-title').textContent()!=='SAVE SLOT')throw Error('Wrong project title');
  await page.screenshot({path:`${out}/${locale}-${viewport.width}-selected.png`});
  await page.locator('#preview-case-save-slot').click();await page.waitForTimeout(700);
  const reader=page.locator('.case-reader');
  await reader.locator('img').first().evaluate(img=>img.decode());
  if(await reader.locator('a').first().getAttribute('href')!=='https://seoshiro.github.io/save-slot/')throw Error('Wrong demo');
  await page.screenshot({path:`${out}/${locale}-${viewport.width}-case.png`});
  await page.keyboard.press('Escape');await page.waitForTimeout(750);
  await page.locator('#index-all').click();await page.waitForTimeout(750);
  const links=await page.locator('#work-list>a').evaluateAll(items=>items.map(a=>({href:a.getAttribute('href'),text:a.textContent})));
  if(!links[0].href.startsWith('projects/save-slot.html')||links.filter(a=>a.href.startsWith('projects/perch.html')).length!==1)throw Error('Wrong catalog');
  await page.locator('#work-list img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
  await page.screenshot({path:`${out}/${locale}-${viewport.width}-catalog.png`});
  records.push({locale,viewport,errors,first:links[0],count:links.length});if(errors.length)throw Error(errors.join('\n'));
  await context.close();
 }
 await writeFile(`${out}/capture.json`,JSON.stringify(records,null,2)+'\n');console.log(records);
} finally {await browser.close();}
