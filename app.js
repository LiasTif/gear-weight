const SND_FILES = {
  click:      'click.mp3',
  add:        'adding_item.mp3',
  del:        'deleting.mp3',
  modalOpen:  'modal_open.mp3',
  modalClose: 'modal_close.mp3',
  checkbox:   'checkbox_toggle.mp3',
  notify:     'notification.mp3',
  select:     'select_item.mp3',
};

let soundEnabled = true;
const SFX = {};

function initSounds() {
  for (const [k, file] of Object.entries(SND_FILES)) {
    const pitched = k === 'select';
    SFX[k] = () => {
      if (!soundEnabled) return;
      const a = new Audio(file);
      a.volume = 0.3;
      if (pitched) a.playbackRate = 0.95 + Math.random() * 0.1;
      a.play().catch(() => {});
    };
  }
}
initSounds();

function toggleSound() {
  soundEnabled = !soundEnabled;
  const b = document.getElementById('sndBtn');
  b.textContent = soundEnabled ? '🔊' : '🔇';
  b.classList.toggle('off', !soundEnabled);
  localStorage.setItem('gearSound', soundEnabled ? '1' : '0');
}
if (localStorage.getItem('gearSound') === '0') {
  soundEnabled = false;
  setTimeout(() => {
    const b = document.getElementById('sndBtn');
    if (b) { b.textContent = '🔇'; b.classList.add('off'); }
  }, 0);
}

const VER = 2;
const CC = ['#4ecdc4','#ff6b6b','#ffd93d','#a78bfa','#f472b6','#38bdf8','#fb923c','#34d399','#e879f9','#f87171','#60a5fa','#facc15'];

let catColors = {};
function getCatColor(name){
  if(!catColors[name]) catColors[name] = CC[Object.keys(catColors).length % CC.length];
  return catColors[name];
}

let coverColors = {};
function getCoverColor(itemId, type) {
  const key = type + '_' + itemId;
  if(!coverColors[key]){
    const used = Object.values(coverColors);
    const available = ['#ffd93d','#fb923c','#f472b6','#34d399','#38bdf8','#e879f9','#facc15','#ff6b6b','#60a5fa','#4ecdc4'];
    coverColors[key] = available.find(c=>!used.includes(c)) || available[Object.keys(coverColors).length % available.length];
  }
  return coverColors[key];
}

const LANGS = {
  en: { flag: '🇺🇸', label: 'English' },
  ua: { flag: '🇺🇦', label: 'Українська' },
  ru: { flag: '🇷🇺', label: 'Русский' },
  es: { flag: '🇪🇸', label: 'Español' },
  de: { flag: '🇩🇪', label: 'Deutsch' },
  fr: { flag: '🇫🇷', label: 'Français' }
};

