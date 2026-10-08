/* ==========================================================================
   SMART KIDZZ PRE-SCHOOL & KINDERGARTEN - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initRoutineTimeline();
    initGalleryFilter();
    initCounters();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE MENU LOGIC
   -------------------------------------------------------------------------- */
function initNavbar() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const annClose = document.querySelector('.announcement-close');
    const annBar = document.querySelector('.announcement-bar');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });
    }

    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.remove('open');
        });
    });

    if (annClose && annBar) {
        annClose.addEventListener('click', () => {
            annBar.style.display = 'none';
        });
    }

    // Scroll active link highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   2. TUITION FEE CALCULATOR LOGIC
   -------------------------------------------------------------------------- */
function initTuitionCalculator() {
    const ageSelect = document.getElementById('calcAge');
    const scheduleRadios = document.querySelectorAll('input[name="calcSchedule"]');
    const addMeal = document.getElementById('addMeal');
    const addTransport = document.getElementById('addTransport');
    const addExtended = document.getElementById('addExtended');

    const displayTotal = document.getElementById('totalPriceDisplay');
    const bBase = document.getElementById('bBaseFee');
    const bSched = document.getElementById('bSchedFee');
    const bAddons = document.getElementById('bAddonsFee');

    if (!ageSelect || !displayTotal) return;

    function calculateTuition() {
        const selectedOption = ageSelect.options[ageSelect.selectedIndex];
        const baseFee = parseInt(selectedOption.getAttribute('data-price')) || 5000;
        
        let scheduleFee = 0;
        const selectedSchedule = document.querySelector('input[name="calcSchedule"]:checked');
        if (selectedSchedule && selectedSchedule.value === 'full') {
            scheduleFee = 1500;
        }

        let addonsFee = 0;
        if (addMeal && addMeal.checked) addonsFee += parseInt(addMeal.value);
        if (addTransport && addTransport.checked) addonsFee += parseInt(addTransport.value);
        if (addExtended && addExtended.checked) addonsFee += parseInt(addExtended.value);

        const grandTotal = baseFee + scheduleFee + addonsFee;

        // Update UI with formatted Rupee numbers
        displayTotal.textContent = grandTotal.toLocaleString('en-IN');
        if (bBase) bBase.textContent = `₹${baseFee.toLocaleString('en-IN')}`;
        if (bSched) bSched.textContent = `₹${scheduleFee.toLocaleString('en-IN')}`;
        if (bAddons) bAddons.textContent = `₹${addonsFee.toLocaleString('en-IN')}`;
    }

    ageSelect.addEventListener('change', calculateTuition);
    scheduleRadios.forEach(radio => radio.addEventListener('change', calculateTuition));
    if (addMeal) addMeal.addEventListener('change', calculateTuition);
    if (addTransport) addTransport.addEventListener('change', calculateTuition);
    if (addExtended) addExtended.addEventListener('change', calculateTuition);

    calculateTuition(); // initial calc
}

/* --------------------------------------------------------------------------
   3. "A DAY AT SMART KIDZZ" DAILY ROUTINE TIMELINE
   -------------------------------------------------------------------------- */
const routineData = {
    "08:30 AM": {
        icon: "🌞",
        time: "08:30 AM - 09:15 AM",
        title: "Morning Greeting & Circle Time",
        desc: "Children gather in a warm circle for morning hello songs, weather observation, story warm-ups, and setting peaceful daily goals.",
        tags: ["Social Bonding", "Language Skills", "Emotional Support"]
    },
    "09:30 AM": {
        icon: "🧩",
        time: "09:30 AM - 10:45 AM",
        title: "STEAM Discovery & Play Centers",
        desc: "Hands-on guided discovery with wooden blocks, sensory sand, counting beads, light tables, and early science exploration.",
        tags: ["Problem Solving", "Fine Motor", "Cognitive Growth"]
    },
    "10:45 AM": {
        icon: "🍎",
        time: "10:45 AM - 11:30 AM",
        title: "Organic Snack & Outdoor Garden Play",
        desc: "Fresh organic fruit & snack time followed by active free play in our shaded nature playground and sensory garden.",
        tags: ["Healthy Nutrition", "Gross Motor", "Fresh Air"]
    },
    "11:30 AM": {
        icon: "🎨",
        time: "11:30 AM - 12:30 PM",
        title: "Creative Arts, Music & Dance",
        desc: "Finger painting, clay sculpting, rhythmic instrument play, and interactive storytelling in our dedicated creative atelier.",
        tags: ["Self-Expression", "Rhythm & Music", "Artistic Joy"]
    },
    "12:30 PM": {
        icon: "🍲",
        time: "12:30 PM - 02:30 PM",
        title: "Nutritious Lunch & Nap / Quiet Rest",
        desc: "Chef-prepared warm balanced lunch followed by soothing lullaby music and restful nap time on cozy individual cots.",
        tags: ["Rest & Recovery", "Self-Care", "Recharge"]
    },
    "02:30 PM": {
        icon: "📚",
        time: "02:30 PM - 03:30 PM",
        title: "Afternoon Reflection & Pickup",
        desc: "Closing story time, reflection on the day's achievements, collecting artwork, and joyful farewells with parents.",
        tags: ["Reflection", "Parent Connection", "Happy Departure"]
    }
};

