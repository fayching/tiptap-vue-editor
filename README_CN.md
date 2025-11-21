# tiptap-vue-editor

基于 Tiptap 的 Vue 3 富文本编辑器，完全可配置的工具栏。

📺 **[查看在线演示](#-演示)** | [English](./README.md) | 简体中文

![Tiptap Vue Editor](screenshots/basic-usage.png)

## ✨ 特性

- 🔧 **完全可配置** - 控制工具栏显示哪些按钮
- 🎨 **丰富格式** - 30+ 种格式选项
- 🎯 **自定义按钮** - 轻松添加自己的按钮
- 🌍 **国际化** - 内置繁中、简中、英文
- 💪 **TypeScript** - 完整类型定义
- 📦 **轻量** - Tree-shakeable

## 📦 安装

```bash
npm install tiptap-vue-editor
# 或
yarn add tiptap-vue-editor
# 或
pnpm add tiptap-vue-editor
```

## 🚀 快速开始

### 基础用法

```vue
<script setup>
import { ref } from 'vue'
import TiptapEditor from 'tiptap-vue-editor'
import 'tiptap-vue-editor/style.css'

const content = ref('<p>Hello World!</p>')
</script>

<template>
  <TiptapEditor v-model="content" />
</template>
```

### 配置工具栏

只显示需要的按钮：

```vue
<script setup>
import { ref } from 'vue'
import TiptapEditor from 'tiptap-vue-editor'
import 'tiptap-vue-editor/style.css'

const content = ref('')

// 只显示这些按钮
const toolbarConfig = {
  undo: true,
  redo: true,
  bold: true,
  italic: true,
  underline: true,
  link: true,
  image: true,
  // 其他按钮不显示（默认false）
}
</script>

<template>
  <TiptapEditor 
    v-model="content" 
    :toolbar-config="toolbarConfig"
    placeholder="开始输入..."
  />
</template>
```

### 添加自定义按钮

```vue
<script setup>
import { ref } from 'vue'
import TiptapEditor from 'tiptap-vue-editor'
import { Plus } from 'lucide-vue-next'

const content = ref('')

const customButtons = [
  {
    key: 'insert-signature',
    text: '签名',
    icon: Plus,
    tooltip: '插入签名',
    onAction: (editor) => {
      editor.chain().focus()
        .insertContent('<p>此致<br>敬礼</p>')
        .run()
    }
  }
]
</script>

<template>
  <TiptapEditor 
    v-model="content"
    :custom-buttons="customButtons"
  />
</template>
```

## 🎯 工具栏配置选项

**历史**: `undo` `redo` `clearFormat`  
**格式**: `bold` `italic` `underline` `strike` `superscript` `subscript`  
**样式**: `heading` `fontSize` `color` `highlight` `code`  
**对齐**: `textAlign` `indent` `outdent`  
**列表**: `bulletList` `orderedList`  
**插入**: `horizontalRule` `link` `image` `media`  
**块级**: `codeBlock` `blockquote` `table`  
**高级**: `source`

## ⌨️ 键盘快捷键

`Ctrl/Cmd + B` 粗体 | `Ctrl/Cmd + I` 斜体 | `Ctrl/Cmd + U` 下划线  
`Ctrl/Cmd + Z` 撤销 | `Ctrl/Cmd + Shift + Z` 重做  
`Tab` 增加缩进 | `Shift + Tab` 减少缩进

## 🌍 国际化

```javascript
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
locale.value = 'zh-cn'  // 简体中文
locale.value = 'zh-tw'  // 繁体中文
locale.value = 'en'     // English
```

## 🎮 演示

运行开发服务器查看交互式演示：

```bash
npm run dev
```

### 演示功能

**📝 基础用法**

![基础用法演示](screenshots/basic-usage.png)

完整工具栏的简单编辑器，包含：
- 丰富的文本格式（粗体、斜体、下划线等）
- 段落样式和标题
- 文字颜色和高亮
- 列表和对齐
- 链接、图片和视频
- 表格和代码块
- 字符和单词统计

**🔧 其他演示：**
- **可配置工具栏** - 自由切换工具栏按钮
- **自定义按钮** - 添加你自己的功能
- **只读模式** - 内容保护和查看

## 📄 许可证

MIT


