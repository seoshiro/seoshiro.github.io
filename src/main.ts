import {copy,validLocale,projectById,type Locale,type ProjectId} from './content.ts';
import {renderPage} from './render.ts';
import {dialogContent} from './gallery-render.ts';
import type {Pavilion,Exhibit,View} from './pavilion.ts';
const id=projectById(document.body.dataset.project||'')?.id||null;
const query=new URL(window.location.href);
let stored:string|null=null;try{stored=localStorage.getItem('seoshiro-portfolio-language-v1');}catch{/* Optional preference. */}
let locale:Locale=validLocale(query.searchParams.get('lang'))||validLocale(stored)||'en';
let scene:Pavilion|null=null,sequence=0,entered=false,closing=false,historyOwned=false;
let returnFocus:HTMLElement|null=null;
let pending:ReturnType<typeof setTimeout>|null=null;
type Panel=ProjectId|'work'|'about'|'contact';
function panelFromHash():Panel|null {
  const hash=window.location.hash.slice(1);
  if(['work','about','contact'].includes(hash))return hash as Panel;
  return projectById(hash.replace(/^project-/,''))?.id||null;
}
function imageFallback(root:ParentNode){root.querySelectorAll<HTMLImageElement>('img').forEach(img=>{const fail=()=>{if(img.parentElement?.querySelector('.image-error'))return;const note=document.createElement('span');note.className='image-error';note.textContent=copy[locale].imageFailed;img.hidden=true;img.parentElement?.append(note);};img.addEventListener('error',fail,{once:true});if(img.complete&&!img.naturalWidth)fail();});}
function renderDialog(panel:Panel) {
  const dialog=document.querySelector<HTMLDialogElement>('.gallery-dialog');if(!dialog)return;
  const body=dialog.querySelector<HTMLElement>('.dialog-body')!;
  body.innerHTML=dialogContent(locale,panel);imageFallback(body);bindCases(body);
  if(!dialog.open){returnFocus=document.activeElement as HTMLElement;dialog.showModal();document.body.classList.add('dialog-open');}
  body.scrollTop=0;dialog.scrollTop=0;dialog.querySelector<HTMLElement>('.dialog-close')!.focus({preventScroll:true});
  void document.fonts.ready.then(()=>requestAnimationFrame(()=>{if(dialog.open&&!dialog.contains(document.activeElement))dialog.querySelector<HTMLElement>('.dialog-close')?.focus({preventScroll:true});}));
}
function enter(){entered=true;document.querySelector('.pavilion')?.classList.add('is-entered');}
function openPanel(panel:Panel,focusScene=true) {
  if(pending){clearTimeout(pending);pending=null;}
  if(id)return;
  if(focusScene&&scene&&projectById(panel)){enter();scene.focus(panel as Exhibit);}
  const url=new URL(window.location.href);url.hash=projectById(panel)?`project-${panel}`:panel;
  if(window.location.hash!==url.hash){historyOwned=true;history.pushState({gallery:true},'',url);}
  renderDialog(panel);
}
function openExhibit(exhibit:Exhibit){enter();scene?.focus(exhibit);if(pending)clearTimeout(pending);const current=sequence;const delay=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:520;pending=setTimeout(()=>{pending=null;if(current===sequence)openPanel(exhibit,false);},delay);}
function closeDialog(updateHistory=true){const d=document.querySelector<HTMLDialogElement>('.gallery-dialog');if(!d?.open)return;closing=true;d.close();closing=false;document.body.classList.remove('dialog-open');scene?.view('overview');document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String((b as HTMLElement).dataset.view==='overview')));if(updateHistory){if(historyOwned){historyOwned=false;history.back();}else{const url=new URL(window.location.href);url.hash='';history.replaceState(null,'',url);}}returnFocus?.focus({preventScroll:true});}
function bindCases(root:ParentNode){root.querySelectorAll<HTMLAnchorElement>('[data-case]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();openPanel(a.dataset.case as ProjectId,false);}));}
async function enhance(){
  const current=++sequence;
  document.documentElement.lang=locale;document.title=id?`${projectById(id)!.name} — ${copy[locale].name}`:copy[locale].title;
  for(const selector of ['meta[name="description"]','meta[property="og:description"]'])document.querySelector(selector)?.setAttribute('content',id?copy[locale].project[id].summary:copy[locale].description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',document.title);
  imageFallback(document);
  document.querySelectorAll<HTMLButtonElement>('[data-locale]').forEach(b=>b.addEventListener('click',()=>switchLanguage(validLocale(b.dataset.locale||null)!)));
  if(id)return;
  const dialog=document.querySelector<HTMLDialogElement>('.gallery-dialog')!;
  dialog.querySelector('.dialog-close')!.addEventListener('click',()=>closeDialog());
  dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog();});
  dialog.addEventListener('close',()=>{if(!closing)closeDialog();});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();const m=e as MouseEvent;if(m.clientX<r.left||m.clientX>r.right||m.clientY<r.top||m.clientY>r.bottom)closeDialog();}});
  bindCases(document);
  document.querySelectorAll<HTMLAnchorElement>('.header nav a,.gallery-toolbar>a').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();openPanel(a.hash.slice(1) as Panel,false);}));
  document.querySelector<HTMLAnchorElement>('.enter-link')!.addEventListener('click',e=>{if(!scene)return;e.preventDefault();enter();scene.view('objects');});
  document.querySelectorAll<HTMLAnchorElement>('[data-exhibit]').forEach(a=>a.addEventListener('click',e=>{if(!scene||e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();openExhibit(a.dataset.exhibit as Exhibit);}));
  document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.addEventListener('click',()=>{enter();scene?.view(b.dataset.view as View);document.querySelectorAll('[data-view]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
  if(entered)enter();
  const panel=panelFromHash();if(panel)renderDialog(panel);
  try{await new Promise<void>(resolve=>requestAnimationFrame(()=>setTimeout(resolve,0)));const {startPavilion}=await import('./pavilion.ts');if(current!==sequence)return;const nextScene=await startPavilion(openExhibit,entered);if(current!==sequence){nextScene?.dispose();return;}scene=nextScene;}catch{/* Useful static catalogue remains available. */}
  if(!scene){document.querySelector<HTMLElement>('.gallery-status')!.hidden=true;document.querySelector<HTMLElement>('.gallery-hotspots')!.hidden=true;document.querySelector('.pavilion')?.classList.add('gallery-unavailable');}
}
function switchLanguage(next:Locale){if(next===locale)return;const y=window.scrollY;scene?.dispose();scene=null;sequence++;document.body.classList.remove('dialog-open');locale=next;document.getElementById('app')!.innerHTML=renderPage(locale,id);const url=new URL(window.location.href);if(locale==='en')url.searchParams.delete('lang');else url.searchParams.set('lang',locale);history.replaceState(null,'',url);try{localStorage.setItem('seoshiro-portfolio-language-v1',locale);}catch{/* Optional preference. */}void enhance().then(()=>{window.scrollTo({top:y,behavior:'instant'});if(!document.querySelector<HTMLDialogElement>('dialog')?.open)document.querySelector<HTMLButtonElement>(`[data-locale="${locale}"]`)?.focus({preventScroll:true});});}
if(locale!=='en')document.getElementById('app')!.innerHTML=renderPage(locale,id);
void enhance();
window.addEventListener('popstate',()=>{if(id)return;const panel=panelFromHash();if(panel)renderDialog(panel);else{closeDialog(false);requestAnimationFrame(()=>returnFocus?.focus({preventScroll:true}));}});
window.addEventListener('load',()=>{if(!id&&panelFromHash())requestAnimationFrame(()=>document.querySelector<HTMLElement>('.dialog-close')?.focus({preventScroll:true}));});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&pending){clearTimeout(pending);pending=null;scene?.view('overview');}});
window.addEventListener('pagehide',e=>{if(!e.persisted){sequence++;scene?.dispose();}});
