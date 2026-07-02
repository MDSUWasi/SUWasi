document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                     if (entry.target.classList.contains('flip-card')) {
                    entry.target.style.animation = `fadeInUp ${0.6}s ease forwards`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    document.querySelectorAll('.stagger-animate').forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 150);
    });

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

    const viewWorkButtons = document.querySelectorAll('.scale-hover');
    viewWorkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Work') || this.textContent === 'View My Work') {
                e.preventDefault();
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            } else if (this.textContent === 'My Timeline') {
                alert('Timeline feature coming soon! This would showcase your academic journey.');
            }
        });
    });

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
        card.style.animation = `cardEntrance 0.8s ease forwards`;
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) rotateX(10deg)';
    });

    const socialLinks = document.querySelectorAll('.hover-icon');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            createRipple(e.currentTarget);
        });
    });

    function createRipple(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            left: 50%;
            top: 50%;
            animation: rippleEffect 0.6s ease-out;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px) rotateX(10deg); }
            to { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        
        @keyframes cardEntrance {
            0% { opacity: 0; transform: translateY(30px) rotateX(10deg); }
            100% { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        
        @keyframes rippleEffect {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    console.log('📚 Library Theme Portfolio Loaded Successfully!');
});