/**
 * D'wyngs Main Script
 * Features: Three.js Ad Composition, Swiper, AOS, Portfolio Scroll Fix, Legal Popups.
 * Folder Structure Compatibility: Assumes 'js/main.js' and 'css/styles.css'
 * IMPORTANT: Form submission logic targets the existing Render API endpoint.
 */

// --- 1. Ad-Specific Data & Legal Content ---

const portfolioData = [
    { title: "Events Branding", category: "Service Flyer Design", img: "assets/work1.jpg", 
        tool: "Photoshop", // <--- NEW FIELD
        purpose: "Create an elegant and premium promotional flyer for a wedding & event planning business to highlight all services clearly for clients.a                                                       ", // <--- NEW FIELD
        about: "Used a soft floral theme and pastel luxury palette with classic typography to reflect sophistication, celebration, and trust. Structure focuses on presenting services in two categories for easier understanding and professional branding.", // <--- NEW FIELD (This replaces the old 'desc' content)
        desc: "Deprecated Description" // ADDED: Keep old 'desc' field for compatibility with renderPortfolio fix below
    },
    { title: "Wedding Branding", category: "Service Flyer Design", img: "assets/work11.jpg", 
        desc: "Google Display Network set. Focused on 'Trust' and 'Speed' hooks. +20% conversion lift.", 
        tool: "Photoshop", 
        purpose: "Create an elegant and premium promotional flyer for a wedding & event planning business to highlight all services clearly for clients.", 
        about: "Used a soft floral theme and pastel luxury palette with classic typography to reflect sophistication, celebration, and trust. Structure focuses on presenting services in two categories for easier understanding and professional branding." },

    { title: "Retail & Grocery Smart Digital Support", category: "Business Marketing", img: "assets/work3.jpg", 
        desc: "Stop-motion product showcase for TikTok ads. Viral engagement with 2M+ views.", 
        tool: "Illustrator, Photoshop", 
        purpose: "Design a modern marketing flyer for a digital support company offering smart retail solutions to grocery and retail stores.", 
        about: "Used a bold tech-inspired layout with clear segmentation of “Challenges” and “Solutions” for impactful communication. Bright blue palette and icons enhance readability, conveying innovation, growth, and digital efficiency." },

    { title: "CCTV Surveillance & Remote Monitoring", category: "Corporate Advertising Poster", img: "assets/work4.jpg", 
        desc: "City-center digital billboard visuals. High contrast for maximum street visibility.", 
        tool: "Photoshop", 
        purpose: "Promote 24/7 CCTV surveillance and monitoring services for residential, industrial, and commercial clients.", 
        about: "Designed a high-contrast layout combining real surveillance visuals with professional dark tones to build trust and seriousness. Highlighted industries, services, and contact information with clear hierarchy for strong corporate appeal." },

    { title: "Wedding Planner", category: "Service Flyer Design", img: "assets/work2.jpg", 
        desc: "Google Display Network set. Focused on 'Trust' and 'Speed' hooks. +20% conversion lift.", 
        tool: "Photoshop", 
        purpose: "Create an elegant and premium promotional flyer for a wedding & event planning business to highlight all services clearly for clients.", 
        about: "Used a soft floral theme and pastel luxury palette with classic typography to reflect sophistication, celebration, and trust. Structure focuses on presenting services in two categories for easier understanding and professional branding." },
        
    { title: "Go90 Events Branding", category: "Business Card Design", img: "assets/work6.jpg", 
        desc: "Educational carousel ads for B2B targeting. Positioned client as industry thought leader.", 
        tool: "Illustrator, Photoshop", 
        purpose: "Create a premium, modern identity for a wedding & event planning brand.", 
        about: "Focused on a soft luxury palette and elegant typography to reflect professionalism" }
];

const reviewsData = [
    { name: "Mike Ross", role: "CMO, E-Shopify", text: "We stopped using generic designers. D'wyngs understands performance marketing. Our ROAS doubled." },
    { name: "Sarah Connor", role: "Growth Lead, Skynet", text: "Their motion ads for our app install campaign were killer. The cost-per-install dropped by 30%." },
    { name: "James Bond", role: "Event Manager", text: "The billboard visuals were stunning and actually readable from a distance. Great print knowledge." }
];

const servicesDigital = [
    { title: "Social Media Creatives", desc: "Scroll-stopping static & carousel ads for FB, IG, and LinkedIn." },
    { title: "Display Advertising", desc: "Ads that appear on other websites, including banner ads and retargeting ads." },
    { title: "Branding And Visual Identity", desc: "Graphic design that creates a cohesive visual identity for a brand across all its digital platforms." }
];

