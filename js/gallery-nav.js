(()=>{                           // minimal lightbox
  const links = [...document.querySelectorAll('a[data-lightbox]')];
  if (!links.length) return;

  let current = -1;
  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,.9);display:flex;justify-content:center;align-items:center;z-index:1001;visibility:hidden;opacity:0;transition:opacity .25s;';
  const img = document.createElement('img');
  img.style.maxWidth = '90vw';
  img.style.maxHeight = '90vh';

  const caption = document.createElement('div');
  caption.style.cssText =
    'color:#fff;margin-top:.5rem;text-align:center;font-size:1rem;';

  const btnPrev  = Object.assign(document.createElement('button'), {textContent:'❮', className:'lb-prev'});
  const btnNext  = Object.assign(document.createElement('button'), {textContent:'❯', className:'lb-next'});
  const btnClose = Object.assign(document.createElement('button'), {textContent:'×', className:'lb-close'});

  [btnPrev, btnNext, btnClose].forEach(b => overlay.appendChild(b));
  overlay.appendChild(document.createElement('div')).append(img, caption);
  document.body.appendChild(overlay);

  function show(i){
    current = i;
    const link = links[i];
    img.src = link.href;
    caption.textContent = link.dataset.title || '';
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
  }

  function hide(){
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.visibility = 'hidden', 250);
  }

  btnPrev.onclick  = () => show((current - 1 + links.length) % links.length);
  btnNext.onclick  = () => show((current + 1) % links.length);
  btnClose.onclick = hide;
  overlay.onclick  = e => { if (e.target === overlay) hide(); };

  document.addEventListener('keydown', e => {
    if (overlay.style.visibility !== 'visible') return;
    if (e.key === 'ArrowLeft')  btnPrev.click();
    if (e.key === 'ArrowRight') btnNext.click();
    if (e.key === 'Escape')     hide();
  });

  links.forEach((link, i) => link.addEventListener('click', e => {
    e.preventDefault();
    show(i);
  }));
})();