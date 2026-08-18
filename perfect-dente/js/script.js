/**
 * ============================================================================
 * PERFECT DENTE - PREMIUM HERO INTERACTIONS & 5 FOLDS
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    lucide.createIcons();
    gsap.registerPlugin(ScrollTrigger);

    // Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);


    // 1. HERO ANIMATION (Preserved)
    const headlineSplit = new SplitType('.js-headline', { types: 'lines, words, chars' });
    const tlLoad = gsap.timeline({ defaults: { ease: "power4.out" } });

    gsap.set('.js-parallax-container', { opacity: 0 });
    gsap.set('.js-image', { scale: 1.15, opacity: 0 });
    gsap.set(headlineSplit.chars, { y: 120, opacity: 0, rotateX: -20 });
    gsap.set('.js-fade-up', { y: 40, opacity: 0 });
    gsap.set('.js-header-fade', { y: -20, opacity: 0 });
    gsap.set('.js-floating-info', { x: 40, opacity: 0 });
    gsap.set('.js-glow-1, .js-glow-2', { scale: 0.8, opacity: 0 });
    gsap.set('.js-scroll-indicator', { y: 20, opacity: 0 });

    tlLoad
        .to('.js-parallax-container', { opacity: 1, duration: 1, ease: "power2.inOut" }, 0.2)
        .to('.js-image', { opacity: 1, scale: 1, duration: 2.5, ease: "power3.out" }, 0.5)
        .to('.js-glow-1, .js-glow-2', { scale: 1, opacity: 0.3, duration: 3, stagger: 0.2, ease: "power2.out" }, 0.5)
        .to('.js-header-fade', { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 1.0)
        .to('.js-fade-up', { y: 0, opacity: 1, duration: 1.5, stagger: 0.1 }, 1.2)
        .to(headlineSplit.chars, { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.015 }, 1.4)
        .to('.js-floating-info', { x: 0, opacity: 1, duration: 1.5 }, 1.8)
        .to('.js-scroll-indicator', { y: 0, opacity: 1, duration: 1 }, 2.2);

    // Hero Scroll Parallax
    gsap.to('.js-parallax-image-wrapper', {
        scale: 1.15,
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "bottom top",
            scrub: 1.2
        }
    });

    gsap.to('.js-headline, .js-fade-up', {
        y: -150,
        opacity: 0,
        ease: "power1.inOut",
        stagger: 0.05,
        scrollTrigger: { trigger: "main", start: "top top", end: "50% top", scrub: 1 }
    });

    gsap.to('.js-floating-info', {
        yPercent: -150,
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: { trigger: "main", start: "top top", end: "60% top", scrub: 1.5 }
    });

    gsap.to('.js-scroll-indicator', {
        opacity: 0,
        y: 30,
        ease: "power2.in",
        scrollTrigger: { trigger: "main", start: "top top", end: "15% top", scrub: 0.5 }
    });


    // 2. FOLDS 02 TO 05 ANIMATIONS

    // 2.1 Generic Reveal Up for new sections
    const revealElements = document.querySelectorAll('.js-reveal-up');
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { y: 50, opacity: 0 },
            {
                y: 0, 
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Triggers when top of element hits 85% of viewport height
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // 2.2 Split Text for section titles
    const splitTitles = document.querySelectorAll('.js-split-text');
    splitTitles.forEach(title => {
        const split = new SplitType(title, { types: 'lines, words' });
        gsap.from(split.words, {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.03,
            ease: "power4.out",
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            }
        });
    });

    // 2.3 Background Parallax
    const bgParallax = document.querySelectorAll('.js-parallax-bg');
    bgParallax.forEach(bg => {
        gsap.to(bg, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: bg.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // 3. BEFORE & AFTER SLIDER LOGIC
    const baContainer = document.querySelector('.js-ba-container');
    const baBefore = document.querySelector('.js-ba-before');
    const baHandle = document.querySelector('.js-ba-handle');

    if (baContainer && baBefore && baHandle) {
        let isDown = false;

        const updateSlider = (x) => {
            // Get bounds
            const rect = baContainer.getBoundingClientRect();
            // Calculate percentage
            let position = ((x - rect.left) / rect.width) * 100;
            // Clamp between 0 and 100
            position = Math.max(0, Math.min(position, 100));
            
            // Update CSS
            baBefore.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
            baHandle.style.left = `${position}%`;
        };

        // Mouse Events
        baContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            updateSlider(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDown = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            updateSlider(e.clientX);
        });

        // Touch Events
        baContainer.addEventListener('touchstart', (e) => {
            isDown = true;
            updateSlider(e.touches[0].clientX);
            // Prevent scrolling while dragging slider on mobile
            if(e.target === baContainer || baContainer.contains(e.target)) {
                lenis.stop();
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDown = false;
            lenis.start();
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            updateSlider(e.touches[0].clientX);
        }, { passive: true });
    }

    // 6. MOBILE MENU LOGIC
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenuClose && mobileMenu) {
        const toggleMenu = () => {
            mobileMenu.classList.toggle('translate-x-full');
            if (mobileMenu.classList.contains('translate-x-full')) {
                lenis.start(); // Re-enable scroll
            } else {
                lenis.stop(); // Disable scroll when menu is open
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileMenuClose.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu();
                // Let Lenis handle the smooth scroll
            });
        });
    }
});
