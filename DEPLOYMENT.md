# 🚀 部署指南 - Sainol游戏开发者作品集

本文档详细说明如何将游戏开发者作品集网站部署到GitHub Pages，以及如何配置自定义域名。

## 📋 部署前准备

### 1. GitHub账户
- 确保你有一个GitHub账户
- 如果没有，请访问 [GitHub官网](https://github.com) 注册

### 2. 项目文件
确保你的项目包含以下文件：
- `index.html` - 首页
- `games.html` - 游戏库页面
- `about.html` - 关于我页面
- `contact.html` - 联系页面
- `tic-tac-toe.html` - 井字棋游戏
- `css/` - 样式文件夹
- `js/` - JavaScript文件夹
- `.nojekyll` - 禁用Jekyll
- `CNAME` - 域名配置文件（可选）
- `README.md` - 项目说明

## 🔄 方法一：通过GitHub网页界面部署

### 步骤1：创建仓库
1. 登录GitHub
2. 点击右上角的"+"号，选择"New repository"
3. 填写仓库信息：
   - **Repository name**: `sainol.github.io` (必须使用`用户名.github.io`格式)
   - **Description**: Sainol游戏开发者作品集
   - **Visibility**: Public (公开)
   - **Initialize this repository with**: 不要勾选任何选项

### 步骤2：上传文件
1. 在新创建的仓库页面，点击"Add file" > "Upload files"
2. 将项目所有文件拖拽到上传区域
3. 添加提交信息："Initial commit"
4. 点击"Commit changes"

### 步骤3：启用GitHub Pages
1. 进入仓库的"Settings"选项卡
2. 在左侧菜单中找到"Pages"
3. 在"Source"部分：
   - 选择"Deploy from a branch"
   - 分支选择"main"
   - 文件夹选择"/(root)"
4. 点击"Save"

### 步骤4：等待部署
- 页面会显示"Your site is published at https://sainol.github.io"
- 第一次部署需要1-2分钟
- 刷新页面查看部署状态

## 💻 方法二：通过Git命令行部署

### 步骤1：初始化Git
```bash
# 在项目目录中打开终端/命令行
cd /path/to/sainol-portfolio

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交：Sainol游戏开发者作品集"
```

### 步骤2：连接到GitHub
```bash
# 创建主分支
git branch -M main

# 添加远程仓库（将sainol替换为你的GitHub用户名）
git remote add origin https://github.com/sainol/sainol.github.io.git

# 推送到GitHub
git push -u origin main
```

### 步骤3：启用GitHub Pages
- 按照方法一的步骤3启用Pages功能

## 🌐 方法三：配置自定义域名

### 方案A：使用子域名（推荐）
例如：`portfolio.sainol.com`

1. **购买域名**
   - 在域名注册商处购买域名（如：Namecheap, GoDaddy, 阿里云等）

2. **配置DNS记录**
   - 登录域名注册商的控制面板
   - 找到DNS设置
   - 添加CNAME记录：
     ```
     类型：CNAME
     主机/名称：portfolio
     值/目标：sainol.github.io
     TTL：自动或3600
     ```

3. **更新CNAME文件**
   - 在项目根目录创建或修改`CNAME`文件
   - 内容为：`portfolio.sainol.com`

4. **提交到GitHub**
   ```bash
   git add CNAME
   git commit -m "添加自定义域名配置"
   git push
   ```

5. **在GitHub中设置**
   - 进入仓库Settings > Pages
   - 在"Custom domain"中输入：`portfolio.sainol.com`
   - 点击"Save"
   - 勾选"Enforce HTTPS"

### 方案B：使用主域名
例如：`sainol.com`

1. **配置DNS记录**
   - 添加4个A记录：
     ```
     类型：A
     主机/名称：@
     值/目标：185.199.108.153
     TTL：自动或3600
     ```
     ```
     类型：A
     主机/名称：@
     值/目标：185.199.109.153
     TTL：自动或3600
     ```
     ```
     类型：A
     主机/名称：@
     值/目标：185.199.110.153
     TTL：自动或3600
     ```
     ```
     类型：A
     主机/名称：@
     值/目标：185.199.111.153
     TTL：自动或3600
     ```

2. **更新CNAME文件**
   - 内容为：`sainol.com`

3. **后续步骤**与方案A相同

## 🔧 高级配置

### 启用HTTPS
- GitHub Pages自动提供HTTPS
- 在仓库Settings > Pages中勾选"Enforce HTTPS"
- 自定义域名需要等待DNS传播完成后才能启用HTTPS

### 设置自定义404页面
1. 在项目根目录创建`404.html`
2. 内容可以复制`index.html`并修改标题
3. 提交并推送
4. GitHub会自动使用这个页面作为404页面

### 添加网站图标
1. 准备`favicon.ico`文件（推荐尺寸：32x32或64x64）
2. 将文件放在项目根目录
3. 在`index.html`的`<head>`中添加：
   ```html
   <link rel="icon" href="favicon.ico" type="image/x-icon">
   ```

## 🚨 常见问题

### 问题1：网站显示"404 Not Found"
**可能原因**：
1. 仓库名称不正确（必须是`用户名.github.io`）
2. GitHub Pages未启用
3. 文件未推送到main分支

**解决方案**：
1. 检查仓库名称格式
2. 确认已启用GitHub Pages
3. 确保所有文件在main分支

### 问题2：自定义域名无法访问
**可能原因**：
1. DNS记录未生效（需要24-48小时传播）
2. CNAME文件内容错误
3. 未在GitHub中设置自定义域名

**解决方案**：
1. 使用 [DNS Checker](https://dnschecker.org) 检查DNS传播状态
2. 验证CNAME文件内容
3. 在GitHub Pages设置中重新输入域名

### 问题3：网站样式丢失
**可能原因**：
1. 路径错误
2. 缓存问题

**解决方案**：
1. 检查CSS和JS文件路径
2. 清除浏览器缓存：Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)
3. 使用开发者工具检查控制台错误

### 问题4：移动端显示异常
**可能原因**：
1. 视口设置问题
2. 响应式设计错误

**解决方案**：
1. 确保`<meta name="viewport">`标签存在
2. 使用Chrome开发者工具的设备模拟器调试

## 📈 监控和维护

### 检查网站状态
- 访问：https://sainol.github.io
- 使用 [UptimeRobot](https://uptimerobot.com) 监控网站可用性

### 更新网站内容
```bash
# 1. 修改本地文件
# 2. 提交更改
git add .
git commit -m "更新网站内容"
git push

# 3. 等待自动部署（约1-2分钟）
```

### 备份网站
- 定期将项目文件夹备份到本地
- 考虑使用GitHub Actions自动备份到其他存储服务

## 🎯 最佳实践

### 性能优化
1. **压缩图片**：使用TinyPNG等工具
2. **合并CSS/JS**：减少HTTP请求
3. **使用CDN**：对于Font Awesome等库

### SEO优化
1. **添加meta标签**：描述、关键词
2. **使用语义化HTML**：h1-h6标签
3. **创建sitemap.xml**：帮助搜索引擎索引

### 安全考虑
1. **启用HTTPS**：确保所有连接安全
2. **内容安全策略**：添加CSP头
3. **定期更新**：保持第三方库最新

## 📞 获取帮助

如果遇到问题：
1. 查看GitHub Pages文档：https://docs.github.com/en/pages
2. 检查浏览器控制台错误
3. 验证文件路径和权限
4. 在GitHub Issues中提问

## 🎉 部署完成

成功部署后，你可以：
- 分享链接给朋友和同事
- 添加到LinkedIn个人资料
- 在简历中引用
- 持续更新游戏作品

---

**最后更新**：2026年5月14日  
**部署状态**：✅ 可部署  
**预计时间**：10-15分钟  
**技术要求**：基础Git知识