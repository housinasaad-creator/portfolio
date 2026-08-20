/* ===== نظام التنقّل: سكرول عادي (فوق/تحت) — الروبوت ثابت يمين، بدون تقليب صفحات =====
   شغّال على index.html (فيها كل الأقسام) وعلى about.html (صفحة مستقلة) بنفس الملف:
   إذا الصفحة الحالية فيها #pages .page (index) بيشتغل سكرول-لقسم، وإلا (about.html) بيرجّع
   لـ index.html#pN. القسم الحالي بيتحدّد بمراقبة السكرول، وكل قسم بيتلاشى دخول وخروج. */
(function(){
  const pages = [...document.querySelectorAll('#pages .page')];
  const n = pages.length;
  const onIndex = n > 0;
  let cur = 0;

  const NAMES = ['الرئيسية','HTML','CSS','JavaScript','Dart','Three.js','Python','PHP','C','AI Engineering','AI Training','Projects','Contact'];
  // لون تمييز واحد موحّد لكل الصفحات — ذهبي/نحاسي (هوية الموقع الفاتحة الفاخرة)
  const ACCENT = Array(Math.max(n,1)).fill('#c9975f');

  // روابط التواصل (تُستعمل بالهيدر) — يتلوّنوا مع الصفحة
  const SOCIALS = [
    ['whatsapp','https://wa.me/905050144543','WhatsApp'],
    ['instagram','https://www.instagram.com/mjh.6_6','Instagram'],
    ['facebook','https://www.facebook.com/share/1FGM8Z6WL1/','Facebook'],
    ['github','https://github.com/housinasaad-creator','GitHub'],
  ];

  // ===== هيدر علوي زجاجي ثابت: لوغو · صفحات بالنص · من أنا (آخر وحدة) · تواصل + CV + لغة =====
  const topnav = document.createElement('nav');
  topnav.id = 'topnav'; topnav.className = 'vv-fixed'; topnav.setAttribute('aria-label','التنقّل');

  // اللوغو الأساسي بالهيدر (يرجّع للرئيسية، يتلوّن مع الصفحة)
  const navBrand = document.createElement('button');
  navBrand.className = 'nav-brand'; navBrand.title = 'Muhammed Elhuseyin'; navBrand.setAttribute('aria-label','الصفحة الرئيسية');
  navBrand.innerHTML = '<img src="assets/logo/mjh-logo.svg" alt="MJH" draggable="false">';
  navBrand.addEventListener('click', ()=>{ onIndex ? go(0) : (location.href = 'index.html'); });

  // روابط الصفحات (13)
  const navLinksWrap = document.createElement('div');
  navLinksWrap.className = 'nav-links';
  NAMES.forEach((nm,i)=>{
    const b = document.createElement('button');
    b.className = 'navlink'; b.textContent = nm; b.title = nm;
    b.addEventListener('click', ()=>{ onIndex ? go(i) : (location.href = 'index.html#p'+i); });
    navLinksWrap.appendChild(b);
  });
  // رابط "من أنا" — آخر وحدة بالهيدر كامل (بعد كل شي، حتى بعد اللغة)، صفحة مستقلة حقيقية
  const aboutLink = document.createElement('a');
  aboutLink.className = 'navlink navlink-about'; aboutLink.textContent = 'من أنا'; aboutLink.title = 'من أنا';
  aboutLink.href = 'about.html';

  // أيقونات التواصل
  const navContact = document.createElement('div');
  navContact.className = 'nav-contact';
  navContact.innerHTML = SOCIALS.map(([slug,url,label])=>
    `<a class="nav-ico" href="${url}" target="_blank" rel="noopener" title="${label}" aria-label="${label}"><i style="--i:url(https://cdn.simpleicons.org/${slug})"></i></a>`
  ).join('');

  // زر السيرة الذاتية (CV) — تحميل مباشر
  const navCv = document.createElement('a');
  navCv.className = 'cv-dl cv-head'; navCv.setAttribute('download','');
  navCv.href = 'cv/CV_Muhammed_Elhuseyin_AR.pdf'; navCv.textContent = 'CV'; navCv.title = 'CV';

  // مبدّل اللغة
  const navLang = document.createElement('div');
  navLang.className = 'nav-lang';
  navLang.innerHTML = [['ar','AR'],['en','EN'],['tr','TR']].map(([c,t])=>
    `<button class="langbtn" data-lang="${c}" title="${c}">${t}</button>`).join('');
  navLang.querySelectorAll('.langbtn').forEach(b=>
    b.addEventListener('click', ()=> window.applyLang && window.applyLang(b.dataset.lang)));

  topnav.append(navBrand, navLinksWrap, aboutLink, navContact, navCv, navLang);
  document.body.appendChild(topnav);

  // زر قائمة عائم (موبايل بوضعية طولية بس) — بيفتح/يسكّر كل محتويات الهيدر كلائحة عمودية، لسهولة
  // التنقّل بدل السحب الأفقي الضيّق. بيعيد استخدام نفس أزرار الهيدر (روابط الصفحات + من أنا + تواصل
  // + CV + لغة) بلا ما نكرّرها — بس بنبدّل تخطيطهم عبر CSS لمّا القائمة تنفتح.
  const menuBtn = document.createElement('button');
  menuBtn.id = 'menu-btn'; menuBtn.type = 'button'; menuBtn.setAttribute('aria-label','قائمة التنقّل');
  menuBtn.innerHTML = '<span></span><span></span><span></span>';
  menuBtn.addEventListener('click', ()=> document.body.classList.toggle('nav-menu-open'));
  document.body.appendChild(menuBtn);
  // سكّر القائمة تلقائياً أول ما تضغط أي رابط جواها
  topnav.addEventListener('click', e=>{
    if(e.target.closest('.navlink, .navlink-about')) document.body.classList.remove('nav-menu-open');
  });
  const navlinks = [...navLinksWrap.children];
  function updateNav(){
    navlinks.forEach((b,i)=> b.classList.toggle('on', onIndex && i===cur));
    aboutLink.classList.toggle('on', !onIndex);
  }
  window.setNavLabels = (arr, aboutText)=>{
    navlinks.forEach((b,i)=>{ if(arr[i]) b.textContent=arr[i]; });
    if(aboutText) aboutLink.textContent = aboutText;
  };
  function hexRgb(h){ h=h.replace('#',''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
  function lighten(h,a){ const [r,g,b]=hexRgb(h),f=x=>Math.round(x+(255-x)*a); return `rgb(${f(r)},${f(g)},${f(b)})`; }
  function applyAccent(i){
    const hex = ACCENT[i] || ACCENT[0]; const [r,g,b] = hexRgb(hex);
    const root = document.documentElement.style;
    root.setProperty('--accent', hex);
    root.setProperty('--accent-2', lighten(hex,0.35));
    root.setProperty('--accent-soft', `rgba(${r},${g},${b},.16)`);
    window.currentAccent = hex;
    if(window.robotAccent) window.robotAccent(hex);   // توهّج الروبوت
  }

  applyAccent(0);
  updateNav();
  if(onIndex) document.body.classList.add('at-home');

  // التمرير لقسم معيّن (بدل تقليب الصفحات القديم)
  function go(target){
    if(!onIndex || target<0 || target>=n) return;
    pages[target].scrollIntoView({ behavior:'smooth', block:'start' });
  }

  // سهم عائم صغير يمين الشاشة — يرجّع للهيرو (يظهر بس لمّا نبعد عنه)
  if(onIndex){
    const upBtn = document.createElement('button');
    upBtn.id = 'to-top'; upBtn.setAttribute('aria-label','ارجع للأعلى'); upBtn.title = 'ارجع للأعلى';
    upBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 5l-7 7h4v7h6v-7h4z" fill="currentColor"/></svg>';
    upBtn.addEventListener('click', ()=> go(0));
    document.body.appendChild(upBtn);
  }

  // ===== تلاشي دخول تدريجي لعناصر كل صفحة مع السكرول — خفيف (opacity + إزاحة بسيطة بس، بلا scale)
  // وبعدد عناصر معقول (أولاد .panel المباشرين، و#about-sections بينفكّ لأقسامه المرقّمة فقط —
  // بلا تفكيك كل سطر لحاله متل قبل، هيك كان اللي بيسبّب لاغ محسوس فعلياً). =====
  const revealEls = [];
  document.querySelectorAll('.panel > *').forEach(el=>{
    if(el.id === 'about-sections') el.querySelectorAll(':scope > .about-sec').forEach(sec=> revealEls.push(sec));
    else revealEls.push(el);
  });
  revealEls.forEach((el,i)=>{
    el.classList.add('reveal');
    el.style.transitionDelay = Math.min(i*60, 300) + 'ms';
  });
  function updateReveal(){
    const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    revealEls.forEach(el=>{
      const r = el.getBoundingClientRect();
      const shown = atBottom || (r.top < innerHeight*0.85 && r.bottom > innerHeight*0.1);
      el.classList.toggle('in-view', shown);
    });
  }

  if(!onIndex){
    updateReveal();
    let t2=false;
    addEventListener('scroll', ()=>{ if(t2) return; t2=true; setTimeout(()=>{ updateReveal(); t2=false; },80); }, {passive:true});
    addEventListener('resize', updateReveal);
    window.navGo = go; return;   // صفحة مستقلة (about.html) — خلص هون، مافي أقسام تتراقب
  }

  // لو وصلنا من صفحة تانية برابط #pN (من زر بصفحة about.html)، انزل للقسم المطلوب
  if(location.hash && /^#p\d+$/.test(location.hash)){
    const idx = parseInt(location.hash.slice(2),10);
    if(pages[idx]) setTimeout(()=> pages[idx].scrollIntoView({block:'start'}), 60);
  }

  // ===== تلاشي دخول/خروج الكتابات مع السكرول — نحسبها يدوياً بـ scroll+timer (مش IntersectionObserver
  // ولا requestAnimationFrame، يلي ممكن يتجمّدوا بتابات مش فوكس). الشخصية (#robot-container) برّا
  // هالنظام كلياً وثابتة ظاهرة طول الوقت بكل الصفحات. =====
  function updateVisibility(){
    let bestI = 0, bestDist = Infinity;
    const mid = innerHeight/2;
    pages.forEach((p,i)=>{
      const r = p.getBoundingClientRect();
      const shown = r.bottom > innerHeight*0.1 && r.top < innerHeight*0.9;
      p.classList.toggle('in-view', shown);
      const d = Math.abs(r.top + r.height/2 - mid);
      if(d < bestDist){ bestDist = d; bestI = i; }
    });
    // آخر قسم (تواصل) ممكن يكون أقصر من الشاشة فما توصل نص الشاشة أبداً — إذا وصلنا لآخر السكرول فعلاً، نعتبره هو الحالي
    if(innerHeight + scrollY >= document.documentElement.scrollHeight - 2) bestI = n-1;
    // الشخصية ما بتظهر إلا لمّا الهيرو (أول قسم) يختفي تقريباً بالكامل من الشاشة (مش بس أول ما نبعد عنه)
    if(pages[0]){
      const heroGone = pages[0].getBoundingClientRect().bottom < innerHeight*0.08;
      document.body.classList.toggle('hero-gone', heroGone);
    }
    updateReveal();
    if(bestI !== cur){
      cur = bestI;
      document.body.classList.toggle('at-home', cur===0);
      applyAccent(cur);
      updateNav();
      if(window.robotPage) window.robotPage(cur);
    }
  }
  let ticking = false;
  addEventListener('scroll', ()=>{
    if(ticking) return; ticking = true;
    setTimeout(()=>{ updateVisibility(); ticking = false; }, 60);
  }, { passive:true });
  addEventListener('resize', updateVisibility);
  updateVisibility();
  addEventListener('load', updateVisibility);
})();