function initRoutineTimeline() {
    const tabs = document.querySelectorAll('.routine-tab');
    const rIcon = document.getElementById('routineIcon');
    const rTime = document.getElementById('routineTime');
    const rTitle = document.getElementById('routineTitle');
    const rDesc = document.getElementById('routineDesc');
    const rTags = document.getElementById('routineTags');

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const timeKey = tab.getAttribute('data-time');
            const data = routineData[timeKey];

            if (data) {
                if (rIcon) rIcon.textContent = data.icon;
                if (rTime) rTime.textContent = data.time;
                if (rTitle) rTitle.textContent = data.title;
                if (rDesc) rDesc.textContent = data.desc;
                if (rTags) {
                    rTags.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
                }
            }
        });
    });
}

/* --------------------------------------------------------------------------
   4. PROGRAM CURRICULUM MODAL DETAILS
   -------------------------------------------------------------------------- */
const programData = {
    toddler: {
        title: "Toddler Nest Program (1.5 - 2.5 Years)",
        badge: "Sensory & Nurturing",
        content: `
            <p style="font-size: 1.1rem; color: #4A5568; margin-bottom: 20px;">
                Our Toddler Nest provides a soothing, home-like environment designed to give your toddler the highest level of emotional security while encouraging natural curiosity.
            </p>
            <h4 style="font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 10px;">Key Focus Areas:</h4>
            <ul style="margin-left: 20px; line-height: 1.8; color: #2D3748; margin-bottom: 20px;">
                <li><strong>Sensory Exploration:</strong> Soft clay, water play, textured fabrics, and color sorting.</li>
                <li><strong>Language Expansion:</strong> Nursery rhymes, interactive picture books, and vocabulary building.</li>
                <li><strong>Gentle Routine:</strong> Potty awareness support, scheduled nap times, and healthy eating habits.</li>
                <li><strong>1:4 Educator Ratio:</strong> Exceptional personalized care and warm attention.</li>
            </ul>
        `
    },
    nursery: {
        title: "Playgroup & Nursery (2.5 - 3.5 Years)",
        badge: "Creative & Social Discovery",
        content: `
            <p style="font-size: 1.1rem; color: #4A5568; margin-bottom: 20px;">
                In Nursery, children step into group social learning. We foster independence, sharing, imaginative dress-up play, and foundational language concepts.
            </p>
            <h4 style="font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 10px;">Key Focus Areas:</h4>
            <ul style="margin-left: 20px; line-height: 1.8; color: #2D3748; margin-bottom: 20px;">
                <li><strong>Creative Atelier:</strong> Finger painting, canvas art, acoustic music, and dance movement.</li>
                <li><strong>Social Empathy:</strong> Group games, turn-taking, and identifying emotions.</li>
                <li><strong>Early Math & Logic:</strong> Pattern identification, size sorting, and counting up to 20.</li>
            </ul>
        `
    },
    jrkg: {
        title: "Junior Kindergarten (3.5 - 4.5 Years)",
        badge: "Phonics & STEM Foundations",
        content: `
            <p style="font-size: 1.1rem; color: #4A5568; margin-bottom: 20px;">
                Junior KG introduces structured early literacy through phonics, hands-on science experiments, and beginner math reasoning.
            </p>
            <h4 style="font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 10px;">Key Focus Areas:</h4>
            <ul style="margin-left: 20px; line-height: 1.8; color: #2D3748; margin-bottom: 20px;">
                <li><strong>Phonics & Reading:</strong> Jolly Phonics letter sound recognition and sight words.</li>
                <li><strong>Junior Science:</strong> Plant life cycles, magnifying glass exploration, and buoyancy experiments.</li>
                <li><strong>Numeracy Skills:</strong> Basic addition concepts, 2D/3D geometry shapes.</li>
            </ul>
        `
    },
    srkg: {
        title: "Senior Kindergarten (4.5 - 6.0 Years)",
        badge: "Primary School Readiness",
        content: `
            <p style="font-size: 1.1rem; color: #4A5568; margin-bottom: 20px;">
                Our Senior KG program equips your child with reading fluency, confident communication, critical thinking, and primary school readiness.
            </p>
            <h4 style="font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 10px;">Key Focus Areas:</h4>
            <ul style="margin-left: 20px; line-height: 1.8; color: #2D3748; margin-bottom: 20px;">
                <li><strong>Fluent Reading & Writing:</strong> Sentence composition, creative story journal writing.</li>
                <li><strong>Advanced Math:</strong> Addition, subtraction, time telling, and measurement.</li>
                <li><strong>STEM Coding Basics:</strong> Unplugged robotics, logic mazes, and team project work.</li>
            </ul>
        `
    }
};

