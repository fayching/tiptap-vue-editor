<template>
    <div class="tiptap-editor-wrap" v-bind="$attrs">
        <div class="tiptap-simple-editor">
            <!-- 固定工具栏 -->
            <EditorToolbar :editor="editor" :custom-buttons="customButtons" @open-link-dialog="handleOpenLinkDialog"
                @open-image-dialog="openImageDialog" @open-media-dialog="openIframeDialog" @open-source-dialog="handleOpenSourceDialog" />

            <!-- 编辑器内容区域 -->
            <editor-content :editor="editor" class="editor-content" />

            <!-- 字数统计 -->
            <div v-if="editor && showCharCount" class="character-count">
                <span class="count-item">
                    {{ t('editor.charCount.characters') || '字符' }}: {{ editor.storage.characterCount.characters() }}
                </span>
                <span class="count-divider">|</span>
                <span class="count-item">
                    {{ t('editor.charCount.words') || '字数' }}: {{ editor.storage.characterCount.words() }}
                </span>
            </div>
        </div>

        <!-- 链接弹层 -->
        <LinkDialog v-model:visible="showLinkDialog" :initial-data="linkData" @confirm="confirmLink" @close="closeLinkDialog" />

        <!-- 图片弹层 -->
        <ImageDialog v-model:visible="showImageDialog" :initial-data="imageData" @confirm="confirmImage"
            @close="closeImageDialog" />

        <!-- 媒体弹层 -->
        <MediaDialog v-model:visible="showIframeDialog" :initial-data="iframeData" @confirm="confirmVideo"
            @close="closeIframeDialog" />

        <!-- 源码弹层 -->
        <SourceDialog v-model:visible="showSourceDialog" :initial-html="currentHtml" @confirm="confirmSource"
            @close="closeSourceDialog" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick, computed } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { NodeSelection } from '@tiptap/pm/state'
import type { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { useDialogs, useClickOutside, getEditorExtensions } from './composables'
import { useEditorI18n } from './composables/useEditorI18n'
import './styles/editor-content.scss'
import type { LinkData, ImageData, IframeData } from './composables'
import type { CustomButton } from './types.ts'
import EditorToolbar from './components/EditorToolbar.vue'
import LinkDialog from './components/LinkDialog.vue'
import ImageDialog from './components/ImageDialog.vue'
import MediaDialog from './components/MediaDialog.vue'
import SourceDialog from './components/SourceDialog.vue'

// 禁用自动继承属性，手动通过 v-bind="$attrs" 应用到根元素
defineOptions({
  inheritAttrs: false
})

interface Props {
  modelValue: string
  placeholder?: string
  customButtons?: CustomButton[]
  showCharCount?: boolean
  additionalExtensions?: any[]
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  customButtons: () => [],
  showCharCount: true,
  additionalExtensions: () => [],
})

// 使用编辑器 i18n
const { t } = useEditorI18n()

const emit = defineEmits<Emits>()

// 获取编辑器扩展配置
const extensions = getEditorExtensions(props.additionalExtensions)

// 使用弹窗管理
const {
    showLinkDialog,
    showImageDialog,
    showIframeDialog,
    showSourceDialog,
    linkData,
    imageData,
    iframeData,
    closeLinkDialog,
    openImageDialog,
    closeImageDialog,
    openIframeDialog,
    closeIframeDialog,
    openSourceDialog,
    closeSourceDialog,
    closeAllDialogs,
} = useDialogs()

// 创建编辑器实例（使用 useEditor）
const editor = useEditor({
    content: props.modelValue,
    extensions,
    editorProps: {
        attributes: {
            class: 'tiptap-editor',
        },
        handleDOMEvents: {
            click: (view, event) => {
                const target = event.target as HTMLElement
                // 检查是否点击了图片元素
                if (target && target.tagName === 'IMG' && target.classList.contains('editor-image')) {
                    event.preventDefault()
                    event.stopPropagation()

                    // 找到图片节点的位置并选中它
                    const pos = view.posAtDOM(target, 0)

                    let imageNode: ProseMirrorNode | null = null
                    let imagePos: number | null = null

                    // 查找图片节点
                    view.state.doc.nodesBetween(pos - 1, pos + 1, (node, nodePos) => {
                        if (node.type.name === 'image') {
                            imageNode = node
                            imagePos = nodePos
                            return false
                        }
                    })

                    if (imageNode && imagePos !== null) {
                        // 选中图片节点
                        const selection = NodeSelection.create(view.state.doc, imagePos)
                        const tr = view.state.tr.setSelection(selection)
                        view.dispatch(tr)

                        // 打开图片编辑对话框
                        nextTick(() => {
                            if (imageNode) {
                                imageData.value = {
                                    src: imageNode.attrs.src || '',
                                    alt: imageNode.attrs.alt || '',
                                    width: imageNode.attrs.width || '',
                                    height: imageNode.attrs.height || '',
                                    align: imageNode.attrs.align || '',
                                }
                                showImageDialog.value = true
                            }
                        })
                    }

                    return true
                }
                return false
            },
        },
    },
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
})

