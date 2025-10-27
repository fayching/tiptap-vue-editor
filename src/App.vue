<script setup lang="ts">
import { ref, computed } from 'vue'
import { RichTextEditor } from './index'
import type { ToolbarConfig, CustomButton } from './types'
import './styles/editor.scss'
import './styles/toolbar.scss'
import './styles/dialogs.scss'
import './styles/editor-content.scss'

// Demo 1: Basic Usage
const basicContent = ref('<p>Hello! This is a <strong>basic example</strong> of the Tiptap Vue Editor.</p><p>Try editing this text!</p>')
const output = ref('')

// Demo 2: Configurable Toolbar
const configurableContent = ref('<p>Toggle toolbar buttons to customize the editor!</p>')
const toolbarConfig = ref<ToolbarConfig>({
  undo: true,
  redo: true,
  bold: true,
  italic: true,
  underline: true,
  strike: true,
  heading: true,
  fontSize: true,
  color: true,
  highlight: true,
  textAlign: true,
  indent: true,
  outdent: true,
  bulletList: true,
  orderedList: true,
  link: true,
  image: true,
  table: true,
  blockquote: true,
  horizontalRule: true,
  clearFormat: true,
  code: true,
})

const enabledButtons = computed(() => {
  return Object.values(toolbarConfig.value).filter(v => v).length
})

const totalButtons = computed(() => {
  return Object.keys(toolbarConfig.value).length
})

// Demo 3: Custom Buttons
const customContent = ref('<p>This editor has custom buttons!</p>')
const customButtons: CustomButton[] = [
  {
    key: 'insert-date',
    text: '📅 Date',
    tooltip: 'Insert current date',
    onAction: (editor) => {
      const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      editor.chain().focus().insertContent(`<p>${date}</p>`).run()
    }
  },
  {
    key: 'insert-signature',
    text: '✍️ Sign',
    tooltip: 'Insert signature',
    onAction: (editor) => {
      editor.chain().focus().insertContent('<p><br>Best regards,<br><strong>Your Name</strong></p>').run()
    }
  },
]

// Demo 4: Read-only Mode
const readonlyContent = ref('<p>Toggle between <strong>editable</strong> and <strong>read-only</strong> modes.</p>')
const editable = ref(true)

// Methods
const getHTML = () => {
  output.value = basicContent.value
}

const getText = () => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(basicContent.value, 'text/html')
  output.value = doc.body.textContent || ''
}

const clearContent = () => {
  basicContent.value = ''
  output.value = ''
}

const toggleEditable = () => {
  editable.value = !editable.value
}
</script>

<template>
  <div class="demo-container">
    <div class="container">
      <div class="header">
        <h1>🎨 Tiptap Vue Editor</h1>
        <p>A highly configurable rich text editor for Vue 3</p>
      </div>

      <!-- Demo 1: Basic Usage -->
      <div class="demo-section">
        <h2>📝 Basic Usage</h2>
        <RichTextEditor v-model="basicContent" placeholder="Start typing..." />
        <div class="controls">
          <button class="btn btn-primary" @click="getHTML">Get HTML</button>
          <button class="btn btn-primary" @click="getText">Get Text</button>
          <button class="btn btn-secondary" @click="clearContent">Clear</button>
        </div>
        <div v-if="output" class="output">
          <h3>Output:</h3>
          <pre>{{ output }}</pre>
        </div>
      </div>

      <!-- Demo 2: Configurable Toolbar -->
      <div class="demo-section">
        <h2>🔧 Configurable Toolbar</h2>
        <p class="section-desc">
          Select which toolbar buttons to display:
        </p>
        <div class="config-grid">
          <label v-for="(_value, key) in toolbarConfig" :key="key" class="checkbox-label">
            <input type="checkbox" v-model="toolbarConfig[key as keyof ToolbarConfig]">
            <span>{{ key }}</span>
          </label>
        </div>
        <RichTextEditor 
          v-model="configurableContent" 
          :toolbar-config="toolbarConfig"
          placeholder="Try different toolbar configurations..."
        />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">{{ enabledButtons }}</div>
            <div class="stat-label">Buttons Enabled</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{ totalButtons }}</div>
            <div class="stat-label">Total Available</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{ Math.round((enabledButtons / totalButtons) * 100) }}%</div>
            <div class="stat-label">Configuration</div>
          </div>
        </div>
      </div>

      <!-- Demo 3: Custom Buttons -->
      <div class="demo-section">
        <h2>🎯 Custom Buttons</h2>
        <p class="section-desc">
          Add your own custom buttons:
        </p>
        <RichTextEditor 
          v-model="customContent" 
          :custom-buttons="customButtons"
          :toolbar-config="{
            undo: true,
            redo: true,
            bold: true,
            italic: true,
            underline: true,
            bulletList: true,
            orderedList: true,
          }"
          placeholder="Try the custom buttons..."
        />
      </div>

      <!-- Demo 4: Read-only Mode -->
      <div class="demo-section">
        <h2>🔒 Read-only Mode</h2>
        <div class="controls">
          <button class="btn btn-primary" @click="toggleEditable">
            {{ editable ? '🔒 Make Read-only' : '✏️ Make Editable' }}
          </button>
          <span class="status-badge" :class="{ editable }">
            {{ editable ? 'Editable' : 'Read-only' }}
          </span>
        </div>
        <RichTextEditor 
          v-model="readonlyContent" 
          :editable="editable"
          :toolbar-config="{
            bold: true,
            italic: true,
            underline: true,
          }"
        />
      </div>

      <div class="footer">
        <p>
          Built with ❤️ using <a href="https://tiptap.dev/" target="_blank">Tiptap</a> and Vue 3
        </p>
        <p style="margin-top: 8px;">
          <a href="https://github.com/fayching/tiptap-vue-editor" target="_blank">GitHub</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 12px;
}

.header p {
  font-size: 18px;
  opacity: 0.9;
}

.demo-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.section-desc {
  margin-bottom: 15px;
  color: #64748b;
}

.controls {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #e5e7eb;
  color: #374151;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background: #fecaca;
  color: #991b1b;
}

.status-badge.editable {
  background: #bbf7d0;
  color: #166534;
}

.output {
  margin-top: 20px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.output h3 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #374151;
}

.output pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.checkbox-label:hover {
  background: #f3f4f6;
}

.checkbox-label input {
  cursor: pointer;
}

.stats {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #eff6ff;
  border-radius: 8px;
  margin-top: 20px;
}

.stat {
  flex: 1;
  text-align: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #2563eb;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
}

.footer {
  text-align: center;
  color: white;
  margin-top: 40px;
  opacity: 0.9;
}

.footer a {
  color: white;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.footer a:hover {
  border-bottom-color: white;
}
</style>

