import { Editor } from '@tiptap/vue-3'
import type { EditorOptions } from '@tiptap/vue-3'
import { getEditorExtensions } from './composables'

/**
 * RichTextEditor - 继承自 Tiptap Editor
 * 在 Editor 基础上扩展，自动配置所有自定义扩展
 * 
 * 使用方式：
 * const editor = new RichTextEditor({ content: '...' })
 */
export interface RichTextEditorOptions extends Partial<EditorOptions> {
  /** 额外的扩展（如 RichEditorDiffHighlighter） */
  additionalExtensions?: any[]
}

export class RichTextEditor extends Editor {
  constructor(options: RichTextEditorOptions = {}) {
    const { additionalExtensions = [], ...editorOptions } = options

    super({
      ...editorOptions,
      extensions: getEditorExtensions(additionalExtensions),
      editorProps: {
        attributes: {
          class: 'tiptap-editor',
          ...editorOptions.editorProps?.attributes,
        },
        ...editorOptions.editorProps,
      },
    })
  }
}


