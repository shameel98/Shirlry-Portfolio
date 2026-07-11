const SUPABASE_URL = 'https://wrfbvekawdsfqtyrynad.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZmJ2ZWthd2RzZnF0eXJ5bmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3OTA3NjEsImV4cCI6MjA5OTM2Njc2MX0.D3pPMsBBb53g7z_n88g4ZHFuny6jgtJWpkXPDa0lji4';
const headers = { 'apikey': SUPABASE_KEY };

async function fetchTable(table, order = 'sort_order') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?order=${order}`, { headers });
  return res.json();
}

// Load site settings (GA, Calendly)
async function loadSettings() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?select=*`, { headers });
  const data = await res.json();
  if (data[0]) {
    // Google Analytics
    if (data[0].google_analytics_id) {
      const gaId = data[0].google_analytics_id;
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', gaId);
      };
    }
    // Calendly
    if (data[0].calendly_url) {
      const section = document.querySelector('.calendly-section');
      section.style.display = 'block';
      document.getElementById('calendly-container').innerHTML = `<iframe src="${data[0].calendly_url}" loading="lazy"></iframe>`;
    }
  }
}
loadSettings();

// Load and render all content
async function loadContent() {
  const [hero, stats, methods, speaking, testimonials, certs, gallery, industries, contact] = await Promise.all([
    fetchTable('hero', 'id'),
    fetchTable('stats'),
    fetchTable('method_steps'),
    fetchTable('speaking'),
    fetchTable('testimonials'),
    fetchTable('certifications'),
    fetchTable('gallery'),
    fetchTable('industries'),
    fetchTable('contact_info', 'id')
  ]);

  // Hero
  if (hero[0]) {
    const h = hero[0];
    document.querySelector('.hero-badges').innerHTML = `<span class="badge">${h.badge_1}</span><span class="badge">${h.badge_2}</span>`;
    document.querySelector('.hero-tag').textContent = h.tagline;
    document.querySelector('.hero-title').innerHTML = `<span class="line"><span class="word">${h.title_line_1}</span></span><span class="line"><span class="word accent">${h.title_line_2}</span></span>`;
    document.querySelector('.hero-sub').innerHTML = h.description;
    document.querySelector('.btn-primary').innerHTML = `${h.cta_text} <span class="arrow">→</span>`;
    document.querySelector('.hero-cta-secondary').textContent = h.cta_secondary_text;
  }

  // Stats
  if (stats.length) {
    document.querySelector('.about-stats').innerHTML = stats.map(s => `
      <div class="stat-card">
        <span class="stat-number" data-count="${s.number}">0</span><span class="stat-suffix">${s.suffix || ''}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `).join('');
  }

  // Method Steps
  if (methods.length) {
    document.querySelector('.method-grid').innerHTML = methods.map((m, i) => `
      <div class="method-card reveal">
        <span class="method-number">0${i + 1}</span>
        <h3>${m.title}</h3>
        <p>${m.description}</p>
      </div>
    `).join('');
  }

  // Speaking
  if (speaking.length) {
    document.querySelector('.speaking-grid').innerHTML = speaking.map(s => `
      <div class="speaking-item reveal">
        <span class="speaking-badge">${s.badge}</span>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>
    `).join('');
  }

  // Testimonials
  if (testimonials.length) {
    document.querySelector('.testimonials-grid').innerHTML = testimonials.map(t => `
      <div class="testimonial-card reveal">
        <div class="testimonial-stars">${'★'.repeat(t.rating)}</div>
        <p>"${t.quote}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.author_name[0]}</div>
          <div><strong>${t.author_name}</strong><span>${t.author_role}</span></div>
        </div>
      </div>
    `).join('');
  }

  // Certifications
  if (certs.length) {
    document.querySelector('.cert-grid').innerHTML = certs.map(c => `<div class="cert-badge">${c.name}</div>`).join('');
  }

  // Gallery
  if (gallery.length) {
    document.querySelector('.gallery-grid').innerHTML = gallery.map(g => {
      const bg = g.image_url ? `background:url('${g.image_url}') center/cover` : `background:${g.gradient}`;
      return `<div class="gallery-item ${g.grid_class || ''}" style="${bg}"><span>${g.title}</span></div>`;
    }).join('');
  }

  // Industries
  if (industries.length) {
    document.querySelector('.industry-tags').innerHTML = industries.map(i => `<span class="industry-tag">${i.name}</span>`).join('');
    // Also update marquee
    const marqueeItems = industries.map(i => `<span>${i.name} ✦</span>`).join('');
    document.querySelector('.marquee-track').innerHTML = marqueeItems + marqueeItems;
    // Update domain strip
    const domainItems = industries.map(i => `<span>${i.name}</span>`).join('');
    document.querySelector('.domain-track').innerHTML = domainItems + domainItems;
  }

  // Contact
  if (contact[0]) {
    const c = contact[0];
    document.querySelector('.whatsapp-float').href = `https://wa.me/${c.whatsapp_number}?text=Hi%20Shirley%2C%20I%27d%20like%20to%20discuss%20a%20training%20program.`;
    const links = document.querySelectorAll('.contact-link');
    if (links[0]) { links[0].href = `mailto:${c.email}`; links[0].querySelector('svg').nextSibling.textContent = ` ${c.email}`; }
    if (links[1]) { links[1].href = `tel:${c.phone.replace(/\s/g, '')}`; links[1].querySelector('svg').nextSibling.textContent = ` ${c.phone}`; }
    if (links[2]) { links[2].href = c.linkedin_url; }
  }

  // Re-init animations after content loads
  initAnimations();
}

function initAnimations() {
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

  // Mobile Menu
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

  // GSAP
  gsap.registerPlugin(ScrollTrigger);

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
      if (entry.isIntersecting) entry.target.classList.add('active');
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
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target;
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(el => counterObserver.observe(el));

  // Parallax
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

  // Nav scroll
  window.addEventListener('scroll', () => {
    document.querySelector('.nav').style.background = window.scrollY > 50
      ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.7)';
  });
}

// Load content on page ready
loadContent();

// Lead capture form
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const body = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };
  await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
    body: JSON.stringify(body)
  });
  form.reset();
  form.querySelector('.form-success').style.display = 'block';
  setTimeout(() => form.querySelector('.form-success').style.display = 'none', 5000);
});
