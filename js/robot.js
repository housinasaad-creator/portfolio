/* ===== الروبوت 3D (Three.js) + تتبّع الماوس بالراس + تفاعل بالضغط ===== */
// نستنى الصفحة (النص/الهيدر) ترتسم أول، وبعدين نبلّش الشغل الثقيل — بيقلّل إحساس "التجميد" لحظة فتح الموقع
await new Promise(res => (window.requestIdleCallback ? requestIdleCallback(res, {timeout:500}) : setTimeout(res, 150)));
// وننتظر "بوابة الجاهزية" (i18n.js) — لو المستخدم عالموبايل بوضعية طولية، هاي ما بتتحقّق إلا بعد
// ما يلف هاتفه أو يضغط "تمام" بنافذة التنبيه. هيك IS_MOBILE تحت بيحسب صح من أول مرة (مش وقت التحميل
// المبكر لمّا لسا الهاتف طولي والمستخدم لسا ما اختار حتى اللغة).
if(window.__siteReady) await window.__siteReady;
const THREE = await import('three');
const { FBXLoader } = await import('three/addons/loaders/FBXLoader.js');

// لازم and(orientation:portrait) هون بالضبط متل كل الـmedia queries بـstyle.css — وإلا بهاتف بالعرض
// (landscape) بعرض أقل من 768 (متل آيفون SE مثلاً) بيضل الجافاسكربت يحسب موقع الشخصية/الدوائر
// كموبايل (نص الشاشة) بينما الـCSS عم يعرض تنسيق الكمبيوتر — تعارض بيسبّب تراكب كل شي فوق بعضه
const IS_MOBILE = window.matchMedia('(max-width:768px) and (orientation:portrait)').matches;
const ANIMATIONS_ENABLED = false;   // مؤقتاً: الشخصية ثابتة بلا حركات — رح نحكي بالحركات بعدين
const CFG = window.RobotCFG = {
  base:   'assets/robot/Looking Around.fbx',   // Y Bot (Mixamo الافتراضي) — نفس هيكل كل حركات الدوائر تماماً، أصلاً بالمشروع
  targetHeight: 1.72,   // الطول المطلوب بوحدات المشهد — الـscale الفعلي بيتحسب تلقائياً من طول الموديل الخام (بدل رقم مخمّن) — صغّرناها شوي
  modelY: -0.08,   // نزّلنا الشخصية شوي لتحت (بطلب المستخدم)
  modelX: IS_MOBILE ? 0 : 1.15,   // موبايل: بمنتصف الشاشة تماماً (النص فوقه) — ديسكتوب: يمين (النص يسار)
  camera: { x:0, y:1.05, z:4.9, lookY:1.35 },
  look:   { yaw:1.05, pitch:0.55, ease:0.12, dirYaw:1, dirPitch:1 },
  fade: 0.35,
};

// حركات الدوائر العشوائية حوالين الشخصية — كل وحدة تتحمّل بس لمّا تُنقر (مش مسبقاً)، رسمة تقريبية بدل كتابة
const CIRCLE_ANIMS = [
  { key:'defeated',    file:'assets/robot/Defeated.fbx',              icon:'🤕', label:'هزيمة' },
  { key:'spell',       file:'assets/robot/Casting Spell.fbx',         icon:'🪄', label:'تعويذة' },
  { key:'pointing',    file:'assets/robot/Pointing Gesture.fbx',      icon:'👉', label:'إشارة' },
  { key:'stomping',    file:'assets/robot/Stomping.fbx',              icon:'👣', label:'دعس' },
  { key:'listening',   file:'assets/robot/Listening To Music.fbx',    icon:'🎧', label:'موسيقى' },
  { key:'rope',        file:'assets/robot/Rope Climb.fbx',            icon:'🧗', label:'تسلّق' },
  { key:'breakdance',  file:'assets/robot/Breakdance Footwork 2.fbx', icon:'🕺', label:'بريك دانس' },
  { key:'ninja',       file:'assets/robot/Ninja Idle.fbx',            icon:'🥷', label:'نينجا' },
  { key:'kneeling',    file:'assets/robot/Kneeling Idle.fbx',         icon:'🙇', label:'ركوع' },
  { key:'weightshift', file:'assets/robot/Weight Shift Gesture.fbx',  icon:'⚖️', label:'توازن' },
  { key:'crazy',       file:'assets/robot/Crazy Gesture.fbx',         icon:'🤪', label:'جنون' },
  { key:'hang',        file:'assets/robot/Idle To Braced Hang.fbx',   icon:'🤸', label:'تعليق' },
  { key:'whatever',    file:'assets/robot/Whatever Gesture.fbx',      icon:'🤷', label:'ولا يهمك' },
  { key:'defeatidle',  file:'assets/robot/Defeat Idle.fbx',           icon:'😔', label:'إحباط' },
  { key:'victory',     file:'assets/robot/Victory Idle.fbx',          icon:'🏆', label:'انتصار' },
];

