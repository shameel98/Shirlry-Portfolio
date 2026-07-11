// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 6 + 'px';
    cursor.style.top = e.clientY - 6 + 'px';
    follower.style.left = e.clientX - 20 + 'px';
    follower.style.top = e.clientY - 20 + 'px';
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.transform = 'scale(1.5)';
      follower.style.borderColor = '#ec4899';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.transform = 'scale(1)';
      follower.style.borderColor = '#a855f7';
    });
  });
}

// Mobile Menu Toggle
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

toggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  toggle.classList.toggle('active');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    toggle.classList.remove('active');
  });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
tl.from('.hero-badges', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
  .from('.hero-tag', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
  .from('.hero-title .word', { y: 60, opacity: 0, duration: 1, stagger: 0.2 }, '-=0.3')
  .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.5')
  .from('.hero-actions', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
  .from('.hero-img-wrapper', { opacity: 0, scale: 0.8, duration: 1 }, '-=1')
  .from('.hero-scroll', { opacity: 0, duration: 0.5 }, '-=0.3');

// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => observer.observe(el));

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.count;
      const duration = 2000;
      const start = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target;
        }
      };
      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

counters.forEach(el => counterObserver.observe(el));

// Parallax on scroll
gsap.to('.hero-blob', {
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
  y: 100, opacity: 0
});

gsap.to('.hero-img-wrapper', {
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
  y: 50
});

// Method cards stagger
gsap.from('.method-card', {
  scrollTrigger: { trigger: '.method-grid', start: 'top 80%' },
  y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out'
});

// Nav background on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.background = window.scrollY > 50
    ? 'rgba(10, 10, 15, 0.95)'
    : 'rgba(10, 10, 15, 0.7)';
});
