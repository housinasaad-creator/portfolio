/* ===== لمسات "البهرجة": مقدّمة سينمائية + عدّادات + إمالة 3D للبطاقات ===== */
(function(){
  // عدّاد الأرقام (أرقام عربية للعربي، لاتينية لغير العربي) — يُعاد تشغيله عند تغيير اللغة
  window.runCounters = function(){
    const ar = (window.currentLang||'ar')==='ar';
    const fmt = n => ar ? String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]) : String(n);
    document.querySelectorAll('[data-count]').forEach(el=>{
      const target = +el.getAttribute('data-count');
      const prefix = el.getAttribute('data-prefix') || '';
      const dur = 1200, t0 = performance.now();
      (function frame(t){
        const p = Math.min((t - t0)/dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + fmt(Math.round(target * eased));
        if(p < 1) requestAnimationFrame(frame);
      })(t0);
    });
  };
  const ready = ()=>{

    /* 1) مقدّمة: الاسم يتكتب حرف-حرف على الرئيسية مع مؤشّر وامض */
    const nameEl = document.querySelector('.home-name');
    if(nameEl){
      const full = 'Muhammed\nElhuseyin';
      nameEl.style.whiteSpace = 'pre';       // نحترم سطر جديد \n
      nameEl.textContent = '';
      const caret = document.createElement('span');
      caret.className = 'type-caret'; caret.textContent = '▋';
      let i = 0;
      (function step(){
        nameEl.textContent = full.slice(0, i);
        nameEl.appendChild(caret);
        if(i < full.length){ i++; setTimeout(step, 68); }
        else setTimeout(()=>caret.remove(), 1400);
      })();
    }

    /* 2) عدّادات: الأرقام تتزايد */
    window.runCounters();

    /* 3) إمالة 3D لبطاقات المشاريع مع الماوس */
    document.querySelectorAll('.proj').forEach(card=>{
      card.addEventListener('mousemove', e=>{
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left)/r.width  - 0.5;
        const py = (e.clientY - r.top )/r.height - 0.5;
        card.style.transform =
          `perspective(650px) rotateX(${(-py*8).toFixed(2)}deg) rotateY(${(px*11).toFixed(2)}deg) translateY(-5px)`;
      });
      card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
    });

  };
  if(document.readyState === 'loading') addEventListener('DOMContentLoaded', ready);
  else ready();
})();
