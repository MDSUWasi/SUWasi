(function () {
    'use strict';

    const items = document.querySelectorAll('.timeline-item');
    const progress = document.getElementById('scrollProgress');
    const timelineSvg = document.getElementById('timelineSvg');
    const timelinePath = document.getElementById('timelinePath');
    const timelinePathProgress = document.getElementById('timelinePathProgress');
    const container = document.getElementById('timelineContainer');

    function buildCurvedPath() {
        if (window.innerWidth <= 768) return;

        const containerRect = container.getBoundingClientRect();
        const w = containerRect.width;
        const h = containerRect.height;

        const points = [];
        items.forEach(item => {
            const point = item.querySelector('.timeline-point');
            const pointRect = point.getBoundingClientRect();

            const px = pointRect.left + pointRect.width / 2 - containerRect.left;
            const py = pointRect.top + pointRect.height / 2 - containerRect.top;

            points.push({ x: px, y: py });
        });

        if (points.length < 2) return;

        const svgW = 100;
        const svgH = 100;
        const scaleX = svgW / w;
        const scaleY = svgH / h;

        const scaled = points.map(p => ({
            x: p.x * scaleX,
            y: p.y * scaleY
        }));

        let d = `M ${scaled[0].x.toFixed(2)} ${scaled[0].y.toFixed(2)}`;

        for (let i = 1; i < scaled.length; i++) {
            const prev = scaled[i - 1];
            const curr = scaled[i];
            const cp1x = prev.x + (curr.x - prev.x) * 0.5;
            const cp1y = prev.y;
            const cp2x = curr.x - (curr.x - prev.x) * 0.5;
            const cp2y = curr.y;

            d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`;
        }

        timelinePath.setAttribute('d', d);
        timelinePathProgress.setAttribute('d', d);
        const totalLength = timelinePathProgress.getTotalLength();
        timelinePathProgress.style.strokeDasharray = totalLength;
        timelinePathProgress.style.strokeDashoffset = totalLength;
        timelinePathProgress.style.opacity = '1';
        timelinePathProgress.style.transition = 'stroke-dashoffset 0.3s ease';
    }

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progress.style.width = pct + '%';

        if (window.innerWidth > 768 && timelinePathProgress.getAttribute('d')) {
            const totalLength = timelinePathProgress.getTotalLength();
            const containerRect = container.getBoundingClientRect();
            const viewportCenter = window.innerHeight * 0.5;
            const visibleRange = viewportCenter - containerRect.top;
            const totalRange = containerRect.bottom - containerRect.top;

            let progressFraction = 0;
            if (visibleRange > 0 && totalRange > 0) {
                progressFraction = Math.min(1, Math.max(0, visibleRange / totalRange));
            }

            timelinePathProgress.style.strokeDashoffset = totalLength * (1 - progressFraction);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    items.forEach(item => observer.observe(item));

    requestAnimationFrame(() => {
        setTimeout(buildCurvedPath, 100);
    });

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', () => {
        clearTimeout(window._timelineResizeTimer);
        window._timelineResizeTimer = setTimeout(buildCurvedPath, 150);
    });

    updateScrollProgress();
})();