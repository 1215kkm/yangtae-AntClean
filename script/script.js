// 일개미 청소 - 공통 스크립트 (새 디자인)

// Header와 Footer 로드
document.addEventListener('DOMContentLoaded', function() {
    // Header 로드
    fetch('include/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            initHeader();
        })
        .catch(error => console.error('Header 로드 실패:', error));

    // Footer 로드
    fetch('include/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Footer 로드 실패:', error));
});

// Header 초기화
function initHeader() {
    // 현재 페이지 활성화
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a, .mobile-nav-content > a, .dropdown-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
            // 드롭다운 메뉴의 링크가 활성화되면 부모 "서비스" 링크도 활성화
            const dropdown = link.closest('.nav-dropdown');
            if (dropdown) {
                const parentLink = dropdown.querySelector(':scope > a');
                if (parentLink) {
                    parentLink.classList.add('active');
                }
            }
        }
    });
    
    // service-로 시작하는 페이지에서 "서비스" 메뉴 활성화
    if (currentPage.startsWith('service-')) {
        const serviceLink = document.querySelector('.nav-dropdown > a[href="services.html"]');
        if (serviceLink) {
            serviceLink.classList.add('active');
        }
    }
}

// Mobile Menu Functions
function openMobileMenu() {
    document.getElementById('mobileNav').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    document.getElementById('mobileNav').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// GSAP 초기화
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Counter Animation
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

// 카운터 애니메이션 초기화
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0 && typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: '.stats-section, .stats-container',
            start: 'top 70%',
            once: true,
            onEnter: () => {
                counters.forEach(animateCounter);
            }
        });
    }
}

// GSAP 공통 애니메이션
function initAnimations() {
    if (typeof gsap === 'undefined') return;

    // 카드 애니메이션
    gsap.utils.toArray('.card, .service-card, .news-card, .blog-card, .portfolio-item, .review-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            }
        });
    });

    // 퀵 메뉴 애니메이션
    gsap.utils.toArray('.quick-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            }
        });
    });

    // 통계 아이템 애니메이션
    gsap.utils.toArray('.stat-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            }
        });
    });

    // Feature Box 애니메이션
    gsap.utils.toArray('.feature-box, .service-feature').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 0.6,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            }
        });
    });

    // Process Step 애니메이션
    gsap.utils.toArray('.process-step').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            delay: i * 0.15,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            }
        });
    });
}

// 페이지 로드 후 초기화
window.addEventListener('load', () => {
    initCounters();
    setTimeout(initAnimations, 100);
    initFAQ();
    initPortfolioFilter();
});

// Tab 버튼 기능
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('tab-btn')) {
        const parent = e.target.parentElement;
        parent.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
    }
});

// Form Submit Handler
function handleSubmit(e) {
    e.preventDefault();
    alert('견적 문의가 접수되었습니다!\n빠른 시일 내에 연락드리겠습니다.\n\n긴급 문의: 1588-0000');
    e.target.reset();
}

// Newsletter Submit Handler
function handleNewsletter(e) {
    e.preventDefault();
    alert('구독해 주셔서 감사합니다!\n매주 유용한 정보를 보내드리겠습니다.');
    e.target.reset();
}

// FAQ 토글
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // 모든 FAQ 닫기
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // 클릭한 FAQ 열기 (이미 열려있었으면 닫기)
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 활성 버튼 변경
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // 필터링
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    if (typeof gsap !== 'undefined') {
                        gsap.from(item, {
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.3
                        });
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Smooth Scroll
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// 이미지 Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// 스크롤 시 헤더 숨김/표시
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 200) {
        // 아래로 스크롤
        if (header) header.style.transform = 'translateY(-100%)';
    } else {
        // 위로 스크롤
        if (header) header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});


// Service LNB 활성화
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const lnbItems = document.querySelectorAll('.lnb-item');
    
    // 현재 페이지에 맞는 LNB 아이템 활성화
    lnbItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });
});