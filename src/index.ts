// 主要组件导出
export { default as RichTextEditor } from './RichTextEditor.vue'

// 编辑器类导出（用于直接创建实例）
export { RichTextEditor as RichTextEditorClass } from './createEditor'

// 类型导出
export type {
  CustomButton,
  ToolbarConfig,
  EditorProps,
  LinkData,
  ImageData,
  IframeData,
} from './types'

// 默认配置导出
export { defaultToolbarConfig } from './types'

// 扩展导出（如果用户想要自定义）
export { IndentExtension, VideoExtension, FontSizeExtension } from './extensions'

// 样式需要手动导入：
// import 'tiptap-vue-editor/style.css'


