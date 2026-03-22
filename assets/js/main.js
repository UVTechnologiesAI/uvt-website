// UV Technologies AI — Main JS

// Nav scroll effect — transparent on hero, white when scrolled
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Set initial state
document.addEventListener('DOMContentLoaded', () => {
  if (window.scrollY > 60) {
    document.getElementById('nav').classList.add('scrolled');
  }
});

// Mobile menu
function toggleMenu() {
  const l = document.querySelector('.nav-links');
  const btn = document.querySelector('.hamburger');
  const isOpen = l.classList.contains('open');
  l.classList.toggle('open');
  btn.setAttribute('aria-expanded', !isOpen);
  // On mobile menu open — make nav white
  if (!isOpen) {
    document.getElementById('nav').style.background = 'rgba(255,255,255,.96)';
  } else {
    if (window.scrollY <= 60) {
      document.getElementById('nav').style.background = 'transparent';
    }
  }
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
    document.querySelector('.hamburger').setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll - elements in viewport show immediately
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  // Check if already in viewport on page load
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    el.classList.add('visible');
  } else {
    obs.observe(el);
  }
});

// Contact form
async function submitForm() {
  const fn = document.getElementById('fn')?.value.trim();
  const biz = document.getElementById('biz')?.value.trim();
  const em = document.getElementById('em')?.value.trim();
  const ln = document.getElementById('ln')?.value.trim() || '';
  const ph = document.getElementById('ph')?.value.trim() || '';
  const svc = document.getElementById('svc')?.value || '';
  const msg = document.getElementById('msg')?.value.trim() || '';
  if (!fn || !biz || !em) { alert('Please fill in your name, business name and email.'); return; }
  const btn = document.querySelector('.form-btn');
  btn.textContent = 'Sending...'; btn.disabled = true;
  try {
    const r = await fetch('https://formspree.io/f/xkoqqddk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: fn + ' ' + ln, business: biz, email: em, phone: ph, service: svc, message: msg })
    });
    if (r.ok) {
      btn.textContent = '✅ Message Sent!';
      btn.style.background = '#10b981'; btn.style.color = '#fff';
      ['fn','ln','biz','em','ph','msg'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
      const s = document.getElementById('svc'); if (s) s.value = '';
      setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; }, 4000);
    } else throw new Error();
  } catch {
    btn.textContent = 'Try Again'; btn.disabled = false;
    alert('Please email us directly: uvtechnologiesai@outlook.com');
  }
}
