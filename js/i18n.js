/* ===== نظام اللغات (i18n) + بطاقة اختيار اللغة على البداية (تعمل كشاشة تحميل) =====
   3 لغات: عربي (الأصل) · إنجليزي · تركي. بلا حفظ — البطاقة تطلع كل مرة يفتح فيها الموقع. */
(function(){
  const T = {
    ar:{ code:'ar', dir:'rtl', label:'العربية', native:'اختر لغتك',
      role:'&lt; مبرمج ومهندس ذكاء صناعي /&gt;',
      bio:'من 6 سنين عم برمج. ببني مواقع وتطبيقات وأنظمة ذكية — من الواجهة اللي بتشوفها، للسيرفر ورا الكواليس، لنماذج الذكاء الصناعي. تحت معك 14 محطة، كل وحدة بتحكي عن شي بعرفه منيح.',
      stats:['سنين خبرة','تطوير ويب','تطبيقات Flutter','ذكاء صناعي'],
      scroll:'مرّر للاستكشاف', levels:['مبتدئ','متوسط','متقدّم'],
      nav:['الرئيسية','من أنا','إتش تي إم إل','سي إس إس','جافا سكربت','دارت','ثري جي إس','بايثون','بي إتش بي','سي','هندسة الذكاء','تدريب النماذج','مشاريع','تواصل','اللعب'],
      about:{ kicker:'02 · من أنا', title:'About', subtitle:'قصة قبل الكود',
        paragraphs:[
          'اسمي محمد الحسين، من مواليد مدينة تدمر — عروس الصحراء — في محافظة حمص، سوريا. حملت من طفولتي فضولاً لا يهدأ: لماذا يفعل هذا الزرّ ما يفعله؟ وكيف صُنع؟ كان هذا السؤال بذرة رحلتي مع الحاسوب، قبل أن تُقسّم الحرب الطريق وتُبعثر الخطى.',
          'في عام 2015 غادرت سوريا إلى تركيا، هرباً من احتدام الأوضاع، حاملاً معي فضولي ذاك، وإن كان الطريق إلى عمق البرمجة قد تأخّر بفعل الظروف.',
          'في تلك السنة نفسها بدأت قصة حبٍّ امتدت خمس سنوات، حتى عام 2020، حين اختارت من أحببتها طريقاً آخر — الزواج بمن قدّم لها استقراراً مادياً لم أكن أملكه حينها. لم يكن الأمر سهلاً؛ سقطت في اكتئاب طويل، لكنه — من غير أن أدري — كان نقطة التحوّل الحقيقية في حياتي.',
          'هربت من الواقع نحو شاشة الحاسوب، فوجدت نفسي أغرق في بحر من المعلومات، أسأل: كيف بُني هذا؟ وكيف أبنيه أنا؟ سؤال يقود إلى سؤال، حتى تحوّلت ساعات الهروب إلى سنوات من الشغف والبناء، وصولاً إلى ما أنا عليه اليوم.',
          'أعرف يقيناً أنها لو رأت اليوم ما وصلت إليه — هذا الشغف، هذا الطموح — لتردّدت. وربما، من بعيد، تراقب الآن ما آل إليه الأمر. مهما يكن، أشكرها: فلولا أنها لم تخترني، لما وصلت إلى ما أنا عليه اليوم.',
          'اليوم، أقضي معظم وقتي خلف حاسوبي: أكتب الشيفرات، أدرّب نماذج الذكاء الاصطناعي، وأتعلّم كل يوم شيئاً جديداً.',
        ],
        quote:'أنا أهندس المستقبل، أدرّب الذكاء لأصنع العقول، وأكتب الشيفرات لأحرّك العالم... فمن أنتِ في عالمٍ أنا من يخطّ تفاصيله؟',
        extra:'وبعيداً عن الشاشة: أحبّ الأنمي، وأتابع «المحقّق كونان» باستمرار، وشخصيتي المفضّلة هي أكاي شويتشي. أحب كرة القدم، وأميل للعزلة أكثر من الثرثرة — أجلس ساعاتٍ طويلة خلف حاسوبي، أنسى أحياناً موعد نومي، وأنسى نفسي في العالم الذي أبنيه.',
        tags:['أنمي','المحقّق كونان','أكاي شويتشي','كرة القدم'] },
      pg_kicker:'15 · اللعب', pg_title:'اللعب مع روبوت الذكاء — محمد الحسين',
      pg_hint:'اسحب بالماوس لتدوير الشخصية · اضغط أي حركة لتنفّذها', cv:'السيرة الذاتية',
      pages:{
       2:['03 · إتش تي إم إل','هيكل أي موقع','البنية اللي بينبني عليها أي موقع. بكتب HTML نظيف ومرتّب، دلالي (semantic)، وبراعي إنه يفتح صح على أي جهاز، ويكون سهل لمحرّكات البحث ولذوي الاحتياجات.'],
       3:['04 · سي إس إس','هون بصير حلو','هون بصير الموقع حلو ومرتّب. بشتغل تصاميم عصرية، حركات ناعمة، وترتيب بيزبط على الموبايل والكمبيوتر — متل هالموقع اللي قدامك هلق.'],
       4:['05 · جافا سكربت','اللي بيخلي الصفحة تتفاعل','اللي بيعطي الصفحة حياة وتفاعل. بكتب منطق ديناميكي، بربط مع APIs، وبعمل تجارب سلسة بتشتغل بدون ما تعلّق. هالروبوت والتنقّل اللي عم تستعمله كله جافا سكربت.'],
       5:['06 · دارت','تطبيقات موبايل وديسكتوب','لغتي لبناء التطبيقات مع Flutter. عملت فيها تطبيقات حقيقية شغّالة — متل CyberLearn لتعليم الأمن السيبراني على الديسكتوب، وتطبيق أندرويد لفحص تحمّل أجهزة الشبكة.'],
       6:['07 · ثري جي إس','ثلاثي الأبعاد بالمتصفح','عوالم ثلاثية الأبعاد جوّا المتصفح. الروبوت اللي عم يتطلّع فيك هلق مبني فيها، وكمان عملت عارضات ثلاثية الأبعاد تفاعلية لعلب وتصاميم موزاييك.'],
       7:['08 · بايثون','الأتمتة والذكاء الصناعي','بستخدم بايثون لأتمتة الشغل الممل، ومعالجة الداتا، وبناء نماذج الذكاء الصناعي. من سكربت صغير بيوفّرلك ساعات، لنموذج بيتعلّم من الداتا ويتنبّأ.'],
       8:['09 · بي إتش بي','الشغل ورا الكواليس','الشغل ورا الكواليس. ببني سيرفرات وأنظمة إدارة محتوى ومستخدمين، وبربطها بقواعد بيانات بشكل آمن ومنظّم.'],
       9:['10 · سي','الأساس والأداء','الأساس اللي بيخليك تفهم كيف بتشتغل الأشياء من الجذر. برمجة قريبة من العتاد، سريعة وفعّالة، وبتعلّمك تحترم كل بايت بالذاكرة.'],
       10:['11 · هندسة الذكاء الصناعي','من الفكرة لحل شغّال','بناء أنظمة ذكاء صناعي شغّالة فعلياً — مش بس تجارب. آخد الفكرة وأركّبها كحل مدمج بموقع أو تطبيق بيستفيد منه الناس على أرض الواقع.'],
       11:['12 · تدريب النماذج','من الداتا لذكاء','تجهيز الداتا، تدريب النماذج، وضبطها (fine-tuning) لتطلع بأحسن أداء ممكن. هاد الجزء اللي بيحوّل أرقام وداتا خام لذكاء فعلي.'],
      },
      proj_kicker:'13 · شغلي', proj_intro:'شغلي — اضغط أي مشروع لتشوف القصة كاملة (المشكلة · الحل · النتيجة).',
      contact:['14 · تواصل','جاهز نشتغل سوا؟','إذا عندك فكرة أو مشروع، أو بس بدك تحكي — راسلني وبكون سعيد نشتغل سوا.','واتساب — راسلني مباشرة'] },

    en:{ code:'en', dir:'ltr', label:'English', native:'Choose your language',
      role:'&lt; Software Developer &amp; AI Engineer /&gt;',
      bio:"I've been coding for 6+ years — building websites, apps, and intelligent systems, from the interface you see to the back-end server and AI models. There are 14 stations below; each one is about something I know well.",
      stats:['years experience','Web development','Flutter apps','Artificial Intelligence'],
      scroll:'Scroll to explore', levels:['Beginner','Intermediate','Advanced'],
      nav:['Home','About','HTML','CSS','JavaScript','Dart','Three.js','Python','PHP','C','AI Engineering','AI Training','Projects','Contact','Playground'],
      about:{ kicker:'02 · About', title:'About', subtitle:'A story before the code',
        paragraphs:[
          "My name is Muhammed Elhuseyin, born in Tadmur — the Bride of the Desert, ancient Palmyra — in Homs Governorate, Syria. As a child I carried a curiosity that never rested: why does this button do what it does, and how was it made? That question was the seed of my journey with computers, long before war would divide the road and scatter the steps.",
          "In 2015 I left Syria for Türkiye, fleeing an escalating crisis, carrying that curiosity with me — though the road into the depths of programming would still have to wait.",
          "That same year, a love story began that would last five years, until 2020, when the person I loved chose another path: marriage to someone who could offer the financial security I couldn't yet provide. It wasn't easy. I fell into a long depression — but, without knowing it then, that became the true turning point of my life.",
          "I fled reality toward my computer screen, and found myself drowning in an ocean of information, asking: how was this built? How can I build it myself? One question led to another, until the hours of escape became years of passion and creation — bringing me to who I am today.",
          "I know, with certainty, that if she saw what I've become — this passion, this ambition — she might have hesitated. And perhaps, from a distance, she watches now. Either way, I thank her: had she not chosen otherwise, I wouldn't have become who I am today.",
          "Today, I spend most of my time behind a screen: writing code, training AI models, and learning something new every day.",
        ],
        quote:"I engineer the future, train intelligence to shape minds, and write code to move the world... so who are you, in a world whose details I am the one writing?",
        extra:"Beyond the screen: I love anime, and I follow Detective Conan closely — my favorite character is Akai Shuichi. I enjoy football, and I lean toward solitude more than small talk — I sit for long hours behind my computer, sometimes forgetting to sleep, losing myself in the world I'm building.",
        tags:['Anime','Detective Conan','Akai Shuichi','Football'] },
      pg_kicker:'15 · Playground', pg_title:'Play with the AI robot — Muhammed Elhuseyin',
      pg_hint:'Drag with the mouse to rotate the character · tap any move to play it', cv:'Download CV',
      pages:{
       2:['03 · HTML','The skeleton of any website',"The structure every website is built on. I write clean, well-organized, semantic HTML that renders correctly on any device and stays friendly to search engines and accessibility."],
       3:['04 · CSS','Where it gets beautiful',"This is where a site becomes polished. I craft modern designs, smooth animations, and layouts that work on mobile and desktop — like the one in front of you now."],
       4:['05 · JavaScript','What makes the page interactive',"What gives a page life and interaction. I write dynamic logic, connect to APIs, and build smooth experiences that never lag. This robot and navigation are all JavaScript."],
       5:['06 · Dart','Mobile & desktop apps',"My language for building apps with Flutter. I've shipped real, working apps — like CyberLearn for cybersecurity education on desktop, and an Android app for network load testing."],
       6:['07 · Three.js','3D in the browser',"3D worlds right inside the browser. The robot looking at you is built with it, and I've also made interactive 3D viewers for boxes and mosaic designs."],
       7:['08 · Python','Automation & AI',"I use Python to automate boring work, process data, and build AI models — from a small script that saves you hours, to a model that learns from data and predicts."],
       8:['09 · PHP','The work behind the scenes',"The work behind the scenes. I build servers, content- and user-management systems, and connect them to databases securely and cleanly."],
       9:['10 · C','Foundations & performance',"The foundation that lets you understand how things work from the root. Close-to-hardware programming — fast, efficient, and it teaches you to respect every byte of memory."],
       10:['11 · AI Engineering','From idea to a working solution',"Building AI systems that actually work — not just experiments. I take the idea and ship it as a solution integrated into a website or app that real people benefit from."],
       11:['12 · AI Training','From data to intelligence',"Data preparation, model training, and fine-tuning for the best possible performance. This is the part that turns raw numbers and data into real intelligence."],
      },
      proj_kicker:'13 · My Work', proj_intro:'My work — tap any project to see the full story (Problem · Solution · Result).',
      contact:['14 · Contact','Ready to work together?',"If you have an idea or a project, or just want to talk — reach out and I'll be happy to work together.",'WhatsApp — message me directly'] },

    tr:{ code:'tr', dir:'ltr', label:'Türkçe', native:'Dilinizi seçin',
      role:'&lt; Yazılım Geliştirici &amp; Yapay Zekâ Mühendisi /&gt;',
      bio:'6+ yıldır kod yazıyorum — web siteleri, uygulamalar ve akıllı sistemler; gördüğünüz arayüzden arka uç sunucusuna ve yapay zekâ modellerine kadar. Aşağıda 14 durak var; her biri iyi bildiğim bir konuyu anlatıyor.',
      stats:['yıl deneyim','Web geliştirme','Flutter uygulamaları','Yapay Zekâ'],
      scroll:'Keşfetmek için kaydırın', levels:['Başlangıç','Orta','İleri'],
      nav:['Ana Sayfa','Hakkımda','HTML','CSS','JavaScript','Dart','Three.js','Python','PHP','C','AI Engineering','AI Training','Projeler','İletişim','Oyun Alanı'],
      about:{ kicker:'02 · Hakkımda', title:'About', subtitle:'Koddan önceki hikâye',
        paragraphs:[
          "Adım Muhammed Elhuseyin. Suriye'nin Humus vilayetine bağlı, \"Çölün Gelini\" olarak bilinen antik Palmira — Tedmür şehrinde doğdum. Çocukluğumdan beri hiç dinmeyen bir merak taşıdım: Bu düğme neden bunu yapıyor, nasıl yapıldı? Bu soru, savaşın yolları bölüp adımları dağıtmasından çok önce, bilgisayarla olan yolculuğumun tohumuydu.",
          "2015 yılında, tırmanan krizden kaçarak Suriye'den Türkiye'ye geldim; o merakı da yanımda taşıyarak — yazılımın derinliklerine inmek için yolum henüz beklemek zorundaydı.",
          "Aynı yıl, 2020'ye kadar sürecek beş yıllık bir aşk hikâyesi başladı. O yıl, sevdiğim kişi başka bir yolu seçti: o dönem benim sunamadığım maddi güvenceyi sunabilen biriyle evlendi. Kolay değildi. Uzun bir depresyona girdim — ama o zamanlar farkında olmadan, bu hayatımın gerçek dönüm noktası oldu.",
          "Gerçeklikten bilgisayar ekranına kaçtım ve kendimi bir bilgi okyanusunda buldum: Bu nasıl yapıldı? Bunu ben nasıl yapabilirim? Bir soru diğerini doğurdu, ta ki kaçış saatleri tutku ve inşa yıllarına dönüşene, beni bugün olduğum kişiye getirene kadar.",
          "Eminim ki, bugün ulaştığım noktayı — bu tutkuyu, bu hırsı — görseydi tereddüt ederdi. Belki de şimdi, uzaktan izliyordur. Ne olursa olsun, ona teşekkür ederim: beni seçmemiş olmasaydı, bugün olduğum kişi olamazdım.",
          "Bugün vaktimin çoğunu ekranın arkasında geçiriyorum: kod yazıyor, yapay zekâ modelleri eğitiyor ve her gün yeni bir şey öğreniyorum.",
        ],
        quote:"Geleceği tasarlıyorum, zihinler inşa etmek için zekâyı eğitiyorum ve dünyayı hareket ettirmek için kod yazıyorum... peki sen, ayrıntılarını benim yazdığım bir dünyada kimsin?",
        extra:"Ekranın ötesinde: anime severim ve Dedektif Conan'ı yakından takip ederim — favori karakterim Akai Shuichi. Futbol oynamayı severim ve sohbetten çok yalnızlığa yönelirim — bilgisayarımın başında uzun saatler geçiririm, bazen uyumayı unuturum, inşa ettiğim dünyada kendimi kaybederim.",
        tags:['Anime','Dedektif Conan','Akai Shuichi','Futbol'] },
      pg_kicker:'15 · Oyun Alanı', pg_title:'Yapay zekâ robotuyla oyna — Muhammed Elhuseyin',
      pg_hint:'Karakteri döndürmek için fareyle sürükleyin · oynatmak için bir harekete dokunun', cv:'CV İndir',
      pages:{
       2:['03 · HTML','Her web sitesinin iskeleti','Her web sitesinin üzerine kurulduğu yapı. Temiz, düzenli ve anlamsal (semantic) HTML yazarım; her cihazda doğru görünen, arama motorlarına ve erişilebilirliğe dost.'],
       3:['04 · CSS','Güzelleştiği yer','Bir sitenin şık hâle geldiği yer. Modern tasarımlar, yumuşak animasyonlar ve mobil ile masaüstünde çalışan düzenler yaparım — tıpkı şu an önünüzdeki gibi.'],
       4:['05 · JavaScript','Sayfayı etkileşimli yapan şey','Sayfaya can ve etkileşim veren şey. Dinamik mantık yazar, API’lere bağlanır ve takılmayan akıcı deneyimler kurarım. Bu robot ve gezinme tamamen JavaScript.'],
       5:['06 · Dart','Mobil ve masaüstü uygulamalar','Flutter ile uygulama geliştirme dilim. Gerçek, çalışan uygulamalar yayınladım — masaüstünde siber güvenlik eğitimi için CyberLearn ve ağ yük testi için bir Android uygulaması gibi.'],
       6:['07 · Three.js','Tarayıcıda 3D','Doğrudan tarayıcı içinde 3D dünyalar. Size bakan robot bununla kuruldu; ayrıca kutular ve mozaik tasarımlar için etkileşimli 3D görüntüleyiciler yaptım.'],
       7:['08 · Python','Otomasyon ve Yapay Zekâ','Python’u sıkıcı işleri otomatikleştirmek, veri işlemek ve yapay zekâ modelleri kurmak için kullanırım — saatlerinizi kurtaran küçük bir betikten, veriden öğrenip tahmin eden bir modele kadar.'],
       8:['09 · PHP','Perde arkasındaki iş','Perde arkasındaki iş. Sunucular, içerik ve kullanıcı yönetim sistemleri kurar, bunları veritabanlarına güvenli ve düzenli biçimde bağlarım.'],
       9:['10 · C','Temeller ve performans','İşlerin kökten nasıl çalıştığını anlamanı sağlayan temel. Donanıma yakın programlama — hızlı, verimli ve bellekteki her baytı saymayı öğretir.'],
       10:['11 · Yapay Zekâ Mühendisliği','Fikirden çalışan çözüme','Gerçekten çalışan yapay zekâ sistemleri kurmak — yalnızca deney değil. Fikri alıp, gerçek insanların yararlandığı bir web sitesine veya uygulamaya entegre çözüm olarak sunarım.'],
       11:['12 · Model Eğitimi','Veriden zekâya','Veri hazırlama, model eğitimi ve mümkün olan en iyi performans için ince ayar. Ham sayıları ve veriyi gerçek zekâya dönüştüren kısım budur.'],
      },
      proj_kicker:'13 · Çalışmalarım', proj_intro:'Çalışmalarım — tüm hikâyeyi görmek için bir projeye dokunun (Sorun · Çözüm · Sonuç).',
      contact:['14 · İletişim','Birlikte çalışmaya hazır mısınız?','Bir fikriniz ya da projeniz varsa, veya sadece konuşmak isterseniz — bana ulaşın, birlikte çalışmaktan memnuniyet duyarım.','WhatsApp — bana doğrudan yazın'] },
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
    if(stats[0]) stats[0].innerHTML='<b data-count="6" data-prefix="+">+6</b> '+t.stats[0];
    for(let i=1;i<4;i++){ if(stats[i]) stats[i].textContent=t.stats[i]; }
    const sh=document.querySelector('.scroll-hint');
    if(sh){ sh.childNodes[0].nodeValue=t.scroll; }

    // من أنا (صفحة 1)
    const ab = pages[1];
    if(ab && t.about){
      const A = t.about;
      const k=ab.querySelector('.kicker'); if(k) k.textContent=A.kicker;
      const ttl=ab.querySelector('.page-title'); if(ttl) ttl.textContent=A.title;
      const sub=ab.querySelector('.arname'); if(sub) sub.textContent=A.subtitle;
      const txt=ab.querySelector('.about-text'); if(txt) txt.innerHTML=A.paragraphs.map(p=>'<p>'+p+'</p>').join('');
      const q=ab.querySelector('.about-quote'); if(q) q.textContent=A.quote;
      const ex=ab.querySelector('.about-extra'); if(ex) ex.textContent=A.extra;
      const tg=ab.querySelectorAll('.tags span');
      A.tags.forEach((tag,i)=>{ if(tg[i]) tg[i].textContent=tag; });
    }

    // صفحات المهارات (2..11)
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
    // مشاريع (13) + تواصل (14)
    const pk=pages[12]&&pages[12].querySelector('.kicker'); if(pk) pk.textContent=t.proj_kicker;
    const pi=pages[12]&&pages[12].querySelector('.page-desc'); if(pi) pi.textContent=t.proj_intro;
    const c=pages[13];
    if(c){ const ck=c.querySelector('.kicker'); if(ck) ck.textContent=t.contact[0];
           const ca=c.querySelector('.arname'); if(ca) ca.textContent=t.contact[1];
           const cd=c.querySelector('.page-desc'); if(cd) cd.textContent=t.contact[2];
           const cb=c.querySelector('.contact-btn'); if(cb) cb.textContent=t.contact[3]; }
    // Playground (15)
    const pg=pages[14];
    if(pg){ const pgk=pg.querySelector('.kicker'); if(pgk) pgk.textContent=t.pg_kicker;
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