const servicesPrint = [
    { title: "Brochures And Flyers", desc: "Foldable or single-sheet documents designed to provide information about a product, service, or event." },
    { title: "Posters And Banners", desc: "Large-scale visuals used for public display, such as on walls, street corners, or at events." },
    { title: "Business cards And Identity", desc: "The primary visual mark of a brand and a small, printed card with contact information for an individual or company." }
];

const teamData = [
    { name: "MR. AARYAN", role: "Designer", img: "assets/aaryan.jpg" },
    { name: "MISS NAINSHI", role: "Digital Services", img: "assets/nainshi.jpg" },
    { name: "MR. PAWAN", role: "Print Services", img: "assets/pawan.jpg" }
];

const legalContent = {
    privacy: {
        title: "Privacy Policy",
        text: `<h3>Introduction</h3><p>We take your privacy seriously. This policy explains how we collect, use, and protect your personal data when you use our services or website.</p>
                <h3>Data Collection</h3><p>We collect information you provide directly to us (e.g., name, email) when you submit a contact form or place an order. We also automatically collect non-personal data like IP addresses and browsing behavior using cookies and analytics for site optimization and ad performance tracking.</p>
                <h3>Data Use</h3><p>Your data is used solely to fulfill your requests, manage your campaign, process payments, and improve our services. We do not sell your personal data to third parties.</p>`
    },
    return: {
        title: "Creative Return Policy",
        text: `<h3>Scope of Return</h3><p>Due to the bespoke nature of advertisement visual design, our services are non-refundable once the final, approved assets have been delivered ("Final Delivery").</p>
                <h3>Revision Process</h3><p>We offer a standard revision period (typically 3 rounds) outlined in your service agreement. Assets are only deemed 'returned' for revision during this phase.</p>
                <h3>Rejection Before Final Delivery</h3><p>If the project is terminated by the client before Final Delivery, a prorated amount based on the work completed and costs incurred will be retained, and any remaining balance refunded. Contact us immediately to discuss project cancellation.</p>`
    },
    refund: {
        title: "Refund Policy",
        text: `<h3>General Refund Eligibility</h3><p>Refunds are only issued if D'wyngs fails to initiate work within 15 business days of receiving the initial deposit and project brief, or if explicitly outlined in a written service contract addendum.</p>
                <h3>Non-Refundable Circumstances</h3><p>No refunds will be granted after the client approves the final design files or after the project moves beyond the agreed-upon revision rounds and reaches Final Delivery.</p>
                <h3>Payment Gateway (RazorPay) Disclaimer</h3><p>All refunds processed will follow the standard operational timelines and terms of service provided by our payment gateway, RazorPay. We are not responsible for delays caused by the payment processor or the client's bank. Any charges incurred by us (e.g., transaction fees) may be deducted from the refund amount.</p>`
    },
    disclaimer: {
        title: "Disclaimer",
        text: `<h3>Payment Gateway</h3><p>Our payment processing is powered by RazorPay. By submitting a payment, you agree to RazorPay's terms and conditions, which govern the transaction process.</p>
                <h3>Transaction Security</h3><p>All sensitive information is handled by RazorPay's secure gateway. We do not store your credit card or sensitive payment details on our servers.</p>
                <h3>RazorPay Rule Compliance</h3><p>As per RazorPay guidelines, this disclaimer confirms that D'wyngs operates legally, offers defined services (Ad Visuals Graphic Design), and adheres to all laws regarding the sale of digital creative services.</p>
                <h3>Service Scope</h3><p>D'wyngs is only responsible for the creative design services described in your package. We do not guarantee ad performance, click rates, or sales success, as those factors are dependent on the client's marketing strategy and budget.</p>`
    }
};


// --- 2. DOM Injection Functions ---

