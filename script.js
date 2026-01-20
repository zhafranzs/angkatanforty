// FILTER NEWS
const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.news-card');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;

        cards.forEach(card => {
            card.style.display =
                category === 'all' || card.dataset.category === category
                ? 'block'
                : 'none';
        });
    });
});

// LIGHTBOX
const images = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const close = document.getElementById('close');

images.forEach(img => {
    img.onclick = () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    };
});

close.onclick = () => lightbox.style.display = 'none';
lightbox.onclick = e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
};

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    },
    { threshold: 0.1 }
);

reveals.forEach(el => revealObserver.observe(el));

const slides = document.querySelectorAll('.slide');
let current = 0;

function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === current);
    });

    const offset = -(current * (260 + 40)) + 260;
    document.querySelector('.slider-track')
        .style.transform = `translateX(${offset}px)`;
}

slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
        stopAutoplay();
        current = index;
        updateSlider();

        setTimeout(() => {
            startAutoplay();
        }, 5000);
    });
});


updateSlider();
let startX = 0;

const track = document.querySelector('.slider-track');

track.addEventListener('mousedown', e => {
    stopAutoplay();
    startX = e.clientX;
});

track.addEventListener('mouseup', e => {
    const diff = e.clientX - startX;

    if (diff > 50 && current > 0) current--;
    if (diff < -50 && current < slides.length - 1) current++;

    updateSlider();

    setTimeout(() => {
        startAutoplay();
    }, 500);
});

let autoPlayInterval;
const autoplayDelay = 3000; // 3 detik (jangan lebih cepat)

function startAutoplay() {
    autoPlayInterval = setInterval(() => {
        current = (current + 1) % slides.length;
        updateSlider();
    }, autoplayDelay);
}

function startAutoplay() {
    stopAutoplay(); // PENTING: bunuh interval lama dulu

    autoPlayInterval = setInterval(() => {
        current = (current + 1) % slides.length;
        updateSlider();
    }, autoplayDelay);
}

function stopAutoplay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

track.addEventListener('mousedown', e => {
    stopAutoplay();
    startX = e.clientX;
});

track.addEventListener('mouseup', e => {
    const diff = e.clientX - startX;

    if (diff > 50 && current > 0) current--;
    if (diff < -50 && current < slides.length - 1) current++;

    updateSlider();
    setTimeout(startAutoplay, 5000);
});

const canvas = document.getElementById('bg-particles');
const ctx = canvas.getContext('2d');

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    vx: Math.random() * 0.4 - 0.2,
    vy: Math.random() * 0.4 - 0.2,
    a: Math.random() * 0.6 + 0.2
}));

function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();

let scrollTimer;
window.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        document.body.classList.remove('scrolling');
    }, 200);
});

const bg = document.querySelector('.bg-gradient');
const sections = document.querySelectorAll('section');

const bgObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const colors = entry.target.dataset.bg;
                if (!colors) return;

                const [c1, c2] = colors.split(',');
                bg.style.background = `linear-gradient(120deg, ${c1}, ${c2})`;
            }
        });
    },
    {
        threshold: 0.5
    }
);
const galleryBtns = document.querySelectorAll('.gallery-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        galleryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
            const category = item.dataset.category;

            item.style.display =
                filter === 'all' || category === filter
                ? 'block'
                : 'none';
        });
    });
});


sections.forEach(sec => bgObserver.observe(sec));