const container = document.getElementById('robot-container');

// دقّة عرض أعلى (بعد ما خفّ الموقع كتير — شلنا حركات وplayground وفيديو خلفية تقيل) — شخصية أوضح
const PIXEL_RATIO = IS_MOBILE ? Math.min(devicePixelRatio, 1.5) : Math.min(devicePixelRatio, 2);
const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'high-performance', precision:'highp' });
renderer.setPixelRatio(PIXEL_RATIO);
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, innerWidth/innerHeight, 0.1, 100);
function placeCamera(){
  camera.position.set(CFG.camera.x, CFG.camera.y, CFG.camera.z);
  camera.lookAt(0, CFG.camera.lookY, 0);
}
placeCamera();

/* إضاءة نيون */
scene.add(new THREE.AmbientLight(0xffffff, 0.7));   // إضاءة محيطة عامة
scene.add(new THREE.HemisphereLight(0x5a6a86, 0x1c2230, 1.2));
// الضو عليمين ورا الشخصية (Z سالب = بعيد عن الكاميرا، جوا المشهد) — بيطلع الظل قدامها نحو الكاميرا
const key = new THREE.DirectionalLight(0xffffff, 1.9); key.position.set(3.2,4.3,-2.6); scene.add(key);
// هاد الضو هو مصدر الظل الحقيقي (shadow map) — بيرسم ظل الشخصية الفعلي بدقة تحتها بأي وضعية، مش تتبّع يدوي تقريبي
key.castShadow = true;
key.shadow.mapSize.set(1024,1024);
key.shadow.camera.near = 1; key.shadow.camera.far = 12;
key.shadow.camera.left = -2.4; key.shadow.camera.right = 2.4;
key.shadow.camera.top = 2.8; key.shadow.camera.bottom = -0.8;
key.shadow.bias = -0.0015;
key.target.position.set(CFG.modelX, 0, 0);
scene.add(key.target);
const fill = new THREE.DirectionalLight(0xffffff, 2.4); fill.position.set(-1.5,2,4.5); scene.add(fill);
const rim1 = new THREE.PointLight(0x4d9fff,5,22); rim1.position.set(-2.6,1.6,1.4); scene.add(rim1);  // أزرق الموقع — خفيف، حافة بس مش يلوّن الجسم كامل
const rim2 = new THREE.PointLight(0xbfd8ff, 3,22); rim2.position.set(2.6,1.2,0.8);  scene.add(rim2);  // أبيض مزرقّ ناعم
const backLit = new THREE.PointLight(0x2a5fbf,3,24); backLit.position.set(0,2.2,-3); scene.add(backLit);

/* ===== تحميل الروبوت + الحركات ===== */
let model, mixer, headBone, current;
const clips = {};                    // name -> AnimationClip
const clock = new THREE.Clock();
const loader = new FBXLoader();

// يحمّل ملف FBX ويطلع منه الحركة فقط
function loadClip(name, file){
  return new Promise((res)=>{
    loader.load(file, (f)=>{ if(f.animations?.length) clips[name]=f.animations[0]; res(); },
      undefined, (e)=>{ console.warn('[robot] clip fail', name, e); res(); });
  });
}

// تشغيل حركة مع مزج ناعم؛ loop=false تنعمل مرة وحدة وترجع idle
function play(name, loop=false){
  const clip = clips[name]; if(!clip || !mixer) return;
  const action = mixer.clipAction(clip);
  action.reset();
  action.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
  action.clampWhenFinished = !loop;
  action.fadeIn(CFG.fade);
  if(current && current._clip !== clip) current.fadeOut(CFG.fade);
  action.play();
  current = action;
}

// رجوع سلس (مزج، مش قطع) لحركة "برمجة" (Entering Code) وهي عم تتكرر بحلقة — هاي وضعية الراحة الافتراضية
// (مش وقفة ثابتة). بتنعمل تلقائياً بعد أي حركة توّها خلصت، وكمان أول ما الموقع يفتح.
function rest(){
  const clip = clips.idle; if(!clip || !mixer) return;
  const a = mixer.clipAction(clip);
  a.reset();
  a.loop = THREE.LoopRepeat; a.paused = false;
  a.fadeIn(CFG.fade);
  if(current && current !== a) current.fadeOut(CFG.fade);
  a.play();
  current = a;
}

