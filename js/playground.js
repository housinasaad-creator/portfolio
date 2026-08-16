/* ===== صفحة اللعب: نفس الشخصية 3D بحجم كامل + أزرار حركات + دوران 360° بالماوس (بلا زوم) =====
   يُحمّل فقط أول ما تفتح الصفحة (lazy). موبايل: يُعرض بديل نصّي. */
(function(){
  const stage = document.querySelector('.playground-page .pg-stage');
  const anims = document.querySelector('.playground-page .pg-anims');
  if(!stage || !anims) return;

  // قائمة الحركات (مفتاح، ملف، تسميات بثلاث لغات) — نفس ملفات الروبوت
  const ANIMS = [
    ['wave','assets/robot/Waving.fbx',['تحية','Wave','Selam']],
    ['hiphop','assets/robot/Hip Hop Dancing.fbx',['رقص هيب هوب','Hip-Hop','Hip-Hop']],
    ['breakdance','assets/robot/Breakdance Freeze Var 2.fbx',['بريك دانس','Breakdance','Breakdance']],
    ['jump','assets/robot/Joyful Jump.fbx',['قفزة فرح','Joyful Jump','Sevinç Zıplaması']],
    ['clap','assets/robot/Sitting Clap.fbx',['تصفيق','Clap','Alkış']],
    ['laugh','assets/robot/Sitting Laughing.fbx',['ضحك','Laugh','Gülme']],
    ['walk','assets/robot/Standard Walk.fbx',['مشي','Walk','Yürüme']],
    ['looking','assets/robot/Looking Around.fbx',['تلفّت','Look Around','Etrafına Bak']],
    ['armstretch','assets/robot/Arm Stretching.fbx',['تمدّد','Stretch','Gerinme']],
    ['pointing','assets/robot/Kneeling Pointing.fbx',['إشارة','Point','İşaret']],
    ['shoot','assets/robot/Shooting Gun.fbx',['إطلاق نار','Shoot','Ateş Et']],
    ['filing','assets/robot/Opening A Filing Cabinet.fbx',['أرشفة','Filing','Dosyalama']],
  ];
  const LI = {ar:0,en:1,tr:2};

  // ابنِ الأزرار مبكراً (تشتغل بعد تحميل النموذج)
  anims.innerHTML = ANIMS.map(([k,,lbl])=>'<button class="pg-btn" data-key="'+k+'" disabled>'+lbl[0]+'</button>').join('');
  window.i18nPlayground = (lang)=>{
    const i = LI[lang] ?? 0;
    anims.querySelectorAll('.pg-btn').forEach((b)=>{
      const a = ANIMS.find(x=>x[0]===b.dataset.key); if(a) b.textContent = a[2][i];
    });
  };

  const isMobile = window.matchMedia('(max-width:768px)').matches;
  let inited = false;

  async function init(){
    if(inited || isMobile) return; inited = true;
    const loadingEl = stage.querySelector('.pg-loading');
    const THREE = await import('three');
    const { FBXLoader } = await import('three/addons/loaders/FBXLoader.js');
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

    const canvas = stage.querySelector('#pg-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    // إضاءة (بيضاء + لمسة بلون الصفحة)
    scene.add(new THREE.HemisphereLight(0x99b5ff, 0x0a0e16, 1.0));
    const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(3,6,4); scene.add(key);
    const fill = new THREE.DirectionalLight(0xbfd8ff, 0.6); fill.position.set(-3,2,-2); scene.add(fill);
    const rim = new THREE.PointLight(0xf472b6, 14, 40); rim.position.set(-3,2.5,2); scene.add(rim);
    window.pgRim = rim;

    function size(){
      const w = stage.clientWidth||innerWidth, h = stage.clientHeight||innerHeight;
      renderer.setSize(w,h,false); camera.aspect = w/h; camera.updateProjectionMatrix();
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;          // بلا زوم (طلب المستخدم)
    controls.enablePan  = false;          // بلا تحريك
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.9;
    controls.minPolarAngle = 0.35; controls.maxPolarAngle = Math.PI*0.85;

    let mixer, current; const clips = {}; const clock = new THREE.Clock();
    const loader = new FBXLoader();
    const loadClip = (name,file)=> new Promise(res=>{
      loader.load(file, f=>{ if(f.animations&&f.animations[0]) clips[name]=f.animations[0]; res(); }, undefined, ()=>res());
    });

    function play(name){
      const clip = clips[name]; if(!clip||!mixer) return;
      const a = mixer.clipAction(clip); a.reset(); a.loop = THREE.LoopRepeat; a.fadeIn(0.3);
      if(current && current._clip!==clip) current.fadeOut(0.3);
      a.play(); current = a; current._clip = clip;
      anims.querySelectorAll('.pg-btn').forEach(b=> b.classList.toggle('on', b.dataset.key===name));
    }
    window.pgPlay = play;

    loader.load(ANIMS[0][1], async (fbx)=>{
      const model = fbx;
      model.scale.setScalar(0.022);
      model.position.set(0, -1.15, 0);          // نفس تأطير باقي الصفحات
      model.traverse(o=>{ if(o.isMesh) o.frustumCulled=false; });
      scene.add(model);
      controls.target.set(0, 1.1, 0);           // الدوران حول وسط الجسم
      camera.position.set(0, 1.05, 6.4);        // أبعد شوي من الروبوت الخلفي = شخصية أصغر
      controls.update();

      mixer = new THREE.AnimationMixer(model);
      if(fbx.animations&&fbx.animations[0]) clips.wave = fbx.animations[0];
      if(loadingEl) loadingEl.style.display='none';
      // الشخصية تظهر فوراً مع التحية، وبقية الحركات تُفعّل كل وحدة لما تجهز
      const enable = key=>{ const b=anims.querySelector('.pg-btn[data-key="'+key+'"]'); if(b) b.disabled=false; };
      enable('wave'); play('wave');
      ANIMS.slice(1).forEach(([n,f])=> loadClip(n,f).then(()=> enable(n)));
    }, xhr=>{ if(loadingEl && xhr.total) loadingEl.textContent = Math.round(xhr.loaded/xhr.total*100)+'%'; },
       ()=>{ if(loadingEl) loadingEl.textContent='⚠'; });

    anims.querySelectorAll('.pg-btn').forEach(b=> b.addEventListener('click', ()=> play(b.dataset.key)));

    size(); addEventListener('resize', size);
    (function loop(){
      requestAnimationFrame(loop);
      if(mixer) mixer.update(clock.getDelta());
      controls.update();
      renderer.render(scene, camera);
    })();
    // لون اللمسة يتبع الصفحة
    if(window.currentAccent) try{ rim.color.set(window.currentAccent); }catch(e){}
  }

  window.initPlayground = init;
})();
