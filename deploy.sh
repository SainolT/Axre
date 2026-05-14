#!/bin/bash

# Sainol游戏开发者作品集 - 一键部署脚本
# 使用方法：./deploy.sh

set -e  # 遇到错误时退出

echo "🎮 Sainol游戏开发者作品集 - 部署脚本"
echo "======================================"

# 检查Git是否安装
if ! command -v git &> /dev/null; then
    echo "❌ Git未安装，请先安装Git"
    exit 1
fi

# 检查是否在项目目录
if [ ! -f "index.html" ] || [ ! -d "css" ] || [ ! -d "js" ]; then
    echo "❌ 请确保在项目根目录运行此脚本"
    exit 1
fi

# 显示项目状态
echo "📁 项目结构检查："
ls -la | grep -E "\.html$|\.md$|CNAME|\.nojekyll" || true
echo ""

# 询问GitHub用户名
read -p "请输入你的GitHub用户名（例如：sainol）： " github_username

if [ -z "$github_username" ]; then
    echo "❌ GitHub用户名不能为空"
    exit 1
fi

# 询问是否使用自定义域名
read -p "是否使用自定义域名？(y/n，默认n): " use_custom_domain
use_custom_domain=${use_custom_domain:-n}

if [ "$use_custom_domain" = "y" ] || [ "$use_custom_domain" = "Y" ]; then
    read -p "请输入自定义域名（例如：portfolio.sainol.com）： " custom_domain
    if [ -n "$custom_domain" ]; then
        echo "📝 更新CNAME文件为: $custom_domain"
        echo "$custom_domain" > CNAME
    fi
else
    echo "📝 将使用GitHub Pages默认域名: https://$github_username.github.io"
    # 删除CNAME文件（如果存在）
    rm -f CNAME
fi

# 初始化Git仓库
echo ""
echo "🔧 初始化Git仓库..."
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git仓库初始化完成"
else
    echo "✅ Git仓库已存在"
fi

# 配置Git用户信息
echo ""
echo "👤 配置Git用户信息..."
read -p "请输入你的邮箱（用于Git提交）： " user_email
read -p "请输入你的姓名（用于Git提交）： " user_name

git config user.email "$user_email"
git config user.name "$user_name"
echo "✅ Git用户信息配置完成"

# 添加所有文件
echo ""
echo "📦 添加文件到Git..."
git add .
echo "✅ 文件添加完成"

# 提交更改
commit_message="部署Sainol游戏开发者作品集 - $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$commit_message"
echo "✅ 提交完成：$commit_message"

# 创建或切换到main分支
echo ""
echo "🌿 设置分支..."
git branch -M main
echo "✅ 当前分支：main"

# 添加远程仓库
remote_url="https://github.com/$github_username/$github_username.github.io.git"
echo ""
echo "🌐 配置远程仓库..."
echo "远程仓库地址：$remote_url"

# 检查是否已存在远程仓库
if git remote | grep -q "origin"; then
    git remote set-url origin "$remote_url"
    echo "✅ 更新远程仓库地址"
else
    git remote add origin "$remote_url"
    echo "✅ 添加远程仓库"
fi

# 推送到GitHub
echo ""
echo "🚀 推送到GitHub..."
git push -u origin main --force
echo "✅ 推送完成"

# 显示部署信息
echo ""
echo "🎉 部署完成！"
echo "======================================"

if [ -f "CNAME" ] && [ -s "CNAME" ]; then
    custom_domain=$(cat CNAME)
    echo "🌐 你的网站将部署在："
    echo "   - GitHub Pages: https://$github_username.github.io"
    echo "   - 自定义域名: https://$custom_domain"
    echo ""
    echo "📝 自定义域名配置说明："
    echo "   1. 登录域名注册商控制面板"
    echo "   2. 添加CNAME记录："
    echo "      类型：CNAME"
    echo "      主机：www 或 @"
    echo "      值：$github_username.github.io"
    echo "   3. 等待DNS传播（通常需要24-48小时）"
else
    echo "🌐 你的网站将部署在："
    echo "   - https://$github_username.github.io"
fi

echo ""
echo "⏳ 部署状态："
echo "   - 第一次部署需要1-,2分钟"
echo "   - 可以在GitHub仓库的Settings > Pages中查看状态"
echo "   - 启用HTTPS：部署完成后在Pages设置中勾选'Enforce HTTPS'"

echo ""
echo "🔧 后续更新网站："
echo "   1. 修改本地文件"
echo "   2. 运行: git add ."
echo "   3. 运行: git commit -m '更新说明'"
echo "   4. 运行: git push"
echo "   5. 等待1-,2分钟自动更新"

echo ""
echo "📞 获取帮助："
echo "   - GitHub Pages文档: https://docs.github.com/en/pages"
echo "   - 检查部署状态: https://github.com/$github_username/$github_username.github.io/settings/pages"
echo "   - 常见问题请查看DEPLOYMENT.md文件"

echo ""
echo "🎮 开始享受你的游戏开发者作品集吧！"
echo "======================================"