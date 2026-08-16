/* ===== الروبوت 3D (Three.js) + تتبّع الماوس بالراس + تفاعل بالضغط ===== */
import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const CFG = window.RobotCFG = {
  base:   'assets/robot/Waving.fbx',   // فيه جسم الروبوت + حركة التحية
  scale:  0.022,
  modelY: -1.15,
  modelX: 1.15,
  camera: { x:0, y:1.05, z:4.9, lookY:1.35 },
  look:   { yaw:1.05, pitch:0.55, ease:0.12, dirYaw:1, dirPitch:1 },
  // حركات إضافية تُحمّل وتُركّب على نفس الهيكل (نفس هيكل Mixamo)
  clips: {
    looking:    'assets/robot/Looking Around.fbx',
    armstretch: 'assets/robot/Arm Stretching.fbx',
    hiphop:     'assets/robot/Hip Hop Dancing.fbx',
    jump:       'assets/robot/Joyful Jump.fbx',
    laugh:      'assets/robot/Sitting Laughing.fbx',
    filing:     'assets/robot/Opening A Filing Cabinet.fbx',
    shoot:      'assets/robot/Shooting Gun.fbx',
    pointing:   'assets/robot/Kneeling Pointing.fbx',
    clap:       'assets/robot/Sitting Clap.fbx',
    walk:       'assets/robot/Standard Walk.fbx',
    breakdance: 'assets/robot/Breakdance Freeze Var 2.fbx',
  },
  fade: 0.35,
};

// حركة كل صفحة (13 صفحة)
const PAGE_ANIM = ['wave','armstretch','hiphop','jump','clap','looking','laugh','filing','shoot','pointing','breakdance','jump','wave'];
const REACTS = ['hiphop'];   // الضغط = رقص
let dancing = false;
let currentPageAnim = 'wave';

const container = document.getElementById('robot-container');

const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, innerWidth/innerHeight, 0.1, 100);
function placeCamera(){
  camera.position.set(CFG.camera.x, CFG.camera.y, CFG.camera.z);
  camera.lookAt(0, CFG.camera.lookY, 0);
}
placeCamera();

/* إضاءة نيون */
scene.add(new THREE.HemisphereLight(0x3a4a66, 0x0a0e16, 0.95));
const key = new THREE.DirectionalLight(0xffffff, 1.15); key.position.set(2,5,4); scene.add(key);
const rim1 = new THREE.PointLight(0x4d9fff,16,22); rim1.position.set(-2.6,1.6,1.4); scene.add(rim1);  // أزرق الموقع
const rim2 = new THREE.PointLight(0xbfd8ff, 8,22); rim2.position.set(2.6,1.2,0.8);  scene.add(rim2);  // أبيض مزرقّ ناعم
const backLit = new THREE.PointLight(0x2a5fbf,9,24); backLit.position.set(0,2.2,-3); scene.add(backLit);

/* ===== تحميل الروبوت + الحركات ===== */
let model, mixer, headBone, headBase, current;
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

// وضعية وقوف طبيعية ثابتة (أول فريم من Looking Around = واقف طبيعي)
function rest(){
  const clip = clips.looking; if(!clip || !mixer) return;
  const a = mixer.clipAction(clip);
  a.reset();
  a.paused = true; a.time = 0;         // نثبّت أول فريم (واقف)
  a.fadeIn(CFG.fade);
  if(current && current !== a) current.fadeOut(CFG.fade);
  a.play();
  current = a;
}

