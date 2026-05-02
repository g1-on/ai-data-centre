console.log('MAIN.JS EXECUTING');
// Splash Screen Timeout
const splash = document.getElementById('splash-screen');
setTimeout(() => {
    if (splash) {
        splash.classList.add('fade-out');
    }
}, 800);
setTimeout(() => {
    if (splash) splash.style.display = 'none';
}, 2000); // Absolute fallback to clear the screen

const horizontalContainer = document.querySelector('.horizontal-container');
if (horizontalContainer) {
    let lastSectionIndex = 0;
    const lightningOverlay = document.getElementById('lightning-overlay');

    function triggerLightning() {
        if (!lightningOverlay) return;
        lightningOverlay.classList.remove('flash-active');
        void lightningOverlay.offsetWidth; // Trigger reflow
        lightningOverlay.classList.add('flash-active');
    }

    function updateHorizontalScroll() {
        if (window.innerWidth <= 768) {
            document.body.style.height = "auto";
            horizontalContainer.style.transform = "none";
            // Simple vertical reveal for mobile
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    element.classList.add('active');
                }
            });
            return;
        }

        const totalWidth = horizontalContainer.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        document.body.style.height = `${totalWidth - viewportWidth + window.innerHeight}px`;
        const scrollValue = window.scrollY;
        
        horizontalContainer.style.transform = `translateX(-${scrollValue}px)`;
        
        const bgTexts = document.querySelectorAll('.parallax-bg-text');
        bgTexts.forEach(text => {
            text.style.transform = `translateY(-50%) translateX(${scrollValue * 0.4}px)`;
        });
        
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.left < window.innerWidth - 150) {
                element.classList.add('active');
            }
        });

        document.body.style.backgroundPosition = `-${scrollValue * 0.1}px 0`;

        // Lightning Trigger on section change
        const currentSectionIndex = Math.round(scrollValue / window.innerWidth);
        if (currentSectionIndex !== lastSectionIndex) {
            triggerLightning();
            lastSectionIndex = currentSectionIndex;
        }
    }

    window.addEventListener('scroll', updateHorizontalScroll);
    window.addEventListener('resize', () => {
        updateHorizontalScroll();
    });
    
    updateHorizontalScroll();
    setTimeout(updateHorizontalScroll, 500);
    setTimeout(updateHorizontalScroll, 2000);

    // Custom Digital Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const cursorOutline = document.querySelector('.custom-cursor-outline');

    if (cursor && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX - 35}px`,
                top: `${posY - 35}px` 
            }, { duration: 400, fill: 'forwards' });
        });

        document.querySelectorAll('a, button, .glass-card, .logo').forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('cursor-hover');
            });
            link.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('cursor-hover');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"], .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                if (window.innerWidth > 768) {
                    // Robust calculation of original horizontal offset
                    const currentScrollX = window.scrollY;
                    const sectionRect = targetSection.getBoundingClientRect();
                    const targetX = sectionRect.left + currentScrollX;
                    
                    window.scrollTo({
                        top: targetX,
                        behavior: 'smooth'
                    });
                } else {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! Our team will contact you soon.');
        contactForm.reset();
    });
}




// Modal Logic
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.clickable-image').forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        modalTitle.innerText = this.getAttribute('data-title') || 'Technical Overview';
        modalDesc.innerText = this.getAttribute('data-desc') || 'Deep dive into GLOBALONE AI infrastructure systems.';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});
