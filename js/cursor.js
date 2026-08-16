/* ===== مؤشّر مخصّص: رِتيكل تصويب ===== */
(function(){
  if(matchMedia('(hover:none)').matches) return;  // الموبايل: بلا مؤشّر مخصّص
  const dot  = document.getElementById('cdot');
  const ring = document.getElementById('cring');
  if(!dot || !ring) return;

  let mx=innerWidth/2, my=innerHeight/2, rx=mx, ry=my;

  addEventListener('mousemove', e=>{
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
  });

  // الحلقة تلحق الماوس بنعومة
  (function loop(){
    rx += (mx-rx)*0.18;
    ry += (my-ry)*0.18;
    ring.style.left=rx+'px';
    ring.style.top =ry+'px';
    requestAnimationFrame(loop);
  })();

  // التفاعل: يكبر ويلف فوق العناصر التفاعلية
  const sel = 'a,button,.glass,.hoverable,[data-hover]';
  document.addEventListener('mouseover', e=>{
    if(e.target.closest(sel)) document.body.classList.add('hovering');
  });
  document.addEventListener('mouseout', e=>{
    if(e.target.closest(sel)) document.body.classList.remove('hovering');
  });
})();