// عيون + فم — رقعتان منحنيتان فعلياً (جزء من سطح كروي بنفس انحناء الرأس)، ملصوقتان تماماً على الوجه
// وتتقوّسان مع انحناءه بكل نقطة (مش مسطّح جامد). أولاد فعليين لعظمة الراس فبتدور معها صح مهما مالت.
let faceMat;
function addFaceLights(model, headBone){
  model.updateMatrixWorld(true);
  // نحسب مرّة وحدة العلاقة بين محاور عظمة الراس المحلية واتجاه "وجه الشخصية" الثابت بالعالم (+Z نحو الكاميرا)
  const qWorld = new THREE.Quaternion();
  headBone.getWorldQuaternion(qWorld);
  const qInv = qWorld.clone().invert();
  const localForward = new THREE.Vector3(0,0,1).applyQuaternion(qInv).normalize();
  const localUp      = new THREE.Vector3(0,1,0).applyQuaternion(qInv).normalize();
  const localRight   = new THREE.Vector3().crossVectors(localUp, localForward).normalize();

  // نجمع صندوق "الرأس" (أعلى الجسم) بوحدات عظمة الراس المحلية — نفحص زوايا صندوق كل قطعة بس (مش كل نقطة فيها، أسرع بكثير وبلا تجميد)
  const bodyBox = new THREE.Box3().setFromObject(model);
  const bodyHeight = bodyBox.max.y - bodyBox.min.y;
  const yThresh = bodyBox.min.y + bodyHeight*0.86;
  // سقف مسافة معقول من مركز عظمة الراس — يمنع تلوّث حساب حجم الراس من أجزاء بعيدة (متل إيدين T-pose
  // يلي بيطلعوا فوق yThresh بوضعية الراحة الافتراضية بس هني كتفين/إيدين مش راس فعلياً). هاد كان سبب
  // ظهور العينين بعيدين كتير عن الوجه بشخصيات بأبعاد مختلفة عن يلي اتبنى عليها الحساب أصلاً
  const headWorldPos = new THREE.Vector3();
  headBone.getWorldPosition(headWorldPos);
  const maxHeadReach = bodyHeight*0.3;
  const invHeadWorld = new THREE.Matrix4().copy(headBone.matrixWorld).invert();
  const corner = new THREE.Vector3();
  const localBox = new THREE.Box3();     // صندوق الرأس بوحدات عظمة الراس المحلية
  model.traverse(o=>{
    if(o.isMesh && o.geometry){
      o.geometry.computeBoundingBox();
      const bb = o.geometry.boundingBox; if(!bb) return;
      for(let cx=0;cx<2;cx++) for(let cy=0;cy<2;cy++) for(let cz=0;cz<2;cz++){
        corner.set(cx?bb.max.x:bb.min.x, cy?bb.max.y:bb.min.y, cz?bb.max.z:bb.min.z);
        corner.applyMatrix4(o.matrixWorld);                    // زاوية الصندوق بالعالم
        if(corner.y > yThresh && corner.distanceTo(headWorldPos) < maxHeadReach) localBox.expandByPoint(corner.clone().applyMatrix4(invHeadWorld));
      }
    }
  });
  // لو ما لقينا ولا زاوية مؤهّلة (احتمال ضعيف)، منستخدم صندوق افتراضي صغير حوالين عظمة الراس
  // نفسها بدل ما نضل بـ min/max على Infinity (كان بيسبّب NaN بكل حساب الوجه بعدين)
  if(localBox.isEmpty()){
    const fallback = bodyHeight*0.08;
    localBox.set(new THREE.Vector3(-fallback,-fallback,-fallback), new THREE.Vector3(fallback,fallback,fallback));
  }
  // مركز الرأس + نصف أقطاره على المحاور المحلية للوجه (يمين/فوق/أمام) — إهليج مطابق للرأس
  const center = localBox.getCenter(new THREE.Vector3());
  let hr=0, hu=0, hf=0;                                        // نصف القطر: يمين، فوق، أمام
  const rel=new THREE.Vector3();
  // نحسب أقصى امتداد على كل محور من زوايا الصندوق (تقريب جيد لإهليج الرأس)
  for(const cx of [localBox.min.x, localBox.max.x])
   for(const cy of [localBox.min.y, localBox.max.y])
    for(const cz of [localBox.min.z, localBox.max.z]){
      rel.set(cx,cy,cz).sub(center);
      hr=Math.max(hr, Math.abs(rel.dot(localRight)));
      hu=Math.max(hu, Math.abs(rel.dot(localUp)));
      hf=Math.max(hf, Math.abs(rel.dot(localForward)));
    }
  const M = 1.015;   // هامش بسيط ليجلسوا على السطح تماماً (خارجه بقليل جداً)
  hr*=M; hu*=M; hf*=M;

  // رقعة منحنية على سطح الإهليج (center + نصف أقطار مختلفة لكل محور) — بتتبع انحناء الرأس الفعلي بكل نقطة
  function curvedPatch(centerU, centerV, halfW, halfH, segW, segH){
    const pos=[], uv=[], idx=[];
    for(let j=0;j<=segH;j++){
      const vv = centerV - halfH + (2*halfH)*(j/segH);
      for(let i=0;i<=segW;i++){
        const u = centerU - halfW + (2*halfW)*(i/segW);
        const p = center.clone()
          .addScaledVector(localForward, hf*Math.cos(u)*Math.cos(vv))
          .addScaledVector(localRight,   hr*Math.sin(u)*Math.cos(vv))
          .addScaledVector(localUp,      hu*Math.sin(vv));
        pos.push(p.x,p.y,p.z); uv.push(i/segW,1-j/segH);
      }
    }
    for(let j=0;j<segH;j++) for(let i=0;i<segW;i++){
      const a=j*(segW+1)+i, b=a+1, c=a+segW+1, d=c+1;
      idx.push(a,c,b, b,c,d);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos,3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv,2));
    g.setIndex(idx);
    g.computeBoundingSphere();
    return g;
  }

  faceMat = new THREE.MeshBasicMaterial({ color:0xe0bb85, side:THREE.DoubleSide, depthTest:true, depthWrite:false,
    polygonOffset:true, polygonOffsetFactor:-8, polygonOffsetUnits:-8, toneMapped:false });
  window.robotFaceMat = faceMat;

  // عيون طوليّة (ضيّقة وعالية) — كل وحدة مبنية بزاويتها الخاصة فبتتقوّس صح بمكانها بالضبط
  [-1,1].forEach(side=>{
    const eyeGeo = curvedPatch(side*0.20, 0.05, 0.045, 0.095, 6, 10);
    const eye = new THREE.Mesh(eyeGeo, faceMat);
    eye.renderOrder = 10;
    headBone.add(eye);
  });

  // فم أصغر ومنحني تحت العينين
  const mouthGeo = curvedPatch(0, -0.16, 0.075, 0.022, 10, 4);
  const mouth = new THREE.Mesh(mouthGeo, faceMat);
  mouth.renderOrder = 10;
  headBone.add(mouth);
}