const T = {
  ua:{title:'Спорядження',addItem:'Додати спорядження',name:'Назва',weightG:'Вага (г)',weight:'Вага',qty:'Кіл.',add:'Додати',hasCover:'Має чохол / кейс',coverName:'Назва чохла',coverWeight:'Вага чохла',category:'Категорія',cats:'Категорії',sc:'Спільний чохол',exp:'Експорт',imp:'Імпорт',clr:'Очистити',share:'Поділитись',shareT:'Поділитись списком',shareCopied:'Посилання скопійовано!',shareDesc:'Перегляд (тільки читання)',tw:'Загальна вага',go:'Спорядження',co:'Чохли / кейси',ic:'Предметів',ot:'від загалу',cch:'Вага по категоріях',cvch:'Спорядження vs Чохли',tch:'Топ предметів',gear:'Спорядження',covers:'Чохли',addG:'Додайте спорядження',nl:'Новий список',ln:'Назва списку',create:'Створити',cancel:'Скасувати',close:'Закрити',del:'Видалити',save:'Зберегти',mc:'Категорії',nc:'Нова категорія',scT:'Спільний чохол',scD:'Чохол для кількох предметів',scS:'Оберіть предмети:',scM:'Оберіть хоча б 2 предмети',ei:'Редагувати предмет',eSc:'Редагувати спільний чохол',rl:'Перейменувати список',n1:'Потрібен хоча б один список',dl:'Видалити цей список?',cc2:'Очистити весь список?',exd:'Експортовано!',imd:'Імпортовано!',svd:'Збережено!',ivf:'Невірний формат',en2:'Введіть назву',ew:'Введіть вагу',le:'Такий список вже є',fr:'Для',defCat:['Одяг','Спальне','Кухня','Електроніка','Гігієна','Інше']},
  ru:{title:'Снаряжение',addItem:'Добавить снаряжение',name:'Название',weightG:'Вес (г)',weight:'Вес',qty:'Кол.',add:'Добавить',hasCover:'Есть чехол / кейс',coverName:'Название чехла',coverWeight:'Вес чехла',category:'Категория',cats:'Категории',sc:'Общий чехол',exp:'Экспорт',imp:'Импорт',clr:'Очистить',share:'Поделиться',shareT:'Поделиться списком',shareCopied:'Ссылка скопирована!',shareDesc:'Просмотр (только чтение)',tw:'Общий вес',go:'Снаряжение',co:'Чехлы / кейсы',ic:'Предметов',ot:'от общего',cch:'Вес по категориям',cvch:'Снаряжение vs Чехлы',tch:'Топ предметов',gear:'Снаряжение',covers:'Чехлы',addG:'Добавьте снаряжение',nl:'Новый список',ln:'Название списка',create:'Создать',cancel:'Отмена',close:'Закрыть',del:'Удалить',save:'Сохранить',mc:'Категории',nc:'Новая категория',scT:'Общий чехол',scD:'Чехол для нескольких предметов',scS:'Выберите предметы:',scM:'Выберите хотя бы 2 предмета',ei:'Редактировать предмет',eSc:'Редактировать общий чехол',rl:'Переименовать список',n1:'Нужен хотя бы один список',dl:'Удалить этот список?',cc2:'Очистить весь список?',exd:'Экспортировано!',imd:'Импортировано!',svd:'Сохранено!',ivf:'Неверный формат',en2:'Введите название',ew:'Введите вес',le:'Такой список уже есть',fr:'Для',defCat:['Одежда','Спальное','Кухня','Электроника','Гигиена','Другое']},
  en:{title:'Gear',addItem:'Add gear',name:'Name',weightG:'Weight (g)',weight:'Weight',qty:'Qty',add:'Add',hasCover:'Has cover / case',coverName:'Cover name',coverWeight:'Cover weight',category:'Category',cats:'Categories',sc:'Shared cover',exp:'Export',imp:'Import',clr:'Clear',share:'Share',shareT:'Share list',shareCopied:'Link copied!',shareDesc:'View only (read-only)',tw:'Total weight',go:'Gear',co:'Covers / cases',ic:'Items',ot:'of total',cch:'Weight by category',cvch:'Gear vs Covers',tch:'Heaviest items',gear:'Gear',covers:'Covers',addG:'Add some gear',nl:'New list',ln:'List name',create:'Create',cancel:'Cancel',close:'Close',del:'Delete',save:'Save',mc:'Categories',nc:'New category',scT:'Shared cover',scD:'One cover for multiple items',scS:'Select items:',scM:'Select at least 2 items',ei:'Edit item',eSc:'Edit shared cover',rl:'Rename list',n1:'Need at least one list',dl:'Delete this list?',cc2:'Clear entire list?',exd:'Exported!',imd:'Imported!',svd:'Saved!',ivf:'Invalid file',en2:'Enter name',ew:'Enter weight',le:'List exists',fr:'For',defCat:['Clothing','Sleeping','Kitchen','Electronics','Hygiene','Other']},
  es:{title:'Equipamiento',addItem:'Añadir equipo',name:'Nombre',weightG:'Peso (g)',weight:'Peso',qty:'Cant.',add:'Añadir',hasCover:'Tiene funda / estuche',coverName:'Nombre de funda',coverWeight:'Peso de funda',category:'Categoría',cats:'Categorías',sc:'Funda compartida',exp:'Exportar',imp:'Importar',clr:'Limpiar',share:'Compartir',shareT:'Compartir lista',shareCopied:'¡Enlace copiado!',shareDesc:'Solo lectura',tw:'Peso total',go:'Equipamiento',co:'Fundas / estuches',ic:'Artículos',ot:'del total',cch:'Peso por categoría',cvch:'Equipo vs Fundas',tch:'Artículos más pesados',gear:'Equipo',covers:'Fundas',addG:'Añade equipamiento',nl:'Nueva lista',ln:'Nombre de lista',create:'Crear',cancel:'Cancelar',close:'Cerrar',del:'Eliminar',save:'Guardar',mc:'Categorías',nc:'Nueva categoría',scT:'Funda compartida',scD:'Una funda para varios artículos',scS:'Seleccionar artículos:',scM:'Selecciona al menos 2 artículos',ei:'Editar artículo',eSc:'Editar funda compartida',rl:'Renombrar lista',n1:'Se necesita al menos una lista',dl:'¿Eliminar esta lista?',cc2:'¿Limpiar toda la lista?',exd:'¡Exportado!',imd:'¡Importado!',svd:'¡Guardado!',ivf:'Archivo inválido',en2:'Introduce un nombre',ew:'Introduce el peso',le:'La lista ya existe',fr:'Para',defCat:['Ropa','Dormir','Cocina','Electrónica','Higiene','Otros']},
  de:{title:'Ausrüstung',addItem:'Ausrüstung hinzufügen',name:'Name',weightG:'Gewicht (g)',weight:'Gewicht',qty:'Anz.',add:'Hinzufügen',hasCover:'Hat Hülle / Tasche',coverName:'Hüllenname',coverWeight:'Hüllengewicht',category:'Kategorie',cats:'Kategorien',sc:'Geteilte Hülle',exp:'Exportieren',imp:'Importieren',clr:'Leeren',share:'Teilen',shareT:'Liste teilen',shareCopied:'Link kopiert!',shareDesc:'Nur Ansicht',tw:'Gesamtgewicht',go:'Ausrüstung',co:'Hüllen / Taschen',ic:'Artikel',ot:'vom Gesamt',cch:'Gewicht nach Kategorie',cvch:'Ausrüstung vs Hüllen',tch:'Schwerste Artikel',gear:'Ausrüstung',covers:'Hüllen',addG:'Ausrüstung hinzufügen',nl:'Neue Liste',ln:'Listenname',create:'Erstellen',cancel:'Abbrechen',close:'Schließen',del:'Löschen',save:'Speichern',mc:'Kategorien',nc:'Neue Kategorie',scT:'Geteilte Hülle',scD:'Eine Hülle für mehrere Artikel',scS:'Artikel auswählen:',scM:'Mindestens 2 Artikel auswählen',ei:'Artikel bearbeiten',eSc:'Geteilte Hülle bearbeiten',rl:'Liste umbenennen',n1:'Mindestens eine Liste erforderlich',dl:'Diese Liste löschen?',cc2:'Gesamte Liste leeren?',exd:'Exportiert!',imd:'Importiert!',svd:'Gespeichert!',ivf:'Ungültige Datei',en2:'Name eingeben',ew:'Gewicht eingeben',le:'Liste existiert bereits',fr:'Für',defCat:['Kleidung','Schlafen','Küche','Elektronik','Hygiene','Sonstiges']},
  fr:{title:'Équipement',addItem:'Ajouter équipement',name:'Nom',weightG:'Poids (g)',weight:'Poids',qty:'Qté',add:'Ajouter',hasCover:'A une housse / étui',coverName:'Nom de la housse',coverWeight:'Poids de la housse',category:'Catégorie',cats:'Catégories',sc:'Housse partagée',exp:'Exporter',imp:'Importer',clr:'Effacer',share:'Partager',shareT:'Partager la liste',shareCopied:'Lien copié!',shareDesc:'Lecture seule',tw:'Poids total',go:'Équipement',co:'Housses / étuis',ic:'Articles',ot:'du total',cch:'Poids par catégorie',cvch:'Équipement vs Housses',tch:'Articles les plus lourds',gear:'Équipement',covers:'Housses',addG:'Ajoutez de l\'équipement',nl:'Nouvelle liste',ln:'Nom de la liste',create:'Créer',cancel:'Annuler',close:'Fermer',del:'Supprimer',save:'Enregistrer',mc:'Catégories',nc:'Nouvelle catégorie',scT:'Housse partagée',scD:'Une housse pour plusieurs articles',scS:'Sélectionner les articles:',scM:'Sélectionnez au moins 2 articles',ei:'Modifier l\'article',eSc:'Modifier la housse partagée',rl:'Renommer la liste',n1:'Au moins une liste requise',dl:'Supprimer cette liste?',cc2:'Effacer toute la liste?',exd:'Exporté!',imd:'Importé!',svd:'Enregistré!',ivf:'Fichier invalide',en2:'Entrez un nom',ew:'Entrez le poids',le:'La liste existe déjà',fr:'Pour',defCat:['Vêtements','Couchage','Cuisine','Électronique','Hygiène','Autre']},
};

let lang = 'en', unit = 'g';
let S = {version:VER,lists:{},activeList:null,categories:[],lang:'en',unit:'g'};
const t = k => T[lang]?.[k] || T.ua[k] || k;
const GL = () => S.activeList && S.lists[S.activeList] ? S.lists[S.activeList] : null;
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);
function fW(g){if(unit==='oz'){const o=g*0.035274;return o>=16?(g*0.00220462).toFixed(2)+' lb':o.toFixed(2)+' oz'}return g>=1000?(g/1000).toFixed(2)+' kg':Math.round(g)+' g'}
function fWB(g){return unit==='oz'?(g*0.00220462).toFixed(2)+' lb':(g/1000).toFixed(2)+' kg'}

function save(){try{S.lang=lang;S.unit=unit;S.version=VER;S.catColors=catColors;S.coverColors=coverColors;localStorage.setItem('gearState',JSON.stringify(S))}catch(e){}}
function migrate(d){if(!d.version||d.version<2){for(const k of Object.keys(d.lists||{})){const l=d.lists[k];if(!l.sharedCovers)l.sharedCovers=[];(l.items||[]).forEach(i=>{if(!i.id)i.id=uid()});}d.version=VER}if(!d.categories||!d.categories.length)d.categories=[...T.en.defCat];for(const k of Object.keys(d.lists||{})){const l=d.lists[k];(l.sharedCovers||[]).forEach(sc=>{if(!sc.id)sc.id=uid();});}return d}
function load(){try{const r=localStorage.getItem('gearState');if(r){S=migrate(JSON.parse(r));lang=S.lang||'en';catColors=S.catColors||{};coverColors=S.coverColors||{};unit=S.unit||'g'}}catch(e){}if(!S.categories||!S.categories.length)S.categories=[...T.en.defCat];if(!Object.keys(S.lists).length){const n='My trip';S.lists[n]={items:[],sharedCovers:[]};S.activeList=n}if(!S.activeList||!S.lists[S.activeList])S.activeList=Object.keys(S.lists)[0];save()}

function toast(m){SFX.notify();const e=document.createElement('div');e.className='toast';e.textContent=m;document.body.appendChild(e);setTimeout(()=>e.remove(),2200)}
function openM(id){SFX.modalOpen();document.getElementById(id).classList.add('open')}
function closeM(id){SFX.modalClose();document.getElementById(id).classList.remove('open')}

