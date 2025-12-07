const navList = document.querySelector('.nav ul');
const burger = document.getElementById('burger');
const bodyPage = document.body.dataset.page;

if (burger && navList) {
  burger.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

// Smooth scroll for internal links
const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        navList?.classList.remove('open');
      }
    }
  });
});

// Tabs + gallery filter
const tabs = document.querySelectorAll('.tab');
const galleries = document.querySelectorAll('[data-gallery]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    galleries.forEach(gallery => {
      gallery.classList.toggle('hidden', gallery.dataset.gallery !== target);
    });
  });
});

// Contact form validation
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    const success = document.getElementById('formSuccess');

    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.value.trim()) {
      valid = false;
      document.getElementById('error-name').textContent = 'Bitte Namen eingeben';
    } else {
      document.getElementById('error-name').textContent = '';
    }

    if (!emailPattern.test(email.value.trim())) {
      valid = false;
      document.getElementById('error-email').textContent = 'Bitte gültige E-Mail angeben';
    } else {
      document.getElementById('error-email').textContent = '';
    }

    if (!message.value.trim()) {
      valid = false;
      document.getElementById('error-message').textContent = 'Bitte Nachricht schreiben';
    } else {
      document.getElementById('error-message').textContent = '';
    }

    if (valid) {
      success.textContent = 'Danke für Ihre Anfrage! Wir melden uns schnellstmöglich.';
      form.reset();
    } else {
      success.textContent = '';
    }
  });
}

// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Active nav based on scroll for homepage
if (bodyPage === 'home') {
  const sections = document.querySelectorAll('[data-section]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        const id = sec.getAttribute('id');
        document.querySelectorAll('.nav__link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  });
} else {
  // Set active link for secondary pages
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if ((bodyPage === 'preise' && href.includes('preise')) ||
        (bodyPage === 'videos' && href.includes('videos')) ||
        (bodyPage === 'container' && href.includes('containerhaeuser'))) {
      link.classList.add('active');
    }
  });
}
