/* ===== محتوى صفحة "من أنا" — عربي/إنجليزي/تركي، ورسمها بشكل قصّة محرَّرة (أقسام مرقّمة + اقتباس) ===== */
(function(){
  const T = {
    ar: {
      kicker: 'من أنا', subtitle: 'قصة صانع العوالم', waBtn: 'واتساب — راسلني مباشرة',
      nav: ['الرئيسية','إتش تي إم إل','سي إس إس','جافا سكربت','دارت','ثري جي إس','بايثون','بي إتش بي','سي','هندسة الذكاء','تدريب النماذج','مشاريع','تواصل'],
      navAbout: 'من أنا',
      tags: ['أنمي','المحقّق كونان','أكاي شويتشي','سيجارة تفكير','عشق الإسبريسو'],
      pageTitle: 'من أنا — Muhammed Elhuseyin',
      quote: 'أنا أهندس المستقبل، أدرّب الذكاء لأصنع العقول، وأكتب الشيفرات لأحرّك العالم.. فأنا والبرمجة وجهان لنفس العملة، فمَنْ أنتِ في عالمٍ أنا من يخطّ تفاصيله؟',
      sections: [
        { title:'البدايات: من عروس الصحراء إلى شاشات الحواسيب', paras:[
          'وُلِدتُ ونشأتُ في مدينة تدمر (بالميرا) العريقة، عروس الصحراء السورية. منذ الطفولة، لم يكن الحاسوب بالنسبة لي مجرد أداة ترفيه، بل كان نافذة سحرية على عالم مجهول. كنت أقف أمام الشاشة يملؤني فضول طفولي ملح: لماذا يؤدي هذا الزر هذه الوظيفة؟ كيف صُنع هذا النظام؟ كيف تتداخل المكونات لتنطق بكل هذه الأوامر؟',
          'في عام 2015، أجبرتنا ظروف الحرب وقسوة الوضع السياسي على مغادرة سوريا نحو تركيا. ورغم قسوة التهجير وضياع الكثير من معالم الاستقرار، إلا أن ذلك الشغف الدفين بالحاسوب ظل حياً، ينتظر الشرارة الأولى ليشتعل بلا حدود.'
        ]},
        { title:'بين مطابع الواقع ومعامل الأكواد', paras:[
          'قبل أن أستقر تماماً في عوالم الشاشات والبرمجة، خضت تجربة عمل في إحدى المطابع؛ حيث تعلمت معنى الدقة الهندسية، وكيف تتحول الأفكار المجردة إلى واقع ملموس تحت وطأة العمل المستمر والانضباط. تلك اليد التي لامست مكائن الطباعة يوماً، هي ذاتها التي باتت تنسج اليوم خيوط السطور البرمجية بدقة متناهية. فأنا والبرمجة وجهان لنفس العملة؛ منطقي ومنطق الشفرة شيء واحد، وكليهما يكمل الآخر لإنتاج عمل متقن لا يقبل الأخطاء.'
        ]},
        { title:'نقطة التحول: حين ينكسر القلب.. يولد المهندس', paras:[
          'بين عامي 2015 و2020، عشت قصة حب عميقة استمرت خمس سنوات، اعتقدتُ حينها أنها ستكون الميناء الأخير لرحلتي. لكن في نهاية المطاف، اصطدم الحلم بصخرة الواقع المادي؛ إذ اختارت شريكة تلك اللحظة طريقاً آخر، مفضلةً من يملك المال والجاه على من يملك الوفاء والحب الصادق في ذلك الوقت.',
          'كانت صدمة قاسية وكسراً عميقاً لم أستطع تجاوزه بسهولة. لكن، بدل أن يدمرني الحزن، تحول إلى أكبر وقود في حياتي.',
          'توسدتُ أحزاني وجعلت من غرفتي ساحة معركة حقيقية بيني وبين البرمجة. كنت أهرب من مرارة الواقع لأغرق في بحر الأكواد والمعلومات. أجلس الساعات الطوال لا أعرف للوقت طعماً، يرافقني فنجان قهوة مركزة ونفَس دخان في ليالي السهر الطويلة، وأنا أصارع الشاشات: كيف بُني هذا؟ كيف أستطيع برمجته؟ حتى غرقتُ تماماً في عمق هذا العالم، وتدربتُ بقسوة حتى صرتُ ما أنا عليه اليوم.',
          'ولعلها اليوم، حين تتابع من بعيد نجاحاتي، تدرك جيداً حجم خطئها وخسارتها. لولا أنكِ اخترتِ طريقكِ ذاك، ولولا ذلك الكسر، لما وُلد هذا الشغف الجارف ولما وصلت إلى ما أقف عليه اليوم. شكراً لأنكِ لم تبقي.. فلولا رحيلكِ لما وُلد مهندس المستقبل.'
        ]},
        { title:'عوالم الظل والتحقيق: شغف لا ينطفئ', paras:[
          'وحين يهدأ صخب الشاشات وتركيز الأكواد، يبقى هناك عالم آخر يشاركني تفاصيل الهدوء والتركيز؛ شغفي الأبدي بعالم الأنمي، وتحديداً التحفة الفنية المحقق كونان، وعشقي الخاص لشخصية أكاي (Shuichi Akai) بذكائه الحاد، وهدوئه القاتل، ونظراته الثاقبة التي تحسب كل خطوة. ما زلت حتى اليوم أتابع السلسلة وأنتظر أفلامها الجديدة لحظة بلحظة، كأن ذلك الفضول التحليلي جزء لا يتجزأ من شخصيتي الهندسية.'
        ]},
        { title:'فلسفة الصبر وعالم "أم الخمسة حتة"', paras:[
          'في الرمزية الشعبية، يُضرب المثل بـ "أم الخمسة حتة" للدلالة على ذلك الشيء الذي يُبنى ويُجمع من أجزاء صغيرة ومتناثرة ليصبح كياناً متكاملاً متناسقاً. والبرمجة والحياة هما الوجهان لهذه الفلسفة؛ فالأكواد في بدايتها مجرد قطع متفرقة، فوضى عارمة من الدوال والمنطق، وكذلك هي الروح بعد خيبات الأيام وتشتت التفاصيل. لكن بالصبر، وجرعات القهوة المركزة، وسحابات الدخان وسط سكون الليل، تضع كل قطعة في مكانها الصحيح "قطعة إثر قطعة، وخطوة إثر خطوة"، حتى يرتفع البناء عظيماً ومتكاملاً. هكذا جمعتُ أشلائي وبنيتُ عوالمي الرقمية؛ من فوضى الأجزاء صنعتُ هيكلاً هندسياً متقناً لا ينهار.'
        ]},
      ],
      closingTitle: 'اليوم: أهندس المستقبل',
      closing: 'في جميع أوقات فراغي، أجلس خلف حاسوبي الشخصي، أكتب الأكواد، أدرّب الذكاء الاصطناعي، وأتعلم مهارات جديدة يومياً بلا توقف. أنا لا أنفذ المهام وحسب، بل أصنع الأنظمة وأهندس الواقع الرقمي.\nفإن كنت تبحث عن مبرمج عابر، فأنت في المكان الخطأ.. أما إن كنت تبحث عن عقل يبتكر الحلول ويحرك العالم من خلف الشاشات، فأهلاً بك في عالمي.',
    },
    en: {
      kicker: 'About', subtitle: 'The Story of a World-Builder', waBtn: 'WhatsApp — message me directly',
      nav: ['Home','HTML','CSS','JavaScript','Dart','Three.js','Python','PHP','C','AI Engineering','AI Training','Projects','Contact'],
      navAbout: 'About',
      tags: ['Anime','Detective Conan','Akai Shuichi','Thinking Cigarette','Espresso Obsession'],
      pageTitle: 'About — Muhammed Elhuseyin',
      quote: 'I engineer the future, train intelligence to shape minds, and write code to move the world.. I and programming are two faces of the same coin, so who are you, in a world whose details I am the one who charts them?',
      sections: [
        { title:'Beginnings: From the Bride of the Desert to Computer Screens', paras:[
          'I was born and raised in the ancient city of Tadmur (Palmyra), the Bride of the Syrian Desert. Since childhood, the computer was never just a toy to me — it was a magical window onto an unknown world. I would stand before the screen filled with a persistent childhood curiosity: why does this button do this function? How was this system built? How do its components interact to produce all these commands?',
          'In 2015, the harshness of war and the political situation forced us to leave Syria for Türkiye. Despite the brutality of displacement and the loss of so many markers of stability, that deep-seated passion for computers stayed alive, waiting for the first spark to ignite without limits.'
        ]},
        { title:'Between the Presses of Reality and the Workshops of Code', paras:[
          "Before I fully settled into the world of screens and programming, I worked for a time at a printing press, where I learned the meaning of engineering precision, and how abstract ideas turn into tangible reality under the weight of continuous work and discipline. That hand which once touched the printing machines is the same hand that today weaves lines of code with painstaking precision. I and programming are two faces of the same coin; my logic and the logic of code are one and the same, each completing the other to produce flawless work that tolerates no errors."
        ]},
        { title:'The Turning Point: When the Heart Breaks, the Engineer is Born', paras:[
          "Between 2015 and 2020, I lived a deep love story that lasted five years — one I believed, at the time, would be my journey's final harbor. But in the end, the dream collided with the rock of material reality; my partner at that moment chose another path, preferring someone who had money and status over someone who had loyalty and true love.",
          "It was a harsh shock, a deep break I couldn't easily overcome. But instead of letting grief destroy me, it became the greatest fuel of my life.",
          "I pillowed my sorrows and turned my room into a real battlefield between me and programming. I escaped the bitterness of reality to drown in an ocean of code and information. I would sit for hours losing all sense of time, a cup of strong coffee and a breath of smoke keeping me company through long sleepless nights, wrestling with the screens: how was this built? How can I program it? Until I was completely submerged in the depths of this world, and trained myself relentlessly until I became who I am today.",
          "And perhaps today, as she watches my successes from afar, she truly realizes the size of her mistake and her loss. Had you not chosen that path of yours, had it not been for that break, this overwhelming passion would never have been born, and I would never have reached where I stand today. Thank you for not staying.. for had you not left, the engineer of the future would never have been born."
        ]},
        { title:'Worlds of Shadow and Investigation: A Passion That Never Fades', paras:[
          "When the noise of the screens quiets and the focus of code settles, there remains another world that shares in my moments of calm and concentration: my eternal passion for the world of anime, specifically the masterpiece Detective Conan, and my particular admiration for the character Akai Shuichi, with his sharp intellect, lethal calm, and piercing gaze that calculates every step. To this day I still follow the series and count down the moments to its new films, as if that analytical curiosity is an inseparable part of my engineering personality."
        ]},
        { title:'The Philosophy of Patience and the World of "Umm al-Khamseh Hatta"', paras:[
          "In folk symbolism, the proverb “Umm al-Khamseh Hatta” (Mother of Five Pieces) is used to describe something built and assembled from small, scattered parts until it becomes one complete, harmonious whole. Programming and life are two faces of this philosophy: code, in its beginnings, is just scattered pieces — a sweeping chaos of functions and logic — just as the soul is after the disappointments of days and the scattering of details. But with patience, doses of strong coffee, and clouds of smoke amid the stillness of night, every piece finds its rightful place, 'piece by piece, step by step,' until the structure rises, magnificent and complete. This is how I gathered my fragments and built my digital worlds; out of the chaos of parts, I crafted a precise engineering structure that does not collapse."
        ]},
      ],
      closingTitle: 'Today: I Engineer the Future',
      closing: "In all my free time, I sit behind my personal computer, writing code, training artificial intelligence, and learning new skills every day without pause. I don't just execute tasks — I build systems and engineer the digital reality.\nIf you're looking for a passing programmer, you're in the wrong place.. but if you're looking for a mind that invents solutions and moves the world from behind the screens, welcome to my world.",
    },
    tr: {
      kicker: 'Hakkımda', subtitle: 'Bir Dünya Kurucusunun Hikâyesi', waBtn: 'WhatsApp — bana doğrudan yazın',
      nav: ['Ana Sayfa','HTML','CSS','JavaScript','Dart','Three.js','Python','PHP','C','AI Engineering','AI Training','Projeler','İletişim'],
      navAbout: 'Hakkımda',
      tags: ['Anime','Dedektif Conan','Akai Shuichi','Düşünce Sigarası','Espresso Tutkusu'],
      pageTitle: 'Hakkımda — Muhammed Elhuseyin',
      quote: 'Geleceği tasarlıyorum, zihinler inşa etmek için zekâyı eğitiyorum ve dünyayı hareket ettirmek için kod yazıyorum.. Ben ve programlama aynı madalyonun iki yüzüyüz, peki sen, ayrıntılarını benim çizdiğim bir dünyada kimsin?',
      sections: [
        { title:"Başlangıçlar: Çölün Gelini'nden Bilgisayar Ekranlarına", paras:[
          "Suriye çölünün gelini olarak bilinen köklü Tedmür (Palmira) şehrinde doğdum ve büyüdüm. Çocukluğumdan beri bilgisayar benim için sadece bir eğlence aracı değildi; bilinmeyen bir dünyaya açılan sihirli bir pencereydi. Ekranın önünde dinmeyen bir çocukluk merakıyla dururdum: Bu düğme neden bu işlevi yerine getiriyor? Bu sistem nasıl yapıldı? Bileşenler nasıl bir araya gelip tüm bu komutları oluşturuyor?",
          "2015 yılında, savaşın koşulları ve siyasi durumun ağırlığı bizi Suriye'den Türkiye'ye göç etmeye zorladı. Yerinden edilmenin acımasızlığına ve istikrarın birçok işaretinin kaybına rağmen, bilgisayara olan o derin tutku canlı kaldı, sınırsızca alevlenmek için ilk kıvılcımı bekleyerek."
        ]},
        { title:'Gerçeğin Matbaaları ile Kodun Atölyeleri Arasında', paras:[
          "Ekranlar ve programlama dünyasına tamamen yerleşmeden önce, bir matbaada çalışma deneyimi yaşadım; orada mühendislik hassasiyetinin anlamını ve soyut fikirlerin sürekli çalışma ve disiplinin ağırlığı altında nasıl somut gerçekliğe dönüştüğünü öğrendim. Bir zamanlar baskı makinelerine dokunan o el, bugün kod satırlarını büyük bir hassasiyetle ören aynı eldir. Ben ve programlama aynı madalyonun iki yüzüyüz; benim mantığım ile kodun mantığı tek bir şeydir, ikisi de birbirini tamamlayarak hata kabul etmeyen kusursuz bir iş ortaya çıkarır."
        ]},
        { title:'Dönüm Noktası: Kalp Kırıldığında.. Mühendis Doğar', paras:[
          "2015 ile 2020 yılları arasında, o zamanlar yolculuğumun son limanı olacağına inandığım derin bir aşk hikâyesi yaşadım, beş yıl sürdü. Ama sonunda hayal, maddi gerçekliğin kayasına çarptı; o anın partneri başka bir yolu seçti, sadakat ve gerçek sevgiye sahip olanı değil, parası ve statüsü olanı tercih etti.",
          "Acı bir şoktu, kolayca aşamadığım derin bir kırılmaydı. Ama üzüntü beni yok etmek yerine, hayatımın en büyük yakıtına dönüştü.",
          "Kederlerimi yastık yaptım ve odamı benimle programlama arasında gerçek bir savaş alanına çevirdim. Gerçeğin acılığından kaçıp kod ve bilgi okyanusuna daldım. Saatlerce zamanın tadını bilmeden otururdum, güçlü bir fincan kahve ve uzun uykusuz gecelerde bir nefes duman bana eşlik ederken, ekranlarla boğuşuyordum: Bu nasıl yapıldı? Bunu nasıl programlayabilirim? Ta ki bu dünyanın derinliklerine tamamen dalana ve bugün olduğum kişi olana kadar kendimi acımasızca eğitene dek.",
          "Belki de bugün, uzaktan başarılarımı izlerken, hatasının ve kaybının büyüklüğünü iyice anlıyordur. Sen o yolu seçmeseydin, o kırılma olmasaydı, bu coşkun tutku asla doğmazdı ve bugün bulunduğum yere asla ulaşamazdım. Kalmadığın için teşekkür ederim.. çünkü sen gitmeseydin, geleceğin mühendisi asla doğmazdı."
        ]},
        { title:'Gölge ve Soruşturma Dünyaları: Sönmeyen Bir Tutku', paras:[
          "Ekranların gürültüsü dindiğinde ve kodun odağı yerleştiğinde, sakinlik ve yoğunlaşma anlarımı paylaşan başka bir dünya kalır: anime dünyasına olan ebedi tutkum, özellikle de başyapıt Dedektif Conan, ve keskin zekâsı, öldürücü sakinliği ve her adımı hesaplayan delici bakışlarıyla Akai Shuichi karakterine olan özel hayranlığım. Bugün hâlâ diziyi takip ediyor ve yeni filmlerini an be an bekliyorum, sanki o analitik merak mühendislik kişiliğimin ayrılmaz bir parçasıymış gibi."
        ]},
        { title:'Sabrın Felsefesi ve "Umm al-Khamseh Hatta" Dünyası', paras:[
          "Halk sembolizminde, “Umm al-Khamseh Hatta” (Beş Parçanın Anası) deyimi, küçük ve dağınık parçalardan inşa edilip bir araya getirilerek bütünleşmiş, uyumlu bir varlık hâline gelen şeyi tanımlamak için kullanılır. Programlama ve hayat bu felsefenin iki yüzüdür; kod, başlangıcında sadece dağınık parçalardır — fonksiyonların ve mantığın kapsamlı bir kaosu — günlerin hayal kırıklıklarından ve ayrıntıların dağılmasından sonraki ruh da öyledir. Ama sabırla, güçlü kahve dozlarıyla ve gecenin sükûnetindeki duman bulutlarıyla, her parça doğru yerini bulur, 'parça parça, adım adım', ta ki yapı yükselene, muhteşem ve bütün olana kadar. Böylece parçalarımı topladım ve dijital dünyalarımı inşa ettim; parçaların kaosundan, çökmeyen hassas bir mühendislik yapısı yarattım."
        ]},
      ],
      closingTitle: 'Bugün: Geleceği Tasarlıyorum',
      closing: "Tüm boş zamanlarımda, kişisel bilgisayarımın başında oturuyor, kod yazıyor, yapay zekâ eğitiyor ve her gün durmaksızın yeni beceriler öğreniyorum. Sadece görevleri yerine getirmiyorum — sistemler kuruyor ve dijital gerçekliği tasarlıyorum.\nEğer geçici bir programcı arıyorsan, yanlış yerdesin.. ama ekranların arkasından çözümler icat eden ve dünyayı hareket ettiren bir zihin arıyorsan, dünyama hoş geldin.",
    },
  };

  function render(code){
    // نحفظ بالـsessionStorage بالضبط متل i18n.js — هيك لو المستخدم بدّل اللغة من هون ورجع عالرئيسية،
    // اللغة الجديدة بتضل معه (راجع نفس المنطق بـjs/i18n.js applyLang)
    try{ sessionStorage.setItem('lang', code); }catch(e){}
    const t = T[code] || T.ar;
    document.documentElement.lang = code;
    document.documentElement.dir = code==='ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-rtl', code==='ar');
    document.body.classList.toggle('lang-ltr', code!=='ar');

    const set = (sel,val)=>{ const el=document.querySelector(sel); if(el) el.textContent=val; };
    set('[data-t="kicker"]', t.kicker);
    set('[data-t="subtitle"]', t.subtitle);
    set('.about-quote', t.quote);
    set('[data-t="waBtn"]', t.waBtn);
    document.title = t.pageTitle;

    const tagsWrap = document.querySelector('.tags');
    if(tagsWrap) tagsWrap.innerHTML = t.tags.map(tag=>'<span>'+tag+'</span>').join('');

    const secWrap = document.getElementById('about-sections');
    secWrap.innerHTML = t.sections.map((s,i)=>
      '<div class="about-sec">'
      + '<div class="about-sec-num">'+String(i+1).padStart(2,'0')+'</div>'
      + '<div class="about-sec-body">'
      +   '<h3 class="about-sec-title">'+s.title+'</h3>'
      +   s.paras.map(p=>'<p>'+p+'</p>').join('')
      + '</div></div>'
    ).join('');

    const closeWrap = document.getElementById('about-closing');
    closeWrap.innerHTML =
      '<h3 class="about-closing-title">'+t.closingTitle+'</h3>'
      + t.closing.split('\n').map(p=>'<p>'+p+'</p>').join('');

    document.querySelectorAll('.langbtn').forEach(b=> b.classList.toggle('on', b.dataset.lang===code));
    window.currentLang = code;
    // نزامن أسماء الأزرار بالهيدر (اللي بناها nav.js) مع نفس اللغة المختارة هون
    if(window.setNavLabels) window.setNavLabels(t.nav, t.navAbout);
  }

  window.applyLang = render;   // nav.js بيستدعيها من أزرار اللغة بالهيدر (نفس واجهة i18n.js)
  // نبلّش باللغة المحفوظة (لو المستخدم اختارها بصفحة تانية) بدل ما نصفّرها عالعربي دايماً
  let savedLang = null;
  try{ savedLang = sessionStorage.getItem('lang'); }catch(e){}
  render(savedLang && T[savedLang] ? savedLang : 'ar');
})();