let _delCb=null;
function confirmDel(msg, onConfirm){
  _delCb=onConfirm;
  document.getElementById('mDelI').innerHTML=`<h2 style="color:var(--warn)">🗑 Delete?</h2>
<p style="font-size:.88rem;color:var(--text2);margin-bottom:18px">${msg}</p>
<div class="modal-actions">
  <button class="btn" onclick="closeM('mDel')">${t('cancel')}</button>
  <button class="btn danger" onclick="closeM('mDel');if(_delCb){_delCb();_delCb=null;}">${t('del')}</button>
</div>`;
  openM('mDel');
}

function setLang(l){lang=l;R()}
function setUnit(u){SFX.click();unit=u;R()}

function R(){
  const _sy=window.scrollY;
  rLang();rUnit();rAct();rLists();rItems();rStats();rCharts();
  document.getElementById('addBtn').textContent='+ '+t('addItem');
  document.getElementById('pt').textContent=t('title');
  document.getElementById('ct1').textContent=t('cch');
  document.getElementById('ct2').textContent=t('cvch');
  document.getElementById('ct3').textContent=t('tch');
  save();
  requestAnimationFrame(()=>window.scrollTo({top:_sy,behavior:'instant'}));
}

function rLang(){
  const sel=document.getElementById('langSel');
  sel.innerHTML=Object.entries(LANGS).map(([k,v])=>`<option value="${k}" ${k===lang?'selected':''}>${v.flag} ${v.label}</option>`).join('');
}

function rUnit(){
  document.getElementById('unitSw').innerHTML=[['g','g/kg'],['oz','oz/lb']].map(([u,l])=>
    `<button class="${u===unit?'active':''}" onclick="setUnit('${u}')">${l}</button>`
  ).join('');
}

function setSearch(v){
  searchQuery=v.toLowerCase();
  console.log('sq:', JSON.stringify(searchQuery), 'len:', searchQuery.length);
  rItems();
}

function rAct(){
  document.getElementById('actionsBar').innerHTML=[
    `<div class="glow-wrap gw-surface2"><button class="btn" onclick="showCatM()" style="border:none;background:transparent;width:100%;height:100%">${t('cats')}</button></div>`,
    `<div class="glow-wrap gw-surface2"><button class="btn" onclick="showScM()" ${!GL()||!GL().items.length?'disabled style="border:none;background:transparent;width:100%;height:100%;opacity:.4;cursor:not-allowed"':'style="border:none;background:transparent;width:100%;height:100%"'}>${t('sc')}</button></div>`,
    `<div class="glow-wrap gw-surface2"><button class="btn" onclick="expJ()" style="border:none;background:transparent;width:100%;height:100%">${t('exp')}</button></div>`,
    `<div class="glow-wrap gw-surface2"><button class="btn" onclick="document.getElementById('impF').click()" style="border:none;background:transparent;width:100%;height:100%">${t('imp')}</button></div>`,
    `<div class="glow-wrap gw-surface2"><button class="btn" onclick="shareList()" style="border:none;background:transparent;width:100%;height:100%">${t('share')}</button></div>`,
    `<div class="glow-wrap gw-surface2"><button class="btn" onclick="printList()" style="border:none;background:transparent;width:100%;height:100%">PDF</button></div>`,
    `<div class="glow-wrap gw-surface2"><button class="btn danger" onclick="clrL()" style="border:none;background:transparent;width:100%;height:100%">${t('clr')}</button></div>`,
  ].join('');
}

function rLists(){
  const b=document.getElementById('listsBar');let h='';
  for(const n of Object.keys(S.lists)){const a=n===S.activeList?' active':'';h+=`<div class="list-chip${a}" onclick="swL('${esc(n)}')" ondblclick="showRenM('${esc(n)}')">${esc(n)}<span class="x" onclick="event.stopPropagation();delL('${esc(n)}')">✕</span></div>`}
  h+=`<div class="list-chip add" onclick="showListM()">+ ${t('nl')}</div>`;b.innerHTML=h;
}
function swL(n){S.activeList=n;searchQuery='';const sb=document.getElementById('searchBar');if(sb)sb.remove();R()}
function delL(n){if(readOnly)return;if(readOnly)return;if(Object.keys(S.lists).length<=1)return toast(t('n1'));if(!confirm(t('dl')))return;delete S.lists[n];if(S.activeList===n)S.activeList=Object.keys(S.lists)[0];R()}

function showAddM(){
  document.getElementById('mAddI').innerHTML='<h2>'+t('addItem')+'</h2>'+
    '<div class="fg"><div class="fl">'+t('name')+'</div><input class="c-input" id="aN" placeholder="'+t('name')+'" onkeydown="if(event.key===\'Enter\')document.getElementById(\'aW\').focus()"></div>'+
    '<div style="display:flex;gap:10px"><div class="fg" style="flex:1"><div class="fl">'+t('weight')+' ('+(unit==='oz'?'oz':'g')+')</div><input class="c-input" id="aW" type="number" placeholder="0" min="0" onkeydown="if(event.key===\'Enter\')aI()"></div>'+
    '<div class="fg" style="width:80px"><div class="fl">'+t('qty')+'</div><input class="c-input" id="aQ" type="number" placeholder="1" min="1" value="1"></div>'+
    '<div class="fg" style="flex:1"><div class="fl">'+t('category')+'</div><select class="c-select" id="aC" onchange="SFX.select()" style="width:100%">'+S.categories.map(c=>'<option value="'+esc(c)+'">'+esc(c)+'</option>').join('')+'</select></div></div>'+
    '<div class="fg"><div class="fl">Notes</div><textarea class="c-input" id="aNotes" placeholder="Description, link..." rows="2" style="resize:vertical"></textarea></div>'+
    '<div class="fg"><div class="fl">Image URL</div><input class="c-input" id="aImg" placeholder="https://..." oninput="const p=document.getElementById(\'aImgP\');p.src=this.value;p.style.display=this.value?\'block\':\'none\'"></div>'+
    '<div style="margin-top:8px"><img id="aImgP" style="width:100%;max-height:200px;object-fit:contain;border-radius:8px;background:var(--surface2);display:none" onerror="this.style.display=\'none\'"></div>'+
    '<div class="cover-section"><label class="cover-toggle"><span class="c-check cc"><input type="checkbox" id="aHC" onchange="SFX.checkbox();document.getElementById(\'aCF\').style.display=this.checked?\'flex\':\'none\'"><span class="mark"></span></span>'+t('hasCover')+'</label>'+
    '<div class="cover-fields" id="aCF" style="display:none"><input class="c-input" id="aCN" placeholder="'+t('coverName')+'" style="flex:1;min-width:100px"><input class="c-input" id="aCW" type="number" placeholder="'+t('coverWeight')+'" min="0" style="width:110px"></div></div>'+
    '<div class="modal-actions"><button class="btn" onclick="closeM(\'mAdd\')">'+t('cancel')+'</button><button class="btn primary" onclick="aI()">'+t('add')+'</button></div>';
  openM('mAdd');
  setTimeout(function(){var e=document.getElementById('aN');if(e)e.focus()},80);
}

function aI(){
  const l=GL();if(!l)return;
  const name=document.getElementById('aN').value.trim();
  const raw=parseFloat(document.getElementById('aW').value);const w=isNaN(raw)?0:(unit==='oz'?raw*28.3495:raw);
  const q=parseInt(document.getElementById('aQ').value)||1;
  const cat=document.getElementById('aC').value;
  if(!name)return toast(t('en2'));if(w<0||(!w&&w!==0))return toast(t('ew'));SFX.add();
  const item={id:uid(),name,weight:w,qty:q,category:cat,cover:null,notes:document.getElementById('aNotes').value.trim(),imageUrl:document.getElementById('aImg').value.trim()};
  if(document.getElementById('aHC').checked){
    item.cover={name:document.getElementById('aCN').value.trim()||'Cover',weight:(()=>{const v=parseFloat(document.getElementById('aCW').value)||0;return unit==='oz'?v*28.3495:v})(),active:true};
  }
  l.items.push(item);closeM('mAdd');R();
}

