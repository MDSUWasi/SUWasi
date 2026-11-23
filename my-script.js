(function () {
    'use strict';

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const themeToggle = document.getElementById('themeToggle');
    const analyticsPopup = document.getElementById('analytics-popup');
    const analyticsPopupClose = document.getElementById('analytics-popup-close');

    // Analytics popup: show once per visitor, remember dismissal
    if (analyticsPopup) {
        const isDismissed = localStorage.getItem('analytics-dismissed');
        if (!isDismissed) {
            analyticsPopup.hidden = false;
        }

        if (analyticsPopupClose) {
            analyticsPopupClose.addEventListener('click', () => {
                analyticsPopup.hidden = true;
                localStorage.setItem('analytics-dismissed', 'true');
            });
        }
    }

    function toggleMenu() {
        if (!navLinks || !hamburger) return;
        const isOpen = navLinks.classList.contains('active');
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(!isOpen));
        document.body.classList.toggle('menu-open', !isOpen);
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleMenu();
        });
    }

    if (navItems.length > 0) {
        navItems.forEach(function (item) {
            item.addEventListener('click', function () {
                if (navLinks && navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    document.addEventListener('click', function (event) {
        if (navLinks && !navLinks.contains(event.target) &&
            (!hamburger || !hamburger.contains(event.target)) &&
            navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme;
            if (currentTheme === 'dark') {
                newTheme = 'light';
            } else {
                newTheme = 'dark';
            }
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.2,
        });

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    }
})();