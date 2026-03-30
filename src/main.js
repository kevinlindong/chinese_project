import './style.css';

// Film strip loading screen
(() => {
  const loader = document.getElementById('film-loader');
  if (!loader) return;

  document.body.classList.add('loading');

  // After scroll animation finishes (1.4s), crossfade to page
  setTimeout(() => {
    // Reveal page content and start fading loader out simultaneously
    document.body.classList.remove('loading');
    document.body.classList.add('page-ready');
    loader.classList.add('fading');
    requestAnimationFrame(() => {
      loader.classList.add('fade-out');
    });
  }, 1500);

  // Remove loader DOM after fade completes
  setTimeout(() => {
    loader.remove();
  }, 2400);
})();

// Scroll-triggered section reveal
const sections = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.08 }
);
sections.forEach((s) => revealObserver.observe(s));

// Active nav link highlighting
const navLinks = document.querySelectorAll('.nav a');
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { threshold: 0.3 }
);
sections.forEach((s) => navObserver.observe(s));

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// Hero parallax fade
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  window.addEventListener(
    'scroll',
    () => {
      const scrolled = window.scrollY;
      const opacity = Math.max(0, 1 - scrolled / 600);
      heroContent.style.opacity = opacity;
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    },
    { passive: true }
  );
}