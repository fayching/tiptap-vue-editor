import type { Editor, Extension } from '@tiptap/vue-3'
import type { Component } from 'vue'

/**
 * 工具栏配置接口
 * 控制哪些按钮在工具栏中显示
 */
export interface ToolbarConfig {
  // 历史操作
  undo?: boolean
  redo?: boolean
  clearFormat?: boolean
  
  // 文本格式
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strike?: boolean
  superscript?: boolean
  subscript?: boolean
  
  // 文本样式
  heading?: boolean
  fontSize?: boolean
  color?: boolean
  highlight?: boolean
  code?: boolean
  
  // 对齐
  textAlign?: boolean
  indent?: boolean
  outdent?: boolean
  
  // 列表
  bulletList?: boolean
  orderedList?: boolean
  
  // 插入
  horizontalRule?: boolean
  link?: boolean
  image?: boolean
  media?: boolean
  
  // 块级元素
  codeBlock?: boolean
  blockquote?: boolean
  table?: boolean
  
  // 高级
  source?: boolean  // HTML 源码编辑
}

/**
 * 自定义工具栏按钮配置
 */
export interface CustomButton {
  /** 按钮唯一标识 */
  key: string
  /** 按钮图标（可选，Vue 组件） */
  icon?: Component
  /** 按钮文字 */
  text: string
  /** 按钮提示（hover 显示） */
  tooltip?: string
  /** 点击回调函数，接收编辑器实例 */
  onAction: (editor: Editor) => void
  /** 是否禁用 */
  disabled?: boolean
  /** 是否激活状态 */
  active?: boolean
}

/**
 * 编辑器组件 Props
 */
export interface EditorProps {
  /** 编辑器内容（HTML） */
  modelValue: string
  /** 占位符文本 */
  placeholder?: string
  /** 工具栏配置 */
  toolbarConfig?: ToolbarConfig
  /** 自定义按钮 */
  customButtons?: CustomButton[]
  /** 是否显示字数统计 */
  showCharCount?: boolean
  /** 额外的 Tiptap 扩展 */
  additionalExtensions?: Extension[]
  /** 是否可编辑 */
  editable?: boolean
}

/**
 * 链接数据
 */
export interface LinkData {
  href: string
  text: string
  target: '_blank' | '_self'
}

/**
 * 图片数据
 */
export interface ImageData {
  src: string
  alt: string
  width: string
  height: string
  align: string
}

/**
 * 媒体/视频数据
 */
export interface IframeData {
  src: string
  title?: string
  width: string
  height: string
  embedCode?: string
  alternativeSrc?: string
  poster?: string
  allowFullscreen?: boolean
}

/**
 * 默认工具栏配置（全部启用）
 */
export const defaultToolbarConfig: Required<ToolbarConfig> = {
  undo: true,
  redo: true,
  clearFormat: true,
  bold: true,
  italic: true,
  underline: true,
  strike: true,
  superscript: true,
  subscript: true,
  heading: true,
  fontSize: true,
  color: true,
  highlight: true,
  code: true,
  textAlign: true,
  indent: true,
  outdent: true,
  bulletList: true,
  orderedList: true,
  horizontalRule: true,
  link: true,
  image: true,
  media: true,
  codeBlock: true,
  blockquote: true,
  table: true,
  source: true,
}


