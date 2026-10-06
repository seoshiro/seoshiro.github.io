/* global PerformanceObserver */
import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,...(!process.env.CI?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{})});
const records=[];
for(const rate of [1,4]){
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:3});const page=await context.newPage();const cdp=await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate',{rate});
  await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:100000});
  await page.addInitScript(()=>{window.__galleryLongTasks=[];new PerformanceObserver(list=>window.__galleryLongTasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration})))).observe({type:'longtask',buffered:true});});
  const started=performance.now();await page.goto('http://127.0.0.1:5317');await page.locator('.gallery-ready').waitFor();await page.locator('canvas[data-frames]').waitFor();const firstSceneMs=performance.now()-started;
  await page.waitForTimeout(1200);const before=await page.locator('canvas').getAttribute('data-frames');await page.waitForTimeout(500);const after=await page.locator('canvas').getAttribute('data-frames');
  const metrics=await page.evaluate(()=>({paint:performance.getEntriesByType('paint').map(e=>({name:e.name,ms:e.startTime})),resources:performance.getEntriesByType('resource').map(e=>({name:new URL(e.name).pathname,bytes:e.encodedBodySize,duration:e.duration})),longTasks:window.__galleryLongTasks}));
  records.push({cpuThrottle:rate,network:'150ms latency, 1.6Mbps download, cold local HTTP',firstSceneMs,idleAdditionalFrames:Number(after)-Number(before),...metrics,renderer:await page.locator('canvas').evaluate(c=>({buffer:[c.width,c.height],triangles:Number(c.dataset.triangles),drawCalls:Number(c.dataset.calls)}))});await context.close();
}
await browser.close();await mkdir('evidence',{recursive:true});await writeFile('evidence/gallery-performance.json',JSON.stringify({note:'Local synthetic Windows Chromium measurements. Not field data or universal device FPS.',records},null,2));console.log(records.map(r=>({cpu:r.cpuThrottle,firstSceneMs:r.firstSceneMs,paint:r.paint,idle:r.idleAdditionalFrames,bytes:r.resources.reduce((s,r)=>s+r.bytes,0),renderer:r.renderer,longTasks:r.longTasks.length})));

