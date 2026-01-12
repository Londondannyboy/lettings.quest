// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Form submission
const demoForm = document.getElementById('demoForm');

if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(demoForm);

        // Show success message
        const formContainer = demoForm.parentElement;
        demoForm.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="margin-bottom: 20px;">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 style="color: white; margin-bottom: 12px;">Thank you!</h3>
                <p style="color: rgba(255,255,255,0.7);">We'll be in touch within 24 hours to schedule your demo.</p>
            </div>
        `;
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards, testimonials, and steps
document.querySelectorAll('.feature-card, .testimonial-card, .step, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        border-bottom: 1px solid var(--border);
        gap: 16px;
    }

    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
`;
document.head.appendChild(style);

// Typing effect for dashboard preview
const aiMessages = document.querySelectorAll('.chat-message.ai .message');
aiMessages.forEach((message, index) => {
    const text = message.textContent;
    message.textContent = '';
    message.style.minHeight = '40px';

    setTimeout(() => {
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                message.textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 20);
    }, index * 2000 + 500);
});

// Add counter animation for stats
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const finalValue = stat.textContent;
            const isPercentage = finalValue.includes('%');
            const isMultiplier = finalValue.includes('x');
            const numericValue = parseInt(finalValue);

            let current = 0;
            const increment = numericValue / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                if (isPercentage) {
                    stat.textContent = Math.round(current) + '%';
                } else if (isMultiplier) {
                    stat.textContent = Math.round(current) + 'x';
                } else {
                    stat.textContent = Math.round(current);
                }
            }, 50);
            statsObserver.unobserve(stat);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));