loader.load(CFG.base, async (fbx)=>{
  model = fbx;
  // نحسب الـscale تلقائياً من طول الموديل الخام (Mannequin بأبعاد إنسان حقيقي، مختلفة كلياً عن Ch44) —
  // بدل ما نخمّن رقم، منقيس صندوقه الحقيقي ومنطلّع نسبة توصّله للطول المطلوب بالمشهد بالضبط
  const rawBox = new THREE.Box3().setFromObject(fbx);
  const rawHeight = rawBox.max.y - rawBox.min.y;
  CFG.scale = CFG.targetHeight / rawHeight;
  model.scale.setScalar(CFG.scale);
  model.position.set(CFG.modelX, CFG.modelY, 0);
  model.traverse(o=>{
    if(o.isMesh){
      o.frustumCulled=false; o.castShadow=true;
      // لون الجسم نفس لون الخوذة تقريباً (رمادي غامق/فحمي) — بدل اللون الأزرق الافتراضي تبع Y Bot
      const bodyMats = Array.isArray(o.material) ? o.material : [o.material];
      bodyMats.forEach(m=>{ if(m && m.color) m.color.set(0x3a3a3c); });
      // العيون/الفم/الحواجب قطع رقيقة منفصلة بتنرسم فوق الوجه بالشفافية — لازم ترتيب رسم متأخّر
      // + إزاحة مضلّع (polygonOffset) لتفادي تداخل العمق مع سطح الوجه (يلي كان يخفيها/يبيّضها)
      if(/eye|mouth|brow|_h_|^h_Geo/i.test(o.name)){
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach(m=>{
          if(!m) return;
          // alphaMap بThree.js بيقرا القناة الخضراء مش قناة الشفافية الحقيقية — وهون alphaMap وmap
          // نفس الصورة بالضبط، فكانت الشفافية الحقيقية عم تتضرب بقناة خضرا غلط وبتلغي الفم بالكامل.
          // القناة الحقيقية موجودة أصلاً بـmap نفسها (RGBA) فما بدنا alphaMap إطلاقاً.
          if(m.alphaMap){ m.alphaMap = null; }
          m.transparent = true; m.alphaTest = 0.05; m.depthWrite = false;
          // إزاحة بسيطة (‑1) بس لتفادي تداخل العمق مع جلد الوجه الملاصق — مش قوية متل قبل (‑4)
          // حتى ما تخترق الخوذة. هيك ملامح الوجه بتنحجب ورا الخوذة (بتبان من قدّام بس، مش من ورا).
          m.polygonOffset = true; m.polygonOffsetFactor = -1; m.polygonOffsetUnits = -1;
          m.needsUpdate = true;
        });
        o.renderOrder = 5;
      }
    }
    if(o.isBone && /head/i.test(o.name) && !/end/i.test(o.name)) headBone=o;
  });
  scene.add(model);
  if(window.currentAccent) window.robotAccent(window.currentAccent);   // طبّق لون الصفحة الحالية

  // خط محيطي حوالين الشخصية (outline) — نسخة مقلوبة من كل قطعة جسم (وجهها للداخل + متمدّدة شوي عبر normal
  // خاصتها) بلون غامق، بترسم قبل الجسم الأصلي فبتبين كخط رفيع حوالين الحواف بس. بتتحرك مع الحركات لأنها
  // مربوطة بنفس الهيكل العظمي بالضبط (SkinnedMesh بترجع لنفس skeleton الأصلي)
  const outlineMat = new THREE.MeshBasicMaterial({ color:0x0c0a08, side:THREE.BackSide });
  outlineMat.onBeforeCompile = (shader)=>{
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\ntransformed += normalize(objectNormal) * 0.006;'
    );
  };
  model.traverse(o=>{
    if(!o.isMesh || /eye|mouth|brow|_h_|^h_Geo/i.test(o.name)) return;
    let outline;
    if(o.isSkinnedMesh){
      outline = new THREE.SkinnedMesh(o.geometry, outlineMat);
      outline.bind(o.skeleton, o.bindMatrix);
    } else {
      outline = new THREE.Mesh(o.geometry, outlineMat);
    }
    outline.renderOrder = 1;
    o.parent.add(outline);
  });

  // بنحسب أوطى نقطة فعلية برجلين الشخصية (bounding box حقيقي) بدل ما نخمّن رقم — هيك القاعدة بتنضبط تحتها
  // بالضبط مهما كانت أبعاد الموديل، وما في احتمال تداخل/غطس نهائياً
  model.updateMatrixWorld(true);
  const feetY = new THREE.Box3().setFromObject(model).min.y;

  // قاعدة مدوّرة واقعية بلون الخلفية — نقش حلقات دائرية خفيف (متل أرضية الصورة المرجعية) + حافة أغمق تعطيها عمق
  const pedCanvas = document.createElement('canvas');
  pedCanvas.width = pedCanvas.height = 256;
  const pctx = pedCanvas.getContext('2d');
  pctx.fillStyle = '#141210'; pctx.fillRect(0,0,256,256);
  pctx.strokeStyle = 'rgba(58,50,38,.45)';
  for(let r=16; r<126; r+=11){ pctx.lineWidth = (r%33<11)?1.7:1; pctx.beginPath(); pctx.arc(128,128,r,0,Math.PI*2); pctx.stroke(); }
  const pedGlow = pctx.createRadialGradient(128,128,0,128,128,128);
  pedGlow.addColorStop(0,'rgba(201,151,95,.14)'); pedGlow.addColorStop(1,'rgba(201,151,95,0)');
  pctx.fillStyle = pedGlow; pctx.fillRect(0,0,256,256);
  // بقعة غامقة ثابتة وواضحة بنص القاعدة (تحت وقفة الشخصية) — توحي بظل تلامس ثابت، فوق الظل الحقيقي المتحرك
  const pedShadowBlob = pctx.createRadialGradient(128,128,0,128,128,72);
  pedShadowBlob.addColorStop(0,'rgba(0,0,0,1)'); pedShadowBlob.addColorStop(0.55,'rgba(0,0,0,.75)'); pedShadowBlob.addColorStop(1,'rgba(0,0,0,0)');
  pctx.fillStyle = pedShadowBlob; pctx.fillRect(0,0,256,256);
  const pedTex = new THREE.CanvasTexture(pedCanvas);

  // ملاحظة: بلا environment map، الأسطح metallic بتطلع سودا حتى لو في ضو مباشر عليها (لأنها بتعكس البيئة مش الضو) —
  // فخليناها كلها قريبة من متلا صفر عشان تاخد الضو المباشر/المحيطي صح وتبين مضوّية فعلاً
  const PED_R = 0.95, PED_H = 0.11;
  const pedTopY = feetY + 0.03;               // رفعناها أكتر لفوق (كانت 0.13 تحت الرجلين، هلق شوي فوق أوطى نقطة)
  // depthWrite:false على القاعدة كلها — هيك بغض النظر عن أي تداخل هندسي بسيط بالحواف، الشخصية (يلي بترسم
  // بعدها بترتيب أعلى) بتفوز دايماً بالظهور فوقها ومستحيل تبين غاطسة/مقطوعة منها
  const pedTopMat = new THREE.MeshStandardMaterial({ map:pedTex, roughness:.6, metalness:.05, depthWrite:false });
  const pedSideMat = new THREE.MeshStandardMaterial({ color:0x15120e, roughness:.55, metalness:.05, depthWrite:false });
  // ميلان بصري بسيط (~3°) حوالين محور Z لتعويض منظور الكاميرا المائل (الشخصية بعيدة عن محور نظر
  // الكاميرا أفقياً)، يلي كان بخلّي القاعدة تبين مرفوعة من جهة اليسار أكتر من اليمين رغم إنها مسطّحة فعلياً
  const PED_TILT_FIX = THREE.MathUtils.degToRad(3);
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(PED_R, PED_R*1.08, PED_H, 56), [pedSideMat, pedTopMat, pedSideMat]);
  pedestal.position.set(CFG.modelX, pedTopY - PED_H/2, 0.02);
  pedestal.rotation.z = PED_TILT_FIX;
  pedestal.renderOrder = 0;
  pedestal.receiveShadow = true;   // بيستقبل ظل الشخصية الحقيقي (shadow map) فوق سطحها
  scene.add(pedestal);
  // حافة علوية فاتحة رفيعة — بتلمع مع الضو وبتدي إحساس حافة صلبة حقيقية
  const rimEdge = new THREE.Mesh(new THREE.TorusGeometry(PED_R*1.01,0.014,10,56),
    new THREE.MeshStandardMaterial({ color:0xa88f6c, roughness:.4, metalness:.15, depthWrite:false }));
  // مو rotation.x/.z العاديين — ترتيب أويلر XYZ الافتراضي بThree.js بيطبّق X وبعدين Z حوالين محور
  // Z المحلي (يلي صار شبه عمودي بعد تدوير X)، فميلان Z العادي ما كان عم يأثّر تقريباً. بالكواتيرنيون
  // منقدر نضمن ترتيب التطبيق الصحيح: فلطحة X محلية أول، وميلان Z عالمي فوقها كطبقة تانية.
  rimEdge.quaternion
    .setFromAxisAngle(new THREE.Vector3(0,0,1), PED_TILT_FIX)
    .multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), Math.PI/2));
  rimEdge.position.set(CFG.modelX, pedTopY, 0.02);
  rimEdge.renderOrder = 0;
  scene.add(rimEdge);
  // سبوت لايت أفقي (بنفس ارتفاع نص الشخصية تقريباً) موجّه عليها من الجنب — بيدي لمعة واضحة عالجسم بدل الرش من فوق
  const pedLight = new THREE.SpotLight(0xfff2df, 12, 8, Math.PI/4.2, 0.5, 1.1);
  pedLight.position.set(CFG.modelX + 2.4, 1.15, 1.6);
  pedLight.target.position.set(CFG.modelX, 1.0, 0);
  scene.add(pedLight, pedLight.target);

  // أسطوانة ضو طالعة من القاعدة — نسيج فيه رموز/كلمات برمجة عشوائية بيتحرّك للفوق كل فريم بتغيير offset بس
  // (مش هندسة متحرّكة ولا حساب إضافي بالرندر)، خفيفة جداً على الجهاز: مجسّم واحد بلا إضاءة (MeshBasicMaterial)
  const beamCanvas = document.createElement('canvas');
  beamCanvas.width = 160; beamCanvas.height = 320;
  const bctx = beamCanvas.getContext('2d');
  bctx.font = '15px "JetBrains Mono", monospace';
  bctx.textAlign = 'center'; bctx.textBaseline = 'middle';
  const glyphs = ['{ }','( )','[ ]',';',',','=>','&&','||','==','let','const','fn','if','for','return','</>','01','#','//','++','::','=>','{','}'];
  for(let i=0;i<40;i++){
    const gx = 10 + Math.random()*140, gy = 12 + Math.random()*296;
    bctx.fillStyle = `rgba(224,187,133,${(0.32+Math.random()*0.55).toFixed(2)})`;
    bctx.fillText(glyphs[(Math.random()*glyphs.length)|0], gx, gy);
  }
  const beamTex = new THREE.CanvasTexture(beamCanvas);
  beamTex.wrapS = beamTex.wrapT = THREE.RepeatWrapping;
  beamTex.repeat.set(3.2,2.2);
  const beamH = 1.7;
  const beamMat = new THREE.MeshBasicMaterial({ map:beamTex, transparent:true, opacity:.32,
    blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide, toneMapped:false });
  // تلاشي تدريجي لفوق (مش قصّة حادة) — الرموز بتخف وتختفي بنعومة قبل ما توصل لآخر الأسطوانة
  beamMat.onBeforeCompile = (shader)=>{
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vBeamY;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvBeamY = position.y;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vBeamY;')
      .replace('#include <dithering_fragment>',
        `#include <dithering_fragment>\nfloat beamFade = 1.0 - smoothstep(${(beamH*0.5-0.7).toFixed(3)}, ${(beamH*0.5).toFixed(3)}, vBeamY);\ngl_FragColor.a *= beamFade;`);
  };
  // 240° بس (بدل 180°) بالجزء البعيد عن الكاميرا (ورا الشخصية)، متمركزة تماماً بالخلف — حتى الكلام ما يغطي عليها من قدام
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(PED_R,PED_R,beamH,40,1,true, Math.PI/3, Math.PI*4/3), beamMat);
  beam.position.set(CFG.modelX, pedTopY + beamH/2, 0.02);   // نزّلناه حتى يلامس سطح القاعدة (كان عم يعوم فوقها بفجوة 0.25)
  beam.renderOrder = 0;
  scene.add(beam);
  window.robotBeamTex = beamTex;   // حلقة الرسم بتحرّك offset.y تبعها لتعطي إحساس بيانات صاعدة
  // نضمن ترتيب الرسم: الشخصية دايماً فوق القاعدة، حتى لو صار أي تقارب هندسي بالحواف
  model.traverse(o=>{ if(o.isMesh && !o.renderOrder) o.renderOrder = 2; });

  mixer = new THREE.AnimationMixer(model);

  // بعد ما تخلص أي حركة (مرة وحدة) → يرجع لوضعية وقوف طبيعية بمزج ناعم، بدون أي تقطيع
  mixer.addEventListener('finished', ()=> rest());

  document.body.classList.add('robot-ready');
  console.log('[robot] ready ✔ (base) | head:', headBone?.name);
  buildAnimCircles();
  // حركة "برمجة" (Entering Code) هي الوضعية الافتراضية من أول لحظة فتح الموقع، وعم تتكرر بحلقة —
  // مش بوضعية T-pose الخام، وأي حركة تانية بترجع لهاي بعد ما تخلص (كانت غلط بتحمّل Looking Around بدل Entering Code)
  loadClip('idle', 'assets/robot/Entering Code.fbx').then(()=> rest());
}, undefined, (err)=> console.error('[robot] base load error:', err));

