/* ===== صفحة المشاريع: شبكة كروت + مودال "دراسة حالة" — بثلاث لغات ===== */
(function(){
  const grid = document.querySelector('#pages .projects');
  if(!grid) return;

  const UI = {
    ar:{problem:'المشكلة',solution:'الحل',result:'النتيجة',live:'معاينة حيّة ↗',github:'GitHub ↗',priv:'مشروع خاص — بلا رابط عام',soon:'الصور قريباً'},
    en:{problem:'Problem',solution:'Solution',result:'Result',live:'Live preview ↗',github:'GitHub ↗',priv:'Private project — no public link',soon:'Screenshots coming soon'},
    tr:{problem:'Sorun',solution:'Çözüm',result:'Sonuç',live:'Canlı önizleme ↗',github:'GitHub ↗',priv:'Özel proje — genel bağlantı yok',soon:'Ekran görüntüleri yakında'},
  };

  const P = [
    { icon:'tensorflow',
      ar:{name:'منصة امتحانات ذكية',meta:'ذكاء اصطناعي · تعليم',tech:['Dashboard','Telegram','Auth','AI'],
        tag:'منصة تعليمية بذكاء صناعي للأستاذ الخصوصي',
        problem:'أستاذ خصوصي بدّه يعطي وظائف ويعمل امتحانات أونلاين لطلابه من المنزل دون أي مجال للغش ومع نتيجة فورية.',
        solution:'منصة فيها ذكاء صناعي: يحدّد الأستاذ الصعوبة والموضوع، والذكاء يولّد نصاً وأسئلة بصيغ متعددة (صح/خطأ، اختياري، كتابي) مستخرَجة من النص نفسه — مع لوحة تحكّم بالطلاب وتقارير، وتذكير دروس عبر تلغرام، وتسجيل دخول حقيقي.',
        result:'امتحانات من المنزل بلا غش، تصحيح ونتيجة فورية، ومتابعة كاملة لأداء كل طالب.'},
      en:{name:'Smart Exam Platform',meta:'AI · Education',tech:['Dashboard','Telegram','Auth','AI'],
        tag:'AI-powered education platform for private tutors',
        problem:'A private tutor needed to give online homework and exams from home with no room for cheating and instant grading.',
        solution:'An AI-powered platform: the tutor sets difficulty and topic, and the AI generates a passage and questions in multiple formats (true/false, multiple-choice, written) derived from the text — with a student dashboard, reports, Telegram lesson reminders, and real authentication.',
        result:'Exams from home with no cheating, instant grading, and full tracking of each student.'},
      tr:{name:'Akıllı Sınav Platformu',meta:'Yapay Zekâ · Eğitim',tech:['Dashboard','Telegram','Auth','AI'],
        tag:'Özel öğretmenler için yapay zekâ destekli eğitim platformu',
        problem:'Özel bir öğretmenin evden, kopya ihtimali olmadan ve anında notlandırma ile çevrimiçi ödev ve sınav yapması gerekiyordu.',
        solution:'Yapay zekâ destekli platform: öğretmen zorluk ve konuyu belirler, YZ metinden türetilmiş çok biçimli sorular (doğru/yanlış, çoktan seçmeli, yazılı) üretir — öğrenci paneli, raporlar, Telegram ders hatırlatmaları ve gerçek giriş ile.',
        result:'Evden kopyasız sınavlar, anında notlandırma ve her öğrencinin tam takibi.'} },

    { icon:'typescript', github:'https://github.com/housinasaad-creator/b2b-apparel-erp',
      ar:{name:'النسيج الذهبي — ERP',meta:'نظام مؤسسي',tech:['ERP','TypeScript','PDF'],
        tag:'نظام إدارة موارد لشركة نسيج',
        problem:'إدارة يدوية: صعوبة معرفة الموارد المتوفّرة بسرعة، ومتابعة صيانة المكنات، وضياع وقت كبير.',
        solution:'نظام ERP: معرفة الموارد المتوفّرة بضغطة زر، جدولة صيانة المكنات، وتقارير PDF تلقائية.',
        result:'وفّر على الشركة ساعات من العمل اليدوي يومياً.'},
      en:{name:'Golden Weave — ERP',meta:'Enterprise System',tech:['ERP','TypeScript','PDF'],
        tag:'ERP system for a textile manufacturer',
        problem:'Manual management: hard to know available resources quickly, tracking machine maintenance, and a lot of wasted time.',
        solution:'An ERP system: view available resources at one click, machine-maintenance scheduling, and automated PDF reports.',
        result:'Saved the company hours of manual work every day.'},
      tr:{name:'Golden Weave — ERP',meta:'Kurumsal Sistem',tech:['ERP','TypeScript','PDF'],
        tag:'Bir tekstil üreticisi için ERP sistemi',
        problem:'Manuel yönetim: mevcut kaynakları hızlıca bilmek zor, makine bakım takibi ve çok fazla zaman kaybı.',
        solution:'Bir ERP sistemi: kaynakları tek tıkla görme, makine bakım planlaması ve otomatik PDF raporları.',
        result:'Şirkete her gün saatlerce manuel iş tasarrufu sağladı.'} },

    { icon:'threedotjs', github:'https://github.com/housinasaad-creator/mozaik',
      ar:{name:'Mozaik Ofset',meta:'ويب ثلاثي الأبعاد · تعدّد لغات',tech:['Three.js','Web','i18n'],
        tag:'موقع شركة أوفست وتغليف بعرض ثلاثي الأبعاد',
        problem:'المنتجات كانت تُعرض بصور ثابتة (2D) جامدة، مع مشاكل بتجربة الاستخدام وسهولة الوصول.',
        solution:'إعادة بناء الموقع بعارض منتجات ثلاثي الأبعاد تفاعلي (Three.js)، وتحسين تجربة الاستخدام والوصول، وإضافة 3 لغات.',
        result:'صار بإمكان الزبون تفحّص المنتج بشكل ثلاثي الأبعاد كامل.'},
      en:{name:'Mozaik Ofset',meta:'3D Web · i18n',tech:['Three.js','Web','i18n'],
        tag:'A packaging company website with 3D product viewing',
        problem:'Products were shown as flat, static 2D images, with UX and accessibility issues.',
        solution:'Rebuilt the site with an interactive 3D product viewer (Three.js), improved UX and accessibility, and added 3 languages.',
        result:'Customers can now inspect products in full 3D.'},
      tr:{name:'Mozaik Ofset',meta:'3D Web · çoklu dil',tech:['Three.js','Web','i18n'],
        tag:'3D ürün görüntülemeli bir ambalaj şirketi web sitesi',
        problem:'Ürünler sabit, düz 2D görsellerle gösteriliyordu; kullanılabilirlik ve erişilebilirlik sorunları vardı.',
        solution:'Siteyi etkileşimli 3D ürün görüntüleyici (Three.js) ile yeniden inşa ettim, UX ve erişilebilirliği iyileştirdim ve 3 dil ekledim.',
        result:'Müşteriler artık ürünleri tam 3D olarak inceleyebiliyor.'} },

    { icon:'threedotjs', live:'https://housinasaad-creator.github.io/portfolio/', github:'https://github.com/housinasaad-creator/portfolio',
      ar:{name:'3D Portfolio',meta:'Three.js',tech:['3D','JavaScript','Three.js'],
        tag:'الموقع اللي قدامك — بورتفوليو بشخصية ثلاثية الأبعاد',
        problem:'الحاجة لبورتفوليو شخصي يلفت نظر الزبون من أول ثانية.',
        solution:'شخصية روبوت 3D (Three.js / FBX) تتبع الماوس، تنقّل اتجاهي بين الصفحات، وتلوين لكل قسم.',
        result:'تجربة ويب حيّة وتفاعلية بالكامل.'},
      en:{name:'3D Portfolio',meta:'Three.js',tech:['3D','JavaScript','Three.js'],
        tag:'The site in front of you — a portfolio with a 3D character',
        problem:'The need for a personal portfolio that grabs the client from the first second.',
        solution:'A 3D robot character (Three.js / FBX) that follows the mouse, directional page navigation, and per-section theming.',
        result:'A live, fully interactive web experience.'},
      tr:{name:'3D Portfolio',meta:'Three.js',tech:['3D','JavaScript','Three.js'],
        tag:'Önünüzdeki site — 3D karakterli bir portföy',
        problem:'Müşteriyi ilk saniyeden yakalayan kişisel bir portföy ihtiyacı.',
        solution:'Fareyi takip eden bir 3D robot karakteri (Three.js / FBX), yönsel sayfa geçişi ve bölüm bazlı temalandırma.',
        result:'Canlı, tamamen etkileşimli bir web deneyimi.'} },

    { icon:'flutter',
      ar:{name:'CyberLearn',meta:'Flutter · سطح المكتب',tech:['Flutter','Dart','Windows'],
        tag:'تطبيق ديسكتوب لتعليم الأمن السيبراني',
        problem:'تعليم مفاهيم الأمن السيبراني بشكل تفاعلي وواضح على الديسكتوب.',
        solution:'تطبيق Flutter/Dart بوحدات ودروس تفاعلية منظّمة.',
        result:'منصة تعليم أمن سيبراني شغّالة على ويندوز.'},
      en:{name:'CyberLearn',meta:'Flutter · Desktop',tech:['Flutter','Dart','Windows'],
        tag:'A desktop app for teaching cybersecurity',
        problem:'Teaching cybersecurity concepts interactively and clearly on desktop.',
        solution:'A Flutter/Dart app with structured, interactive units and lessons.',
        result:'A working cybersecurity learning platform on Windows.'},
      tr:{name:'CyberLearn',meta:'Flutter · Masaüstü',tech:['Flutter','Dart','Windows'],
        tag:'Siber güvenlik öğretimi için bir masaüstü uygulaması',
        problem:'Siber güvenlik kavramlarını masaüstünde etkileşimli ve net biçimde öğretmek.',
        solution:'Yapılandırılmış, etkileşimli ünite ve derslerle bir Flutter/Dart uygulaması.',
        result:'Windows üzerinde çalışan bir siber güvenlik öğrenme platformu.'} },

    { icon:'android',
      ar:{name:'Network Load Tester',meta:'Flutter · شبكات',tech:['Flutter','Dart','Networking'],
        tag:'تطبيق أندرويد لاختبار تحمّل أجهزة الشبكة',
        problem:'الحاجة لاختبار تحمّل أجهزة الشبكة عبر الـ IP (ping / tcp / udp).',
        solution:'تطبيق أندرويد يفحص تحمّل الأجهزة بعدة بروتوكولات ويعرض النتائج.',
        result:'أداة عملية لاختبار الشبكات مباشرة من الموبايل.'},
      en:{name:'Network Load Tester',meta:'Flutter · Networking',tech:['Flutter','Dart','Networking'],
        tag:'An Android app for network device load testing',
        problem:'The need to load-test network devices over IP (ping / tcp / udp).',
        solution:'An Android app that stress-tests devices over multiple protocols and shows results.',
        result:'A practical tool for testing networks straight from the phone.'},
      tr:{name:'Network Load Tester',meta:'Flutter · Ağ',tech:['Flutter','Dart','Networking'],
        tag:'Ağ cihazı yük testi için bir Android uygulaması',
        problem:'Ağ cihazlarını IP üzerinden (ping / tcp / udp) yük testine tabi tutma ihtiyacı.',
        solution:'Cihazları birden çok protokolle test eden ve sonuçları gösteren bir Android uygulaması.',
        result:'Doğrudan telefondan ağ testi için pratik bir araç.'} },
  ];

  let lang = 'ar';
  const page = grid.closest('.page'); if(page) page.classList.add('page-wide');

  function render(lg){
    lang = (lg && P[0][lg]) ? lg : 'ar';
    grid.classList.add('pgrid'); grid.innerHTML = '';
    P.forEach((p,idx)=>{
      const d = p[lang];
      const card = document.createElement('button');
      card.className = 'pcard'; card.type = 'button'; card.dataset.idx = idx;
      card.innerHTML =
        '<span class="pcard-cover"><i style="--i:url(https://cdn.simpleicons.org/'+p.icon+')"></i></span>'
        + '<span class="pcard-body">'
        +   '<span class="pcard-name">'+d.name+'</span>'
        +   '<span class="pcard-tag">'+d.tag+'</span>'
        +   '<span class="pcard-tech">'+d.tech.map(t=>'<em>'+t+'</em>').join('')+'</span>'
        + '</span>';
      card.addEventListener('click', ()=> openModal(idx));
      grid.appendChild(card);
    });
  }

  const modal = document.createElement('div');
  modal.className = 'pmodal vv-fixed'; modal.setAttribute('aria-hidden','true');   // تعويض انزياح العناصر الثابتة (راجع index.html)
  modal.innerHTML =
    '<div class="pmodal-backdrop"></div>'
    + '<div class="pmodal-inner" role="dialog" aria-modal="true">'
    +   '<button class="pmodal-close" aria-label="close">✕</button>'
    +   '<div class="pmodal-cover"><i></i><span class="pmodal-soon"></span></div>'
    +   '<h3 class="pmodal-name"></h3><div class="pmodal-tag"></div>'
    +   '<div class="case">'
    +     '<div class="case-row"><span class="case-label" data-l="problem"></span><p data-k="problem"></p></div>'
    +     '<div class="case-row"><span class="case-label" data-l="solution"></span><p data-k="solution"></p></div>'
    +     '<div class="case-row"><span class="case-label" data-l="result"></span><p data-k="result"></p></div>'
    +   '</div><div class="pmodal-tech"></div><div class="pmodal-actions"></div>'
    + '</div>';
  document.body.appendChild(modal);
  const mInner = modal.querySelector('.pmodal-inner');

  function openModal(idx){
    const p = P[idx], d = p[lang], u = UI[lang];
    modal.querySelector('.pmodal-cover i').style.setProperty('--i','url(https://cdn.simpleicons.org/'+p.icon+')');
    modal.querySelector('.pmodal-soon').textContent = u.soon;
    modal.querySelector('.pmodal-name').textContent = d.name;
    modal.querySelector('.pmodal-tag').textContent  = d.meta;
    modal.querySelector('[data-l=problem]').textContent  = u.problem;
    modal.querySelector('[data-l=solution]').textContent = u.solution;
    modal.querySelector('[data-l=result]').textContent   = u.result;
    modal.querySelector('[data-k=problem]').textContent  = d.problem;
    modal.querySelector('[data-k=solution]').textContent = d.solution;
    modal.querySelector('[data-k=result]').textContent   = d.result;
    modal.querySelector('.pmodal-tech').innerHTML = d.tech.map(t=>'<em>'+t+'</em>').join('');
    let acts='';
    if(p.live)   acts += '<a class="pbtn primary" href="'+p.live+'" target="_blank" rel="noopener">'+u.live+'</a>';
    if(p.github) acts += '<a class="pbtn" href="'+p.github+'" target="_blank" rel="noopener">'+u.github+'</a>';
    if(!acts)    acts = '<span class="pbtn ghost">'+u.priv+'</span>';
    modal.querySelector('.pmodal-actions').innerHTML = acts;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open'); mInner.scrollTop = 0;
  }
  function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
  modal.querySelector('.pmodal-close').addEventListener('click', closeModal);
  modal.querySelector('.pmodal-backdrop').addEventListener('click', closeModal);
  addEventListener('keydown', e=>{ if(e.key==='Escape' && modal.classList.contains('open')) closeModal(); });

  render('ar');
  window.i18nProjects = render;   // يستدعيها نظام اللغات
})();
