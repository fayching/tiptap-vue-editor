# Demo 部署说明

## 📦 已完成的配置

### 1. 分支结构
- `main` 分支：主开发分支，用于npm包发布
- `demo` 分支：演示分支，用于GitHub Pages部署

### 2. 构建配置
- `vite.config.ts` - 库构建配置（main分支使用）
- `vite.demo.config.ts` - Demo应用构建配置（demo分支使用）

### 3. NPM 脚本
```bash
npm run build        # 构建npm包（生成库文件）
npm run build:demo   # 构建demo应用
npm run deploy       # 构建并部署demo（仅demo分支）
```

### 4. GitHub Actions
已创建 `.github/workflows/deploy-demo.yml`，当推送到demo分支时会自动：
- 安装依赖
- 构建demo应用
- 部署到GitHub Pages

## 🚀 部署步骤

### 首次部署

1. **推送demo分支到GitHub**
   ```bash
   git push -u origin demo
   ```

2. **在GitHub仓库配置Pages**
   - 进入仓库设置：Settings → Pages
   - Source选择：GitHub Actions
   - 等待Actions工作流完成

3. **访问Demo**
   部署完成后，访问：
   ```
   https://fayching.github.io/tiptap-vue-editor/
   ```

### 后续更新

当你需要更新demo时：

**方式1：自动部署（推荐）**
```bash
# 在demo分支
git checkout demo
# 合并main分支的更新（如果需要）
git merge main
# 推送到远程，触发自动部署
git push origin demo
```

**方式2：手动部署**
```bash
# 在demo分支
npm run deploy
```

## 📁 目录说明

### demo分支特殊配置

- **dist目录**：在demo分支中提交，用于GitHub Pages
- **.gitignore**：修改为允许提交dist目录
- **public/.nojekyll**：告诉GitHub Pages不使用Jekyll处理

### 构建产物对比

**main分支构建（npm包）：**
```
dist/
  ├── index.d.ts              # 类型定义
  ├── style.css               # 样式文件
  ├── tiptap-vue-editor.es.js # ES模块
  └── tiptap-vue-editor.umd.js# UMD模块
```

**demo分支构建（应用）：**
```
dist/
  ├── index.html              # HTML入口
  ├── .nojekyll              # GitHub Pages配置
  └── assets/                 # 静态资源
      ├── index-xxx.css
      └── index-xxx.js
```

## ⚠️ 注意事项

1. **不要在main分支提交dist目录**
   - main分支的dist是构建产物，不应提交
   - demo分支的dist需要提交用于部署

2. **base路径配置**
   - demo配置中已设置 `base: '/tiptap-vue-editor/'`
   - 这对应GitHub Pages的URL路径

3. **合并代码时的注意**
   - 从main合并到demo时，小心处理.gitignore的冲突
   - demo分支的.gitignore注释了dist，需要保留

## 🔧 故障排除

### 页面404
- 检查GitHub Pages设置是否选择了"GitHub Actions"
- 确认Actions工作流是否成功运行
- 检查dist目录是否包含.nojekyll文件

### 资源加载失败
- 检查vite.demo.config.ts中的base路径配置
- 确保与GitHub仓库名称匹配

### 自动部署不触发
- 检查.github/workflows/deploy-demo.yml是否存在
- 确认推送到了demo分支
- 查看GitHub Actions页面的错误信息

