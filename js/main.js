/* main.js — interactions for D'WYNGS */
/* - dropdowns, mobile toggle
   - smooth anchors
   - reveal on scroll
   - carousel autoplay + controls
   - modal popups for highlights
   - counters for achievements
   - contact form placeholder behavior
*/

/* Helpers */
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

/* Dropdowns (desktop) */
$$('.has-dropdown').forEach(li => {
  const btn = li.querySelector('.drop-btn');
  const dd = li.querySelector('.dropdown');
  if(!btn || !dd) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    dd.classList.toggle('show', !open);
  });
});
// Close dropdowns on outside click
document.addEventListener('click', (e) => {
  $$('.dropdown').forEach(dd => dd.classList.remove('show'));
  $$('.drop-btn').forEach(b => b.setAttribute('aria-expanded','false'));
});

/* Mobile toggle */
const mobileToggle = $('#mobile-toggle');
mobileToggle && mobileToggle.addEventListener('click', () => {
  const nav = document.querySelector('.main-nav');
  if(!nav) return;
  if(nav.style.display === 'block'){ nav.style.display = ''; }
  else { nav.style.display = 'block'; }
});

/* Smooth anchor links */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if(href.length > 1){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

/* Reveal on scroll using IntersectionObserver */
const revealEls = $$('.reveal');
if(revealEls.length){
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if(en.isIntersecting){
        en.target.classList.add('in-view');
        obs.unobserve(en.target);
      }
    });
  }, {threshold: 0.12});
  revealEls.forEach(el => io.observe(el));
}

/* Portfolio carousel */
function initCarousel(id){
  const c = document.getElementById(id);
  if(!c) return;
  const wrap = c.querySelector('.slides');
  const slides = c.querySelectorAll('.slide');
  let idx = 0;
  const total = slides.length;
  const prev = c.querySelector('.carousel-prev');
  const next = c.querySelector('.carousel-next');
  function go(i){
    idx = (i + total) % total;
    wrap.style.transform = `translateX(-${idx * 100}%)`;
  }
  next.addEventListener('click', ()=> go(idx+1));
  prev.addEventListener('click', ()=> go(idx-1));
  // autoplay
  const auto = parseInt(c.dataset.autoplay) || 0;
  let timer = null;
  if(auto){
    timer = setInterval(()=> go(idx+1), auto);
    c.addEventListener('mouseenter', ()=> clearInterval(timer));
    c.addEventListener('mouseleave', ()=> timer = setInterval(()=> go(idx+1), auto));
  }
}
initCarousel('portfolio-carousel');

/* Modal popup */
const modal = $('#modal');
const modalContent = $('#modal-content');
const modalCloseBtn = modal && modal.querySelector('.modal-close');
function openModal(html){
  modalContent.innerHTML = html;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
modalCloseBtn && modalCloseBtn.addEventListener('click', closeModal);
modal && modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
$$('[data-popup]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = btn.dataset.popup;
    let html = '<h3>Details</h3><p>Information coming soon.</p>';
    if(id === 'proj1') html = '<h3>Festival Poster</h3><p>Large-format poster production, layered source files & print-ready PDFs.</p>';
    if(id === 'proj2') html = '<h3>Restaurant Menu</h3><p>Elegant menu with print and social-ready versions.</p>';
    if(id === 'proj3') html = '<h3>Corporate Banner</h3><p>High-impact banner for events and signage.</p>';
    if(id.startsWith('service')) html = `<h3>Service</h3><p>Details for ${id}.</p>`;
    if(id === 'work') html = '<h3>Portfolio</h3><p>Browse the portfolio carousel on the page.</p>';
    openModal(html);
  });
});

/* Testimonial auto-switch */
(function testSlider(){
  const box = document.getElementById('testimonials-slider');
  if(!box) return;
  const items = Array.from(box.children);
  let t = 0;
  function show(i){ items.forEach((it,idx)=> it.classList.toggle('active', idx===i)); }
  show(0);
  setInterval(()=> { t = (t+1) % items.length; show(t); }, 4500);
})();

/* Counters */
(function counters(){
  const nodes = Array.from(document.querySelectorAll('.stat h3'));
  if(nodes.length === 0) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        if(el.dataset.animated) return;
        el.dataset.animated = 'true';
        const raw = el.textContent.trim();
        const num = parseInt(raw.replace(/\D/g,'')) || 0;
        let current = 0;
        const duration = 1400;
        const stepTime = Math.max(12, Math.floor(duration / Math.max(1, num)));
        const increment = Math.max(1, Math.floor(num / (duration/stepTime)));
        const ticker = setInterval(()=>{
          current += increment;
          if(current >= num){
            el.textContent = raw;
            clearInterval(ticker);
          } else {
            el.textContent = current + (raw.endsWith('+') ? '+' : '');
          }
        }, stepTime);
      }
    });
  }, {threshold:0.25});
  nodes.forEach(n => observer.observe(n));
})();

/* Contact form placeholder */
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  // Optional: show a “sending” message or spinner
  const button = e.target.querySelector("button[type='submit']");
  button.disabled = true;
  button.textContent = "Sending...";

  try {
    const response = await fetch("https://dwyngs-website.onrender.com/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, service, message }),
    });


    const result = await response.json();

    if (result.success) {
      alert("✅ Your message has been sent successfully!");
      document.getElementById("contact-form").reset();
    } else {
      alert("❌ Message failed to send. Please try again later.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Could not connect to the server. Check if backend is running.");
  }

  // Re-enable button
  button.disabled = false;
  button.textContent = "Send Message";
});

/* Footer year */
const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

/* Close modal with Esc key */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeModal();
});
