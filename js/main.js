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

    // ✅ Pricing Details
    if (id === 'order-starter') {
      html = `
        <h3>Starter Plan</h3>
        <ul>
          <li>🎨 1 custom poster design</li>
          <li>✏️ 2 revisions included</li>
          <li>⚡ Fast delivery (2–3 days)</li>
          <li>💼 Perfect for small businesses or single campaigns.</li>
        </ul>
      `;
    }

    if (id === 'order-pro') {
      html = `
        <h3>Pro Plan</h3>
        <ul>
          <li>🖋️ 3 unique designs + branding polish</li>
          <li>♾️ Unlimited revisions</li>
          <li>💬 Dedicated design consultant</li>
          <li>🚀 Ideal for growing brands and social campaigns.</li>
        </ul>
      `;
    }

    if (id === 'contact-sales') {
      html = `
        <h3>Enterprise Plan</h3>
        <ul>
          <li>🏢 Custom pricing based on your needs</li>
          <li>👥 Team onboarding and design training</li>
          <li>🎯 Full branding package (logo, colors, typography)</li>
          <li>📞 Contact our sales team for a tailored plan.</li>
        </ul>
      `;
    }

    // 🎨 Portfolio Details (new full info for Portfolio 2.0)
    if (id === 'proj1') html = `
      <h3>Festival Poster</h3>
      <img src="assets/work1.jpg" alt="Festival Poster" style="width:100%;border-radius:8px;margin:8px 0;">
      <p>Large-format festival poster with layered source files and print-ready PDFs.</p>
      <p><strong>Tools:</strong> Adobe Photoshop</p>
      <p><strong>Client:</strong> Cultural Event Agency</p>
    `;

    if (id === 'proj2') html = `
      <h3>Restaurant Menu</h3>
      <img src="assets/work2.jpg" alt="Restaurant Menu" style="width:100%;border-radius:8px;margin:8px 0;">
      <p>Elegant multi-page menu designed for both print and digital sharing.</p>
      <p><strong>Tools:</strong> InDesign, Photoshop</p>
      <p><strong>Client:</strong> Urban Eats Bistro</p>
    `;

    if (id === 'proj3') html = `
      <h3>Corporate Banner</h3>
      <img src="assets/work3.jpg" alt="Corporate Banner" style="width:100%;border-radius:8px;margin:8px 0;">
      <p>High-impact event banner optimized for large-format printing.</p>
      <p><strong>Tools:</strong> Illustrator</p>
      <p><strong>Client:</strong> Tech Expo 2025</p>
    `;

    if (id === 'proj4') html = `
      <h3>Brand Identity</h3>
      <img src="assets/work4.jpg" alt="Brand Identity" style="width:100%;border-radius:8px;margin:8px 0;">
      <p>Complete brand identity with logo, color palette, and typography system.</p>
      <p><strong>Tools:</strong> Illustrator, Figma</p>
      <p><strong>Client:</strong> D'WYNGS Creative Studio</p>
    `;

    if (id === 'proj5') html = `
      <h3>Social Campaign</h3>
      <img src="assets/work5.jpg" alt="Social Campaign" style="width:100%;border-radius:8px;margin:8px 0;">
      <p>Dynamic social media templates and animations for a new campaign launch.</p>
      <p><strong>Tools:</strong> Photoshop, After Effects</p>
      <p><strong>Client:</strong> StartUp Hub</p>
    `;

    if (id === 'proj6') html = `
      <h3>Flyer Design</h3>
      <img src="assets/work6.jpg" alt="Flyer Design" style="width:100%;border-radius:8px;margin:8px 0;">
      <p>Print-ready flyer design featuring modern layout and quick delivery.</p>
      <p><strong>Tools:</strong> Illustrator</p>
      <p><strong>Client:</strong> Local Business Network</p>
    `;

    // 🖼️ Existing “work” popup
    if (id === 'work') html = `
      <h3>Our Portfolio</h3>
      <p>We don't just design, we make our clients happy. Here’s a quick preview of our recent work.</p>
      <div class="mini-gallery">
        <img src="assets/work1.jpg" alt="Poster Design">
        <img src="assets/work2.jpg" alt="Banner Design">
        <img src="assets/work3.jpg" alt="Logo Design">
      </div>
    `;
    // Service modal details
if (id === 'service-flyers') html = `
  <h3>Flyers</h3>
  <img src="assets/service1.jpg" alt="Flyer Design" style="width:100%;border-radius:8px;margin:8px 0;">
  <p>Creative flyer designs that capture attention—print-ready, digital-ready with fast turnaround.</p>
  <p><strong>Tools:</strong> Illustrator, Photoshop</p>
`;

if (id === 'service-posters') html = `
  <h3>Posters</h3>
  <img src="assets/service2.jpg" alt="Flyer Design" style="width:100%;border-radius:8px;margin:8px 0;">
  <p>Bold poster layouts for events, campaigns & promotions with print & web variations.</p>
  <p><strong>Tools:</strong> Illustrator, InDesign</p>
`;

