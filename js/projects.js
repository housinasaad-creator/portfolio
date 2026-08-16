/* ===== صفحة المشاريع: شبكة كروت + مودال "دراسة حالة" ===== */
(function(){
  const grid = document.querySelector('#pages .projects');
  if(!grid) return;

  // بيانات المشاريع — الصور placeholder لحدّ ما تُضاف الحقيقية (واجهات بالإنجليزي)
  const PROJECTS = [
    {
      name:'Mozaik Ofset', icon:'threedotjs',
      tag:'موقع شركة أوفست وتغليف بعرض ثلاثي الأبعاد',
      tech:['Three.js','Web','i18n'],
      problem:'المنتجات كانت تُعرض بصور ثابتة (2D) جامدة، مع مشاكل بتجربة الاستخدام (UX) وسهولة الوصول (accessibility).',
      solution:'أعدت بناء الموقع بعارض منتجات ثلاثي الأبعاد تفاعلي (Three.js)، حسّنت تجربة الاستخدام والوصول، وأضفت 3 لغات (تركي/إنجليزي/عربي).',
      result:'الزبون صار يشوف المنتج من كل الاتجاهات 3D — تجربة أوضح وأفخم وأسهل وصولاً.',
      github:'https://github.com/housinasaad-creator/mozaik'
    },
    {
      name:'Golden Weave — ERP', icon:'typescript',
      tag:'نظام إدارة موارد لشركة نسيج',
      tech:['ERP','TypeScript','PDF'],
      problem:'الإدارة كانت يدوية: صعوبة معرفة الموارد المتوفّرة بسرعة، ومتابعة صيانة المكنات، وضياع وقت كبير.',
      solution:'بنيت نظام ERP: معرفة الموارد المتوفّرة بضغطة زر، جدولة صيانة المكنات، وتقارير PDF تلقائية.',
      result:'توفير ساعات من الوقت يومياً، ومعرفة فورية للموارد وحالة المكنات.',
      github:'https://github.com/housinasaad-creator/b2b-apparel-erp'
    },
    {
      name:'منصة امتحانات ذكية', icon:'tensorflow',
      tag:'منصة تعليمية بذكاء صناعي للأستاذ الخصوصي',
      tech:['AI','Auth','Telegram','Dashboard'],
      problem:'أستاذ خصوصي بدّه يعطي وظائف ويعمل امتحانات أونلاين لطلابه من المنزل — بدون أي مجال للغش، ونتيجة فورية.',
      solution:'منصة فيها ذكاء صناعي: الأستاذ يحدّد مستوى الامتحان (الصعوبة + الموضوع)، والذكاء يولّد نصاً وأسئلة بصيغ متعددة (صح/خطأ، اختياري، كتابي) مستخرَجة من النص نفسه — مع لوحة تحكّم بالطلاب وتقارير عنهم، ونظام تذكير بالدروس عبر تلغرام، وتسجيل دخول حقيقي للطلاب.',
      result:'امتحانات من المنزل بلا غش، تصحيح ونتيجة فورية، ومتابعة كاملة لأداء كل طالب.'
    },
    {
      name:'3D Portfolio', icon:'threedotjs',
      tag:'الموقع اللي قدامك — بورتفوليو بشخصية ثلاثية الأبعاد',
      tech:['Three.js','JavaScript','3D'],
      problem:'الحاجة لبورتفوليو شخصي يلفت نظر الزبون من أول ثانية.',
      solution:'شخصية روبوت 3D (Three.js / FBX) بالخلفية تتبع الماوس، تنقّل اتجاهي بين الصفحات، وتلوين لكل قسم.',
      result:'تجربة تفاعلية مميّزة — نفس الموقع اللي عم تتصفّحه الآن.',
      live:'https://housinasaad-creator.github.io/portfolio/',
      github:'https://github.com/housinasaad-creator/portfolio'
    },
    {
      name:'CyberLearn', icon:'flutter',
      tag:'تطبيق ديسكتوب لتعليم الأمن السيبراني',
      tech:['Flutter','Dart','Windows'],
      problem:'تعليم مفاهيم الأمن السيبراني بشكل تفاعلي وواضح على الديسكتوب.',
      solution:'تطبيق Flutter/Dart بوحدات ودروس تفاعلية منظّمة.',
      result:'منصة تعليم أمن سيبراني شغّالة على ويندوز.'
    },
    {
      name:'Network Load Tester', icon:'android',
      tag:'تطبيق أندرويد لاختبار تحمّل أجهزة الشبكة',
      tech:['Flutter','Dart','Networking'],
      problem:'الحاجة لاختبار تحمّل أجهزة الشبكة عبر الـ IP (ping / tcp / udp).',
      solution:'تطبيق أندرويد يفحص تحمّل الأجهزة بعدة بروتوكولات ويعرض النتائج.',
      result:'أداة عملية لاختبار الشبكات مباشرة من الموبايل.'
    }
  ];

  // وسّع صفحة المشاريع لتناسب الشبكة
  const page = grid.closest('.page'); if(page) page.classList.add('page-wide');

  // ابنِ الشبكة
  grid.classList.add('pgrid'); grid.innerHTML = '';
  PROJECTS.forEach((p)=>{
    const card = document.createElement('button');
    card.className = 'pcard'; card.type = 'button';
    card.innerHTML =
      '<span class="pcard-cover"><i style="--i:url(https://cdn.simpleicons.org/'+p.icon+')"></i></span>'
      + '<span class="pcard-body">'
      +   '<span class="pcard-name">'+p.name+'</span>'
      +   '<span class="pcard-tag">'+p.tag+'</span>'
      +   '<span class="pcard-tech">'+p.tech.map(t=>'<em>'+t+'</em>').join('')+'</span>'
      + '</span>';
    card.addEventListener('click', ()=> openModal(p));
    grid.appendChild(card);
  });

  // المودال (دراسة الحالة)
  const modal = document.createElement('div');
  modal.className = 'pmodal'; modal.setAttribute('aria-hidden','true');
  modal.innerHTML =
    '<div class="pmodal-backdrop"></div>'
    + '<div class="pmodal-inner" role="dialog" aria-modal="true">'
    +   '<button class="pmodal-close" aria-label="إغلاق">✕</button>'
    +   '<div class="pmodal-cover"><i></i><span class="pmodal-soon">Screenshots coming soon</span></div>'
    +   '<h3 class="pmodal-name"></h3>'
    +   '<div class="pmodal-tag"></div>'
    +   '<div class="case">'
    +     '<div class="case-row"><span class="case-label">المشكلة</span><p data-k="problem"></p></div>'
    +     '<div class="case-row"><span class="case-label">الحل</span><p data-k="solution"></p></div>'
    +     '<div class="case-row"><span class="case-label">النتيجة</span><p data-k="result"></p></div>'
    +   '</div>'
    +   '<div class="pmodal-tech"></div>'
    +   '<div class="pmodal-actions"></div>'
    + '</div>';
  document.body.appendChild(modal);
  const mInner = modal.querySelector('.pmodal-inner');

  function openModal(p){
    modal.querySelector('.pmodal-cover i').style.setProperty('--i','url(https://cdn.simpleicons.org/'+p.icon+')');
    modal.querySelector('.pmodal-name').textContent = p.name;
    modal.querySelector('.pmodal-tag').textContent = p.tag;
    modal.querySelector('[data-k=problem]').textContent  = p.problem;
    modal.querySelector('[data-k=solution]').textContent = p.solution;
    modal.querySelector('[data-k=result]').textContent   = p.result;
    modal.querySelector('.pmodal-tech').innerHTML = p.tech.map(t=>'<em>'+t+'</em>').join('');
    let acts = '';
    if(p.live)   acts += '<a class="pbtn primary" href="'+p.live+'" target="_blank" rel="noopener">معاينة حيّة ↗</a>';
    if(p.github) acts += '<a class="pbtn" href="'+p.github+'" target="_blank" rel="noopener">GitHub ↗</a>';
    if(!acts)    acts = '<span class="pbtn ghost">مشروع خاص — بلا رابط عام</span>';
    modal.querySelector('.pmodal-actions').innerHTML = acts;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');   // يوقف تنقّل الموقع طول ما المودال مفتوح
    mInner.scrollTop = 0;
  }
  function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
  modal.querySelector('.pmodal-close').addEventListener('click', closeModal);
  modal.querySelector('.pmodal-backdrop').addEventListener('click', closeModal);
  addEventListener('keydown', e=>{ if(e.key==='Escape' && modal.classList.contains('open')) closeModal(); });
})();
