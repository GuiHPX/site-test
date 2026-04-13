/* ============================================================
   CHIC RESINE — script.js
============================================================ */

/* ─── Navbar: muda aparência no scroll ─────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ─── Menu mobile ────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});


/* ─── Smooth scroll com offset do nav ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});


/* ─── Scroll-reveal com Intersection Observer ────────────── */
const revealEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Delay escalonado para filhos irmãos
    const siblings = Array.from(
      entry.target.parentElement.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
    );
    const idx   = siblings.indexOf(entry.target);
    const delay = idx * 90;

    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Hero anima ao carregar
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) setTimeout(() => hero.classList.add('visible'), 150);
});


/* ─── Filtro de galeria ──────────────────────────────────── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});


/* ─── Lightbox ───────────────────────────────────────────── */
const lightbox      = document.getElementById('lightbox');
const lightboxInner = document.getElementById('lightbox-inner');
const lightboxClose = document.getElementById('lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('.gallery-img');
    if (!src) return;

    // Clona o bloco de imagem e remove overlay
    const clone = src.cloneNode(true);
    clone.style.width  = '100%';
    clone.style.height = '100%';
    clone.style.aspectRatio = 'auto';
    clone.style.borderRadius = '3px';
    const ov = clone.querySelector('.gallery-overlay');
    if (ov) {
      ov.style.transform  = 'translateY(0)';
      ov.style.background = 'linear-gradient(to top, rgba(46,58,40,.85) 0%, transparent 55%)';
    }

    lightboxInner.innerHTML = '';
    lightboxInner.appendChild(clone);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


/* ─── Formulário de contato (simulação) ──────────────────── */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;

  btn.textContent  = '✓ Mensagem enviada!';
  btn.style.cssText = 'background:#7C8F6A; border-color:#7C8F6A; pointer-events:none;';

  setTimeout(() => {
    btn.textContent  = original;
    btn.style.cssText = '';
    contactForm.reset();
  }, 3500);
});
