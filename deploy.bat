@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo 🎮 Sainol游戏开发者作品集 - 部署脚本 (Windows版)
echo ======================================================
echo.

REM 检查Git是否安装
where git >nul 2>nul
if errorlevel 1 (
    echo ❌ Git未安装，请先安装Git
    echo    下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

REM 检查是否在项目目录
if not exist "index.html" (
    echo ❌ 请确保在项目根目录运行此脚本
    pause
    exit /b 1
)

if not exist "css\" (
    echo ❌ 请确保在项目根目录运行此脚本
    pause
    exit /b 1
)

if not exist "js\" (
    echo ❌ 请确保在项目根目录运行此脚本
    pause
    exit /b 1
)

REM 显示项目状态
echo 📁 项目结构检查：
dir /b *.html *.md CNAME .nojekyll 2>nul || echo 没有找到相关文件
echo.

REM 询问GitHub用户名
set /p github_username="请输入你的GitHub用户名（例如：sainol）： "

if "!github_username!"=="" (
    echo ❌ GitHub用户名不能为空
    pause
    exit /b 1
)

REM 询问是否使用自定义域名
set /p use_custom_domain="是否使用自定义域名？(y/n，默认n): "
if "!use_custom_domain!"=="" set use_custom_domain=n

if /i "!use_custom_domain!"=="y" (
    set /p custom_domain="请输入自定义域名（例如：portfolio.sainol.com）： "
    if not "!custom_domain!"=="" (
        echo 📝 更新CNAME文件为: !custom_domain!
        echo !custom_domain! > CNAME
    )
) else (
    echo 📝 将使用GitHub Pages默认域名: https://!github_username!.github.io
    REM 删除CNAME文件（如果存在）
    if exist CNAME del CNAME
)

echo.
echo 🔧 初始化Git仓库...
if not exist ".git\" (
    git init
    echo ✅ Git仓库初始化完成
) else (
    echo ✅ Git仓库已存在
)

echo.
echo 👤 配置Git用户信息...
set /p user_email="请输入你的邮箱（用于Git提交）： "
set /p user_name="请输入你的姓名（用于Git提交）： "

git config user.email "!user_email!"
git config user.name "!user_name!"
echo ✅ Git用户信息配置完成

echo.
echo 📦 添加文件到Git...
git add .
echo ✅ 文件添加完成

echo.
echo 💾 提交更改...
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set date_part=!datetime:~0,4!-!datetime:~4,2!-!datetime:~6,2!
set time_part=!datetime:~8,2!:!datetime:~10,2!:!datetime:~12,2!
set commit_message=部署Sainol游戏开发者作品集 - !date_part! !time_part!

git commit -m "!commit_message!"
echo ✅ 提交完成：!commit_message!

echo.
echo 🌿 设置分支...
git branch -M main
echo ✅ 当前分支：main

echo.
echo 🌐 配置远程仓库...
set remote_url=https://github.com/!github_username!/!github_username!.github.io.git
echo 远程仓库地址：!remote_url!

REM 检查是否已存在远程仓库
git remote > remote.txt 2>nul
findstr /C:"origin" remote.txt >nul
if errorlevel 1 (
    git remote add origin "!remote_url!"
    echo ✅ 添加远程仓库
) else (
    git remote set-url origin "!remote_url!"
    echo ✅ 更新远程仓库地址
)
del remote.txt 2>nul

echo.
echo 🚀 推送到GitHub...
git push -u origin main --force
echo ✅ 推送完成

echo.
echo 🎉 部署完成！
echo ======================================================

if exist CNAME (
    set /p custom_domain=<CNAME
    if not "!custom_domain!"=="" (
        echo 🌐 你的网站将部署在：
        echo    - GitHub Pages: https://!github_username!.github.io
        echo    - 自定义域名: https://!custom_domain!
        echo.
        echo 📝 自定义域名配置说明：
        echo    1. 登录域名注册商控制面板
        echo    2. 添加CNAME记录：
        echo       类型：CNAME
        echo       主机：www 或 @
        echo       值：!github_username!.github.io
        echo    3. 等待DNS传播（通常需要24-48小时）
    ) else (
        echo 🌐 你的网站将部署在：
        echo    - https://!github_username!.github.io
    )
) else (
    echo 🌐 你的网站将部署在：
    echo    - https://!github_username!.github.io
)

echo.
echo ⏳ 部署状态：
echo    - 第一次部署需要1-,2分钟
echo    - 可以在GitHub仓库的Settings ^> Pages中查看状态
echo    - 启用HTTPS：部署完成后在Pages设置中勾选'Enforce HTTPS'

echo.
echo 🔧 后续更新网站：
echo    1. 修改本地文件
echo    2. 运行: git add .
echo    3. 运行: git commit -m "更新说明"
echo    4. 运行: git push
echo    5. 等待1-,2分钟自动更新

echo.
echo 📞 获取帮助：
echo    - GitHub Pages文档: https://docs.github.com/en/pages
echo    - 检查部署状态: https://github.com/!github_username!/!github_username!.github.io/settings/pages
echo    - 常见问题请查看DEPLOYMENT.md文件

echo.
echo 🎮 开始享受你的游戏开发者作品集吧！
echo ======================================================

pause