function renderPortfolio() {
    const wrapper = document.getElementById('portfolio-wrapper');
    if(!wrapper) return;
    portfolioData.forEach(item => {
        wrapper.innerHTML += `
            <div class="swiper-slide">
                <div class="portfolio-card" onclick="openModal('${item.title}')"> <img src="${item.img}" class="portfolio-img" alt="${item.title}">
                    <div class="portfolio-overlay">
                        <span class="highlight">${item.category}</span>
                        <h3>${item.title}</h3>
                        <button class="btn-nav">View Stats</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderReviews() {
    const wrapper = document.getElementById('reviews-wrapper');
    if(!wrapper) return;
    reviewsData.forEach(item => {
        wrapper.innerHTML += `
            <div class="swiper-slide">
                <div class="glass-card tilt-card">
                    <div class="mb-2"><i class="fas fa-quote-left icon-large"></i></div>
                    <p>"${item.text}"</p>
                    <div style="margin-top: 20px;">
                        <h4>${item.name}</h4>
                        <span class="highlight">${item.role}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderServices() {
    const digDiv = document.getElementById('digital-services');
    const printDiv = document.getElementById('print-services-list');
    
    if(digDiv) {
        servicesDigital.forEach(s => {
            digDiv.innerHTML += `
                <div class="service-card tilt-card" data-aos="fade-up">
                    <div style="margin-bottom:15px; color:#78c5ff;"><i class="fas fa-layer-group fa-2x"></i></div>
                    <h3>${s.title}</h3>
                    <p>${s.desc}</p>
                </div>
            `;
        });
    }

    if(printDiv) {
        servicesPrint.forEach(s => {
            printDiv.innerHTML += `
                <div class="service-card tilt-card" data-aos="fade-up">
                    <div style="margin-bottom:15px; color:#78c5ff;"><i class="fas fa-print fa-2x"></i></div>
                    <h3>${s.title}</h3>
                    <p>${s.desc}</p>
                </div>
            `;
        });
    }
}

function renderTeam() {
    const wrapper = document.getElementById('team-wrapper');
    if(!wrapper) return;
    teamData.forEach(t => {
        wrapper.innerHTML += `
            <div class="team-member tilt-card" data-aos="flip-left">
                <img src="${t.img}" alt="${t.name}">
                <div class="team-info text-center">
                    <h4>${t.name}</h4>
                    <span class="team-role">${t.role}</span>
                </div>
            </div>
        `;
    });
}

// --- 3. Three.js 3D Ad/Media Composition ---

function init3D() {
    const container = document.getElementById('three-container');
    if(!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // 2. Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x78c5ff, 1.2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 5. Objects Group
    const adGroup = new THREE.Group();
    scene.add(adGroup);

    // A. The "Screen/Banner" (Plane)
    const geoPlane = new THREE.BoxGeometry(2.8, 1.6, 0.1); 
    const matPlane = new THREE.MeshStandardMaterial({ 
        color: 0x020b23, 
        wireframe: false,
        roughness: 0.2,
        emissive: 0x112244 
    });
    const edges = new THREE.EdgesGeometry(geoPlane);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0x78c5ff } ) );
    
    const screenGroup = new THREE.Group();
    screenGroup.add(new THREE.Mesh(geoPlane, matPlane));
    screenGroup.add(line);
    adGroup.add(screenGroup);

    // B. The "Play Button" (Triangle/Cone)
    const geoPlay = new THREE.ConeGeometry(0.5, 1, 3); 
    const matPlay = new THREE.MeshStandardMaterial({ color: 0x78c5ff, roughness: 0.1 });
    const playBtn = new THREE.Mesh(geoPlay, matPlay);
    playBtn.rotation.x = 1.57; 
    playBtn.rotation.z = -1.57; 
    playBtn.position.set(0, 0, 0.5); 
    adGroup.add(playBtn);

    // C. The "Targeting" (Torus Ring)
    const geoRing = new THREE.TorusGeometry(1.8, 0.05, 16, 100);
    const matRing = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(geoRing, matRing);
    ring.position.z = -0.5;
    adGroup.add(ring);

    // 6. Animation Loop
    let time = 0;

    function animate() {
        requestAnimationFrame(animate);
        time += 0.015;

        // Gentle floating of whole group
        adGroup.rotation.y = Math.sin(time * 0.5) * 0.2; 
        adGroup.rotation.x = Math.cos(time * 0.5) * 0.1; 

        // Play button pulse
        const scale = 1 + Math.sin(time * 2) * 0.1;
        playBtn.scale.set(scale, scale, scale);

        // Ring Rotation
        ring.rotation.z -= 0.01;

        renderer.render(scene, camera);
    }
    animate();

    // 7. Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// --- 4. Initialization & Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // Inject Data
    renderPortfolio();
    renderReviews();
    renderServices();
    renderTeam();

    // Initialize 3D
    init3D();

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Initialize Swiper
    new Swiper('.portfolio-swiper', {
        slidesPerView: 1, spaceBetween: 30, loop: true, autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });

    new Swiper('.review-swiper', {
        slidesPerView: 1, spaceBetween: 30, loop: true, autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 768: { slidesPerView: 2 } }
    });

    // 3D Tilt Calculation
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -10; 
            const rotateY = ((x / rect.width) - 0.5) * 10; 
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });

    // Nav Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if(hamburger) { hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); }); }

    // Counters
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const increment = target / 50; 
                const updateCounter = () => {
                    const c = +counter.innerText;
                    if (c < target) {
                        counter.innerText = Math.ceil(c + increment);
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
});

// FIX 1: Add getProjectData helper function
// --- Helper function to find data by Title ---
function getProjectData(title) {
    return portfolioData.find(project => project.title === title);
}


