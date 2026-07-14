const achievements = [
    {
        id: 1,
        title: "Academic Excellence Award",
        category: "academic",
        icon: "🏅",
        date: "August 2025",
        desc: "Awarded for achieving excellent results in the examination."
    },
    {
        id: 2,
        title: "Stardance",
        category: "projects",
        icon: "",
        date: "01 June 2026",
        desc: "Participated in Stardance."
    },
    {
        id: 3,
        title: "Science Fair",
        category: "projects",
        icon: "🧪",
        date: "2016",
        desc: "Participated in science fair at my school."
    },

    {
        id: 4,
        title: "Mathematics",
        category: "academic",
        icon: "📐",
        date: "Soon",
        desc: "Available Soon"
    },
    {
        id: 5,
        title: "Coming Soon",
        category: "personal",
        icon: "❤️",
        date: "Soon",
        desc: "Personal milestones and updates arriving soon."
    },
    {
        id: 6,
        title: "Coming Soon",
        category: "impacts",
        icon: "🤖",
        date: "Soon",
        desc: "Impact work and outreach updates arriving soon."
    }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderCards(currentFilter);
});

function renderCards(filter) {
    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '';
    
    const filteredData = filter === 'all' 
        ? achievements 
        : achievements.filter(item => item.category.toLowerCase() === filter.toLowerCase());

    if(filteredData.length === 0) {
        grid.innerHTML = '<p style="color:#666; grid-column: 1/-1; text-align:center;">No items found.</p>';
        return;
    }

    filteredData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => showDetails(item.id);
        
        card.innerHTML = `
            <div class="card-img">${item.icon}</div>
            <h4>${item.title}</h4>
            <p>${formatDate(item.date)}</p>
        `;
        grid.appendChild(card);
    });

    const titles = {
        'all': 'All Achievements- Updating Soon',
        'academic': 'Academic Excellence',
        'personal': 'Personal Milestones',
        'projects': 'Tech & Projects',
        'impacts': 'Social Impact'
    };
    document.getElementById('section-title').innerText = titles[filter] || 'Achievements';
}

function filterCategory(category, event) {
    currentFilter = category;
    
    document.querySelectorAll('.menu-list li').forEach(li => li.classList.remove('active'));
    if (event?.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    renderCards(category);
    hideDetails();
}

function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) {
        return value;
    }
    return date.toLocaleDateString(undefined, { month:'short', year:'numeric' });
}

function showDetails(id) {
    const item = achievements.find(a => a.id === id);
    if (!item) return;

    const emptyState = document.getElementById('empty-state');
    const detailsPanel = document.getElementById('details-content');

    emptyState.style.display = 'none';
    detailsPanel.style.display = 'block';

    document.getElementById('d-icon').innerHTML = `<span style="font-size:4rem">${item.icon}</span>`;
    document.getElementById('d-title').innerText = item.title;
    document.getElementById('d-category').innerText = item.category.toUpperCase();
    document.getElementById('d-date').innerText = item.date;
    document.getElementById('d-desc').innerText = item.desc;
}

function hideDetails() {
    document.getElementById('empty-state').style.display = 'flex';
    document.getElementById('details-content').style.display = 'none';
}

function setSection(section) {
    console.log("Navigating to:", section);
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    if(section === 'home') navBtns[0].classList.add('active');
    if(section === 'about') navBtns[1].classList.add('active');
}
