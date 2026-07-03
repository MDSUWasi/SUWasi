const shapes = document.getElementById('shapes');
        const progress = document.getElementById('progress');
        const items = document.querySelectorAll('.timeline-item');
        
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.className = 'shape';
            const size = Math.random() * 60 + 20;
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            shape.style.background = `rgba(${Math.random() > 0.5 ? '109, 74, 255' : '0, 217, 255'}, ${Math.random() * 0.3})`;
            shape.style.animationDelay = Math.random() * 3 + 's';
            shapes.appendChild(shape);
        }
        
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