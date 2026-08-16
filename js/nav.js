/* ===== نظام التنقّل الاتجاهي + خريطة بصرية =====
   المسار: 3 يمين → 3 تحت → 3 يسار → 3 فوق (يتكرر)
   الانتقال: تمرير جانبي باتجاه الحركة، متل تقليب شاشات الموبايل. */
(function(){
  const pages = [...document.querySelectorAll('#pages .page')];
  const n = pages.length;
  let cur = 0, lock = false;
  const DUR = 720;

  // (اللوغو المكرر فوق العناوين اتشال — بقي فقط لوغو كبير بالصفحة الرئيسية)

  // ===== كود يتكتب ذاتياً بكل صفحة لغة (بلون الصفحة) =====
  const SNIPPETS = ['',
    '<h1>Hello, World</h1>',                 // HTML
    '.hero { color: #fff; }',                // CSS
    "const hi = () => console.log('Hi');",   // JavaScript
    "void main() => print('Hi');",           // Dart
    'const scene = new THREE.Scene();',      // Three.js
    'def hi():\n    print("Hi")',            // Python
    '<?php echo "Hi"; ?>',                   // PHP
    'printf("Hello\\n");',                   // C
    'reply = model.chat("Hi")',              // AI Engineering
    'model.fit(X, y, epochs=10)',            // AI Training
    '', ''];                                 // Projects / Contact — بلا كود
  pages.forEach((p,i)=>{
    if(!SNIPPETS[i]) return;
    const panel = p.querySelector('.panel'); if(!panel) return;
    const pre = document.createElement('pre'); pre.className = 'code-type';
    const code = document.createElement('code'); code.setAttribute('data-src', SNIPPETS[i]);
    pre.appendChild(code); panel.appendChild(pre);
  });
  let typeTimer = null;
  function typeCode(i){
    clearInterval(typeTimer);
    const code = pages[i] && pages[i].querySelector('.code-type code');
    if(!code) return;
    const txt = code.getAttribute('data-src') || '';
    code.textContent = ''; let k = 0;
    typeTimer = setInterval(()=>{
      code.textContent = txt.slice(0, ++k);
      if(k >= txt.length) clearInterval(typeTimer);
    }, 42);
  }

  const NAMES = ['الرئيسية','HTML','CSS','JavaScript','Dart','Three.js','Python','PHP','C','AI Engineering','AI Training','Projects','Contact'];
  // لون التمييز لكل صفحة
  // ألوان متباعدة — كل صفحتين متتاليتين مختلفتين بوضوح (تبديل دافئ/بارد)
  const ACCENT = ['#4d9fff','#ff5a36','#38bdf8','#ffd60a','#22d3ee','#ff5db1','#6aa9ff','#f59e0b','#22c55e','#a855f7','#ec4899','#34d399','#60a5fa'];

  // ===== هيدر علوي زجاجي ثابت — كل الصفحات + إبراز الصفحة الحالية (بلونها) =====
  const topnav = document.createElement('nav');
  topnav.id = 'topnav'; topnav.setAttribute('aria-label','التنقّل');
  NAMES.forEach((nm,i)=>{
    const b = document.createElement('button');
    b.className = 'navlink'; b.textContent = nm; b.title = nm;
    b.addEventListener('click', ()=> go(i));
    topnav.appendChild(b);
  });
  document.body.appendChild(topnav);
  const navlinks = [...topnav.children];
  function updateNav(){ navlinks.forEach((b,i)=> b.classList.toggle('on', i===cur)); }
  function hexRgb(h){ h=h.replace('#',''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
  function lighten(h,a){ const [r,g,b]=hexRgb(h),f=x=>Math.round(x+(255-x)*a); return `rgb(${f(r)},${f(g)},${f(b)})`; }
  function applyAccent(i){
    const hex = ACCENT[i] || ACCENT[0]; const [r,g,b] = hexRgb(hex);
    const root = document.documentElement.style;
    root.setProperty('--accent', hex);
    root.setProperty('--accent-2', lighten(hex,0.35));
    root.setProperty('--accent-soft', `rgba(${r},${g},${b},.16)`);
    const glow = document.querySelector('.robot-glow');
    if(glow) glow.style.background = `radial-gradient(circle,rgba(${r},${g},${b},.30),rgba(${r},${g},${b},.10) 45%,transparent 68%)`;
    window.currentAccent = hex;
    if(window.robotAccent) window.robotAccent(hex);   // توهّج الروبوت
    if(window.bgAccent)    window.bgAccent(hex);       // الخلفية
  }
  // التنقّل دائماً أفقي: الصفحة الجديدة تدخل من اليمين (والرجوع يعكسها)
  const fwd = 'translateX(100%)';    // الجديدة تبدأ من اليمين وتزحف للوسط
  const bwd = 'translateX(-100%)';   // والقديمة تخرج لليسار

  /* ===== الوضع الابتدائي ===== */
  pages.forEach((p,i)=>{
    p.classList.toggle('active', i===0);
    p.style.transform = i===0 ? 'none' : 'translateX(100%)';
  });
  document.body.classList.add('at-home');
  applyAccent(0);
  updateNav();

  function go(target){
    if(lock || target<0 || target>=n || target===cur) return;
    lock = true;
    const forward = target > cur;
    const newStart = forward ? fwd : bwd;
    const oldEnd   = forward ? bwd : fwd;
    const oldEl = pages[cur], newEl = pages[target];

    newEl.classList.add('active');
    newEl.style.transition = 'none';
    newEl.style.transform  = newStart;
    void newEl.offsetWidth;
    newEl.style.transition = '';
    newEl.style.transform  = 'none';
    oldEl.style.transform  = oldEnd;

    const prev = cur;
    cur = target;
    document.body.classList.toggle('at-home', cur===0);
    applyAccent(cur);
    updateNav();
    typeCode(cur);                                   // ابدأ كتابة الكود للصفحة الجديدة
    if(window.robotPage) window.robotPage(cur);

    setTimeout(()=>{ pages[prev].classList.remove('active'); lock=false; }, DUR);
  }
  const next = ()=> go(cur+1);
  const prev = ()=> go(cur-1);

  // عجلة الماوس
  let wheelReady = 0;
  addEventListener('wheel', (e)=>{
    const now = Date.now(); if(now < wheelReady) return;
    const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if(Math.abs(d) < 10) return;
    wheelReady = now + DUR + 120;
    d > 0 ? next() : prev();
  }, { passive:true });

  // الكيبورد
  addEventListener('keydown', (e)=>{
    if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){ e.preventDefault(); next(); }
    else if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){ e.preventDefault(); prev(); }
  });

  // اللمس
  let sx=0, sy=0;
  addEventListener('touchstart', e=>{ sx=e.touches[0].clientX; sy=e.touches[0].clientY; }, {passive:true});
  addEventListener('touchend', e=>{
    const dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy;
    if(Math.max(Math.abs(dx),Math.abs(dy)) < 40) return;
    (Math.abs(dx) > Math.abs(dy)) ? (dx<0?next():prev()) : (dy<0?next():prev());
  }, {passive:true});

  window.navGo = go;
})();