/* ===== حلقة الرسم ===== */
function animate(){
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  if(mixer) mixer.update(dt);
  // الإضاءة الملوّنة من جهة واحدة (يسار) تتنفّس بلطف بلون الصفحة — الجسم يبقى بلونه الأصلي
  if(rim1) rim1.intensity = 5 + Math.sin(clock.elapsedTime*1.8)*1.5;
  // إحساس بيانات صاعدة بأسطوانة الضو — بس بتحريك offset.y بالتكستشر، بلا أي حساب هندسي إضافي
  if(window.robotBeamTex) window.robotBeamTex.offset.y -= dt*0.18;
  // تتبّع الراس للماوس معطّل (بطلب المستخدم) — الراس ثابت بوضعيته الأصلية
  // الظل ثابت بمنتصف القاعدة (مش بيلاحق الرجلين) — بحجم كبير كافي يغطي أي وضعية، لتفادي أي عدم تطابق ممكن يصير بحركات الرجل السريعة
  renderer.render(scene, camera);
}
animate();

// سحب لتدوير الشخصية أفقياً بس — دوران كامل ٣٦٠° (يمين/يسار)، بلا أي دوران عمودي
// #robot-container بيغطّي مساحة كبيرة من الشاشة، فلازم نتأكد إنه الضغطة قريبة فعلياً من الشخصية
// (نطاق دائري حواليها بس) قبل ما نبلّش السحب، مش أي ضغطة بأي مكان بالحاوية الكبيرة
const DRAG_RADIUS = 170;   // بكسل حوالين مركز الشخصية تقريباً
// بيرجع المسافة (بكسل) من نقطة الماوس لمركز الشخصية بالشاشة — نفس النقطة المستخدمة بفحص نطاق السحب
function distFromCharacter(clientX, clientY){
  const anchor = new THREE.Vector3(CFG.modelX, CFG.targetHeight*0.5, 0);
  anchor.project(camera);
  const rect = renderer.domElement.getBoundingClientRect();
  const sx = (anchor.x*0.5+0.5)*rect.width + rect.left;
  const sy = (-anchor.y*0.5+0.5)*rect.height + rect.top;
  return Math.hypot(clientX-sx, clientY-sy);
}
let dragging=false, dragStartX=0, dragStartRotY=0;
container.style.cursor = 'none';
container.addEventListener('pointerdown', e=>{
  if(!model || distFromCharacter(e.clientX,e.clientY) > DRAG_RADIUS) return;   // برّا نطاق الشخصية — تجاهل
  dragging=true; dragStartX=e.clientX; dragStartRotY=model.rotation.y;
  container.style.cursor='grabbing';
});
addEventListener('pointerup', ()=>{ dragging=false; if(model) container.style.cursor = 'none'; });
addEventListener('pointercancel', ()=>{ dragging=false; if(model) container.style.cursor = 'none'; });
addEventListener('pointermove', e=>{
  if(dragging){
    if(!model) return;
    const dx = e.clientX - dragStartX;
    model.rotation.y = dragStartRotY + dx*0.009;
    return;
  }
  // إيدة السحب (يد الماوس) بتبين بس جوا نطاق الشخصية الفعلي، مش بكل الحاوية الكبيرة
  if(model) container.style.cursor = (distFromCharacter(e.clientX,e.clientY) <= DRAG_RADIUS) ? 'grab' : 'none';
});