// 监听 modelValue 变化
watch(
    () => props.modelValue,
    (newValue) => {
        if (editor.value && editor.value.getHTML() !== newValue) {
            editor.value.commands.setContent(newValue)
        }
    }
)

// 使用统一的点击外部处理
useClickOutside({
    onCloseDialogs: closeAllDialogs,
})


// 生命周期
onMounted(() => {
    if (editor.value) {
        editor.value.commands.focus()
    }
})

// 当前 HTML 内容
const currentHtml = computed(() => editor.value?.getHTML() || '')

// 链接相关方法
const handleOpenLinkDialog = () => {
    showLinkDialog.value = true
}

// 源码相关方法
const handleOpenSourceDialog = () => {
    openSourceDialog()
}

const confirmSource = (html: string) => {
    if (!editor.value) return
    editor.value.commands.setContent(html)
}

const confirmLink = (data: LinkData) => {
    if (!editor.value) return

    const href = data.href.trim()

    // 删除链接
    if (href === '') {
        editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
        return
    }

    // 获取当前选中的文本
    const { from, to } = editor.value.state.selection
    const selectedText = editor.value.state.doc.textBetween(from, to, '')

    // 链接属性
    const linkAttrs = {
        href,
        target: data.target || '_blank',
        rel: data.target === '_blank' ? 'noopener noreferrer' : undefined,
    }

    if (selectedText) {
        // 如果有选中文本，直接给选中文本添加链接
        editor.value.chain().focus().extendMarkRange('link').setLink(linkAttrs).run()
    } else {
        // 如果没有选中文本，插入链接文本
        const displayText = data.text.trim() || href
        editor.value
            .chain()
            .focus()
            .insertContent({
                type: 'text',
                text: displayText,
                marks: [
                    {
                        type: 'link',
                        attrs: linkAttrs,
                    },
                ],
            })
            .run()
    }
}

// 图片相关方法
const confirmImage = (data: ImageData) => {
    if (!editor.value) return

    const src = data.src.trim()

    if (!src) return

    interface ImageAttrs {
        src: string
        alt?: string
        width?: number
        height?: number
        align?: string
    }

    const attrs: ImageAttrs = {
        src,
    }

    // 只添加非空的属性
    if (data.alt.trim()) {
        attrs.alt = data.alt.trim()
    }
    if (data.width.trim()) {
        const width = parseInt(data.width.trim(), 10)
        if (!isNaN(width)) {
            attrs.width = width
        }
    }
    if (data.height.trim()) {
        const height = parseInt(data.height.trim(), 10)
        if (!isNaN(height)) {
            attrs.height = height
        }
    }
    if (data.align) {
        attrs.align = data.align
    }

    // 检查当前选中的节点
    const { state } = editor.value
    const { selection } = state
    const { from } = selection

    // 尝试从当前位置获取图片节点
    let isEditingImage = false
    state.doc.nodesBetween(from, from + 1, (node) => {
        if (node.type.name === 'image') {
            isEditingImage = true
            return false
        }
    })

    // 如果正在编辑图片，则更新属性
    if (isEditingImage) {
        editor.value.chain().focus().updateAttributes('image', attrs).run()
    } else {
        // 否则插入新图片
        editor.value.chain().focus().setImage(attrs).run()
    }
}

// video 相关方法
const confirmVideo = (data: IframeData) => {
    if (!editor.value) return

    if (!data.src.trim()) return

    interface VideoAttrs {
        src: string
        poster?: string
        width: string
        height: string
        controls: boolean
        autoplay?: boolean
        loop?: boolean
        muted?: boolean
    }

    const { src, width, height, poster } = data
    const w = width || '640'
    const h = height || '360'

    const videoAttrs: VideoAttrs = {
        src: src.trim(),
        poster: poster?.trim() || undefined,
        width: w,
        height: h,
        controls: true, // 默认显示控制条
        autoplay: false,
        loop: false,
        muted: false,
    }

    // 使用 setVideo 命令插入 video 节点
    editor.value.chain().focus().setVideo(videoAttrs).run()
}

// 暴露编辑器实例给父组件
defineExpose({
    editor
})
</script>

<style lang="scss">
@use './styles/editor.scss';
@use './styles/editor-content.scss';
</style>

