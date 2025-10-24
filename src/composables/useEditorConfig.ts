import StarterKit from '@tiptap/starter-kit'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import TextAlign from '@tiptap/extension-text-align'
import CharacterCount from '@tiptap/extension-character-count'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table'
import Underline from '@tiptap/extension-underline'
import { IndentExtension, VideoExtension, FontSizeExtension } from '../extensions'

// 获取编辑器扩展配置（可传入额外扩展）
export function getEditorExtensions(additionalExtensions: any[] = []) {
  return [
    // StarterKit 包含了大部分基础扩展，但禁用列表和链接扩展
    StarterKit.configure({
      bulletList: false,
      orderedList: false,
      listItem: false,
      link: false,
    }),
    // 使用单独的列表扩展以支持自定义属性
    BulletList.extend({
      addAttributes() {
        return {
          ...this.parent?.(),
          style: {
            default: null,
            parseHTML: (element) => element.getAttribute('style'),
            renderHTML: (attributes) => {
              if (!attributes.style) {
                return {}
              }
              return {
                style: attributes.style,
              }
            },
          },
        }
      },
    }),
    OrderedList.extend({
      addAttributes() {
        return {
          ...this.parent?.(),
          style: {
            default: null,
            parseHTML: (element) => element.getAttribute('style'),
            renderHTML: (attributes) => {
              if (!attributes.style) {
                return {}
              }
              return {
                style: attributes.style,
              }
            },
          },
        }
      },
    }),
    ListItem,
    // Link 扩展，支持 target 属性
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    }),
    Underline,
    // 以下扩展不在 StarterKit 中，需要单独添加
    Image.extend({
      addAttributes() {
        return {
          ...this.parent?.(),
          width: {
            default: null,
            parseHTML: (element) => element.getAttribute('width'),
            renderHTML: (attributes) => {
              if (!attributes.width) {
                return {}
              }
              return { width: attributes.width }
            },
          },
          height: {
            default: null,
            parseHTML: (element) => element.getAttribute('height'),
            renderHTML: (attributes) => {
              if (!attributes.height) {
                return {}
              }
              return { height: attributes.height }
            },
          },
          alt: {
            default: null,
            parseHTML: (element) => element.getAttribute('alt'),
            renderHTML: (attributes) => {
              if (!attributes.alt) {
                return {}
              }
              return { alt: attributes.alt }
            },
          },
          align: {
            default: null,
            parseHTML: (element) => element.getAttribute('data-align'),
            renderHTML: (attributes) => {
              if (!attributes.align) {
                return { class: 'editor-image' }
              }
              return {
                'data-align': attributes.align,
                class: `editor-image image-align-${attributes.align}`,
              }
            },
          },
        }
      },
    }),
    Highlight.configure({
      multicolor: false,
    }),
    Superscript,
    Subscript,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    TextStyle,
    Color,
    FontSizeExtension,
    IndentExtension,
    // 表格扩展
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    // 多媒体扩展
    VideoExtension,
    // 字符统计
    CharacterCount,
    // 额外的扩展（如 RichEditorDiffHighlighter）
    ...additionalExtensions,
  ]
}

export function useEditorConfig() {
  const extensions = getEditorExtensions()

  return {
    extensions,
  }
}


