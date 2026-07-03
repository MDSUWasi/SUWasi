const shapes = document.getElementById('shapes');
        const progress = document.getElementById('progress');
        const items = document.querySelectorAll('.timeline-item');
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progressPercent = scrollTop / docHeight;
            progress.style.height = (progressPercent * 100) + '%';
            
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.49) {
                    item.classList.add('visible');
                }
            });
        });
        items[0].classList.add('visible');