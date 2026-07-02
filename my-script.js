document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
        fadeElements.forEach(element => observer.observe(element));
    } else {
        fadeElements.forEach(element => element.classList.add('visible'));
    }

    const heroTitle = document.querySelector('.hero-content h1');
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.scrollY;

                if (heroTitle) {
                    heroTitle.style.transform = `translateY(${scrollPosition * 0.1}px)`;
                    heroTitle.style.opacity = `${1 - scrollPosition / 500}`;
                }
                
                const avatar = document.querySelector('.avatar');
                if (avatar) {
                    avatar.style.transform = `translateY(${-scrollPosition * 0.05}px)`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });

    const timelineButton = document.querySelector('[data-action="timeline"]');
    if (timelineButton) {
        timelineButton.addEventListener('click', () => {
            alert('Timeline feature is coming soon. I will add your academic journey here shortly.');
        });
    }

    const progressBars = document.querySelectorAll('progress');
    progressBars.forEach(progress => {
        progress.addEventListener('mouseenter', () => {
            const value = progress.getAttribute('value');
            progress.style.boxShadow = `0 0 15px var(--accent), 0 0 30px rgba(255, 44, 7, 0.5)`;
            
            showProgressTooltip(progress, value);
        });
        
        progress.addEventListener('mouseleave', () => {
            progress.style.boxShadow = 'none';
            hideProgressTooltip(progress);
        });
    });

    function showProgressTooltip(progressElement, value) {
        let tooltip = progressElement.parentNode.querySelector('.progress-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('span');
            tooltip.className = 'progress-tooltip';
            tooltip.innerHTML = `<strong>${value}%</strong>`;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--primary);
                color: white;
                padding: 0.3rem 0.6rem;
                border-radius: 4px;
                font-size: 0.8rem;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s;
                z-index: 100;
            `;
            progressElement.parentNode.style.position = 'relative';
            progressElement.parentNode.appendChild(tooltip);
        }
        tooltip.style.opacity = '1';
    }

    function hideProgressTooltip(progressElement) {
        const tooltip = progressElement.parentNode.querySelector('.progress-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }

    document.querySelectorAll('.stagger-card').forEach((card, index) => {
        card.style.setProperty('--order', index + 1);
    });

    const socialLinks = document.querySelectorAll('.hover-icon');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            createRipple(e.currentTarget);
        });
    });

    function createRipple(element) {
        const ripple = document.createElement('span');
        
        ripple.className = 'ripple-effect';
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    console.log('📚 Library Theme Portfolio Loaded Successfully!');
});