function rmI(id){if(readOnly)return;const l=GL();if(!l)return;const i=l.items.find(x=>x.id===id);if(!i)return;confirmDel(`<b>${esc(i.name)}</b>`,()=>{SFX.del();l.items=l.items.filter(x=>x.id!==id);if(l.sharedCovers)l.sharedCovers=l.sharedCovers.map(s=>({...s,itemIds:s.itemIds.filter(x=>x!==id)})).filter(s=>s.itemIds.length>0);R();});}
function tgC(id){if(readOnly)return;SFX.checkbox();const l=GL();if(!l)return;const i=l.items.find(x=>x.id===id);if(i&&i.cover)i.cover.active=!i.cover.active;R()}

function showCoverM(itemId){if(readOnly)return;
  const l=GL();if(!l)return;
  const i=l.items.find(x=>x.id===itemId);if(!i||!i.cover)return;
  document.getElementById('mEditI').innerHTML=`<h2>${t('ei')} cover</h2>
<div class="fg"><div class="fl">${t('coverName')}</div><input class="c-input" id="cvN" value="${esc(i.cover.name)}"></div>
<div class="fg"><div class="fl">${t('coverWeight')}</div><input class="c-input" id="cvW" type="number" min="0" value="${unit==='oz'?(i.cover.weight/28.3495).toFixed(2):i.cover.weight}"></div>
<div class="modal-actions">
  <button class="btn danger" onclick="rmCover('${itemId}');closeM('mEdit')">${t('del')}</button>
  <button class="btn" onclick="closeM('mEdit')">${t('cancel')}</button>
  <button class="btn primary" onclick="saveCover('${itemId}')">${t('save')}</button>
</div>`;
  openM('mEdit');
  setTimeout(()=>document.getElementById('cvN')?.focus(),50);
}

function saveCover(itemId){
  const l=GL();if(!l)return;
  const i=l.items.find(x=>x.id===itemId);if(!i||!i.cover)return;
  i.cover.name=document.getElementById('cvN').value.trim()||'Cover';
  const rawCV=parseFloat(document.getElementById('cvW').value)||0;
  i.cover.weight=unit==='oz'?rawCV*28.3495:rawCV;
  closeM('mEdit');R();toast(t('svd'));
}

function rmCover(itemId){
  const l=GL();if(!l)return;
  const i=l.items.find(x=>x.id===itemId);if(!i||!i.cover)return;
  confirmDel(`<b>${esc(i.cover.name)}</b>`,()=>{closeM('mEdit');i.cover=null;R();});
}

function tgSc(idx){
  if(readOnly)return;
  SFX.checkbox();
  const l=GL();if(!l)return;
  if(l.sharedCovers[idx]){
    l.sharedCovers[idx].active=!l.sharedCovers[idx].active;
  }
  R();
}
function rmSc(idx){if(readOnly)return;const l=GL();if(!l)return;const sc=l.sharedCovers[idx];confirmDel(`<b>${esc(sc.name)}</b>`,()=>{SFX.del();l.sharedCovers.splice(idx,1);R();});}

function rItems(){
  const l=GL(),c=document.getElementById('itemsList');
  const sq=searchQuery.trim();
  const existingSi=document.getElementById('searchInp');
  if(!existingSi){
    const sb=document.createElement('div');
    sb.id='searchBar';
    sb.style.cssText='margin-bottom:12px;position:relative';
    sb.innerHTML=`<input class="c-input" placeholder="🔍 Search..." id="searchInp" style="padding-left:12px" oninput="setSearch(this.value)">`;
    c.parentNode.insertBefore(sb,c);
  }
  const si=document.getElementById('searchInp');
  if(si&&document.activeElement!==si) si.value=sq;
  let clearBtn=document.getElementById('searchClear');
  if(sq&&!clearBtn){
    clearBtn=document.createElement('button');
    clearBtn.id='searchClear';
    clearBtn.style.cssText='position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text3);cursor:pointer;font-size:1rem;line-height:1';
    clearBtn.textContent='✕';
    clearBtn.onclick=()=>{setSearch('');if(si)si.value='';};
    document.getElementById('searchBar').appendChild(clearBtn);
  }else if(!sq&&clearBtn){clearBtn.remove();}

  if(!l||!l.items.length){c.innerHTML=`<div class="empty-state"><div class="icon">🎒</div><p>${t('addG')}</p></div>`;return}
  const gr={};S.categories.forEach(cat=>gr[cat]=[]);
  l.items.forEach(i=>{if(!gr[i.category])gr[i.category]=[];gr[i.category].push(i)});
  let h='';
  let anyFound=false;
  let ci=0;
  for(const cat of S.categories){
    let items=gr[cat];if(!items||!items.length){ci++;continue}
    if(sq) items=items.filter(i=>i.name.toLowerCase().includes(sq));
    if(!items.length){ci++;continue}
    anyFound=true;
    const cw=items.reduce((s,i)=>s+i.weight*i.qty,0);
    h+=`<div class="cat-section"><div class="cat-header"><div class="cat-dot" style="background:${getCatColor(cat)}"></div><h3>${esc(cat)}</h3><span class="cat-w">${fW(cw)}</span></div>`;
    items.forEach(i=>{
      const nameHtml=sq?esc(i.name).replace(new RegExp(`(${esc(sq)})`, 'gi'),'<mark style="background:var(--accent);color:var(--bg);border-radius:2px;padding:0 1px">$1</mark>'):esc(i.name);
      const hasInfo=i.notes||i.imageUrl;
      const infoBtn=hasInfo?`<button class="btn icon ghost" onclick="event.stopPropagation();showItemInfo('${i.id}')" title="Info" style="opacity:.6;font-size:.75rem">📋</button>`:'';
      h+=`<div class="item-row" data-id="${i.id}" data-cat="${esc(i.category)}" onclick="${readOnly?`showItemInfo('${i.id}')`: `showEditM('${i.id}')`}" onmousedown="${readOnly?'': `itemDragStart(event,'${i.id}')`}"><span class="i-name">${nameHtml}</span><span class="i-w">${fW(i.weight*i.qty)}</span><span class="i-q">×${i.qty}</span>${readOnly?infoBtn:`<button class="btn icon ghost btn-del" onclick="event.stopPropagation();rmI('${i.id}')">✕</button>`}</div>`;
      if(i.cover){
        const cvColor = getCoverColor(i.id, 'cv');
        h+=`<div class="cover-row" onclick="${readOnly?'':` showCoverM('${i.id}')`}" style="color:${cvColor}"><span class="c-check cc" onclick="event.stopPropagation()" style="--chk:${cvColor}"><input type="checkbox" ${i.cover.active?'checked':''} ${readOnly?'disabled style="pointer-events:none"':'onchange="tgC(\''+i.id+'\')"'}><span class="mark" style="border-color:${i.cover.active?cvColor:'var(--border)'};background:${i.cover.active?cvColor:'var(--surface2)'}"></span></span><span class="cv-name">↳ ${esc(i.cover.name)}</span><span class="cv-w">${fW(i.cover.weight)}</span></div>`;
      }
      if(l.sharedCovers){
        l.sharedCovers.forEach((sc,idx)=>{
          if(sc.itemIds.includes(i.id)){
            const scColor = getCoverColor(sc.id||sc.itemIds.join('_'), 'sc');
            h+=`<div class="shared-cover-row" onclick="${readOnly?'':` showScM(${idx})`}" style="color:${scColor}"><span class="c-check sc" onclick="event.stopPropagation()"><input type="checkbox" ${sc.active?'checked':''} ${readOnly?'disabled style="pointer-events:none"':'onchange="tgSc('+idx+')"'}><span class="mark" style="border-color:${sc.active?scColor:'var(--border)'};background:${sc.active?scColor:'var(--surface2)'}"></span></span><span class="scv-name">↳ ${esc(sc.name)}</span><span class="scv-w">${fW(sc.weight)}</span></div>`;
          }
        });
      }
    });
    h+='</div>';ci++;
  }
  if(sq&&!anyFound) h+=`<div class="empty-state"><div class="icon">🔍</div><p>Nothing found</p></div>`;
  const scrollY=window.scrollY;
  c.innerHTML=h;
  window.scrollTo({top:scrollY,behavior:'instant'});
}

