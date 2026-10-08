// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = navLinks.querySelectorAll('a');
const sections = document.querySelectorAll('section[id]');
const fadeElements = document.querySelectorAll('.fade-in');
const accordionHeaders = document.querySelectorAll('.accordion-header');

// ===== MOBILE NAV TOGGLE =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close nav when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close nav when clicking outside (on the overlay)
navLinks.addEventListener('click', (e) => {
    if (e.target === navLinks) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function highlightActiveLink() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== SCROLL-TRIGGERED FADE IN =====
function handleFadeIn() {
    const triggerBottom = window.innerHeight * 0.88;

    fadeElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            el.classList.add('visible');
        }
    });
}

// ===== ACCORDION =====
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        // Close all other accordion items
        document.querySelectorAll('.accordion-item').forEach(accItem => {
            accItem.classList.remove('active');
        });

        // Toggle the clicked item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== EVENT LISTENERS =====
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    highlightActiveLink();
    handleFadeIn();
}, { passive: true });

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
    handleNavbarScroll();
    handleFadeIn();
});

// ===== COUNTER ANIMATION (for stats in viewport) =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        if (counter.dataset.animated) return;
        
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counter.dataset.animated = 'true';
            counter.style.opacity = '1';
        }
    });
}

window.addEventListener('scroll', animateCounters, { passive: true });
