# Sainol - 游戏开发者作品集

![网站预览](https://img.shields.io/badge/状态-在线-brightgreen)
![GitHub Pages](https://img.shields.io/badge/部署-GitHub%20Pages-blue)
![游戏数量](https://img.shields.io/badge/游戏-1+-orange)
![响应式设计](https://img.shields.io/badge/设计-响应式-purple)

一个现代化的游戏开发者个人作品集网站，展示HTML5游戏作品，支持在线游玩功能。

## 🎮 特色功能

### 🎨 **现代化设计**
- **Cyber-Minimal Grid风格**：极暗蓝黑基底配合霓虹青/紫双色点缀
- **响应式布局**：完美适配电脑、平板、手机
- **交互动画**：流畅的页面过渡和交互效果
- **深色主题**：支持主题切换，保护视力

### 🕹️ **游戏展示**
All- **井字棋游戏**：完整的HTML5实现，支持AI对战
- **游戏分类系统**：按类型、技术、状态筛选游戏
- **游戏详情模态框**：查看游戏信息和截图
- **在线游玩**：无需下载，直接在浏览器中玩游戏

### 👤 **个人展示**
- **个人简介**：展示游戏开发理念和技能
- **技术能力**：可视化技能图表展示
- **开发流程**：展示游戏创作流程
- **未来计划**：展示正在开发中的项目

### 📱 **响应式体验**
- **移动端优化**：触控友好的界面设计
- **横屏适配**：游戏页面支持横屏显示
- **性能优化**：快速加载，流畅动画

## 🚀 快速开始

### 本地运行
1. 克隆仓库：
   ```bash
   git clone https://github.com/sainol/sainol-portfolio.git
   ```

2. 进入项目目录：
   ```bash
   cd sainol-portfolio
   ```

3. 使用本地服务器运行：
   - **Python 3**：
     ```bash
     python -m http.server 8000
     ```
   - **Node.js**：
     ```bash
     npx serve
     ```
   - **PHP**：
     ```bash
     php -S localhost:8000
     ```

4. 在浏览器中访问：`http://localhost:8000`

### 部署到GitHub Pages

1. **创建GitHub仓库**
   - 登录GitHub
   - 创建新仓库：`sainol.github.io`（必须使用此格式：用户名.github.io）
   - 选择公开（Public）仓库

2. **上传项目文件**
   ```bash
   git init
   git add .
   git commit -m "初始提交：Sainol游戏开发者作品集"
   git branch -M main
   git remote add origin https://github.com/sainol/sainol.github.io.git
   git push -u origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库设置（Settings）
   - 找到"Pages"选项
   - 选择分支：`main`
   - 选择文件夹：`/(root)`
   - 点击"Save"

4. **等待部署完成**
   - 部署通常需要1-2分钟
   - 访问你的网站：`https://sainol.github.io`

### 自定义域名（可选）

1. **购买域名**
   - 在域名注册商处购买域名（如：sainol.com）

2. **配置DNS**
   - 添加CNAME记录：
     ```
     类型：CNAME
     名称：www
     值：sainol.github.io
     ```
   - 或添加A记录：
     ```
     类型：A
     名称：@
     值：185.199.108.153
     值：185.199.109.153
     值：185.199.110.153
     值：185.199.111.153
     ```

3. **更新CNAME文件**
   - 修改项目中的`CNAME`文件内容为你的域名

4. **在GitHub中设置**
   - 在仓库设置的Pages页面，输入你的自定义域名

## 📁 项目结构

```
sainol-portfolio/
├── index.html          # 首页 - 个人品牌展示
├── games.html          # 游戏库 - 所有游戏展示
├── about.html          # 关于我 - 个人简介和技能
├── contact.html        # 联系页面 - 联系表单
├── tic-tac-toe.html    # 井字棋游戏 - HTML5游戏
├── css/                # 样式文件
│   ├── style.css       # 通用样式
│   ├── games.css       # 游戏库样式
│   ├── about.css       # 关于我页面样式
│   └── contact.css     # 联系页面样式
├── js/                 # JavaScript文件
│   ├── main.js         # 通用功能
│   ├── games.js        # 游戏库功能
│   ├── about.js        # 关于我功能
│   └── contact.js      # 联系功能
├── .nojekyll           # 禁用Jekyll处理
├── CNAME              # 自定义域名配置
├── .gitignore         # Git忽略文件
└── README.md          # 项目说明文档
```

## 🎨 设计规范

### 色彩方案
- **主背景**：`#0A0E17`（极暗蓝黑）
- **次要背景**：`#131722`
- **卡片背景**：`#1A1F2D`
- **霓虹青**：`#00F5FF`
- **霓虹紫**：`#AA00FF`
- **霓虹绿**：`#00FF9D`
- **文字主色**：`#E2E8F0`
- **文字次色**：`#94A3B8`

### 字体
- **主字体**：Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **代码字体**：'Fira Code', 'Courier New', monospace

### 间距
- **小**：0.5rem (8px)
- **中**：1rem (16px)
- **大**：2rem (32px)
- **特大**：4rem (64px)

## 🕹️ 井字棋游戏

### 游戏特性
- **智能AI**：4个难度级别（简单、中等、困难、专家）
- **游戏统计**：记录胜率、游戏次数、平局次数
- **撤销功能**：支持撤销移动
- **自动对战**：AI对战AI演示
- **提示系统**：为玩家提供移动建议

### AI算法
1. **简单**：随机移动
2. **中等**：阻止玩家获胜，尝试获胜
3. **困难**：使用简单评分系统
4. **专家**：使用极小化极大算法，保证最优解

## 🔧 技术栈

- **HTML5**：语义化标记，现代API
- **CSS3**：Grid布局，Flexbox，CSS变量，动画
- **JavaScript**：原生ES6+，无框架依赖
- **Font Awesome**：图标库
- **GitHub Pages**：免费托管

## 📱 浏览器兼容性

| 浏览器 | 版本 | 支持状态 |
|--------|------|----------|
| Chrome | 60+ | ✅ 完全支持 |
| Firefox | 55+ | ✅ 完全支持 |
| Safari | 12+ | ✅ 完全支持 |
| Edge | 79+ | ✅ 完全支持 |
| iOS Safari | 12+ | ✅ 完全支持 |
| Chrome for Android | 60+ | ✅ 完全支持 |

## 🚀 未来计划

### 短期计划
- [ ] 添加更多HTML5游戏
- [ ] 实现游戏进度保存
- [ ] 添加多语言支持
- [ ] 优化移动端性能

### 长期计划
- [ ] 集成WebGL游戏
- [ ] 添加多人联机游戏
- [ ] 实现游戏成就系统
- [ ] 创建游戏开发博客

## 🤝 贡献指南

欢迎贡献代码和想法！

1. Fork项目
2. 创建功能分支：`git checkout -b feature/新功能`
3. 提交更改：`git commit -m '添加新功能'`
4. 推送到分支：`git push origin feature/新功能`
5. 提交Pull Request

### 开发规范
- 使用语义化的HTML标签
- 遵循CSS BEM命名规范
- 使用ES6+语法编写JavaScript
- 确保所有功能在移动端正常工作

## 📄 许可证

本项目基于MIT许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系

- **邮箱**：sainol@163.com
- **网站**：https://sainol.github.io
- **GitHub**：https://github.com/sainol

---

**特别感谢**：
- Font Awesome提供精美图标
- GitHub提供免费托管服务
- 所有开源项目的贡献者

**最后更新**：2026年5月14日