function cStats(){const l=GL();if(!l)return{total:0,gear:0,covers:0,items:0};let g=0,cv=0,it=0;l.items.forEach(i=>{g+=i.weight*i.qty;it+=i.qty;if(i.cover&&i.cover.active)cv+=i.cover.weight});if(l.sharedCovers)l.sharedCovers.forEach(s=>{if(s.active)cv+=s.weight});return{total:g+cv,gear:g,covers:cv,items:it}}
function rStats(){const s=cStats();document.getElementById('statsBar').innerHTML=`<div class="stat-card accent"><div class="label">${t('tw')}</div><div class="value">${fW(s.total)}</div><div class="sub">${fWB(s.total)}</div></div><div class="stat-card"><div class="label">${t('go')}</div><div class="value">${fW(s.gear)}</div><div class="sub">${fWB(s.gear)}</div></div><div class="stat-card cc"><div class="label">${t('co')}</div><div class="value">${fW(s.covers)}</div><div class="sub">${s.total>0?(s.covers/s.total*100).toFixed(1)+'%':''} ${t('ot')}</div></div><div class="stat-card"><div class="label">${t('ic')}</div><div class="value">${s.items}</div></div>`}

let _c1,_c2,_c3;
function rCharts(){
  const l=GL();Chart.defaults.color='#9aa0ab';Chart.defaults.borderColor='#333945';
  if(_c1)_c1.destroy();const cd={};if(l)l.items.forEach(i=>{cd[i.category]=(cd[i.category]||0)+i.weight*i.qty});
  const cl=Object.keys(cd),cv=Object.values(cd),co=cl.map(x=>getCatColor(x));
  _c1=new Chart(document.getElementById('ch1'),{type:'doughnut',data:{labels:cl,datasets:[{data:cv,backgroundColor:co,borderWidth:0}]},options:{responsive:true,plugins:{legend:{position:'bottom',labels:{padding:10,usePointStyle:true,font:{family:'NunitoSans',size:11}}},tooltip:{callbacks:{label:c=>`${c.label}: ${fW(c.raw)}`}}},cutout:'55%'}});
  if(_c2)_c2.destroy();const s=cStats();
  _c2=new Chart(document.getElementById('ch2'),{type:'bar',data:{labels:[t('gear'),t('covers')],datasets:[{data:[s.gear,s.covers],backgroundColor:['#4ecdc4','#ffd93d'],borderRadius:6,borderWidth:0}]},options:{responsive:true,indexAxis:'y',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>fW(c.raw)}}},scales:{x:{grid:{color:'#22262f'},ticks:{font:{family:'JetBrains Mono',size:11},callback:v=>fW(v)}},y:{grid:{display:false},ticks:{font:{family:'NunitoSans',size:12}}}}}});
  if(_c3)_c3.destroy();let ti=[];if(l)ti=l.items.map(i=>({n:i.name,w:i.weight*i.qty})).sort((a,b)=>b.w-a.w).slice(0,8);
  _c3=new Chart(document.getElementById('ch3'),{type:'bar',data:{labels:ti.map(i=>i.n.length>16?i.n.slice(0,14)+'…':i.n),datasets:[{data:ti.map(i=>i.w),backgroundColor:'#4ecdc480',borderColor:'#4ecdc4',borderWidth:1,borderRadius:4}]},options:{responsive:true,indexAxis:'y',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>fW(c.raw)}}},scales:{x:{grid:{color:'#22262f'},ticks:{font:{family:'JetBrains Mono',size:11},callback:v=>fW(v)}},y:{grid:{display:false},ticks:{font:{family:'NunitoSans',size:11}}}}}});
}

function showListM(){if(readOnly)return;document.getElementById('mListI').innerHTML=`<h2>${t('nl')}</h2><div class="fg"><div class="fl">${t('ln')}</div><input class="c-input" id="nLN" onkeydown="if(event.key==='Enter')crL()"></div><div class="modal-actions"><button class="btn" onclick="closeM('mList')">${t('cancel')}</button><button class="btn primary" onclick="crL()">${t('create')}</button></div>`;openM('mList');setTimeout(()=>document.getElementById('nLN')?.focus(),50)}
function crL(){if(readOnly)return;const n=document.getElementById('nLN').value.trim();if(!n)return;if(S.lists[n])return toast(t('le'));S.lists[n]={items:[],sharedCovers:[]};S.activeList=n;closeM('mList');R()}
function showRenM(n){if(readOnly)return;document.getElementById('mRenI').innerHTML=`<h2>${t('rl')}</h2><div class="fg"><div class="fl">${t('ln')}</div><input class="c-input" id="rLN" value="${esc(n)}" onkeydown="if(event.key==='Enter')renL('${esc(n)}')"></div><div class="modal-actions"><button class="btn" onclick="closeM('mRen')">${t('cancel')}</button><button class="btn primary" onclick="renL('${esc(n)}')">${t('save')}</button></div>`;openM('mRen');setTimeout(()=>{const e=document.getElementById('rLN');e?.focus();e?.select()},50)}
function renL(old){if(readOnly)return;const nw=document.getElementById('rLN').value.trim();if(!nw||nw===old){closeM('mRen');return}if(S.lists[nw])return toast(t('le'));const d=S.lists[old];delete S.lists[old];S.lists[nw]=d;if(S.activeList===old)S.activeList=nw;closeM('mRen');R()}

function showCatM(){if(readOnly)return;rCatM();openM('mCat')}
function rCatM(){
  let h=`<h2>${t('mc')}</h2><div id="clI">`;
  S.categories.forEach((c,i)=>{h+=`<div class="cat-manage-row" data-idx="${i}" style="cursor:grab;user-select:none" onmousedown="catMouseDown(event,${i})"><div class="cat-dot" style="background:${getCatColor(c)}"></div><input class="c-input sm" value="${esc(c)}" onchange="renCat(${i},this.value)" onclick="event.stopPropagation()"><button class="btn sm danger" onclick="rmCat(${i})">✕</button></div>`});
  h+=`</div><div class="form-row" style="margin-top:12px"><input class="c-input" id="nCN" placeholder="${t('nc')}" onkeydown="if(event.key===\'Enter\')addCat()"><button class="btn primary" onclick="addCat()">${t('add')}</button></div><div class="modal-actions"><button class="btn" onclick="closeM(\'mCat\')">${t('close')}</button></div>`;
  document.getElementById('mCatI').innerHTML=h;
}
function addCat(){if(readOnly)return;const n=document.getElementById('nCN').value.trim();if(!n||S.categories.includes(n))return;S.categories.push(n);rCatM();R()}
function renCat(i,v){if(readOnly)return;const o=S.categories[i];S.categories[i]=v;for(const k of Object.keys(S.lists))S.lists[k].items.forEach(x=>{if(x.category===o)x.category=v});R()}
function rmCat(i){if(readOnly)return;confirmDel(`<b>${esc(S.categories[i])}</b>`,()=>{SFX.del();S.categories.splice(i,1);rCatM();R();});}

let _dragIdx = null;
let _dragEl = null;
let _placeholder = null;

