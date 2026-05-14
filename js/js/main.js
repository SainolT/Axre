// 主JavaScript文件 - 游戏开发者作品集网站

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initGameCards();
    initAnimations();
    console.log('网站初始化完成！🎮');
});

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // 检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // 切换主题
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // 添加切换动画效果
        document.body.style.transition = 'none';
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '1';
        }, 50);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换为浅色主题' : '切换为深色主题');
    }
}

// 移动端菜单功能
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = mobileMenu.querySelectorAll('a');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.style.display === 'block';
        mobileMenu.style.display = isOpen ? 'none' : 'block';
        
        // 更新按钮图标
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = isOpen ? 'fas fa-bars' : 'fas fa-times';
        
        // 更新ARIA标签
        mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
    });
    
    // 点击菜单链接后关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.style.display = 'none';
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// 平滑滚动功能
function initSmoothScroll() {
    // 为所有锚点链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 游戏卡片交互功能
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // 鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
        
        // 点击效果
        card.addEventListener('click', function(e) {
            // 如果不是按钮被点击，则导航到游戏详情页
            if (!e.target.closest('a')) {
                const gameLink = this.querySelector('.btn-play');
                if (gameLink) {
                    window.location.href = gameLink.href;
                }
            }
        });
        
        // 添加键盘导航支持
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const gameLink = this.querySelector('.btn-play');
                if (gameLink) {
                    window.location.href = gameLink.href;
                }
            }
        });
    });
}

// 动画初始化
function initAnimations() {
    // 使用Intersection Observer实现滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.game-card, .tech-item, .stat').forEach(element => {
        observer.observe(element);
    });
    
    // 添加动画CSS类
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .game-card:nth-child(1) { animation-delay: 0.1s; }
        .game-card:nth-child(2) { animation-delay: 0.2s; }
        .game-card:nth-child(3) { animation-delay: 0.3s; }
        .tech-item:nth-child(1) { animation-delay: 0.1s; }
        .tech-item:nth-child(2) { animation-delay: 0.2s; }
        .tech-item:nth-child(3) { animation-delay: 0.3s; }
        .tech-item:nth-child(4) { animation-delay: 0.4s; }
        .tech-item:nth-child(5) { animation-delay: 0.5s; }
        .tech-item:nth-child(6) { animation-delay: 0.6s; }
    `;
    document.head.appendChild(style);
}

// 页面加载进度指示器
window.addEventListener('load', function() {
    // 隐藏加载状态
    const loadingElements = document.querySelectorAll('.loading-state');
    loadingElements.forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.display = 'none';
        }, 300);
    });
    
    // 显示主要内容
    document.body.style.opacity = '1';
});

// 添加视差滚动效果（可选）
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

// 初始化视差效果（如果需要）
// initParallax();

// 游戏数据管理（未来扩展）
const gameData = {
    games: [
        {
            id: 'tic-tac-toe',
            title: '井字棋大师',
            description: '经典的两人对战井字棋游戏，支持音效和动画效果。',
            category: 'HTML5',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'games/tic-tac-toe.html',
            color: '#6c63ff'
        },
        {
            id: 'memory',
            title: '记忆挑战',
            description: '测试你的记忆力的卡片匹配游戏。多种难度级别。',
            category: '益智',
            tags: ['JavaScript', 'CSS动画', '响应式'],
            link: 'games/memory.html',
            color: '#ff6584'
        },
        {
            id: 'space-shooter',
            title: '太空防御者',
            description: '经典的太空射击游戏，控制飞船躲避陨石和敌人。',
            category: '动作',
            tags: ['Canvas', '游戏物理', '音效系统'],
            link: 'games/space-shooter.html',
            color: '#36d1dc'
        }
    ]
};

// 导出游戏数据供其他页面使用
window.gameData = gameData;

// 错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript错误:', e.message, e.filename, e.lineno);
});

// 性能监控（开发环境）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('开发模式：已启用性能监控');
    
    // 记录页面加载时间
    const perfData = window.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`页面加载时间: ${loadTime}ms`);
}