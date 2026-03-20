/* ═══════════════════════════════════════════
   AL BASÎRAH — SHARED DATA & UTILITIES
═══════════════════════════════════════════ */

// ── SUPABASE ──
const SUPA_URL = 'https://mutdtyifvcrkiouudwhr.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11dGR0eWlmdmNya2lvdXVkd2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5ODEwODcsImV4cCI6MjA4OTU1NzA4N30.l08pEalpQ50QN4xVuDp5hyan7hwXprHOeCo0nrCA4vU';

let DB = null;
function getDB() {
  if (!DB && window.supabase) DB = window.supabase.createClient(SUPA_URL, SUPA_KEY);
  return DB;
}

// ── SCHOLARS ──
const SCHOLARS = [
  { id:'ibn-baz',     init:'ا', name_ar:'الشيخ ابن باز',           name_fr:"Cheikh 'Abd Al-'Aziz Ibn Bâz",       country:'Arabie Saoudite', era:'1910–1999', cat:'contemporain', tags:['Aqida','Tawhid','Fiqh'],   books:80,  audios:420, videos:180, live:false },
  { id:'ibn-uthaymin',init:'ع', name_ar:'الشيخ ابن عثيمين',         name_fr:"Cheikh Muhammad Ibn 'Outhaymine",    country:'Arabie Saoudite', era:'1929–2001', cat:'contemporain', tags:['Fiqh','Aqida'],            books:95,  audios:620, videos:210, live:false },
  { id:'albani',      init:'ن', name_ar:'الشيخ الألباني',            name_fr:'Cheikh Al-Albâni',                    country:'Syrie / Albanie', era:'1914–1999', cat:'hadith',       tags:['Hadith','Manhaj'],         books:60,  audios:390, videos:95,  live:false },
  { id:'fawzan',      init:'ص', name_ar:'الشيخ صالح الفوزان',        name_fr:'Cheikh Sâlih Al-Fawzân',             country:'Arabie Saoudite', era:'1933–',     cat:'contemporain', tags:['Fiqh','Aqida','Manhaj'],   books:70,  audios:340, videos:160, live:true  },
  { id:'rabi',        init:'ر', name_ar:'الشيخ ربيع المدخلي',        name_fr:"Cheikh Rabî' Al-Madkhali",           country:'Arabie Saoudite', era:'1931–',     cat:'contemporain', tags:['Manhaj','Jarh'],           books:45,  audios:270, videos:120, live:false },
  { id:'muqbil',      init:'م', name_ar:'الشيخ مقبل الوادعي',        name_fr:"Cheikh Mouqbil Al-Wâdi'î",           country:'Yémen',           era:'1933–2001', cat:'hadith',       tags:['Hadith','Manhaj'],         books:28,  audios:180, videos:60,  live:false },
  { id:'ibn-taymiyya',init:'ا', name_ar:'شيخ الإسلام ابن تيمية',     name_fr:'Ibn Taymiyya',                        country:'Syrie',           era:'661–728 H', cat:'ancien',       tags:['Aqida','Fiqh'],            books:52,  audios:0,   videos:8,   live:false },
  { id:'ibn-qayyim',  init:'ا', name_ar:'ابن القيم الجوزية',          name_fr:'Ibn Al-Qayyim',                       country:'Syrie',           era:'691–751 H', cat:'ancien',       tags:['Aqida','Tazkiya'],         books:38,  audios:0,   videos:5,   live:false },
  { id:'nawawi',      init:'ن', name_ar:'الإمام النووي',              name_fr:'Imam An-Nawawi',                      country:'Syrie',           era:'631–676 H', cat:'hadith',       tags:['Hadith','Fiqh'],           books:30,  audios:0,   videos:4,   live:false },
  { id:'bukhari',     init:'ب', name_ar:'الإمام البخاري',             name_fr:'Imam Al-Bukhâri',                     country:'Boukhara',        era:'194–256 H', cat:'rapporteur',   tags:['Hadith','Sahih'],          books:15,  audios:0,   videos:2,   live:false },
  { id:'muslim',      init:'م', name_ar:'الإمام مسلم',               name_fr:'Imam Muslim',                         country:'Iran',            era:'204–261 H', cat:'rapporteur',   tags:['Hadith','Sahih'],          books:8,   audios:0,   videos:2,   live:false },
  { id:'abu-dawud',   init:'د', name_ar:'أبو داود',                  name_fr:'Abû Dawûd',                           country:'Iran',            era:'202–275 H', cat:'rapporteur',   tags:['Hadith','Sunan'],          books:12,  audios:0,   videos:1,   live:false },
];

