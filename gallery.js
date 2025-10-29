// gallery.js — δημιουργεί grid + lightbox από τον πίνακα IMAGES που ορίζεις στη σελίδα

(function () {
  const container = document.getElementById('gallery');
  if (!container) return;

  // Βεβαιώσου ότι υπάρχει IMAGES[] στη σελίδα:
  if (!Array.isArray(window.IMAGES) || window.IMAGES.length === 0) {
    container.innerHTML = '<p style="color:#94a3b8">Δεν έχουν προστεθεί ακόμα εικόνες.</p>';
    return;
  }

  // Φτιάξε το grid
  const frag = document.createDocumentFragment();
  window.IMAGES.forEach((src, idx) => {
    const item = document.createElement('div');
    item.className = 'g-item';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Φωτογραφία ${idx + 1}`;
    img.loading = 'lazy';
    img.decoding = 'async';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', `Προβολή φωτογραφίας ${idx + 1}`);
    btn.addEventListener('click', () => openLightbox(idx));

    item.appendChild(img);
    item.appendChild(btn);
    frag.appendChild(item);
  });
  container.appendChild(frag);

  // Lightbox DOM
  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = `
    <div class="lb-figure" role="dialog" aria-modal="true" aria-label="Μεγάλη προβολή εικόνας">
      <button class="lb-close" aria-label="Κλείσιμο (Esc)">✕</button>
      <button class="lb-prev" aria-label="Προηγούμενη (←)">❮</button>
      <img class="lb-img" alt="">
      <button class="lb-next" aria-label="Επόμενη (→)">❯</button>
      <div class="lb-counter" aria-live="polite"></div>
    </div>
  `;
  document.body.appendChild(lb);

  const imgEl = lb.querySelector('.lb-img');
  const closeBtn = lb.querySelector('.lb-close');
  const prevBtn = lb.querySelector('.lb-prev');
  const nextBtn = lb.querySelector('.lb-next');
  const counter = lb.querySelector('.lb-counter');

  let current = 0;
  let lastFocused = null;

  function update() {
    imgEl.src = window.IMAGES[current];
    imgEl.alt = `Φωτογραφία ${current + 1} από ${window.IMAGES.length}`;
    counter.textContent = `${current + 1} / ${window.IMAGES.length}`;
  }

  function openLightbox(index) {
    current = index;
    lastFocused = document.activeElement;
    update();
    lb.classList.add('open');
    nextBtn.focus();
    document.addEventListener('keydown', onKey);
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.removeEventListener('keydown', onKey);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  }

  function next() { current = (current + 1) % window.IMAGES.length; update(); }
  function prev() { current = (current - 1 + window.IMAGES.length) % window.IMAGES.length; update(); }

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  // Κλείσιμο με κλικ έξω από την εικόνα
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

})();
