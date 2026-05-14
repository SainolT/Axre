// 游戏列表页面功能
document.addEventListener('DOMContentLoaded', function() {
    initGameFilters();
    initGameCards();
    console.log('游戏列表页面初始化完成！🎲');
});

// 游戏筛选功能
function initGameFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的激活状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的激活状态
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // 筛选游戏卡片
            gameCards.forEach(card => {
                const categories = card.getAttribute('data-categories');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // 添加筛选动画
            animateFilterChange();
        });
    });
}

// 游戏卡片交互
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // 鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('disabled')) return;
            
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            
            const playBtn = this.querySelector('.btn-play');
            if (playBtn && !playBtn.classList.contains('disabled')) {
                playBtn.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
            
            const playBtn = this.querySelector('.btn-play');
            if (playBtn) {
                playBtn.style.transform = '';
            }
        });
        
        // 点击效果
        const playBtn = card.querySelector('.btn-play');
        if (playBtn && !playBtn.classList.contains('disabled')) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        }
        
        // 卡片点击（如果游戏可用）
        card.addEventListener('click', function(e) {
            if (e.target.closest('a')) return; // 如果点击的是链接，不处理
            
            const playBtn = this.querySelector('.btn-play');
            if (playBtn && !playBtn.classList.contains('disabled')) {
                window.location.href = playBtn.href;
            }
        });
        
        // 添加键盘导航支持
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const playBtn = this.querySelector('.btn-play');
                if (playBtn && !playBtn.classList.contains('disabled')) {
                    window.location.href = playBtn.href;
                }
            }
        });
    });
}

// 筛选动画
function animateFilterChange() {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.style.opacity = '0.8';
    
    setTimeout(() => {
        gamesGrid.style.transition = 'opacity 0.3s ease';
        gamesGrid.style.opacity = '1';
    }, 10);
}

// 游戏统计计数动画
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50; // 50帧动画
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 20);
    });
}

// 页面滚动时触发统计计数
let statsCounted = false;

function checkStatsVisibility() {
    const statsSection = document.querySelector('.game-stats');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight * 0.8 && !statsCounted) {
        statsCounted = true;
        initStatsCounter();
    }
}

// 监听滚动事件
window.addEventListener('scroll', checkStatsVisibility);

// 初始化检查
setTimeout(checkStatsVisibility, 1000);

// 游戏开发计划时间线
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // 添加延迟动画
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// 页面加载后初始化时间线
setTimeout(initTimeline, 500);

// 游戏状态指示器
function updateGameStatus() {
    const statusElements = document.querySelectorAll('.btn-play.disabled');
    
    statusElements.forEach(btn => {
        const statusText = btn.querySelector('span') || btn;
        const originalText = statusText.textContent;
        
        // 添加闪烁效果
        setInterval(() => {
            if (statusText.textContent === originalText) {
                statusText.innerHTML = '<i class="fas fa-cog fa-spin"></i> 开发中';
            } else {
                statusText.textContent = originalText;
            }
        }, 2000);
    });
}

// 初始化游戏状态
updateGameStatus();

// 添加游戏卡片加载动画
function animateGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 页面加载后执行动画
setTimeout(animateGameCards, 300);

// 游戏分类标签颜色
function initTagColors() {
    const tags = document.querySelectorAll('.game-tag');
    
    tags.forEach(tag => {
        const className = tag.className;
        
        if (className.includes('html5')) {
            tag.style.background = 'rgba(227, 76, 38, 0.1)';
            tag.style.color = '#e34c26';
        } else if (className.includes('puzzle')) {
            tag.style.background = 'rgba(255, 101, 132, 0.1)';
            tag.style.color = '#ff6584';
        } else if (className.includes('action')) {
            tag.style.background = 'rgba(54, 209, 220, 0.1)';
            tag.style.color = '#36d1dc';
        } else if (className.includes('classic')) {
            tag.style.background = 'rgba(108, 99, 255, 0.1)';
            tag.style.color = '#6c63ff';
        }
    });
}

// 初始化标签颜色
initTagColors();

// 游戏特色图标动画
function initFeatureIcons() {
    const featureIcons = document.querySelectorAll('.feature i');
    
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.color = 'var(--primary-color)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.color = '';
        });
    });
}

// 初始化特色图标
initFeatureIcons();

// 游戏搜索功能（未来扩展）
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜索游戏...';
    searchInput.className = 'game-search';
    
    const searchContainer = document.querySelector('.game-filters');
    if (searchContainer) {
        searchContainer.appendChild(searchInput);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const gameCards = document.querySelectorAll('.game-card');
            
            gameCards.forEach(card => {
                const title = card.querySelector('.game-title').textContent.toLowerCase();
                const description = card.querySelector('.game-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// 如果需要搜索功能，取消下面的注释
// initSearch();