function openProgramDetails(programKey) {
    const data = programData[programKey];
    if (!data) return;

    document.getElementById('pModalTitle').textContent = data.title;
    document.getElementById('pModalBadge').textContent = data.badge;
    document.getElementById('pModalContent').innerHTML = data.content;

    openModal('programModal');
}

/* --------------------------------------------------------------------------
   5. GALLERY FILTER & LIGHTBOX LOGIC
   -------------------------------------------------------------------------- */
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function openLightbox(imgUrl, caption) {
    const lImg = document.getElementById('lightboxImg');
    const lCap = document.getElementById('lightboxCaption');

    if (lImg) lImg.src = imgUrl;
    if (lCap) lCap.textContent = caption;

    openModal('lightboxModal');
}

/* --------------------------------------------------------------------------
   7. MODAL SYSTEM & FORM SUBMISSIONS WITH CONFETTI
   -------------------------------------------------------------------------- */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
}

// Close modal on background overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('open');
        }
    });
});

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function handleTourSubmit(e) {
    e.preventDefault();
    closeModal('tourModal');
    triggerConfetti();
    showToast('🎉 Campus Tour Booked Successfully! Our team will call you to confirm.');
    e.target.reset();
}

function handleEnrollSubmit(e) {
    e.preventDefault();
    closeModal('enrollModal');
    triggerConfetti();
    showToast('🚀 Admission Application Submitted! Check your email for next steps.');
    e.target.reset();
}

function handleContactSubmit(e) {
    e.preventDefault();
    showToast('💌 Thank you! Your message has been sent to our admissions team.');
    e.target.reset();
}

function handleNewsletter(e) {
    e.preventDefault();
    showToast('✨ Thank you for subscribing to SMART KIDZZ Parent Newsletter!');
    e.target.reset();
}

/* --------------------------------------------------------------------------
   8. CONFETTI ANIMATION EFFECT
   -------------------------------------------------------------------------- */
function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#FF5388', '#F6B830', '#1DB9B5', '#007D4C', '#9B51E0'];

    for (let i = 0; i < 90; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.4,
            r: Math.random() * 8 + 4,
            d: Math.random() * 25 + 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }

    let animationFrame;
    let opacity = 1;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();

            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.tilt = Math.sin(p.tiltAngle) * 15;
        });

        if (particles[0].y < canvas.height) {
            animationFrame = requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    draw();

    setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 4500);
}

/* --------------------------------------------------------------------------
   9. NUMERIC STAT COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                if (!target) return;

                let count = 0;
                const speed = target / 40;

                const timer = setInterval(() => {
                    count += speed;
                    if (count >= target) {
                        el.textContent = (target === 100 ? '100%' : target + '+');
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(count) + (target === 100 ? '%' : '+');
                    }
                }, 30);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number[data-target]').forEach(num => {
        observer.observe(num);
    });
}
