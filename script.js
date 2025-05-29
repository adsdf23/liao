// 等待文档加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 创建星星背景
    createStars();

    // 平滑滚动效果
    setupSmoothScrolling();

    // 添加视差滚动效果
    setupParallaxEffect();

    // 初始化天体旋转动画
    setupCelestialAnimations();
    
    // 添加滚动监听，改变导航栏样式
    setupScrollEffects();
});

// 创建动态星星效果
function createStars() {
    const universe = document.querySelector('.universe');
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('dynamic-stars');
    
    // 添加到DOM
    universe.appendChild(starsContainer);
    
    // 创建随机星星
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // 随机位置
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        // 随机大小
        const size = Math.random() * 3;
        
        // 随机闪烁速度
        const duration = 3 + Math.random() * 7;
        
        // 设置样式
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
    
    // 添加CSS
    const style = document.createElement('style');
    style.textContent = `
        .dynamic-stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        
        .star {
            position: absolute;
            background-color: #fff;
            border-radius: 50%;
            animation: twinkle ease-in-out infinite alternate;
        }
        
        @keyframes twinkle {
            0% { opacity: 0.2; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// 设置平滑滚动效果
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// 设置视差滚动效果
function setupParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 根据滚动位置移动月球
        const moon = document.getElementById('moon');
        if (moon) {
            moon.style.transform = `translateY(${scrollPosition * 0.2}px) translateX(${scrollPosition * -0.1}px)`;
        }
        
        // 视差效果应用到各个部分
        const galaxyViews = document.querySelectorAll('.galaxy-view');
        galaxyViews.forEach((galaxy, index) => {
            galaxy.style.backgroundPosition = `center ${50 + (scrollPosition - galaxy.offsetTop) * 0.05}%`;
        });
    });
}

// 设置天体动画
function setupCelestialAnimations() {
    // 太阳脉动效果已在CSS中实现
    // 地球旋转效果已在CSS中实现
    
    // 添加流星效果
    createMeteors();
    
    // 为星系添加缩放效果
    const galaxyViews = document.querySelectorAll('.galaxy-view');
    galaxyViews.forEach(galaxy => {
        galaxy.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        galaxy.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // 为天体卡片添加悬停效果
    const objectCards = document.querySelectorAll('.object-card');
    objectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const visual = this.querySelector('.object-visual');
            visual.style.transform = 'scale(1.1) rotate(5deg)';
            visual.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const visual = this.querySelector('.object-visual');
            visual.style.transform = 'scale(1) rotate(0)';
        });
    });
}

// 创建流星效果
function createMeteors() {
    const universe = document.querySelector('.universe');
    
    // 定期创建流星
    setInterval(() => {
        // 创建流星元素
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        
        // 随机位置和角度
        const startPositionLeft = Math.random() * 80 + 10;
        const angle = Math.random() * 20 + 20; // 20-40度角
        
        // 设置流星样式
        meteor.style.left = `${startPositionLeft}%`;
        meteor.style.top = '0';
        meteor.style.transform = `rotate(${angle}deg)`;
        
        // 添加到DOM
        universe.appendChild(meteor);
        
        // 移除流星元素（动画结束后）
        setTimeout(() => {
            meteor.remove();
        }, 1000);
    }, 5000); // 每5秒创建一个流星
    
    // 添加CSS
    const style = document.createElement('style');
    style.textContent = `
        .meteor {
            position: absolute;
            width: 150px;
            height: 1px;
            background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
            animation: meteor 1s linear forwards;
            z-index: -1;
        }
        
        @keyframes meteor {
            0% {
                opacity: 1;
                transform-origin: left;
                transform: translateY(0) translateX(0) rotate(var(--angle));
            }
            100% {
                opacity: 0;
                transform-origin: left;
                transform: translateY(100vh) translateX(100vw) rotate(var(--angle));
            }
        }
    `;
    document.head.appendChild(style);
}

// 为每个部分添加淡入效果
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // 当部分可见时添加可见类
        if (sectionTop < windowHeight * 0.8 && sectionBottom > 0) {
            section.classList.add('visible');
        }
    });
});

// 添加淡入CSS
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(fadeInStyle);

// 设置滚动效果
function setupScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 当滚动到特定位置时突出显示相应导航项
        const sections = document.querySelectorAll('.section');
        const navItems = document.querySelectorAll('nav ul li a');
        
        sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.5 && sectionTop > -section.offsetHeight * 0.5) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                if (navItems[index]) {
                    navItems[index].classList.add('active');
                }
            }
        });
    });
} 