const SCHOLAR_BIOS = {
  'ibn-baz': "Cheikh Ibn Bâz est l'un des plus grands savants du XXème siècle. Né en 1910 à Riyad, il perdit la vue à 18 ans mais continua ses études avec ardeur. Grand Mufti d'Arabie Saoudite de 1993 jusqu'à sa mort en 1999, son héritage scientifique est immense.",
  'ibn-uthaymin': "Cheikh Ibn 'Outhaymine, né en 1929 à 'Ounayzah, est reconnu comme l'un des plus grands fuqahâ du siècle. Élève de Cheikh Ibn Bâz, il a laissé plus de 80 ouvrages et des milliers d'heures d'enseignement.",
  'albani': "Cheikh Al-Albâni, né en 1914 en Albanie, est le plus grand spécialiste des sciences du hadîth du XXème siècle. Autodidacte, il consacra sa vie à l'authentification des hadiths.",
  'fawzan': "Cheikh Al-Fawzân, membre du Conseil des Grands Savants d'Arabie Saoudite, est l'un des savants les plus actifs de notre époque. Ses ouvrages sur la Fiqh et l'Aqida sont utilisés dans de nombreuses universités.",
  'rabi': "Cheikh Rabî' Al-Madkhali, professeur à l'Université Islamique de Médine, est spécialiste du jarh wa-ta'dîl et référence incontournable du manhaj salafi contemporain.",
  'muqbil': "Cheikh Mouqbil Al-Wâdi'î, fondateur de Dâr Al-Hadîth à Dammâj (Yémen), forma des milliers d'étudiants du monde entier. Son école est une référence pour l'enseignement du hadîth.",
  'ibn-taymiyya': "Ibn Taymiyya (661–728H), Cheikh Al-Islam, est l'une des plus grandes figures de l'Islam. Ses écrits en Aqida, Fiqh et réfutation des innovations font référence jusqu'à aujourd'hui.",
  'ibn-qayyim': "Ibn Al-Qayyim (691–751H), élève d'Ibn Taymiyya, est l'auteur de nombreux chefs-d'œuvre en spiritualité, Aqida et science du cœur.",
  'nawawi': "L'Imam An-Nawawi (631–676H), auteur de Riyâd As-Sâlihîn et des 40 Hadiths, est l'une des plus grandes références en Hadith et Fiqh shafiite.",
  'bukhari': "L'Imam Al-Bukhâri (194–256H), auteur du Sahîh Al-Bukhâri, a parcouru le monde islamique 16 ans pour compiler les hadiths les plus authentiques.",
  'muslim': "L'Imam Muslim (204–261H), auteur du Sahîh Muslim, est l'un des plus grands maîtres du hadîth de l'Islam classique.",
  'abu-dawud': "Abû Dawûd (202–275H), auteur du Sunan, est l'une des six références canoniques du hadîth en Islam sunnite.",
};