function catMouseDown(e, idx) {
  if(e.target.tagName==='INPUT'||e.target.tagName==='BUTTON') return;
  e.preventDefault();
  _dragIdx = idx;
  _dragEl = e.currentTarget;
  _dragEl.style.opacity = '0.4';

  const color = getCatColor(S.categories[idx]);
  _placeholder = document.createElement('div');
  _placeholder.className = 'cat-manage-row';
  _placeholder.dataset.placeholder = '1';
  _placeholder.style.cssText = `border:2px dashed ${color};border-radius:8px;height:${_dragEl.offsetHeight}px;background:${color}22`;
  _dragEl.parentNode.insertBefore(_placeholder, _dragEl.nextSibling);

  document.addEventListener('mousemove', catMouseMove);
  document.addEventListener('mouseup', catMouseUp);
}

function catMouseMove(e) {
  if(!_dragEl) return;
  const rows = [...document.querySelectorAll('.cat-manage-row:not([data-placeholder])')];
  let target = null;
  rows.forEach(row => {
    const rect = row.getBoundingClientRect();
    if(e.clientY > rect.top && e.clientY < rect.bottom) target = row;
  });
  if(target && target !== _dragEl) {
    const mid = target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2;
    if(e.clientY < mid) target.parentNode.insertBefore(_placeholder, target);
    else target.parentNode.insertBefore(_placeholder, target.nextSibling);
  }
}

function catMouseUp() {
  document.removeEventListener('mousemove', catMouseMove);
  document.removeEventListener('mouseup', catMouseUp);
  if(!_dragEl || !_placeholder) return;

  const allChildren = [..._placeholder.parentNode.children];
  const placeholderPos = allChildren.indexOf(_placeholder);
  let insertAt = 0;
  for(let i = 0; i < placeholderPos; i++){
    if(!allChildren[i].dataset.placeholder) insertAt++;
  }

  _dragEl.style.opacity = '';
  _placeholder.remove();

  const finalIdx = insertAt > _dragIdx ? insertAt - 1 : insertAt;
  if(finalIdx !== _dragIdx) {
    const moved = S.categories.splice(_dragIdx, 1)[0];
    S.categories.splice(finalIdx, 0, moved);
    rCatM(); R();
  }

  _dragEl = null;
  _placeholder = null;
  _dragIdx = null;
}

let _itemDragId = null;
let _itemDragEl = null;
let _itemPlaceholder = null;
let _itemDragMoved = false;