if (id === 'service-cards') html = `
  <h3>Visiting Cards</h3>
  <img src="assets/service3.jpg" alt="Flyer Design" style="width:100%;border-radius:8px;margin:8px 0;">
  <p>Professional visiting cards with premium print specs and source files included.</p>
  <p><strong>Tools:</strong> Illustrator</p>
`;

if (id === 'service-billboards') html = `
  <h3>Billboards</h3>
   <img src="assets/service4.jpg" alt="Flyer Design" style="width:100%;border-radius:8px;margin:8px 0;">
  <p>High-impact billboard visuals optimized for large format production.</p>
  <p><strong>Tools:</strong> Illustrator</p>
`;

if (id === 'service-printing') html = `
  <h3>Printing Visuals</h3>
   <img src="assets/service5.jpg" alt="Flyer Design" style="width:100%;border-radius:8px;margin:8px 0;">
  <p>Print-ready visuals with color-corrected files and trim marks—perfect for pro printing.</p>
  <p><strong>Tools:</strong> Photoshop, InDesign</p>
`;

if (id === 'service-custom') html = `
  <h3>Custom Designs</h3>
   <img src="assets/service6.jpg" alt="Flyer Design" style="width:100%;border-radius:8px;margin:8px 0;">
  <p>Tailored designs created to match your brand voice—logos, assets and full brand kits.</p>
  <p><strong>Tools:</strong> Figma, Illustrator</p>
`;

    // ✅ finally call openModal() AFTER html is defined
    openModal(html);
  });
});

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
// Handle contact form submission
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

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
      e.target.reset();
    } else {
      alert("❌ Message failed to send. Please try again later.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Could not connect to the server. Check if backend is running.");
  }

  button.disabled = false;
  button.textContent = "Send Message";
});

// Handle Clear button
document.getElementById("clear-form").addEventListener("click", () => {
  document.getElementById("contact-form").reset();
});

/* Footer year */
const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

/* Portfolio 2.0 carousel (3-per-view, center hero) */
(function initPortfolio2(){
  const root = document.getElementById('portfolio-2-carousel');
  if(!root) return;
  const track = root.querySelector('.p2-track');
  const cards = Array.from(track.children);
  const total = cards.length;
  let idx = 0; // index of centered card (0..total-1)

  // show current: compute translateX so center card is visually centered
  function render(){
    // center card should be idx, we want to place it as the 2nd card in view (0-based)
    // we'll arrange cards in order and translate so the centered card is visually centered
    const cardWidth = cards[0].getBoundingClientRect().width + 20; // include gap
    // We want to translate so that the (idx - 1) card appears on left, idx center, idx+1 right
    // compute offset such that idx card sits in center of container
    const containerWidth = root.getBoundingClientRect().width;
    const centerOffset = (containerWidth - cardWidth) / 2;
    const trackOffset = -((idx) * cardWidth) + centerOffset;
    track.style.transform = `translateX(${trackOffset}px)`;

    // clear center class
    cards.forEach(c => c.classList.remove('center'));
    // add center to idx
    if(cards[idx]) cards[idx].classList.add('center');
  }

  // wrap index
  function goto(i){
    idx = ((i % total) + total) % total;
    render();
  }

  // next / prev
  const nextBtn = document.querySelector('.p2-next');
  const prevBtn = document.querySelector('.p2-prev');
  nextBtn && nextBtn.addEventListener('click', ()=> goto(idx+1));
  prevBtn && prevBtn.addEventListener('click', ()=> goto(idx-1));

  // autoplay
  const auto = parseInt(root.dataset.autoplay) || 4000;
  let timer = null;
  if(auto){
    timer = setInterval(()=> goto(idx+1), auto);
    root.addEventListener('mouseenter', ()=> clearInterval(timer));
    root.addEventListener('mouseleave', ()=> timer = setInterval(()=> goto(idx+1), auto));
  }

  // touch / swipe support (basic)
  let startX = 0, deltaX = 0;
  root.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; if(timer) clearInterval(timer); });
  root.addEventListener('touchmove', (e) => { deltaX = e.touches[0].clientX - startX; });
  root.addEventListener('touchend', () => {
    if(Math.abs(deltaX) > 40){ if(deltaX < 0) goto(idx+1); else goto(idx-1); }
    deltaX = 0;
    if(auto) timer = setInterval(()=> goto(idx+1), auto);
  });

  // initial
  window.addEventListener('load', ()=> {
    // small delay to ensure sizes measured
    setTimeout(()=> { render(); }, 150);
    // update on resize
    window.addEventListener('resize', ()=> { render(); });
  });

  // expose goto for debugging
  window._p2_goto = goto;
})();

/* Close modal with Esc key */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeModal();
});
