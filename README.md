# tiptap-vue-editor

A highly configurable Vue 3 rich text editor built on [Tiptap](https://tiptap.dev/).

📺 **[View Live Demo](#-demo)** | 📖 **[中文文档](README_CN.md)**

![Tiptap Vue Editor](https://github.com/user-attachments/assets/e4b9c702-ba75-413c-bbf0-a4fe0b7767e8)

## ✨ Features

- 🔧 **Fully Configurable** - Show/hide any toolbar buttons
- 🎨 **Rich Formatting** - 30+ formatting options (bold, italic, headings, lists, tables, etc.)
- 🎯 **Custom Buttons** - Add your own toolbar buttons
- 🌍 **i18n** - Built-in English, Simplified & Traditional Chinese
- 💪 **TypeScript** - Full type definitions
- 📦 **Lightweight** - Tree-shakeable

## 📦 Installation

```bash
npm install tiptap-vue-editor
# or
yarn add tiptap-vue-editor
# or
pnpm add tiptap-vue-editor
```

## 🚀 Quick Start

### Basic Usage

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

You can also use named import:
```vue
import { TiptapEditor } from 'tiptap-vue-editor'
```

### With Toolbar Configuration

```vue
<script setup>
import { ref } from 'vue'
import TiptapEditor from 'tiptap-vue-editor'
import 'tiptap-vue-editor/style.css'

const content = ref('')

// Configure which toolbar buttons to display
const toolbarConfig = {
  undo: true,
  redo: true,
  bold: true,
  italic: true,
  underline: true,
  heading: true,
  bulletList: true,
  orderedList: true,
  link: true,
  image: true,
  // Hide other buttons
  strike: false,
  code: false,
  table: false,
}
</script>

<template>
  <TiptapEditor 
    v-model="content" 
    :toolbar-config="toolbarConfig"
    placeholder="Start typing..."
  />
</template>
```

## 📖 API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | HTML content (v-model) |
| `placeholder` | `string` | `''` | Placeholder text |
| `toolbarConfig` | `ToolbarConfig` | All enabled | Configure toolbar buttons |
| `customButtons` | `CustomButton[]` | `[]` | Custom toolbar buttons |
| `showCharCount` | `boolean` | `true` | Show character count |
| `editable` | `boolean` | `true` | Read-only mode |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `update:modelValue` | `(html: string)` | Content changes |
| `ready` | `(editor: Editor)` | Editor initialized |

### Toolbar Configuration

The `toolbarConfig` prop accepts an object with the following options (all default to `true`):

```typescript
interface ToolbarConfig {
  // History
  undo?: boolean
  redo?: boolean
  clearFormat?: boolean
  
  // Text formatting
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strike?: boolean
  superscript?: boolean
  subscript?: boolean
  
  // Styles
  heading?: boolean
  fontSize?: boolean
  color?: boolean
  highlight?: boolean
  code?: boolean
  
  // Alignment
  textAlign?: boolean
  indent?: boolean
  outdent?: boolean
  
  // Lists
  bulletList?: boolean
  orderedList?: boolean
  
  // Insert
  horizontalRule?: boolean
  link?: boolean
  image?: boolean
  media?: boolean
  
  // Blocks
  codeBlock?: boolean
  blockquote?: boolean
  table?: boolean
  
  // Advanced
  source?: boolean  // HTML source code editor
}
```

### Custom Buttons

Add your own buttons to the toolbar:

```vue
<script setup>
import { ref } from 'vue'
import TiptapEditor from 'tiptap-vue-editor'
import { Plus } from 'lucide-vue-next'

const content = ref('')

const customButtons = [
  {
    key: 'insert-signature',
    text: 'Signature',
    icon: Plus,
    tooltip: 'Insert signature',
    onAction: (editor) => {
      editor.chain().focus().insertContent('<p>Best regards,<br>John Doe</p>').run()
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

### Custom Button Interface

```typescript
interface CustomButton {
  key: string                          // Unique identifier
  text: string                         // Button text
  icon?: Component                     // Optional icon component (e.g., from lucide-vue-next)
  tooltip?: string                     // Tooltip text
  onAction: (editor: Editor) => void   // Click handler
  disabled?: boolean                   // Disable button
  active?: boolean                     // Active state
}
```

## 🌍 Internationalization

Automatically integrates with Vue I18n. Built-in languages:

```javascript
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
locale.value = 'en'     // English
locale.value = 'zh-cn'  // 简体中文
locale.value = 'zh-tw'  // 繁體中文
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + B` | Bold |
| `Ctrl/Cmd + I` | Italic |
| `Ctrl/Cmd + U` | Underline |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |
| `Tab` | Indent |
| `Shift + Tab` | Outdent |

## 🎮 Demo

Run the development server to see the interactive demo:

```bash
npm run dev
```

### Demo Features

**📝 Basic Usage**

![Basic Usage Demo](screenshots/basic-usage.png)

A simple editor with full toolbar featuring:
- Rich text formatting (bold, italic, underline, etc.)
- Paragraph styles and headings
- Text colors and highlights
- Lists and alignment
- Links, images, and media
- Tables and code blocks
- Character and word count

**🔧 Other Demos:**
- **Configurable Toolbar** - Toggle any toolbar button on/off
- **Custom Buttons** - Add your own custom functionality
- **Read-only Mode** - Content protection and viewing

## 📄 License

MIT



test