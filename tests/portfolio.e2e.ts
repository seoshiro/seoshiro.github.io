import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {copy,locales,projects,dimensions} from '../src/content.ts';
const ready=async(page:import('@playwright/test').Page)=>{await expect(page.locator('.pavilion')).toHaveClass(/gallery-ready/);await expect(page.locator('canvas')).toHaveAttribute('data-frames',/\d+/);};

test('Phone exhibits fit completely, labels never intersect, and resizing preserves the active viewpoint',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  const fit=async()=>{
    const bounds=await page.locator('canvas').evaluate(c=>JSON.parse(c.dataset.objectBounds||'[]') as {id:string;left:number;right:number;top:number;bottom:number}[]);
    expect(bounds).toHaveLength(4);for(const b of bounds){expect(b.left,b.id).toBeGreaterThan(.03);expect(b.right,b.id).toBeLessThan(.97);expect(b.top,b.id).toBeGreaterThan(.03);expect(b.bottom,b.id).toBeLessThan(.97);}
  };
  for(const width of [320,390,768]){
    await page.setViewportSize({width,height:1000});await page.goto('/');await ready(page);await page.evaluate(()=>document.fonts.ready);
    const separated=await page.evaluate(()=>document.querySelector('.pavilion-heading')!.getBoundingClientRect().bottom<=document.querySelector('.gallery-stage')!.getBoundingClientRect().top+1);expect(separated).toBe(true);
    for(const view of ['overview','objects','tools']){
      await page.locator(`[data-view="${view}"]`).click();await page.waitForTimeout(100);
      if(width<700&&view!=='tools')await fit();
      const labels=await page.locator('.gallery-hotspots .hotspot:visible').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {id:(n as HTMLElement).dataset.exhibit,left:r.left,right:r.right,top:r.top,bottom:r.bottom};}));
      expect(labels).toHaveLength(view==='tools'?4:5);
      for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];expect(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom,`${width} ${view} ${a.id}/${b.id}`).toBe(true);}
    }
  }
  await page.locator('[data-view="overview"]').click();await page.setViewportSize({width:320,height:1000});await page.waitForTimeout(200);await fit();
  await expect(page.locator('.gallery-hotspots .hotspot:visible')).toHaveCount(5);
});

