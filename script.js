/**
 * Sentry Technologies - Landing Page Scripts
 */

(function() {
    'use strict';

    // DOM Elements
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const revealElements = document.querySelectorAll('.reveal');

    /**
     * Sticky Navigation - Add scrolled class on scroll
     */
    function handleNavScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    /**
     * Mobile Navigation Toggle
     */
    function handleNavToggle() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    /**
     * Close mobile nav when clicking a link
     */
    function handleNavLinkClick() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }

    /**
     * Scroll Reveal Animation using Intersection Observer
     */
    function initScrollReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after revealing
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach((el) => {
            observer.observe(el);
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') return;

                e.preventDefault();

                const target = document.querySelector(href);
                if (target) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Add staggered animation delay to solution and application cards
     */
    function initCardAnimations() {
        const solutionCards = document.querySelectorAll('.solution-card');
        const applicationCards = document.querySelectorAll('.application-card');

        solutionCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        applicationCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    /**
     * Initialize all functionality
     */
    function init() {
        // Scroll handlers
        window.addEventListener('scroll', handleNavScroll, { passive: true });

        // Mobile nav toggle
        if (navToggle) {
            navToggle.addEventListener('click', handleNavToggle);
        }

        // Close mobile nav on link click
        if (navLinks) {
            navLinks.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', handleNavLinkClick);
            });
        }

        // Initialize features
        initScrollReveal();
        initSmoothScroll();
        initCardAnimations();

        // Initial scroll check
        handleNavScroll();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
