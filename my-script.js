const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

function toggleMenu() {
    const isOpen = navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    document.body.classList.toggle('menu-open', !isOpen);
}

if (hamburger && navLinks) {
    hamburger.addEventListener('click', event => {
        event.stopPropagation();
        toggleMenu();
    });
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

document.addEventListener('click', event => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.2,
});

revealElements.forEach(element => revealObserver.observe(element));