const SCHOLAR_CONTENT = {
  'fawzan': {
    books: [
      {id:1, title:'Al-Mulakhkhas Al-Fiqhi', cat:'Fiqh',    pages:620, dl:28000, emoji:'📗', desc:'Précis de jurisprudence islamique en 2 volumes.'},
      {id:2, title:"I'ânat Al-Mustafîd bi-Sharh Kitâb At-Tawhîd", cat:'Tawhid', pages:380, dl:19400, emoji:'📘', desc:"Explication du Livre du Tawhid.", isnew:true},
      {id:3, title:"Al-'Aqida fi Allah", cat:'Aqida', pages:140, dl:12600, emoji:'📙', desc:'La croyance en Allah : attributs et noms.'},
      {id:4, title:'At-Tawhid wa Ahkâmuhu', cat:'Tawhid', pages:96, dl:9800, emoji:'📗', desc:'Les catégories du Tawhid et leurs implications pratiques.'},
    ],
    audios: [
      {id:101, title:"Sharh Al-'Aqida Al-Wâsitiyya", cat:'Aqida',  eps:28, dur:'21h',  plays:11800, emoji:'🎧'},
      {id:102, title:'Explication du Kitâb At-Tawhid', cat:'Tawhid',eps:18, dur:'14h',  plays:9400,  emoji:'🎙️'},
      {id:103, title:'At-Tawhid wa Ahkâmuhu — cours', cat:'Tawhid', eps:15, dur:'10h',  plays:7200,  emoji:'📻'},
      {id:104, title:'Questions-réponses en Fiqh',    cat:'Fiqh',   eps:40, dur:'28h',  plays:6800,  emoji:'🎧'},
    ],
    videos: [
      {id:201, title:'Les conditions de la Shahada',    cat:'Aqida',   dur:'1h 24min', views:22100, emoji:'🎬'},
      {id:202, title:'Le manhaj salafi — conférence',   cat:'Manhaj',  dur:'1h 40min', views:17200, emoji:'📹'},
      {id:203, title:'Éduquer ses enfants en Islam',    cat:'Famille', dur:'1h 55min', views:24500, emoji:'🎥'},
      {id:204, title:'Les piliers de la foi islamique', cat:'Aqida',   dur:'52min',    views:13800, emoji:'🎬'},
    ],
  },
  'ibn-baz': {
    books: [
      {id:1, title:'Majmû Fatâwâ Ibn Bâz (30 vol.)',     cat:'Fatwas', pages:8500, dl:32000, emoji:'📗', desc:'Recueil complet des fatâwas du Cheikh en 30 volumes.'},
      {id:2, title:'Wujûb Al-Amal bi-Sunnat Ar-Rasul',   cat:'Aqida',  pages:64,   dl:11800, emoji:'📘', desc:"L'obligation d'agir selon la Sounna.", isnew:true},
      {id:3, title:'Masâil Al-Hajj wa-l-Umra',           cat:'Fiqh',   pages:180,  dl:14200, emoji:'📙', desc:'Les règles du Hajj et de la Umra.'},
    ],
    audios: [
      {id:101, title:'Explication du Livre du Tawhid',  cat:'Tawhid', eps:48, dur:'32h', plays:18200, emoji:'🎙️'},
      {id:102, title:'Sharh Al-Aqida Al-Wasitiyya',     cat:'Aqida',  eps:35, dur:'28h', plays:14600, emoji:'🎧'},
      {id:103, title:'Fatâwâ Nur ala Ad-Darb',          cat:'Fatwas', eps:120,dur:'80h', plays:22400, emoji:'📻'},
    ],
    videos: [
      {id:201, title:'Le statut de la prière en Islam', cat:'Fiqh',  dur:'45min',  views:31200, emoji:'🎬'},
      {id:202, title:'Questions-Réponses sur l'Aqida', cat:'Aqida', dur:'58min',  views:9400,  emoji:'📹'},
      {id:203, title:'Les signes de la fin des temps',  cat:'Aqida', dur:'1h 12min',views:24600, emoji:'🎥'},
    ],
  },
};

function getScholarContent(id) {
  return SCHOLAR_CONTENT[id] || {
    books:  [{id:1, title:'Recueil des œuvres complètes', cat:'Divers', pages:800, dl:5000, emoji:'📗', desc:'Œuvres complètes du savant.'}],
    audios: [{id:101, title:'Série de cours — Aqida', cat:'Aqida', eps:20, dur:'15h', plays:4000, emoji:'🎧'}],
    videos: [{id:201, title:'Conférence principale', cat:'Cours', dur:'1h 15min', views:6000, emoji:'🎬'}],
  };
}

const BOOKS_DATA = [
  {id:1,  title:'Kitâb At-Tawhid',              author:"Ibn Abd Al-Wahhâb",    cat:'Aqida',   pages:120, dl:22500, emoji:'📗', desc:'Le livre fondamental du monothéisme islamique.'},
  {id:2,  title:'Al-Aqida Al-Wasitiyya',         author:'Ibn Taymiyya',         cat:'Aqida',   pages:92,  dl:14600, emoji:'📘', desc:'Traité fondamental sur les attributs divins.'},
  {id:3,  title:'Riyad As-Salihîn',              author:'An-Nawawi',            cat:'Hadith',  pages:580, dl:21000, emoji:'📙', desc:'Jardins des vertueux — recueil de hadiths.'},
  {id:4,  title:'Bulûgh Al-Marâm',               author:'Ibn Hajar',            cat:'Hadith',  pages:410, dl:11200, emoji:'📗', desc:'Hadiths relatifs aux règles de fiqh.'},
  {id:5,  title:'Al-Mulakhkhas Al-Fiqhi',        author:'Al-Fawzân',            cat:'Fiqh',    pages:620, dl:28000, emoji:'📘', desc:'Précis complet de jurisprudence islamique.'},
  {id:6,  title:'Zaâd Al-Mustaqni',              author:'Al-Hajjâwi',           cat:'Fiqh',    pages:218, dl:9220,  emoji:'📙', desc:'Viatique du désirant — fiqh hanbalite.'},
  {id:7,  title:'Mukhtasar Al-Bukhâri',          author:'Az-Zubaydi',           cat:'Hadith',  pages:350, dl:8600,  emoji:'📗', desc:'Abrégé du Sahîh Al-Bukhâri.'},
  {id:8,  title:'Al-Adâb Al-Mufrad',             author:'Al-Bukhâri',           cat:'Hadith',  pages:220, dl:8900,  emoji:'📘', desc:'Recueil sur les bonnes mœurs islamiques.'},
  {id:9,  title:'Arbaûn Hadîthan An-Nawawi',     author:'An-Nawawi',            cat:'Hadith',  pages:96,  dl:16400, emoji:'📙', desc:'Les 40 hadiths fondamentaux de l'Islam.'},
  {id:10, title:'At-Tawhid wa Ahkâmuhu',         author:'Al-Fawzân',            cat:'Tawhid',  pages:96,  dl:9800,  emoji:'📗', desc:'Les catégories du Tawhid.', isnew:true},
  {id:11, title:"Wujûb Al-Amal bi-Sunnat",       author:'Ibn Bâz',              cat:'Aqida',   pages:64,  dl:11800, emoji:'📘', desc:"L'obligation d'agir selon la Sounna."},
  {id:12, title:'Lumière sur la voie des Salaf', author:'Rabî Al-Madkhali',     cat:'Manhaj',  pages:156, dl:7140,  emoji:'📙', desc:'Fondements du manhaj salafi.', isnew:true},
];

const AUDIOS_DATA = [
  {id:101, title:'Explication du Kitâb At-Tawhid',    author:'Cheikh Ibn Bâz',           cat:'Tawhid',  eps:48, dur:'32h', plays:18200, emoji:'🎙️'},
  {id:102, title:"Sharh Al-Aqida Al-Wasitiyya",        author:"Cheikh Ibn 'Outhaymine",   cat:'Aqida',   eps:35, dur:'28h', plays:14600, emoji:'🎧'},
  {id:103, title:'Fatâwâ Nur ala Ad-Darb',             author:'Cheikh Ibn Bâz',           cat:'Fatwas',  eps:120,dur:'80h', plays:22400, emoji:'📻'},
  {id:104, title:'Explication des 40 hadiths',         author:'Cheikh Al-Albâni',         cat:'Hadith',  eps:40, dur:'26h', plays:14300, emoji:'🎙️'},
  {id:105, title:'Tafsir de Sourat Al-Baqara',         author:"Cheikh Al-Sa'di",          cat:'Tafsir',  eps:22, dur:'18h', plays:8760,  emoji:'🎧'},
  {id:106, title:'Ar-Rahîq Al-Makhtûm',                author:'Cheikh Ibn Bâz',           cat:'Sîra',    eps:30, dur:'22h', plays:16800, emoji:'📻'},
  {id:107, title:'Introduction à la langue arabe',     author:'Cheikh Al-Fawzân',         cat:'Arabe',   eps:20, dur:'15h', plays:9200,  emoji:'🎙️'},
  {id:108, title:'Les règles du Hadith',               author:'Cheikh Al-Albâni',         cat:'Hadith',  eps:15, dur:'10h', plays:7400,  emoji:'🎧'},
];

const VIDEOS_DATA = [
  {id:201, title:'Les conditions de la Shahada',       author:'Cheikh Al-Fawzân',         cat:'Aqida',   dur:'1h 24min', views:22100, emoji:'🎬'},
  {id:202, title:'Le statut de la prière en Islam',    author:'Cheikh Ibn Bâz',           cat:'Fiqh',    dur:'45min',    views:31200, emoji:'📹'},
  {id:203, title:'Les déviances des temps modernes',   author:"Cheikh Rabî' Al-Madkhali", cat:'Manhaj',  dur:'2h 05min', views:15600, emoji:'🎥'},
  {id:204, title:'Éduquer ses enfants en Islam',       author:'Cheikh Al-Fawzân',         cat:'Famille', dur:'1h 55min', views:24500, emoji:'🎬'},
  {id:205, title:'Réfutation du soufisme',             author:"Cheikh Rabî' Al-Madkhali", cat:'Manhaj',  dur:'2h 30min', views:11800, emoji:'📹'},
  {id:206, title:'Les signes de la fin des temps',     author:'Cheikh Ibn Bâz',           cat:'Aqida',   dur:'1h 12min', views:24600, emoji:'🎥'},
  {id:207, title:"L'importance de la Sounna",          author:"Cheikh Ibn 'Outhaymine",   cat:'Aqida',   dur:'1h 12min', views:13800, emoji:'🎬'},
  {id:208, title:'Le manhaj salafi face aux fitnas',   author:'Cheikh Al-Fawzân',         cat:'Manhaj',  dur:'1h 40min', views:17200, emoji:'📹'},
];

const LIVE_SESSIONS = [
  {id:1, title:'Explication du Livre du Tawhid — Séance 14', scholar:'Cheikh Sâlih Al-Fawzân', date:'Maintenant', time:'En cours', viewers:1340, status:'live', emoji:'📡'},
  {id:2, title:'Les règles du Hadith — Débutants',           scholar:'Cheikh Abdullah Al-Bukhâri', date:'22 Mars', time:'20h00', viewers:0, status:'upcoming', emoji:'📡'},
  {id:3, title:"Explication de Al-Aqida Al-Wasitiyya",       scholar:'Cheikh Sâlih Al-Fawzân', date:'24 Mars', time:'21h00', viewers:0, status:'upcoming', emoji:'📡'},
  {id:4, title:'Fiqh de la Femme Musulmane — Q&A',           scholar:'Cheikh Khâlid Al-Marzouqi', date:'27 Mars', time:'19h30', viewers:0, status:'upcoming', emoji:'📡'},
  {id:5, title:'Tafsir de Sourat Al-Fatiha',                  scholar:'Cheikh Al-Fawzân', date:'30 Mars', time:'20h00', viewers:0, status:'upcoming', emoji:'📡'},
];

const CATS = [
  {slug:'aqida',  label_ar:'العقيدة',      label_fr:'Aqida',        count:480, emoji:'☝️', color:'green'},
  {slug:'fiqh',   label_ar:'الفقه',        label_fr:'Fiqh',         count:620, emoji:'⚖️', color:'blue'},
  {slug:'tafsir', label_ar:'التفسير',      label_fr:'Tafsir',       count:340, emoji:'📖', color:'red'},
  {slug:'hadith', label_ar:'الحديث',       label_fr:'Hadith',       count:510, emoji:'📜', color:'cyan'},
  {slug:'tazkiya',label_ar:'التزكية',      label_fr:'Tazkiya',      count:290, emoji:'🌿', color:'green'},
  {slug:'manhaj', label_ar:'المنهج',       label_fr:'Manhaj',       count:380, emoji:'🛤️', color:'blue'},
  {slug:'arabe',  label_ar:'اللغة العربية',label_fr:'Langue Arabe', count:180, emoji:'🔤', color:'red'},
  {slug:'sira',   label_ar:'السيرة',       label_fr:'Sîra',         count:160, emoji:'⭐', color:'cyan'},
];

// ── AUDIO PLAYER ENGINE ──
const AP = {
  open: false, playing: false, duration: 1920,
  current: 0, timer: null, cardId: null,

  load(title, author, cardId) {
    this.stop();
    this.cardId = cardId;
    this.current = 0;
    document.getElementById('ap-title').textContent  = title.substring(0, 55);
    document.getElementById('ap-author').textContent = author;
    document.getElementById('ap-dur').textContent    = '32:00';
    document.getElementById('ap-fill').style.width   = '0%';
    document.getElementById('ap-cur').textContent    = '0:00';
    document.getElementById('audio-bar').classList.add('open');
    this.open = true;
    this.play();
  },

  play() {
    this.playing = true;
    document.getElementById('ap-play').textContent = '⏸';
    this.timer = setInterval(() => {
      if (!this.playing) return;
      this.current++;
      const pct = (this.current / this.duration * 100).toFixed(1);
      document.getElementById('ap-fill').style.width = pct + '%';
      document.getElementById('ap-cur').textContent  = fmtTime(this.current);
      if (this.current >= this.duration) { this.stop(); showToast('✅ Lecture terminée'); }
    }, 1000);
  },

  pause() {
    this.playing = false;
    clearInterval(this.timer);
    document.getElementById('ap-play').textContent = '▶';
  },

  toggle() {
    if (this.playing) this.pause(); else this.play();
  },

  stop() {
    this.playing = false;
    clearInterval(this.timer);
  },

  seek(e) {
    const bar = document.getElementById('ap-bar');
    const pct = Math.max(0, Math.min(1, e.offsetX / bar.offsetWidth));
    this.current = Math.floor(pct * this.duration);
    document.getElementById('ap-fill').style.width = (pct * 100).toFixed(1) + '%';
    document.getElementById('ap-cur').textContent  = fmtTime(this.current);
  },

  close() {
    this.stop();
    document.getElementById('audio-bar').classList.remove('open');
    this.open = false;
  },
};

// ── UTILS ──
function fmtNum(n) {
  if (!n) return '0';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return String(n);
}
function fmtTime(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}
function safeStr(s) {
  return String(s || '').replace(/'/g, "\\'").replace(/"/g, '').substring(0, 80);
}
function getParam(key) {
  return new URLSearchParams(location.search).get(key);
}
let _toastT;
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.innerHTML = msg;
  el.classList.add('show');
  clearTimeout(_toastT);
  _toastT = setTimeout(() => el.classList.remove('show'), 2600);
}
function copyLink() {
  navigator.clipboard?.writeText(location.href);
  showToast('🔗 Lien copié !');
}
function shareWA(text) {
  window.open('https://wa.me/?text=' + encodeURIComponent(text + ' — ' + location.href));
}
function shareTG(text) {
  window.open('https://t.me/share/url?url=' + encodeURIComponent(location.href) + '&text=' + encodeURIComponent(text));
}

// ── REVEAL ON SCROLL ──
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }});
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── TABS ──
function activateTab(panelId, btn, colorClass) {
  const nav = btn.closest('.tabs-nav');
  const wrap = nav.closest('[data-tabs]') || nav.parentElement;
  nav.querySelectorAll('.tab-btn').forEach(b => b.className = 'tab-btn');
  wrap.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('tab-btn', colorClass);
  document.getElementById(panelId).classList.add('active');
}

// ── SCHOLAR AVATAR COLOR ──
const AV_GRADS = [
  'linear-gradient(135deg,#1DB954,#128C7E)',
  'linear-gradient(135deg,#2196F3,#0D47A1)',
  'linear-gradient(135deg,#E53935,#B71C1C)',
  'linear-gradient(135deg,#00BCD4,#00838F)',
  'linear-gradient(135deg,#128C7E,#2196F3)',
  'linear-gradient(135deg,#E53935,#00BCD4)',
];
function avColor(idx) { return AV_GRADS[idx % AV_GRADS.length]; }
