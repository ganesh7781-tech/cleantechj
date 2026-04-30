document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            document.body.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            document.body.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Initialize Hero Swiper
    if (typeof Swiper !== 'undefined') {
        new Swiper('.hero-swiper', {
            loop: true,
            effect: 'fade',
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const icon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
            document.body.style.overflow = 'auto';
        }
    });

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) {
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Optional: Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) other.classList.remove('active');
                    });
                }
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        const icon = question.querySelector('i');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(other => {
                other.classList.remove('active');
                const otherIcon = other.querySelector('i');
                if (otherIcon) otherIcon.classList.replace('ph-minus', 'ph-plus');
            });
            
            if (!isActive) {
                item.classList.add('active');
                if (icon) icon.classList.replace('ph-plus', 'ph-minus');
            }
        });
    });


    // Add staggered delay to reveal elements in grids BEFORE observing
    document.querySelectorAll('.services-grid, .values-grid').forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.classList.add('reveal');
            child.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Reveal Animations on Scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Now query all reveal elements (including the ones just added)
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href === '#' || !href.startsWith('#')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                    document.body.style.overflow = 'auto';
                }

                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Floating Action Button Toggle
    const fabContainer = document.querySelector('.fab-container');
    const fabMain = document.querySelector('.fab-main');

    if (fabMain) {
        fabMain.addEventListener('click', () => {
            fabContainer.classList.toggle('active');
            const fabIcon = fabMain.querySelector('i');
            if (fabContainer.classList.contains('active')) {
                fabIcon.classList.replace('ph-chat-circle-dots', 'ph-x');
            } else {
                fabIcon.classList.replace('ph-x', 'ph-chat-circle-dots');
            }
        });
    }
});
