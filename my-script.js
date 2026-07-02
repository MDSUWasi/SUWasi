document.addEventListener('DOMContentLoaded', () => {
    //intersection Observation for fade-in effect
    const observerOptions = {
        threshold: 0.2
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the class 'fade-in'and observe them
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
// Parallax effect for the hero section
    const heroTitle = document.querySelector('.hero-content h1');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        //apply subtle movement and opaticity change based on scroll position
        if (heroTitle) {
            heroTitle.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            heroTitle.style.opacity = `${1 - scrollPosition / 500}`;
        }
    });
    // Smooth scrolling for for "View my Work" button
    const viewWorkButton = document.querySelector('.btn-primary');
    if (viewWorkButton) {
        viewWorkButton.addEventListener('click', () => {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        });
    }
    //Hover effect for project cards
    const skills = document.querySelectorAll('progress');
    skills.forEach(skill => {
        skill.addEventListener('mouseover', () => {
            this.style.boxShadow = '0 0 10px #0ff0fc';
        });
        skill.addEventListener('mouseout', function() {
            this.style.boxShadow = 'none';
        });
    });});
