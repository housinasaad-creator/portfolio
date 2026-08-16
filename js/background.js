/* ===== خلفية حيّة: دارات كهربائية بنبضات =====
   خفيفة (Canvas 2D)، ورا كل شي. النبضات تمشي على شبكة خطوط،
   مع عُقد (chips) تلمع، وأثر تلاشي خفيف للحركة. */
(function(){
  const cv = document.getElementById('bg-canvas');
  if(!cv) return;
  const ctx = cv.getContext('2d');
  let W,H,DPR,STEP,cols,rows,pulses=[],nodes=[];
  // لون فضي ثابت — مفصول تماماً عن لون الصفحة (بلا أي تأخير عند التنقّل)
  const SILVER = '#c3ccd9';
  let nodeColor = SILVER;
  window.bgAccent = ()=>{};   // الخلفية ما بتتغيّر مع الصفحة (ثابتة فضية)

  const CFG = {
    stepPx: 58,        // تباعد خطوط الشبكة (أوسع = أهدأ)
    pulseCount: 12,    // عدد النبضات (أقل = أهدأ)
    lineColor:'rgba(150,165,195,.035)',
    pulseColors:['#c3ccd9','#8f9bb0'],   // فضي ثابت
  };

  function resize(){
    DPR = Math.min(devicePixelRatio||1, 2);
    W = cv.width  = innerWidth  * DPR;
    H = cv.height = innerHeight * DPR;
    cv.style.width = innerWidth+'px';
    cv.style.height= innerHeight+'px';
    STEP = CFG.stepPx * DPR;
    cols = Math.ceil(W/STEP);
    rows = Math.ceil(H/STEP);
    build();
  }

  function build(){
    // نبضات تمشي على خطوط الشبكة (أفقي أو عمودي) وتلف أحياناً
    pulses = [];
    for(let i=0;i<CFG.pulseCount;i++) pulses.push(newPulse());
    // عُقد لامعة عند تقاطعات عشوائية
    nodes = [];
    for(let i=0;i<10;i++){
      nodes.push({
        gx: Math.floor(Math.random()*cols),
        gy: Math.floor(Math.random()*rows),
        ph: Math.random()*Math.PI*2,
      });
    }
  }

  function newPulse(){
    const horiz = Math.random()<.5;
    return {
      horiz,
      line: Math.floor(Math.random()*(horiz?rows:cols)),  // أي صف/عمود
      pos:  Math.random()*(horiz?cols:rows),               // الموقع على الخط
      sp:   (0.01+Math.random()*0.02)*(Math.random()<.5?1:-1),
      len:  2+Math.floor(Math.random()*3),                 // طول الذيل
      color:CFG.pulseColors[(Math.random()*CFG.pulseColors.length)|0],
    };
  }

  let t=0;
  function draw(){
    t++;
    // أثر تلاشي خفيف (motion blur) بدل مسح كامل
    ctx.fillStyle='rgba(5,6,15,.22)';
    ctx.fillRect(0,0,W,H);

    // خطوط الشبكة الخافتة
    ctx.strokeStyle=CFG.lineColor;
    ctx.lineWidth=1;
    ctx.beginPath();
    for(let x=0;x<=cols;x++){ctx.moveTo(x*STEP,0);ctx.lineTo(x*STEP,H);}
    for(let y=0;y<=rows;y++){ctx.moveTo(0,y*STEP);ctx.lineTo(W,y*STEP);}
    ctx.stroke();

    // العُقد اللامعة (chips)
    for(const n of nodes){
      const glow = (Math.sin(t*0.03 + n.ph)+1)/2;   // تنفّس
      const x=n.gx*STEP, y=n.gy*STEP, s=3*DPR;
      ctx.save();
      ctx.globalAlpha=0.12+glow*0.45;
      ctx.fillStyle=nodeColor;
      ctx.shadowBlur=(6+glow*12)*DPR;ctx.shadowColor=nodeColor;
      ctx.fillRect(x-s,y-s,s*2,s*2);
      ctx.restore();
    }

    // النبضات
    for(const p of pulses){
      p.pos += p.sp;
      const max = p.horiz?cols:rows;
      if(p.pos<-p.len || p.pos>max+p.len) Object.assign(p, newPulse());
      // ذيل النبضة
      for(let k=0;k<p.len;k++){
        const pp = p.pos - k*Math.sign(p.sp)*0.6;
        const gx = p.horiz? pp : p.line;
        const gy = p.horiz? p.line : pp;
        const x=gx*STEP, y=gy*STEP;
        const a=(1-k/p.len);
        ctx.beginPath();
        ctx.arc(x,y,(2.6-k*0.4)*DPR,0,7);
        ctx.fillStyle=p.color;
        ctx.globalAlpha=a*0.9;
        ctx.shadowBlur=14*DPR;ctx.shadowColor=p.color;
        ctx.fill();
      }
    }
    ctx.globalAlpha=1;ctx.shadowBlur=0;
    requestAnimationFrame(draw);
  }

  addEventListener('resize', resize);
  resize();
  draw();
})();