function syncViewport(){
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
addEventListener('resize', syncViewport);
// index.html بتبعت هالحدث بعد ما تضبط/تشيل meta viewport (وضعية الهاتف بالعرض) وتستنى فريمين
// حتى innerWidth الحقيقي يستقر — هون بنعيد المزامنة بعد هيك بالضبط
addEventListener('logical-resize', syncViewport);

// يغيّر لون الإضاءة الجانبية (يسار) حسب لون الصفحة — الجسم يبقى بلونه الأصلي
const _accentCol = new THREE.Color(0x4d9fff);
window.robotAccent = (hex)=>{
  _accentCol.set(hex);
  // لون الصفحة بيجي من الضوء الجانبي (يسار) + عيون/فم الروبوت — الجسم يحتفظ بلونه الأصلي
  if(rim1) rim1.color.copy(_accentCol);
  if(faceMat) faceMat.color.copy(_accentCol);
};

// يستدعيها نظام التنقّل عند تغيير الصفحة — الحركة هلق بس عن طريق الدوائر، مش أوتوماتيك بالصفحات
window.robotPage = ()=>{};

// ===== دوائر الحركات: بتتحمّل الحركة بس أول ما تُنقر (lazy load)، وبتشتغل فوراً وبتضل واقفة عآخر فريم =====
let animLoading = null;
function playAnimLazy(key, file, btn){
  if(!mixer) return;
  if(clips[key]){ play(key, false); return; }
  if(animLoading) return;   // نمنع نقرات متزاحمة أثناء تحميل حركة تانية
  animLoading = key;
  if(btn) btn.classList.add('loading');
  loadClip(key, file).then(()=>{
    animLoading = null;
    if(btn) btn.classList.remove('loading');
    play(key, false);
  });
}

// بتبني الدوائر بمواقع عشوائية (غير منتظمة) — كلها بطرف يمين الشخصية بس، بعيدة عنها وعن منطقة الكتابة
function buildAnimCircles(){
  const wrap = document.createElement('div');
  wrap.id = 'anim-dots';
  const DOT_R = 28;   // نصف قطر الدائرة (56px) — لازم نحسبه حتى الحافة الخارجية تضل بعيدة عن طرف الشاشة، مش مركزها بس
  const charCX = (IS_MOBILE ? 0.5 : 0.72) * innerWidth;
  const charHalfW = IS_MOBILE ? 95 : 125;           // نصف عرض منطقة الشخصية تقريباً
  const gap = IS_MOBILE ? 55 : 40;                    // مسافة أمان عن الشخصية
  const rightStart = charCX + charHalfW + gap;
  const rightEnd   = innerWidth - 34 - DOT_R;
  const yMin = 96, yMax = innerHeight - 56 - DOT_R;
  const placed = [];
  function tryPlace(){
    for(let tries=0; tries<50; tries++){
      const x = rightStart + Math.random()*Math.max(20, rightEnd-rightStart);
      const y = yMin + Math.random()*(yMax-yMin);
      const ok = placed.every(p => Math.hypot(p.x-x, p.y-y) > 74);   // ما يتلاصقوا ببعض (الدوائر كبرت)
      if(ok) return {x,y};
    }
    return null;   // ما لقينا مكان فاضي — منتخطّى هالدائرة
  }
  CIRCLE_ANIMS.forEach((a,i)=>{
    const pos = tryPlace(); if(!pos) return;
    placed.push(pos);
    const b = document.createElement('button');
    b.className = 'anim-dot'; b.type = 'button';
    b.style.left = pos.x+'px'; b.style.top = pos.y+'px';
    b.style.animationDelay = (i*70)+'ms';
    b.innerHTML = '<span class="dot-ic">'+a.icon+'</span>';
    b.title = a.label; b.setAttribute('aria-label', a.label);
    b.addEventListener('click', ()=> playAnimLazy(a.key, a.file, b));
    wrap.appendChild(b);
  });
  document.body.appendChild(wrap);
}

// للتجريب من الكونسول
window.applyRobotCFG = ()=>{ if(model){ model.scale.setScalar(CFG.scale); model.position.set(CFG.modelX,CFG.modelY,0);} placeCamera(); };
window.robotPlay = play;
window.__robotDebugTris = ()=>{
  let tris = 0;
  if(model) model.traverse(o=>{
    if(o.isMesh && o.geometry){
      const g = o.geometry;
      tris += g.index ? g.index.count/3 : g.attributes.position.count/3;
    }
  });
  return tris;
};