loader.load(CFG.base, async (fbx)=>{
  model = fbx;
  model.scale.setScalar(CFG.scale);
  model.position.set(CFG.modelX, CFG.modelY, 0);
  model.traverse(o=>{
    if(o.isMesh){ o.frustumCulled=false; o.castShadow=true; }
    if(o.isBone && /head/i.test(o.name) && !/end/i.test(o.name)) headBone=o;
  });
  if(headBone) headBase = headBone.rotation.clone();
  scene.add(model);
  if(window.currentAccent) window.robotAccent(window.currentAccent);   // طبّق لون الصفحة الحالية

  mixer = new THREE.AnimationMixer(model);
  if(fbx.animations?.length) clips.wave = fbx.animations[0];

  // بعد ما تخلص أي حركة (مرة وحدة) → يرجع لوضعية وقوف طبيعية ويثبت (الراس يتبّع الماوس)
  mixer.addEventListener('finished', ()=> rest());

  // حمّل باقي الحركات ثم ابدأ بصفحة البيت
  await Promise.all(Object.entries(CFG.clips).map(([n,f])=>loadClip(n,f)));
  window.robotPage(0);                  // حركة الصفحة الرئيسية (تحية)
  document.body.classList.add('robot-ready');
  console.log('[robot] ready ✔ clips:', Object.keys(clips).join(', '), '| head:', headBone?.name);
}, undefined, (err)=> console.error('[robot] base load error:', err));

/* ===== تتبّع الماوس بالراس ===== */
const mouse = { x:0, y:0 };
let curYaw=0, curPitch=0;
addEventListener('mousemove', e=>{
  mouse.x = (e.clientX/innerWidth)*2 - 1;
  mouse.y = (e.clientY/innerHeight)*2 - 1;
});

/* ===== التفاعل بالضغط: raycasting ===== */
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
addEventListener('pointerdown', (e)=>{
  if(!model) return;
  ndc.x =  (e.clientX/innerWidth)*2 - 1;
  ndc.y = -(e.clientY/innerHeight)*2 + 1;
  raycaster.setFromCamera(ndc, camera);
  const hit = raycaster.intersectObject(model, true);
  if(hit.length){
    if(dancing){                       // ضغطة تانية → يوقف الرقص
      dancing = false;
      play(currentPageAnim, false);    // يرجع لحركة الصفحة ثم يتجمّد
    } else {                           // ضغطة → يرقص
      dancing = true;
      play('hiphop', true);
    }
  }
});

/* ===== حلقة الرسم ===== */
function animate(){
  requestAnimationFrame(animate);
  if(mixer) mixer.update(clock.getDelta());
  // الإضاءة الملوّنة من جهة واحدة (يسار) تتنفّس بلطف بلون الصفحة — الجسم يبقى بلونه الأصلي
  if(rim1) rim1.intensity = 16 + Math.sin(clock.elapsedTime*1.8)*4;
  if(headBone && headBase){
    curYaw   += (mouse.x*CFG.look.yaw   - curYaw)   * CFG.look.ease;
    curPitch += (mouse.y*CFG.look.pitch - curPitch) * CFG.look.ease;
    headBone.rotation.set(
      headBase.x + curPitch*CFG.look.dirPitch,
      headBase.y + curYaw*CFG.look.dirYaw,
      headBase.z
    );
  }
  renderer.render(scene, camera);
}
animate();

addEventListener('resize', ()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// يغيّر لون الإضاءة الجانبية (يسار) حسب لون الصفحة — الجسم يبقى بلونه الأصلي
const _accentCol = new THREE.Color(0x4d9fff);
window.robotAccent = (hex)=>{
  _accentCol.set(hex);
  // لون الصفحة بيجي من الضوء الجانبي (يسار) فقط — الجسم يحتفظ بلونه الأصلي
  if(rim1) rim1.color.copy(_accentCol);
};

// يستدعيها نظام التنقّل عند تغيير الصفحة
window.robotPage = (i)=>{
  currentPageAnim = PAGE_ANIM[i] || 'looking';
  dancing = false;
  play(currentPageAnim, false);                  // مرة وحدة ثم يتجمّد
};

// للتجريب من الكونسول
window.applyRobotCFG = ()=>{ if(model){ model.scale.setScalar(CFG.scale); model.position.set(CFG.modelX,CFG.modelY,0);} placeCamera(); };
window.robotPlay = play;