test('Every static case route retains all localized project facts, links, SEO and screenshot assets',async({page})=>{
  for(const locale of locales)for(const p of projects){
    const response=await page.goto(`/projects/${p.id}.html?lang=${locale}`);expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang',locale);
    await expect(page.locator('h1')).toHaveText(`${p.name}.`);
    await expect(page.locator('.case-details')).toContainText(copy[locale].project[p.id].limit);
    await expect(page.locator('.case-cover img')).toHaveJSProperty('naturalWidth',dimensions[p.id].main[0]);
    await expect(page.locator('.case-actions a').first()).toHaveAttribute('href',p.live);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://seoshiro.github.io/projects/${p.id}.html`);
    await expect(page.locator('canvas')).toHaveCount(0);
  }
});
test('Viewpoints, exhibit clicks, full case links, browser Back and reload are real navigation flows',async({page})=>{
  await page.goto('/');await ready(page);
  await page.locator('[data-view="tools"]').click();await expect(page.locator('[data-view="tools"]')).toHaveAttribute('aria-pressed','true');
  for(const p of projects){
    await page.locator(`.exhibit-rail a[href="projects/${p.id}.html"]`).click();
    await expect(page.locator('dialog')).toBeVisible();await expect(page.locator('#dialog-title')).toHaveText(p.name);
    await expect(page).toHaveURL(new RegExp(`#project-${p.id}$`));
    await expect(page.locator('dialog')).toContainText(copy.en.project[p.id].limit);
    await expect(page.locator('dialog .case-actions a').first()).toHaveAttribute('href',p.live);
    await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible();
    await expect(page).not.toHaveURL(/#project/);
  }
  await page.locator('.gallery-hotspots [data-exhibit="lumen"]').click();await expect(page.locator('dialog')).toBeVisible();
  await page.reload();await expect(page.locator('#dialog-title')).toHaveText('LUMEN');
  await page.locator('dialog a[href="projects/lumen.html"]').click();await expect(page.locator('h1')).toHaveText('LUMEN.');
  await page.goBack();await expect(page.locator('#dialog-title')).toHaveText('LUMEN');
  await page.locator('.dialog-close').click();await expect(page.locator('dialog')).not.toBeVisible();
});
test('Direct All Projects, About, Contact and catalogue nested case paths remain accessible',async({page})=>{
  for(const hash of ['work','about','contact']){
    await page.goto(`/?lang=ru#${hash}`);await expect(page.locator('dialog')).toBeVisible();
    await expect(page.locator('dialog')).toHaveAttribute('data-panel',hash);
    await expect(page.locator('.dialog-close')).toBeFocused();
    if(hash==='work'){
      await expect(page.locator('dialog .project-card')).toHaveCount(projects.length);
      await page.locator('dialog [data-case="perch"]').first().click();await expect(page.locator('#dialog-title')).toHaveText('PERCH');
      await page.goBack();await expect(page.locator('dialog .project-card')).toHaveCount(projects.length);
    }
    if(hash==='contact')await expect(page.locator('dialog a')).toHaveAttribute('href','https://github.com/seoshiro');
    await page.locator('.dialog-close').click();await expect(page.locator('dialog')).not.toBeVisible();
    await expect(page).toHaveURL(/\/\?lang=ru$/);
  }
});

test('Browsers without parallel compilation retain warning-free rendering and initial modal focus',async({page})=>{
  await page.addInitScript(()=>{const original=WebGL2RenderingContext.prototype.getExtension;Object.defineProperty(WebGL2RenderingContext.prototype,'getExtension',{value:function(this:WebGL2RenderingContext,name:string){return name==='KHR_parallel_shader_compile'?null:Reflect.apply(original,this,[name]);}});});
  const warnings:string[]=[];page.on('console',m=>{if(m.type()==='warning')warnings.push(m.text());});
  await page.goto('/?lang=ru#about');await ready(page);await expect(page.locator('.dialog-close')).toBeFocused();
  await page.locator('.dialog-close').evaluate(b=>(b as HTMLButtonElement).blur());await expect(page.locator('.dialog-close')).toBeFocused();
  await page.keyboard.press('Tab');expect(await page.locator('dialog').evaluate(d=>d.contains(document.activeElement))).toBe(true);
  await page.evaluate(()=>new Promise<void>(resolve=>{const d=document.querySelector('dialog')!;d.addEventListener('close',()=>resolve(),{once:true});document.querySelector<HTMLButtonElement>('.dialog-close')!.click();document.querySelector<HTMLAnchorElement>('.header nav a[href="#contact"]')!.click();}));
  await expect(page.locator('dialog')).toHaveAttribute('data-panel','contact');await expect(page.locator('dialog')).toBeVisible();
  expect(warnings).toEqual([]);
});
test('Keyboard hotspots, native dialog focus trap, Escape and focus return work',async({page})=>{
  await page.goto('/');await ready(page);await page.keyboard.press('Tab');await expect(page.locator('.skip')).toBeFocused();
  await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
  const trigger=page.locator('.exhibit-rail [data-exhibit="reson"]');await trigger.focus();await page.keyboard.press('Enter');
  await expect(page.locator('.dialog-close')).toBeFocused();
  await page.keyboard.press('Shift+Tab');expect(await page.locator('dialog').evaluate(d=>d.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
});
test('320, 390, tablet, desktop and wide layouts have no page overflow in EN/RU/KK, including modal content',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const width of [320,390,768,1440,1920])for(const locale of locales){
    await page.setViewportSize({width,height:900});await page.goto(`/?lang=${locale}`);await ready(page);await page.evaluate(()=>document.fonts.ready);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`${width} ${locale} home`).toBe(true);
    await page.locator('.header nav a').first().click();await expect(page.locator('dialog .project-card')).toHaveCount(projects.length);
    expect(await page.locator('dialog').evaluate(d=>d.scrollWidth<=d.clientWidth+1),`${width} ${locale} catalogue`).toBe(true);
    await page.locator('dialog [data-case="archiveguard"]').first().click();
    await expect(page.locator('dialog')).toContainText(copy[locale].project.archiveguard.limit);
    expect(await page.locator('dialog').evaluate(d=>d.scrollWidth<=d.clientWidth+1),`${width} ${locale} case`).toBe(true);
  }
});
test('All content remains useful without JavaScript and without WebGL',async({browser})=>{
  const nojs=await browser.newContext({javaScriptEnabled:false});const p=await nojs.newPage();await p.goto('/');await expect(p.locator('.project-card')).toHaveCount(projects.length);await expect(p.locator('.gallery-stage')).not.toBeVisible();await p.locator('.project-title a').first().click();await expect(p.locator('h1')).toHaveText('ORBIT.');await nojs.close();
  const blocked=await browser.newContext();const q=await blocked.newPage();await q.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type,...args){if(type==='webgl2'||type==='webgl')return null;return original.call(this,type,...args);} as typeof original;});await q.goto('/');await expect(q.locator('.pavilion')).toHaveClass(/gallery-unavailable/);await expect(q.locator('.project-card')).toHaveCount(projects.length);await q.locator('.header nav a').first().click();await expect(q.locator('dialog .project-card')).toHaveCount(projects.length);await blocked.close();
});
test('Reduced motion settles immediately; idle, offscreen and hidden scenes stop rendering',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await ready(page);await page.waitForTimeout(250);
  const frames=()=>page.locator('canvas').getAttribute('data-frames');const still=await frames();await page.waitForTimeout(500);expect(await frames()).toBe(still);
  await page.locator('[data-view="objects"]').click();await page.waitForTimeout(80);const changed=await frames();expect(Number(changed)).toBeGreaterThan(Number(still));await page.waitForTimeout(250);expect(await frames()).toBe(changed);
  await page.locator('#contact').scrollIntoViewIfNeeded();const offscreen=await frames();await page.waitForTimeout(300);expect(await frames()).toBe(offscreen);
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:true,configurable:true});document.dispatchEvent(new Event('visibilitychange'));});
  const hidden=await frames();await page.waitForTimeout(250);expect(await frames()).toBe(hidden);
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:false,configurable:true});document.dispatchEvent(new Event('visibilitychange'));});
});
test('Physical lens mesh clicks and a real lost WebGL context preserve the full fallback',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await ready(page);
  const point=await page.locator('.gallery-hotspots [data-exhibit="lumen"]').evaluate(a=>({x:parseFloat(a.style.left),y:parseFloat(a.style.top)-25}));
  await page.locator('canvas').click({position:point});await expect(page.locator('#dialog-title')).toHaveText('LUMEN');await page.keyboard.press('Escape');
  await page.locator('canvas').evaluate(c=>{const gl=(c as HTMLCanvasElement).getContext('webgl2');gl?.getExtension('WEBGL_lose_context')?.loseContext();});
  await expect(page.locator('.pavilion')).toHaveClass(/gallery-unavailable/);await expect(page.locator('.gallery-fallback')).toBeVisible();await expect(page.locator('#work .project-card')).toHaveCount(projects.length);
});
test('Save-Data caps resolution and skips animation even without system reduced motion',async({page})=>{
  await page.addInitScript(()=>{Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true});});
  await page.setViewportSize({width:390,height:844});await page.goto('/');await ready(page);await page.waitForTimeout(150);
  const before=await page.locator('canvas').getAttribute('data-frames');await page.waitForTimeout(250);expect(await page.locator('canvas').getAttribute('data-frames')).toBe(before);
  expect(await page.locator('canvas').evaluate(c=>(c as HTMLCanvasElement).width<=c.clientWidth)).toBe(true);
});
test('Accessibility checks pass on localized homes, cases and open dialogs',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const locale of locales){await page.goto(`/?lang=${locale}`);await ready(page);expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);await page.locator('.header nav a').nth(1).click();expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);}
  for(const p of projects){await page.goto(`/projects/${p.id}.html`);expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);}
});
test('Storage denial, malformed locale and unavailable screenshots retain useful navigation',async({page})=>{
  await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw Error('denied');}});});
  await page.goto('/?lang=unsupported');await expect(page.locator('html')).toHaveAttribute('lang','en');
  await page.locator('[data-locale="kk"]').click();await expect(page.locator('html')).toHaveAttribute('lang','kk');
  await page.route('**/assets/lumen.webp',r=>r.abort());await page.goto('/?lang=ru#project-lumen');await expect(page.locator('dialog .image-error')).toBeVisible();await expect(page.locator('dialog .case-actions a').first()).toHaveAttribute('href',projects.find(p=>p.id==='lumen')!.live);
});
test('200 percent enlarged text retains readable navigation and whole case names',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:320,height:900});
  for(const locale of locales){await page.goto(`/?lang=${locale}`);await page.evaluate(()=>document.documentElement.style.fontSize='200%');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);await page.locator('.header nav a').nth(2).click();expect(await page.locator('dialog').evaluate(d=>d.scrollWidth<=d.clientWidth+1)).toBe(true);}
  for(const p of projects){await page.goto(`/projects/${p.id}.html?lang=kk`);await page.evaluate(()=>document.documentElement.style.fontSize='200%');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),p.id).toBe(true);}
});
test('Runtime has no third party requests or uncaught errors and server protects source files',async({page,request})=>{
  const errors:string[]=[],thirdParty:string[]=[],warnings:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='warning')warnings.push(m.text());});page.on('request',r=>{if(new URL(r.url()).origin!==new URL(process.env.LIVE_URL||'http://127.0.0.1:5317').origin)thirdParty.push(r.url());});
  await page.goto('/');await ready(page);for(const locale of locales){await page.locator(`[data-locale="${locale}"]`).click();await ready(page);}
  await expect(page.locator('.project-card')).toHaveCount(projects.length);expect(errors).toEqual([]);expect(thirdParty).toEqual([]);expect(warnings).toEqual([]);
  if(!process.env.LIVE_URL){for(const path of ['/src/content.ts','/package.json','/.git/config'])expect((await request.get(path)).status()).toBe(404);const response=await request.get('/');expect(response.headers()['content-security-policy']).toContain("connect-src 'none'");}
});