function itemDragStart(e, id) {
  if(e.target.tagName==='BUTTON') return;
  _itemDragId = id;
  _itemDragEl = e.currentTarget;
  _itemDragMoved = false;

  const onMove = (ev) => {
    if(!_itemDragMoved) {
      const dx = Math.abs(ev.clientX - e.clientX);
      const dy = Math.abs(ev.clientY - e.clientY);
      if(dx < 4 && dy < 4) return;
      _itemDragMoved = true;
      _itemDragEl.classList.add('dragging');
      _itemPlaceholder = document.createElement('div');
      _itemPlaceholder.className = 'cat-drop-zone';
      _itemPlaceholder.dataset.placeholder = '1';
      _itemDragEl.parentNode.insertBefore(_itemPlaceholder, _itemDragEl.nextSibling);
    }
    itemDragMove(ev);
  };

  const onUp = (ev) => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    if(!_itemDragMoved) { _itemDragId=null; _itemDragEl=null; return; }
    itemDragDrop(ev);
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

function itemDragMove(e) {
  if(!_itemDragEl || !_itemPlaceholder) return;
  const allRows = [...document.querySelectorAll('.item-row:not(.dragging), .cover-row, .shared-cover-row')];
  let best = null, bestY = Infinity;
  allRows.forEach(row => {
    const rect = row.getBoundingClientRect();
    const mid = rect.top + rect.height / 2;
    const dist = Math.abs(e.clientY - mid);
    if(dist < bestY) { bestY = dist; best = row; }
  });
  if(!best) return;

  const catSection = best.closest('.cat-section');
  if(!catSection) return;

  const firstRow = catSection.querySelector('.item-row, .cover-row, .shared-cover-row');
  const rect = best.getBoundingClientRect();
  if(e.clientY < rect.top + rect.height / 2) {
    if(best === firstRow) catSection.querySelector('.cat-header').after(_itemPlaceholder);
    else best.parentNode.insertBefore(_itemPlaceholder, best);
  } else {
    best.parentNode.insertBefore(_itemPlaceholder, best.nextSibling);
  }
}

function itemDragDrop(e) {
  if(!_itemPlaceholder) return;
  const l = GL(); if(!l) return;

  const catSection = _itemPlaceholder.closest('.cat-section');
  const newCat = catSection ? catSection.querySelector('.cat-header h3')?.textContent : null;

  const allPlaceholderSiblings = [..._itemPlaceholder.parentNode.children];
  const placeholderIdx = allPlaceholderSiblings.indexOf(_itemPlaceholder);
  let insertBeforeId = null;
  for(let i = placeholderIdx + 1; i < allPlaceholderSiblings.length; i++) {
    const id = allPlaceholderSiblings[i].dataset?.id;
    if(id && id !== _itemDragId) { insertBeforeId = id; break; }
  }

  _itemDragEl.classList.remove('dragging');
  _itemPlaceholder.remove();

  if(newCat) {
    const item = l.items.find(x => x.id === _itemDragId);
    if(item) {
      item.category = newCat;
      l.items = l.items.filter(x => x.id !== _itemDragId);
      if(insertBeforeId) {
        const idx = l.items.findIndex(x => x.id === insertBeforeId);
        l.items.splice(idx, 0, item);
      } else {
        l.items.push(item);
      }
    }
    R();
  }

  _itemDragId = null;
  _itemDragEl = null;
  _itemPlaceholder = null;
  _itemDragMoved = false;
}

function showScM(editIdx){if(readOnly)return;
  const l=GL();if(!l||!l.items.length)return toast(t('en2'));
  const isE=editIdx!==undefined;const sc=isE?l.sharedCovers[editIdx]:null;
  const gr={};S.categories.forEach(c=>gr[c]=[]);l.items.forEach(i=>{if(!gr[i.category])gr[i.category]=[];gr[i.category].push(i)});
  let ih='';for(const cat of S.categories){const items=gr[cat];if(!items||!items.length)continue;const ci=S.categories.indexOf(cat);
    ih+=`<div class="sc-cat-group"><div class="sc-cat-title"><div class="cat-dot" style="background:${getCatColor(cat)}"></div>${esc(cat)}</div><div class="sc-items-grid">`;
    items.forEach(i=>{const sel=sc&&sc.itemIds.includes(i.id)?' sel':'';ih+=`<div class="sc-item-chip${sel}" data-id="${i.id}" onclick="SFX.select();this.classList.toggle('sel')">${esc(i.name)} <span style="opacity:.5;font-size:.72rem">${fW(i.weight)}</span></div>`});
    ih+='</div></div>';
  }
  document.getElementById('mScI').innerHTML=`<h2>${t(isE?'eSc':'scT')}</h2><p style="font-size:.82rem;color:var(--text2);margin-bottom:14px">${t('scD')}</p>
<div class="fg"><div class="fl">${t('name')}</div><input class="c-input" id="scN" value="${sc?esc(sc.name):''}"></div>
<div class="fg"><div class="fl">${t('coverWeight')}</div><input class="c-input" id="scW" type="number" min="0" value="${sc?(unit==='oz'?(sc.weight/28.3495).toFixed(2):sc.weight):''}"></div>
<div class="fl" style="margin:12px 0 8px">${t('scS')}</div><div id="scIA">${ih}</div>
<div class="modal-actions">${isE?`<button class="btn danger" onclick="rmSc(${editIdx});closeM('mSc')">${t('del')}</button>`:''}<button class="btn" onclick="closeM('mSc')">${t('cancel')}</button><button class="btn primary" onclick="${isE?`saveSc(${editIdx})`:'addSc()'}">${t('save')}</button></div>`;
  openM('mSc');
}
function addSc(){if(readOnly)return;const l=GL();if(!l)return;const n=document.getElementById('scN').value.trim()||t('sc');const rawSW=parseFloat(document.getElementById('scW').value)||0;const w=unit==='oz'?rawSW*28.3495:rawSW;const ids=[...document.querySelectorAll('#scIA .sc-item-chip.sel')].map(e=>e.dataset.id);if(ids.length<2)return toast(t('scM'));if(!l.sharedCovers)l.sharedCovers=[];l.sharedCovers.push({id:uid(),name:n,weight:w,itemIds:ids,active:true});closeM('mSc');R()}
function saveSc(idx){if(readOnly)return;const l=GL();if(!l)return;const n=document.getElementById('scN').value.trim()||t('sc');const rawSW=parseFloat(document.getElementById('scW').value)||0;const w=unit==='oz'?rawSW*28.3495:rawSW;const ids=[...document.querySelectorAll('#scIA .sc-item-chip.sel')].map(e=>e.dataset.id);if(ids.length<2)return toast(t('scM'));l.sharedCovers[idx]={...l.sharedCovers[idx],name:n,weight:w,itemIds:ids};closeM('mSc');R();toast(t('svd'))}

function showItemInfo(id){
  const l=GL();if(!l)return;const i=l.items.find(x=>x.id===id);if(!i)return;
  const img=i.imageUrl?`<img src="${esc(i.imageUrl)}" alt="" style="width:100%;border-radius:8px;margin-bottom:12px;max-height:280px;object-fit:contain;background:var(--surface2)" onerror="this.style.display='none'">`:'' ;
  const notes=i.notes?`<p style="font-size:.88rem;color:var(--text2);white-space:pre-wrap;margin-bottom:12px">${esc(i.notes)}</p>`:'';
  const meta=`<p style="font-size:.82rem;color:var(--text3);margin-bottom:12px">${fW(i.weight*i.qty)} &nbsp;×${i.qty} &nbsp;<span style="color:${getCatColor(i.category)}">${esc(i.category)}</span></p>`;
  document.getElementById('mEditI').innerHTML=`<h2>${esc(i.name)}</h2>${meta}${img}${notes}
<div class="modal-actions"><button class="btn" onclick="closeM('mEdit')">${t('close')}</button></div>`;
  openM('mEdit');
}

function showEditM(id){if(readOnly)return;
  const l=GL();if(!l)return;const i=l.items.find(x=>x.id===id);if(!i)return;const hc=i.cover!==null;
  document.getElementById('mEditI').innerHTML=`<h2>${t('ei')}</h2>
<div class="fg"><div class="fl">${t('name')}</div><input class="c-input" id="eN" value="${esc(i.name)}"></div>
<div class="fg"><div class="fl">${t('weight')} (${unit==='oz'?'oz':'g'})</div><input class="c-input" id="eW" type="number" min="0" value="${unit==='oz'?(i.weight/28.3495).toFixed(2):i.weight}"></div>
<div style="display:flex;gap:12px"><div class="fg" style="flex:1"><div class="fl">${t('qty')}</div><input class="c-input" id="eQ" type="number" min="1" value="${i.qty}"></div>
<div class="fg" style="flex:2"><div class="fl">${t('category')}</div><select class="c-select" id="eC" onchange="SFX.select()" style="width:100%">${S.categories.map(c=>`<option value="${esc(c)}"${c===i.category?' selected':''}>${esc(c)}</option>`).join('')}</select></div></div>
<div class="fg"><div class="fl">Notes</div><textarea class="c-input" id="eNotes" rows="2" style="resize:vertical">${esc(i.notes||'')}</textarea></div>
<div class="fg"><div class="fl">Image URL</div><input class="c-input" id="eImg" placeholder="https://..." value="${esc(i.imageUrl||'')}" oninput="const p=document.getElementById('eImgP');p.src=this.value;p.style.display=this.value?'block':'none'"></div>
<div style="margin-top:8px"><img id="eImgP" src="${esc(i.imageUrl||'')}" style="width:100%;max-height:200px;object-fit:contain;border-radius:8px;background:var(--surface2);display:${i.imageUrl?'block':'none'}" onerror="this.style.display='none'"></div>
<div class="cover-section" style="margin-top:8px"><label class="cover-toggle"><span class="c-check cc"><input type="checkbox" id="eHC" ${hc?'checked':''} onchange="document.getElementById('eCF').style.display=this.checked?'flex':'none'"><span class="mark"></span></span>${t('hasCover')}</label>
<div class="cover-fields" id="eCF" style="display:${hc?'flex':'none'}"><input class="c-input" id="eCN" placeholder="${t('coverName')}" value="${hc?esc(i.cover.name):''}" style="flex:1;min-width:100px"><input class="c-input" id="eCW" type="number" min="0" placeholder="${t('coverWeight')}" value="${hc?(unit==='oz'?(i.cover.weight/28.3495).toFixed(2):i.cover.weight):''}" style="width:110px"></div></div>
<div class="modal-actions"><button class="btn danger" onclick="rmI('${id}');closeM('mEdit')">${t('del')}</button><button class="btn" onclick="closeM('mEdit')">${t('cancel')}</button><button class="btn primary" onclick="saveEI('${id}')">${t('save')}</button></div>`;
  openM('mEdit');setTimeout(()=>document.getElementById('eN')?.focus(),50);
}
function saveEI(id){const l=GL();if(!l)return;const i=l.items.find(x=>x.id===id);if(!i)return;
  i.name=document.getElementById('eN').value.trim()||i.name;const rawW=parseFloat(document.getElementById('eW').value);i.weight=rawW!=null&&!isNaN(rawW)?(unit==='oz'?rawW*28.3495:rawW):i.weight;i.qty=parseInt(document.getElementById('eQ').value)||1;i.category=document.getElementById('eC').value;
  i.notes=document.getElementById('eNotes').value.trim();
  i.imageUrl=document.getElementById('eImg').value.trim();
  if(document.getElementById('eHC').checked){const rawCW=parseFloat(document.getElementById('eCW').value)||0;i.cover={name:document.getElementById('eCN').value.trim()||'Cover',weight:unit==='oz'?rawCW*28.3495:rawCW,active:i.cover?i.cover.active:true}}else{i.cover=null}
  closeM('mEdit');R();toast(t('svd'));
}

function printList(){
  const l=GL();if(!l)return;
  const s=cStats();

  // Group items by category
  const gr={};
  S.categories.forEach(c=>gr[c]=[]);
  l.items.forEach(i=>{if(!gr[i.category])gr[i.category]=[];gr[i.category].push(i)});

  // Build category colors as hex for print
  const catColorMap={};
  S.categories.forEach(c=>catColorMap[c]=getCatColor(c));

  let rows='';
  for(const cat of S.categories){
    const items=gr[cat];if(!items||!items.length)continue;
    const cw=items.reduce((s,i)=>s+i.weight*i.qty+(i.cover&&i.cover.active?i.cover.weight:0),0);
    const scW=l.sharedCovers?l.sharedCovers.filter(sc=>sc.active&&sc.itemIds.some(id=>items.find(i=>i.id===id))).reduce((s,sc)=>s+sc.weight,0):0;
    rows+=`<tr class="cat-row"><td colspan="4" style="padding-left:10px"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${catColorMap[cat]};margin-right:7px;vertical-align:middle"></span><b>${cat}</b></td><td><b>${fW(cw+scW)}</b></td></tr>`;
    items.forEach(i=>{
      const covRows=[];
      if(i.cover&&i.cover.active)covRows.push(`<div style="color:#888;font-size:8.5pt;margin-top:2px">↳ ${i.cover.name} &nbsp;<span style="font-family:monospace">${fW(i.cover.weight)}</span></div>`);
      if(l.sharedCovers)l.sharedCovers.filter(sc=>sc.active&&sc.itemIds.includes(i.id)).forEach(sc=>{
        covRows.push(`<div style="color:#888;font-size:8.5pt;margin-top:2px">↳ ${sc.name} (shared) &nbsp;<span style="font-family:monospace">${fW(sc.weight)}</span></div>`);
      });
      const notesHtml=i.notes?`<div style="color:#888;font-size:8pt;font-style:italic;margin-top:2px">${i.notes}</div>`:'';
      rows+=`<tr>
        <td style="padding-left:18px">${i.name}${notesHtml}${covRows.join('')}</td>
        <td style="font-family:monospace;white-space:nowrap">${fW(i.weight)}</td>
        <td style="text-align:center">×${i.qty}</td>
        <td></td>
        <td style="font-family:monospace;white-space:nowrap;text-align:right">${fW(i.weight*i.qty)}</td>
      </tr>`;
    });
  }

  const catBars=S.categories.map(c=>{
    const w=l.items.filter(i=>i.category===c).reduce((s,i)=>s+i.weight*i.qty,0);
    const pct=s.total>0?Math.round(w/s.total*100):0;
    if(!pct)return'';
    return`<div style="margin-bottom:5px"><div style="display:flex;justify-content:space-between;font-size:8.5pt;margin-bottom:2px"><span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${catColorMap[c]};margin-right:5px;vertical-align:middle"></span>${c}</span><span style="font-family:monospace">${fW(w)} &nbsp;${pct}%</span></div><div style="height:6px;background:#eee;border-radius:3px"><div style="height:100%;width:${pct}%;background:${catColorMap[c]};border-radius:3px"></div></div></div>`;
  }).join('');

  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>${S.activeList} — Gear Weight</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10.5pt;color:#111;background:#fff}
.page{max-width:800px;margin:0 auto;padding:20mm 18mm}
h1{font-size:20pt;font-weight:800;letter-spacing:-.02em;margin-bottom:1mm}
.sub{font-size:8.5pt;color:#888;margin-bottom:7mm;letter-spacing:.02em}
.summary{display:flex;gap:5mm;margin-bottom:8mm}
.card{flex:1;border:1.5px solid #e0e0e0;border-radius:6px;padding:4mm 5mm}
.card .lbl{font-size:7.5pt;text-transform:uppercase;letter-spacing:.07em;color:#aaa;margin-bottom:1mm}
.card .val{font-size:15pt;font-weight:800;font-family:monospace;color:#111}
.card.accent{border-color:#0d9488;background:#f0fdfa}
.card.accent .val{color:#0d9488}
.bars{flex:2;border:1.5px solid #e0e0e0;border-radius:6px;padding:4mm 5mm}
.bars .lbl{font-size:7.5pt;text-transform:uppercase;letter-spacing:.07em;color:#aaa;margin-bottom:3mm}
table{width:100%;border-collapse:collapse}
thead th{background:#f5f5f5;font-size:8pt;text-transform:uppercase;letter-spacing:.05em;padding:4px 8px;border-bottom:2px solid #ddd;text-align:left;color:#666}
thead th:last-child{text-align:right}
tbody td{padding:4px 8px;border-bottom:1px solid #f0f0f0;vertical-align:top;font-size:10pt}
tbody td:last-child{text-align:right}
tr.cat-row td{background:#fafafa;font-size:10pt;padding:6px 8px;border-top:1.5px solid #ddd;border-bottom:1.5px solid #ddd}
.footer{margin-top:8mm;font-size:7.5pt;color:#bbb;text-align:center;border-top:1px solid #eee;padding-top:4mm}
@media print{.page{padding:8mm}@page{margin:6mm;size:A4}}
</style></head>
<body><div class="page">
<h1>${S.activeList}</h1>
<div class="sub">${new Date().toLocaleDateString()} &nbsp;·&nbsp; ${s.items} items &nbsp;·&nbsp; backpacking-calculator.netlify.app</div>
<div class="summary">
  <div class="card accent"><div class="lbl">Total</div><div class="val">${fW(s.total)}</div></div>
  <div class="card"><div class="lbl">Gear</div><div class="val">${fW(s.gear)}</div></div>
  <div class="card"><div class="lbl">Covers</div><div class="val">${fW(s.covers)}</div></div>
  <div class="bars"><div class="lbl">By category</div>${catBars}</div>
</div>
<table>
<thead><tr><th>Name</th><th>Weight</th><th style="text-align:center">Qty</th><th></th><th>Total</th></tr></thead>
<tbody>${rows}</tbody>
</table>
<div class="footer">Generated with Gear Weight Calculator · backpacking-calculator.netlify.app</div>
</div></body></html>`;

  const w=window.open('','_blank','width=900,height=700');
  if(!w){toast('Allow popups to print');return;}
  w.document.write(html);
  w.document.close();
  w.addEventListener('load',()=>{w.focus();w.print();});
}

function expJ(){const b=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`gear-${(S.activeList||'export').replace(/\s/g,'_')}-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href);toast(t('exd'))}
document.getElementById('impF').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{let d=JSON.parse(ev.target.result);if(!d.lists)return toast(t('ivf'));S=migrate(d);lang=S.lang||'ua';unit=S.unit||'g';R();toast(t('imd'))}catch(err){toast(t('ivf'))}};r.readAsText(f);e.target.value=''});
function clrL(){if(readOnly)return;const l=GL();if(!l)return;if(!confirm(t('cc2')))return;l.items=[];l.sharedCovers=[];R()}

function shareList(){
  const l=GL();if(!l)return;
  const encItem=i=>[i.id,i.name,Math.round(i.weight),i.qty,i.category,
    i.cover?[i.cover.name,Math.round(i.cover.weight),i.cover.active?1:0]:0,
    i.notes||'',i.imageUrl||''];
  const encSc=sc=>[sc.name,Math.round(sc.weight),sc.itemIds,sc.active?1:0,sc.id||''];
  const data=[
    S.activeList,
    S.categories,
    l.items.map(encItem),
    (l.sharedCovers||[]).map(encSc),
    lang,unit
  ];
  const compressed=LZString.compressToEncodedURIComponent(JSON.stringify(data));
  const url=location.origin+location.pathname+'?share='+compressed;
  navigator.clipboard.writeText(url).then(()=>toast('Link copied!')).catch(()=>prompt('Copy link:',url));
}

let readOnly=false;
let searchQuery='';

function initShareMode(){
  const compressed=new URLSearchParams(location.search).get('share');
  if(!compressed)return;
  try{
    const data=JSON.parse(LZString.decompressFromEncodedURIComponent(compressed));
    if(!data)throw new Error('decompress failed');
    const [listName,categories,items,scs,ln,un]=data;
    const decItem=a=>({id:a[0],name:a[1],weight:a[2],qty:a[3],category:a[4],cover:a[5]?{name:a[5][0],weight:a[5][1],active:!!a[5][2]}:null,notes:a[6]||'',imageUrl:a[7]||''});
    const decSc=a=>({name:a[0],weight:a[1],itemIds:a[2],active:!!a[3],id:a[4]||uid()});
    const decItems=items.map(decItem);
    const decScs=scs.map(decSc);
    readOnly=true;lang=ln||'en';unit=un||'g';
    S.categories=categories||[];
    S.lists={[listName]:{items:decItems,sharedCovers:decScs}};
    S.activeList=listName;
    setTimeout(()=>{
      const banner=document.createElement('div');
      banner.style.cssText='position:fixed;top:0;left:0;right:0;background:linear-gradient(135deg,var(--accent),#45b7aa);color:var(--bg);text-align:center;padding:8px;font-size:.82rem;font-weight:700;z-index:300';
      banner.textContent='👁 Read-only — '+listName;
      document.body.prepend(banner);
      document.getElementById('addBtn').style.display='none';
      document.getElementById('actionsBar').style.display='none';
    },100);
  }catch(e){console.error(e)}
}

load();initShareMode();R();