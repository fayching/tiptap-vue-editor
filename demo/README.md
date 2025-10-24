# Tiptap Vue Editor - Demo

This directory contains interactive demos showcasing the features of the Tiptap Vue Editor.

## 🚀 Quick Start

### Run the Demo

```bash
# From the package root directory
npm run demo

# Or from the demo directory
cd demo
npm install
npm run dev
```

The demo will automatically open in your browser at `http://localhost:3000`

## 📋 Demo Features

### 1. **Basic Usage**
- Simple editor setup
- Get HTML/Text output
- Clear content functionality

### 2. **Configurable Toolbar**
- Toggle any toolbar button on/off
- See real-time button count statistics
- Experiment with different toolbar configurations

### 3. **Custom Buttons**
- Add custom toolbar buttons
- Example buttons included:
  - 📅 Insert Date
  - ✍️ Insert Signature
  - 📊 Show Statistics

### 4. **Read-only Mode**
- Toggle between editable and read-only
- Demonstrate content protection

## 🌐 Alternative: Standalone HTML Demo

For a simpler demo without build tools, open `index.html` directly in your browser:

```bash
open demo/index.html
# or
# Just double-click index.html
```

## 📦 Building the Demo

```bash
npm run demo:build
```

The built demo will be in `demo/dist/`

## 🛠️ Customizing the Demo

- Edit `App.vue` to modify demo sections
- Update `main.ts` to change i18n settings
- Customize styles in `App.vue` `<style>` section

## 📚 Learn More

- [Main README](../README.md)
- [API Documentation](../README.md#-api)
- [GitHub Repository](https://github.com/fayching/tiptap-vue-editor)

