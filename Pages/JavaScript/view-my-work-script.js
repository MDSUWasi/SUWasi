(function () {
    'use strict';

    const achievements = [
        {
            id: 1,
            title: "Space App 2026",
            category: "projects",
            icon: "🚀",
            date: "2026",
            dateSort: "2026-01-01",
            desc: "Participated in the NASA Space App 2026 challenge, solving space-related problems using open data."
        },
        {
            id: 2,
            title: "Academic Excellence Award",
            category: "academic",
            icon: "🏅",
            date: "August 2025",
            dateSort: "2025-08-01",
            desc: "Awarded by my school for outstanding results in the SSC examination."
        },
        {
            id: 3,
            title: "Stardance",
            category: "projects",
            icon: "✨",
            date: "01 June 2026",
            dateSort: "2026-06-01",
            desc: "Participated in Stardance."
        },
        {
            id: 4,
            title: "Science Fair",
            category: "projects",
            icon: "🧪",
            date: "2016",
            dateSort: "2016-01-01",
            desc: "Participated in a science fair at my school."
        },
        {
            id: 5,
            title: "Mathematics",
            category: "academic",
            icon: "📐",
            date: "Soon",
            dateSort: null,
            desc: "Available soon."
        },
        {
            id: 6,
            title: "Coming Soon",
            category: "personal",
            icon: "❤️",
            date: "Soon",
            dateSort: null,
            desc: "Personal milestones and updates arriving soon."
        },
        {
            id: 7,
            title: "Coming Soon",
            category: "impacts",
            icon: "🤖",
            date: "Soon",
            dateSort: null,
            desc: "Impact work and outreach updates arriving soon."
        }
    ];

    const SECTION_NAMES = {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        timeline: 'Timeline',
        contact: 'Contacts'
    };

    let currentFilter = 'all';

    document.addEventListener('DOMContentLoaded', function () {
        renderCards(currentFilter);
    });

    function renderCards(filter) {
        const grid = document.getElementById('cards-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const filteredData = filter === 'all'
            ? achievements
            : achievements.filter(function (item) {
                return item.category.toLowerCase() === filter.toLowerCase();
            });

        if (filteredData.length === 0) {
            grid.innerHTML = '<p style="color:#666; grid-column: 1/-1; text-align:center;">No items found.</p>';
            updateSectionTitle(filter);
            return;
        }

        const fragment = document.createDocumentFragment();
        filteredData.forEach(function (item) {
            const card = document.createElement('div');
            card.className = 'card';
            card.addEventListener('click', function () {
                showDetails(item.id);
            });
            card.innerHTML =
                '<div class="card-img">' + item.icon + '</div>' +
                '<h4>' + item.title + '</h4>' +
                '<p>' + formatDate(item.date) + '</p>';
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);

        updateSectionTitle(filter);
    }

    function updateSectionTitle(filter) {
        const titleEl = document.getElementById('section-title');
        if (!titleEl) return;

        const titles = {
            all: 'All Achievements — Updating Soon',
            academic: 'Academic Excellence',
            personal: 'Personal Milestones',
            projects: 'Tech & Projects',
            impacts: 'Social Impact'
        };
        titleEl.innerText = titles[filter] || 'Achievements';
    }

    function filterCategory(category, event) {
        currentFilter = category;
        const items = document.querySelectorAll('.menu-list li');
        items.forEach(function (li) {
            li.classList.remove('active');
        });
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
        renderCards(category);
        hideDetails();
    }

    function formatDate(value) {
        if (!value || value === 'Soon') {
            return value || '';
        }
        // Try ISO format first (YYYY-MM-DD), then fall back to Date parsing
        const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (isoMatch) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[parseInt(isoMatch[2], 10) - 1] + ' ' + isoMatch[1];
        }
        const date = new Date(value);
        if (Number.isNaN(date.valueOf())) {
            return value;
        }
        return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    }

    function showDetails(id) {
        const item = achievements.find(function (a) {
            return a.id === id;
        });
        if (!item) return;

        const emptyState = document.getElementById('empty-state');
        const detailsContent = document.getElementById('details-content');
        if (emptyState) emptyState.style.display = 'none';
        if (detailsContent) detailsContent.style.display = 'block';

        const dIcon = document.getElementById('d-icon');
        const dTitle = document.getElementById('d-title');
        const dCategory = document.getElementById('d-category');
        const dDate = document.getElementById('d-date');
        const dDesc = document.getElementById('d-desc');

        if (dIcon) dIcon.innerHTML = '<span style="font-size:4rem">' + item.icon + '</span>';
        if (dTitle) dTitle.innerText = item.title;
        if (dCategory) dCategory.innerText = item.category.toUpperCase();
        if (dDate) dDate.innerText = item.date;
        if (dDesc) dDesc.innerText = item.desc;
    }

    function hideDetails() {
        const emptyState = document.getElementById('empty-state');
        const detailsContent = document.getElementById('details-content');
        if (emptyState) emptyState.style.display = 'flex';
        if (detailsContent) detailsContent.style.display = 'none';
    }

    function setSection(section) {
        const navBtns = document.querySelectorAll('.nav-btn');
        if (!navBtns || navBtns.length === 0) return;

        navBtns.forEach(function (btn) {
            btn.classList.remove('active');
        });

        // Map section name to index, defaulting to 0 (first button)
        const sectionKeys = Object.keys(SECTION_NAMES);
        const index = sectionKeys.indexOf(section);
        const targetIndex = index >= 0 ? index : 0;

        if (navBtns[targetIndex]) {
            navBtns[targetIndex].classList.add('active');
        }
    }

    // Expose functions globally for inline onclick handlers
    window.filterCategory = filterCategory;
    window.setSection = setSection;
    window.showDetails = showDetails;
    window.hideDetails = hideDetails;
})();