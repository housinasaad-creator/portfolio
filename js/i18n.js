/* ===== نظام اللغات (i18n) + بطاقة اختيار اللغة على البداية (تعمل كشاشة تحميل) =====
   3 لغات: عربي (الأصل) · إنجليزي · تركي. الاختيار يُحفظ بـ localStorage. */
(function(){
  const T = {
    ar:{ code:'ar', dir:'rtl', label:'العربية', native:'اختر لغتك',
      role:'&lt; مبرمج ومهندس ذكاء صناعي /&gt;',
      bio:'من ٦ سنين عم برمج. ببني مواقع وتطبيقات وأنظمة ذكية — من الواجهة اللي بتشوفها، للسيرفر ورا الكواليس، لنماذج الذكاء الصناعي. تحت معك ١٢ محطة، كل وحدة بتحكي عن شي بعرفه منيح.',
      stats:['سنين خبرة','تطوير ويب','تطبيقات Flutter','ذكاء صناعي'],
      scroll:'مرّر للاستكشاف', levels:['مبتدئ','متوسط','متقدّم'],
      nav:['الرئيسية','إتش تي إم إل','سي إس إس','جافا سكربت','دارت','ثري جي إس','بايثون','بي إتش بي','سي','هندسة الذكاء','تدريب النماذج','مشاريع','تواصل','اللعب'],
      pg_kicker:'14 · اللعب', pg_title:'اللعب مع روبوت الذكاء — محمد الحسين',
      pg_hint:'اسحب بالماوس لتدوير الشخصية · اضغط أي حركة لتنفّذها', cv:'السيرة الذاتية',
      pages:{
       1:['02 · إتش تي إم إل','هيكل أي موقع','البنية اللي بينبني عليها أي موقع. بكتب HTML نظيف ومرتّب، دلالي (semantic)، وبراعي إنه يفتح صح على أي جهاز، ويكون سهل لمحرّكات البحث ولذوي الاحتياجات.'],
       2:['03 · سي إس إس','هون بصير حلو','هون بصير الموقع حلو ومرتّب. بشتغل تصاميم عصرية، حركات ناعمة، وترتيب بيزبط على الموبايل والكمبيوتر — متل هالموقع اللي قدامك هلق.'],
       3:['04 · جافا سكربت','اللي بيخلي الصفحة تتفاعل','اللي بيعطي الصفحة حياة وتفاعل. بكتب منطق ديناميكي، بربط مع APIs، وبعمل تجارب سلسة بتشتغل بدون ما تعلّق. هالروبوت والتنقّل اللي عم تستعمله كله جافا سكربت.'],
       4:['05 · دارت','تطبيقات موبايل وديسكتوب','لغتي لبناء التطبيقات مع Flutter. عملت فيها تطبيقات حقيقية شغّالة — متل CyberLearn لتعليم الأمن السيبراني على الديسكتوب، وتطبيق أندرويد لفحص تحمّل أجهزة الشبكة.'],
       5:['06 · ثري جي إس','ثلاثي الأبعاد بالمتصفح','عوالم ثلاثية الأبعاد جوّا المتصفح. الروبوت اللي عم يتطلّع فيك هلق مبني فيها، وكمان عملت عارضات ثلاثية الأبعاد تفاعلية لعلب وتصاميم موزاييك.'],
       6:['07 · بايثون','الأتمتة والذكاء الصناعي','بستخدم بايثون لأتمتة الشغل الممل، ومعالجة الداتا، وبناء نماذج الذكاء الصناعي. من سكربت صغير بيوفّرلك ساعات، لنموذج بيتعلّم من الداتا ويتنبّأ.'],
       7:['08 · بي إتش بي','الشغل ورا الكواليس','الشغل ورا الكواليس. ببني سيرفرات وأنظمة إدارة محتوى ومستخدمين، وبربطها بقواعد بيانات بشكل آمن ومنظّم.'],
       8:['09 · سي','الأساس والأداء','الأساس اللي بيخليك تفهم كيف بتشتغل الأشياء من الجذر. برمجة قريبة من العتاد، سريعة وفعّالة، وبتعلّمك تحترم كل بايت بالذاكرة.'],
       9:['10 · هندسة الذكاء الصناعي','من الفكرة لحل شغّال','بناء أنظمة ذكاء صناعي شغّالة فعلياً — مش بس تجارب. آخد الفكرة وأركّبها كحل مدمج بموقع أو تطبيق بيستفيد منه الناس على أرض الواقع.'],
       10:['11 · تدريب النماذج','من الداتا لذكاء','تجهيز الداتا، تدريب النماذج، وضبطها (fine-tuning) لتطلع بأحسن أداء ممكن. هاد الجزء اللي بيحوّل أرقام وداتا خام لذكاء فعلي.'],
      },
      proj_kicker:'12 · شغلي', proj_intro:'شغلي — اضغط أي مشروع لتشوف القصة كاملة (المشكلة · الحل · النتيجة).',
      contact:['13 · تواصل','جاهز نشتغل سوا؟','إذا عندك فكرة أو مشروع، أو بس بدك تحكي — راسلني وبكون سعيد نشتغل سوا.','واتساب — راسلني مباشرة'] },

    en:{ code:'en', dir:'ltr', label:'English', native:'Choose your language',
      role:'&lt; Software Developer &amp; AI Engineer /&gt;',
      bio:"I've been coding for 6+ years — building websites, apps, and intelligent systems, from the interface you see to the back-end server and AI models. There are 12 stations below; each one is about something I know well.",
      stats:['years experience','Web development','Flutter apps','Artificial Intelligence'],
      scroll:'Scroll to explore', levels:['Beginner','Intermediate','Advanced'],
      nav:['Home','HTML','CSS','JavaScript','Dart','Three.js','Python','PHP','C','AI Engineering','AI Training','Projects','Contact','Playground'],
      pg_kicker:'14 · Playground', pg_title:'Play with the AI robot — Muhammed Elhuseyin',
      pg_hint:'Drag with the mouse to rotate the character · tap any move to play it', cv:'Download CV',
      pages:{
       1:['02 · HTML','The skeleton of any website',"The structure every website is built on. I write clean, well-organized, semantic HTML that renders correctly on any device and stays friendly to search engines and accessibility."],
       2:['03 · CSS','Where it gets beautiful',"This is where a site becomes polished. I craft modern designs, smooth animations, and layouts that work on mobile and desktop — like the one in front of you now."],
       3:['04 · JavaScript','What makes the page interactive',"What gives a page life and interaction. I write dynamic logic, connect to APIs, and build smooth experiences that never lag. This robot and navigation are all JavaScript."],
       4:['05 · Dart','Mobile & desktop apps',"My language for building apps with Flutter. I've shipped real, working apps — like CyberLearn for cybersecurity education on desktop, and an Android app for network load testing."],
       5:['06 · Three.js','3D in the browser',"3D worlds right inside the browser. The robot looking at you is built with it, and I've also made interactive 3D viewers for boxes and mosaic designs."],
       6:['07 · Python','Automation & AI',"I use Python to automate boring work, process data, and build AI models — from a small script that saves you hours, to a model that learns from data and predicts."],
       7:['08 · PHP','The work behind the scenes',"The work behind the scenes. I build servers, content- and user-management systems, and connect them to databases securely and cleanly."],
       8:['09 · C','Foundations & performance',"The foundation that lets you understand how things work from the root. Close-to-hardware programming — fast, efficient, and it teaches you to respect every byte of memory."],
       9:['10 · AI Engineering','From idea to a working solution',"Building AI systems that actually work — not just experiments. I take the idea and ship it as a solution integrated into a website or app that real people benefit from."],
       10:['11 · AI Training','From data to intelligence',"Data preparation, model training, and fine-tuning for the best possible performance. This is the part that turns raw numbers and data into real intelligence."],
      },
      proj_kicker:'12 · My Work', proj_intro:'My work — tap any project to see the full story (Problem · Solution · Result).',
      contact:['13 · Contact','Ready to work together?',"If you have an idea or a project, or just want to talk — reach out and I'll be happy to work together.",'WhatsApp — message me directly'] },

    tr:{ code:'tr', dir:'ltr', label:'Türkçe', native:'Dilinizi seçin',
      role:'&lt; Yazılım Geliştirici &amp; Yapay Zekâ Mühendisi /&gt;',
      bio:'6+ yıldır kod yazıyorum — web siteleri, uygulamalar ve akıllı sistemler; gördüğünüz arayüzden arka uç sunucusuna ve yapay zekâ modellerine kadar. Aşağıda 12 durak var; her biri iyi bildiğim bir konuyu anlatıyor.',
      stats:['yıl deneyim','Web geliştirme','Flutter uygulamaları','Yapay Zekâ'],
      scroll:'Keşfetmek için kaydırın', levels:['Başlangıç','Orta','İleri'],
      nav:['Ana Sayfa','HTML','CSS','JavaScript','Dart','Three.js','Python','PHP','C','AI Engineering','AI Training','Projeler','İletişim','Oyun Alanı'],
      pg_kicker:'14 · Oyun Alanı', pg_title:'Yapay zekâ robotuyla oyna — Muhammed Elhuseyin',
      pg_hint:'Karakteri döndürmek için fareyle sürükleyin · oynatmak için bir harekete dokunun', cv:'CV İndir',
      pages:{
       1:['02 · HTML','Her web sitesinin iskeleti','Her web sitesinin üzerine kurulduğu yapı. Temiz, düzenli ve anlamsal (semantic) HTML yazarım; her cihazda doğru görünen, arama motorlarına ve erişilebilirliğe dost.'],
       2:['03 · CSS','Güzelleştiği yer','Bir sitenin şık hâle geldiği yer. Modern tasarımlar, yumuşak animasyonlar ve mobil ile masaüstünde çalışan düzenler yaparım — tıpkı şu an önünüzdeki gibi.'],
       3:['04 · JavaScript','Sayfayı etkileşimli yapan şey','Sayfaya can ve etkileşim veren şey. Dinamik mantık yazar, API’lere bağlanır ve takılmayan akıcı deneyimler kurarım. Bu robot ve gezinme tamamen JavaScript.'],
       4:['05 · Dart','Mobil ve masaüstü uygulamalar','Flutter ile uygulama geliştirme dilim. Gerçek, çalışan uygulamalar yayınladım — masaüstünde siber güvenlik eğitimi için CyberLearn ve ağ yük testi için bir Android uygulaması gibi.'],
       5:['06 · Three.js','Tarayıcıda 3D','Doğrudan tarayıcı içinde 3D dünyalar. Size bakan robot bununla kuruldu; ayrıca kutular ve mozaik tasarımlar için etkileşimli 3D görüntüleyiciler yaptım.'],
       6:['07 · Python','Otomasyon ve Yapay Zekâ','Python’u sıkıcı işleri otomatikleştirmek, veri işlemek ve yapay zekâ modelleri kurmak için kullanırım — saatlerinizi kurtaran küçük bir betikten, veriden öğrenip tahmin eden bir modele kadar.'],
       7:['08 · PHP','Perde arkasındaki iş','Perde arkasındaki iş. Sunucular, içerik ve kullanıcı yönetim sistemleri kurar, bunları veritabanlarına güvenli ve düzenli biçimde bağlarım.'],
       8:['09 · C','Temeller ve performans','İşlerin kökten nasıl çalıştığını anlamanı sağlayan temel. Donanıma yakın programlama — hızlı, verimli ve bellekteki her baytı saymayı öğretir.'],
       9:['10 · Yapay Zekâ Mühendisliği','Fikirden çalışan çözüme','Gerçekten çalışan yapay zekâ sistemleri kurmak — yalnızca deney değil. Fikri alıp, gerçek insanların yararlandığı bir web sitesine veya uygulamaya entegre çözüm olarak sunarım.'],
       10:['11 · Model Eğitimi','Veriden zekâya','Veri hazırlama, model eğitimi ve mümkün olan en iyi performans için ince ayar. Ham sayıları ve veriyi gerçek zekâya dönüştüren kısım budur.'],
      },
      proj_kicker:'12 · Çalışmalarım', proj_intro:'Çalışmalarım — tüm hikâyeyi görmek için bir projeye dokunun (Sorun · Çözüm · Sonuç).',
      contact:['13 · İletişim','Birlikte çalışmaya hazır mısınız?','Bir fikriniz ya da projeniz varsa, veya sadece konuşmak isterseniz — bana ulaşın, birlikte çalışmaktan memnuniyet duyarım.','WhatsApp — bana doğrudan yazın'] },
  };

  const pages = [...document.querySelectorAll('#pages .page')];

  function applyLang(code){
    const t = T[code] || T.ar;
    document.documentElement.lang = code;
    document.documentElement.dir  = t.dir;
    document.body.classList.toggle('lang-rtl', t.dir==='rtl');
    document.body.classList.toggle('lang-ltr', t.dir==='ltr');

    // الرئيسية
    const setTxt=(sel,val)=>{ const el=document.querySelector(sel); if(el) el.innerHTML=val; };
    setTxt('.home-role', t.role);
    setTxt('.home-bio', t.bio);
    const stats=document.querySelectorAll('.stats span');
    if(stats[0]) stats[0].innerHTML='<b data-count="6" data-prefix="+">+٦</b> '+t.stats[0];
    for(let i=1;i<4;i++){ if(stats[i]) stats[i].textContent=t.stats[i]; }
    const sh=document.querySelector('.scroll-hint');
    if(sh){ sh.childNodes[0].nodeValue=t.scroll; }

    // صفحات المهارات 1..10
    pages.forEach((p,i)=>{
      const cfg=t.pages[i]; if(!cfg) return;
      const k=p.querySelector('.kicker'); if(k) k.textContent=cfg[0];
      const a=p.querySelector('.arname'); if(a) a.textContent=cfg[1];
      const d=p.querySelector('.page-desc'); if(d) d.textContent=cfg[2];
    });
    // مؤشرات المستوى بكل الصفحات
    document.querySelectorAll('.level .labels').forEach(lab=>{
      const sp=lab.querySelectorAll('span');
      t.levels.forEach((lv,j)=>{ if(sp[j]) sp[j].textContent=lv; });
    });
    // مشاريع + تواصل
    const pk=pages[11]&&pages[11].querySelector('.kicker'); if(pk) pk.textContent=t.proj_kicker;
    const pi=pages[11]&&pages[11].querySelector('.page-desc'); if(pi) pi.textContent=t.proj_intro;
    const c=pages[12];
    if(c){ const ck=c.querySelector('.kicker'); if(ck) ck.textContent=t.contact[0];
           const ca=c.querySelector('.arname'); if(ca) ca.textContent=t.contact[1];
           const cd=c.querySelector('.page-desc'); if(cd) cd.textContent=t.contact[2];
           const cb=c.querySelector('.contact-btn'); if(cb) cb.textContent=t.contact[3]; }
    // Playground
    const pg=pages[13];
    if(pg){ const pk=pg.querySelector('.kicker'); if(pk) pk.textContent=t.pg_kicker;
            const pt=pg.querySelector('.arname'); if(pt) pt.textContent=t.pg_title;
            const ph=pg.querySelector('.pg-hint'); if(ph) ph.textContent=t.pg_hint; }
    if(window.i18nPlayground) window.i18nPlayground(code);
    // روابط السيرة الذاتية (حسب اللغة الحالية)
    document.querySelectorAll('.cv-dl').forEach(a=> a.setAttribute('href','cv/CV_Muhammed_Elhuseyin_'+code.toUpperCase()+'.pdf'));
    document.querySelectorAll('.cv-full').forEach(a=> a.textContent=t.cv);

    // الهيدر (أسماء الصفحات) + المشاريع (كروت/مودال)
    if(window.setNavLabels) window.setNavLabels(t.nav);
    if(window.i18nProjects) window.i18nProjects(code);
    // العدّاد يعيد الحساب
    if(window.runCounters) window.runCounters();

    document.querySelectorAll('.langbtn').forEach(b=> b.classList.toggle('on', b.dataset.lang===code));
    window.currentLang = code;   // بلا حفظ — البطاقة تطلع كل مرة
  }
  window.applyLang = applyLang;

  // ===== بطاقة اختيار اللغة (شاشة البداية = وقت تحميل النموذج 3D) =====
  const splash = document.createElement('div');
  splash.id = 'lang-splash';
  splash.innerHTML =
    '<div class="ls-inner">'
    + '<div class="ls-logo"><svg viewBox="0 0 200 170" width="86" aria-hidden="true"><g fill="none" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path stroke="#4d9fff" d="M42,132 L42,44 L86,96 L130,44 L130,132"/><path stroke="#7cc0ff" d="M112,44 L112,132 M160,44 L160,132 M112,88 L160,88"/></g></svg></div>'
    + '<div class="ls-name">Muhammed Elhuseyin</div>'
    + '<div class="ls-cards">'
    +   ['ar','en','tr'].map(c=>'<button class="ls-card" data-lang="'+c+'"><span class="ls-flag">'+({ar:'AR',en:'EN',tr:'TR'}[c])+'</span><span class="ls-label">'+T[c].label+'</span><span class="ls-sub">'+T[c].native+'</span></button>').join('')
    + '</div></div>';
  document.body.appendChild(splash);
  splash.querySelectorAll('.ls-card').forEach(btn=>{
    btn.addEventListener('click', ()=>{ applyLang(btn.dataset.lang); splash.classList.add('hide'); setTimeout(()=>splash.remove(),500); });
  });

  // البطاقة تطلع كل مرة يفتح فيها الموقع (تعمل كشاشة تحميل للنموذج 3D) — بلا تذكّر
  applyLang('ar');
})();
