const lightboxEl = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox__image');
const prevBtn = document.querySelector('.lightbox__prev');
const nextBtn = document.querySelector('.lightbox__next');
const closeBtn = document.querySelector('.lightbox__close');
const galleryLinks = Array.from(document.querySelectorAll('.gallery-item'));
let currentIndex = 0;

function openLightbox(index) {
  const item = galleryLinks[index];
  if (!item) return;
  lightboxImg.src = item.getAttribute('href');
  lightboxImg.alt = item.querySelector('img')?.alt || 'Galeriebild';
  lightboxEl.classList.add('open');
  lightboxEl.setAttribute('aria-hidden', 'false');
  currentIndex = index;
}

function closeLightbox() {
  lightboxEl.classList.remove('open');
  lightboxEl.setAttribute('aria-hidden', 'true');
}

function showNext(step) {
  currentIndex = (currentIndex + step + galleryLinks.length) % galleryLinks.length;
  openLightbox(currentIndex);
}

galleryLinks.forEach((link, index) => {
  link.addEventListener('click', event => {
    event.preventDefault();
    openLightbox(index);
  });
});

prevBtn?.addEventListener('click', () => showNext(-1));
nextBtn?.addEventListener('click', () => showNext(1));
closeBtn?.addEventListener('click', closeLightbox);

lightboxEl?.addEventListener('click', e => {
  if (e.target === lightboxEl) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightboxEl?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext(1);
  if (e.key === 'ArrowLeft') showNext(-1);
});