// --- 5. Modal & Form Logic (Integrated API) ---

const projectModal = document.getElementById('projectModal'); // ADDED: Required for logic below
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImage');

// FIX 2a: Updated list of variables for new modal structure
const modalCategory = document.getElementById('modalCategory'); 
const modalTool = document.getElementById('modalTool');
const modalPurpose = document.getElementById('modalPurpose');
const modalAboutText = document.getElementById('modalAboutText');
const modalDesc = document.getElementById('modalDesc'); // KEPT: If used elsewhere, but not used in new modal logic

// FIX 2b: Use the explicit ID for the close button
const closeModalProject = document.getElementById('closeProjectBtn'); 

// Legal Modal Elements
const legalModal = document.getElementById('legalModal');
const legalModalTitle = document.getElementById('legalModalTitle');
const legalModalContent = document.getElementById('legalModalContent');
const closeModalLegal = document.querySelector('#legalModal .close-modal-legal');


// --- Project Modal Functions (Portfolio) ---
window.openModal = (title) => {
    // FIX 3: Get all project data based on the title passed from the card
    const project = getProjectData(title); 

    if (project && projectModal) {
        // Populate all new fields
        modalTitle.innerText = project.title;
        modalCategory.innerText = project.category; 
        modalImg.src = project.img;
        
        modalTool.innerText = project.tool;
        modalPurpose.innerText = project.purpose;
        modalAboutText.innerText = project.about; 

        projectModal.classList.add('active');
        document.body.classList.add('modal-open'); 
    }
};

// FIX 5: Use the correct variable name and only include this block once.
if(closeModalProject) {
    closeModalProject.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });
}
// REMOVED: Redundant duplicate close listener block that was here.


// --- Legal Modal Function ---
window.openLegalModal = (policyKey) => {
    const data = legalContent[policyKey];
    if (legalModal && data) {
        legalModalTitle.innerText = data.title;
        legalModalContent.innerHTML = data.text;
        legalModal.classList.add('active');
        document.body.classList.add('modal-open');
    }
};

if(closeModalLegal) {
    closeModalLegal.addEventListener('click', () => {
        legalModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });
}


// Close modals on outside click
window.onclick = (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    if (e.target === legalModal) {
        legalModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
};


// --- API Form Submission Logic (Integrated to your Render Endpoint) ---

const API_ENDPOINT = "https://dwyngs-website.onrender.com/api/send-mail";

/**
 * Handles submission for both contact and order forms using the Render API endpoint.
 * @param {Event} e - The submit event.
 */
async function handleFormSubmission(e) {
    e.preventDefault();

    const form = e.target;
    
    // Extract data
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const service = form.querySelector('[name="service"]').value;
    const message = form.querySelector('[name="message"]').value.trim();

    const formStatus = form.querySelector('#form-status'); // NEW: Select status element
    const button = form.querySelector("button[type='submit']");
    const originalText = button.textContent;
    
    // Reset status if it was previously set
    if(formStatus) formStatus.innerHTML = ''; 

    button.disabled = true;
    button.textContent = "Sending...";

    try {
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, service, message }),
        });

        const result = await response.json();

        if (response.ok && result.success) { // Check both HTTP status and custom success flag
            // SUCCESS Feedback
            if(formStatus) {
                formStatus.innerHTML = '<span style="color: #4CAF50;">✅ Success! Message sent.</span>';
            } else {
                 // Fallback to alert if #form-status is missing
                alert(`✅ Success! Your message has been sent. We'll be in touch regarding your ${service} inquiry.`);
            }
            form.reset();
        } else {
            // ERROR Feedback
            const errorMsg = result.message || "Message failed to send. Please check the network log and try again later.";
            if(formStatus) {
                 formStatus.innerHTML = `<span style="color: #FF6347;">❌ Error: ${errorMsg}</span>`;
            } else {
                alert(`❌ Error: ${errorMsg}`);
            }
           
        }
    } catch (error) {
        console.error("API Error:", error);
        // NETWORK ERROR Feedback
         if(formStatus) {
            formStatus.innerHTML = '<span style="color: #FFA500;">⚠️ Network error. Server may be starting up. Please wait and try again.</span>';
        } else {
            alert("⚠️ Could not connect to the server or a network error occurred. Check your Render deployment status.");
        }
    }

    // Re-enable button after 2 seconds for better flow
    setTimeout(() => {
        button.disabled = false;
        button.textContent = originalText;
    }, 2000); 
}

// Form Listeners - Attached to the new form IDs
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', handleFormSubmission);
}

const orderForm = document.getElementById('orderForm');
if(orderForm) {
    orderForm.addEventListener('submit', handleFormSubmission);
}