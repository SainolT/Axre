# 游戏开发者作品集网站

这是一个个人游戏开发者作品集网站，展示HTML5游戏作品和个人项目。网站托管在GitHub Pages上。

## 🎮 功能特点

- **响应式设计** - 适配桌面、平板和移动设备
- **深色/浅色主题** - 支持主题切换
- **游戏作品展示** - 展示多个可直接游玩的HTML5游戏
- **技术栈展示** - 展示使用的技术和工具
- **个人简介** - 展示开发者背景和技能
- **联系表单** - 支持访客联系

## 🎯 已实现游戏

### 1. 井字棋大师
- 经典两人对战井字棋游戏
- 支持玩家对战和AI对战
- 三种AI难度级别
- 动画效果和音效
- 游戏历史记录

### 2. 记忆挑战（即将上线）
- 卡片匹配记忆游戏
- 多种难度级别
- 计时器和分数系统

### 3. 太空防御者（即将上线）
- 经典太空射击游戏
- Canvas渲染引擎
- 物理碰撞检测

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **布局**: CSS Grid, Flexbox
- **动画**: CSS动画，JavaScript动画
- **音效**: Web Audio API
- **游戏引擎**: 原生JavaScript
- **部署**: GitHub Pages

## 📁 项目结构

```
game-portfolio/
├── index.html              # 主页面
├── games.html             # 游戏列表页面
├── about.html             # 关于我页面
├── contact.html           # 联系页面
├── README.md              # 项目说明
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions部署配置
├── css/
│   └── styles.css         # 主样式文件
├── js/
│   └── main.js            # 主JavaScript文件
├── games/                 # 游戏目录
│   ├── tic-tac-toe.html   # 井字棋游戏
│   ├── css/
│   │   └── game-styles.css # 游戏样式
│   └── js/
│       └── tic-tac-toe.js  # 井字棋游戏逻辑
└── assets/                # 静态资源
    ├── images/            # 图片资源
    └── sounds/            # 音效资源
```

## 🚀 部署到GitHub Pages

### 部署步骤：

1. **在GitHub上创建仓库**
   ```bash
   # 将项目推送到GitHub
   git init
   git add .
   git commit -m "Initial commit: Game portfolio website"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

2. **启用GitHub Pages**
   - 进入仓库设置
   - 找到"Pages"选项
   - 选择部署分支：`main`
   - 选择部署目录：`/ (root)`
   - 点击保存

3. **访问网站**
   - 网站将在几分钟内部署完成
   - 访问地址：`https://你的用户名.github.io/你的仓库名`

### 自动部署
本项目已配置GitHub Actions工作流，每次推送到main分支时都会自动部署。

## 🎨 自定义配置

### 修改个人信息
1. 打开 `index.html`
2. 修改以下信息：
   - 姓名：在多个位置更新"汤雅婷"
   - 邮箱：更新 `tangyating@dodjoy.com`
   - 公司：更新"大梦龙途 · 烽火产品线"
   - 城市：更新"长沙"

### 添加新游戏
1. 在 `games/` 目录下创建新的游戏文件夹
2. 创建游戏HTML、CSS、JS文件
3. 在 `games.html` 中添加游戏卡片
4. 更新导航菜单和游戏列表

### 修改主题颜色
在 `css/styles.css` 中修改CSS变量：
```css
:root {
    --primary-color: #6c63ff;
    --secondary-color: #ff6584;
    --accent-color: #36d1dc;
    --bg-color: #0f172a;
    --card-bg: #1e293b;
    --text-color: #f8fafc;
    --text-secondary: #94a3b8;
    --border-color: #334155;
}
```

## 📱 响应式设计

网站支持多种屏幕尺寸：
- **桌面** (≥1200px): 完整布局
- **平板** (768px-1199px): 自适应布局
- **移动端** (<768px): 移动优化布局

## 🔧 开发环境

### 本地开发
1. 克隆仓库
2. 使用任意HTTP服务器启动
   ```bash
   # 使用Python简单服务器
   python3 -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   ```

3. 访问 `http://localhost:8000`

### 浏览器支持
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📄 许可证

本项目采用MIT许可证。详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 📞 联系

- 邮箱: tangyating@dodjoy.com
- GitHub: [你的GitHub用户名]
- 公司: 大梦龙途 · 烽火产品线
- 城市: 长沙

---

**最后更新**: 2026年5月14日
**版本**: 1.0.0