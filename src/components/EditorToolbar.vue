<template>
    <div v-if="editor" class="menu-bar">
        <!-- 撤销/重做 -->
        <button type="button" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()"
            class="menu-button" :title="t('editor.toolbar.undo')">
            <Undo2 :size="18" />
        </button>
        <button type="button" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()"
            class="menu-button" :title="t('editor.toolbar.redo')">
            <Redo2 :size="18" />
        </button>
        <!-- 清除格式 -->
        <button type="button" @click="clearFormat" class="menu-button" :title="t('editor.toolbar.clearFormat')">
            <Eraser :size="18" />
        </button>

        <div class="divider"></div>

        <!-- 文本样式 -->
        <button type="button" @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }" class="menu-button" :title="t('editor.toolbar.bold')">
            <Bold :size="18" />
        </button>
        <button type="button" @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }" class="menu-button" :title="t('editor.toolbar.italic')">
            <Italic :size="18" />
        </button>
        <button type="button" @click="editor.chain().focus().toggleUnderline().run()"
            :class="{ 'is-active': editor.isActive('underline') }" class="menu-button" :title="t('editor.toolbar.underline')">
            <UnderlineIcon :size="18" />
        </button>
        <button type="button" @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }" class="menu-button" :title="t('editor.toolbar.strike')">
            <Strikethrough :size="18" />
        </button>
        <button type="button" @click="editor.chain().focus().toggleSuperscript().run()"
            :class="{ 'is-active': editor.isActive('superscript') }" class="menu-button" :title="t('editor.toolbar.superscript')">
            x²
        </button>
        <button type="button" @click="editor.chain().focus().toggleSubscript().run()"
            :class="{ 'is-active': editor.isActive('subscript') }" class="menu-button" :title="t('editor.toolbar.subscript')">
            x₂
        </button>

        <!-- 文本格式 -->
        <!-- 标题下拉菜单 -->
        <div class="dropdown heading-dropdown">
            <button type="button" @click="() => toggleDropdown('heading')" class="menu-button dropdown-trigger"
                :title="t('editor.toolbar.heading')">
                {{ getCurrentHeadingText() }}
                <ChevronDown :size="16" class="dropdown-arrow" />
            </button>
            <div v-show="showHeadingDropdown" class="dropdown-menu">
                <button type="button" @click="setHeading(null)" :class="{ 'is-active': editor.isActive('paragraph') }"
                    class="dropdown-item">
                    {{ t('editor.headings.paragraph') }}
                </button>
                <button type="button" @click="setHeading(1)"
                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" class="dropdown-item">
                    {{ t('editor.headings.heading1') }}
                </button>
                <button type="button" @click="setHeading(2)"
                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" class="dropdown-item">
                    {{ t('editor.headings.heading2') }}
                </button>
                <button type="button" @click="setHeading(3)"
                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" class="dropdown-item">
                    {{ t('editor.headings.heading3') }}
                </button>
                <button type="button" @click="setHeading(4)"
                    :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" class="dropdown-item">
                    {{ t('editor.headings.heading4') }}
                </button>
            </div>
        </div>

        <!-- 字体大小下拉菜单 -->
        <div class="dropdown">
            <button type="button" @click="() => toggleDropdown('fontSize')" class="menu-button dropdown-trigger"
                :title="t('editor.toolbar.fontSize')">
                <Type :size="18" />
                <ChevronDown :size="16" class="dropdown-arrow" />
            </button>
            <div v-show="showFontSizeDropdown" class="dropdown-menu font-size-menu">
                <button v-for="size in [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72]" :key="size"
                    type="button" @click="setFontSize(size)"
                    :class="{ 'is-active': editor.getAttributes('textStyle').fontSize === size }" class="dropdown-item">
                    {{ size }}px
                </button>
            </div>
        </div>

        <!-- 字体颜色下拉菜单 -->
        <div class="dropdown">
            <button type="button" @click="() => toggleDropdown('color')" class="menu-button dropdown-trigger"
                :title="t('editor.toolbar.color')">
                <Palette :size="18" />
                <ChevronDown :size="16" class="dropdown-arrow" />
            </button>
            <div v-show="showColorDropdown" class="dropdown-menu color-menu">
                <div class="color-grid">
                    <button v-for="color in colorOptions" :key="color" type="button" @click="setTextColor(color)"
                        :class="{ 'is-active': editor && editor.getAttributes('textStyle').color === color }"
                        class="color-item" :style="{ backgroundColor: color }" :title="color" />
                </div>
                <button type="button" @click="removeTextColor" class="dropdown-item color-reset">
                    {{ t('editor.color.reset') }}
                </button>
            </div>
        </div>

        <button type="button" @click="editor.chain().focus().toggleHighlight().run()"
            :class="{ 'is-active': editor.isActive('highlight') }" class="menu-button" :title="t('editor.toolbar.highlight')">
            <Highlighter :size="18" />
        </button>
        <button type="button" @click="editor.chain().focus().toggleCode().run()"
            :class="{ 'is-active': editor.isActive('code') }" class="menu-button" :title="t('editor.toolbar.code')">
            <Code :size="18" />
        </button>

        <div class="divider"></div>
        <!-- 文本对齐 -->
        <div class="dropdown">
            <button type="button" @click="() => toggleDropdown('textAlign')"
                :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) || editor.isActive({ textAlign: 'center' }) || editor.isActive({ textAlign: 'right' }) || editor.isActive({ textAlign: 'justify' }) }"
                class="menu-button dropdown-trigger" :title="t('editor.toolbar.textAlign')">
                <AlignLeft :size="18" />
                <ChevronDown :size="14" class="dropdown-arrow" />
            </button>
            <div v-if="showTextAlignDropdown" class="dropdown-menu text-align-menu">
                <button type="button" @click="setTextAlign('left')"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" class="dropdown-item">
                    <AlignLeft :size="14" />
                    {{ t('editor.align.left') }}
                </button>
                <button type="button" @click="setTextAlign('center')"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" class="dropdown-item">
                    <AlignCenter :size="14" />
                    {{ t('editor.align.center') }}
                </button>
                <button type="button" @click="setTextAlign('right')"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" class="dropdown-item">
                    <AlignRight :size="14" />
                    {{ t('editor.align.right') }}
                </button>
                <button type="button" @click="setTextAlign('justify')"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }" class="dropdown-item">
                    <AlignJustify :size="14" />
                    {{ t('editor.align.justify') }}
                </button>
            </div>
        </div>

        <!-- 缩进控制 -->
        <button type="button" @click="editor.chain().focus().indent().run()" class="menu-button" :title="t('editor.toolbar.indent')">
            <Indent :size="18" />
        </button>
        <button type="button" @click="editor.chain().focus().outdent().run()" class="menu-button" :title="t('editor.toolbar.outdent')">
            <Outdent :size="18" />
        </button>

        

        <!-- 列表 -->
        <!-- 无序列表 -->
        <div class="dropdown">
            <button type="button" @click="() => toggleDropdown('bulletList')"
                :class="{ 'is-active': editor.isActive('bulletList') }" class="menu-button dropdown-trigger"
                :title="t('editor.toolbar.bulletList')">
                <List :size="18" />
                <ChevronDown :size="14" class="dropdown-arrow" />
            </button>
            <div v-if="showBulletListDropdown" class="dropdown-menu bullet-list-menu">
                <div class="list-style-grid">
                    <button type="button" @click="setBulletListStyle('disc')"
                        :class="{ 'is-active': editor.isActive('bulletList') && getCurrentBulletListStyle() === 'disc' }"
                        class="list-style-item">
                        <div class="list-preview">
                            <div class="list-item">•</div>
                            <div class="list-item">•</div>
                            <div class="list-item">•</div>
                        </div>
                    </button>
                    <button type="button" @click="setBulletListStyle('circle')"
                        :class="{ 'is-active': editor.isActive('bulletList') && getCurrentBulletListStyle() === 'circle' }"
                        class="list-style-item">
                        <div class="list-preview">
                            <div class="list-item">○</div>
                            <div class="list-item">○</div>
                            <div class="list-item">○</div>
                        </div>
                    </button>
                    <button type="button" @click="setBulletListStyle('square')"
                        :class="{ 'is-active': editor.isActive('bulletList') && getCurrentBulletListStyle() === 'square' }"
                        class="list-style-item">
                        <div class="list-preview">
                            <div class="list-item">■</div>
                            <div class="list-item">■</div>
                            <div class="list-item">■</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <!-- 有序列表 -->
        <div class="dropdown">
            <button type="button" @click="() => toggleDropdown('orderedList')"
                :class="{ 'is-active': editor.isActive('orderedList') }" class="menu-button dropdown-trigger"
                :title="t('editor.toolbar.orderedList')">
                <ListOrdered :size="18" />
                <ChevronDown :size="14" class="dropdown-arrow" />
            </button>
            <div v-if="showOrderedListDropdown" class="dropdown-menu ordered-list-menu">
                <div class="list-style-grid">
                    <button type="button" @click="setOrderedListStyle('decimal')"
                        :class="{ 'is-active': editor.isActive('orderedList') && getCurrentOrderedListStyle() === 'decimal' }"
                        class="list-style-item">
                        <div class="list-preview">
                            <div class="list-item">1.</div>
                            <div class="list-item">2.</div>
                            <div class="list-item">3.</div>
                        </div>
                    </button>
                    <button type="button" @click="setOrderedListStyle('lower-alpha')"
                        :class="{ 'is-active': editor.isActive('orderedList') && getCurrentOrderedListStyle() === 'lower-alpha' }"
                        class="list-style-item">
                        <div class="list-preview">
                            <div class="list-item">a.</div>
                            <div class="list-item">b.</div>
                            <div class="list-item">c.</div>
                        </div>
                    </button>
                    <button type="button" @click="setOrderedListStyle('lower-greek')"
                        :class="{ 'is-active': editor.isActive('orderedList') && getCurrentOrderedListStyle() === 'lower-greek' }"
                        class="list-style-item">
                        <div class="list-preview">
                            <div class="list-item">α.</div>
                            <div class="list-item">β.</div>
                            <div class="list-item">γ.</div>
                        </div>
                    </button>
                    <button type="button" @click="setOrderedListStyle('lower-roman')"
                        :class="{ 'is-active': editor.isActive('orderedList') && getCurrentOrderedListStyle() === 'lower-roman' }"
                        class="list-style-item">
                        <div class="list-preview">
                            <div class="list-item">i.</div>
                            <div class="list-item">ii.</div>
                            <div class="list-item">iii.</div>
                        </div>
                    </button>
                    <button type="button" @click="setOrderedListStyle('upper-alpha')"
                        :class="{ 'is-active': editor.isActive('orderedList') && getCurrentOrderedListStyle() === 'upper-alpha' }"
                        class="list-style-item">
                        <div class="list-preview">
                            <div class="list-item">A.</div>
                            <div class="list-item">B.</div>
                            <div class="list-item">C.</div>
                        </div>
                    </button>
                    <button type="button" @click="setOrderedListStyle('upper-roman')"
                        :class="{ 'is-active': editor.isActive('orderedList') && getCurrentOrderedListStyle() === 'upper-roman' }"
                        class="list-style-item">
                        <div class="list-preview">
                            <div class="list-item">I.</div>
                            <div class="list-item">II.</div>
                            <div class="list-item">III.</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <!-- 插入元素 -->
        <button type="button" @click="editor.chain().focus().setHorizontalRule().run()" class="menu-button"
            :title="t('editor.toolbar.horizontalRule')">
            <Minus :size="18" />
        </button>
        <button type="button" @click="emit('openLinkDialog')" :class="{ 'is-active': editor.isActive('link') }"
            class="menu-button" :title="t('editor.toolbar.link')">
            <Link2 :size="18" />
        </button>
        <button type="button" @click="emit('openImageDialog')" class="menu-button" :title="t('editor.toolbar.image')">
            <ImageIcon :size="18" />
        </button>
        <button type="button" @click="emit('openMediaDialog')" class="menu-button" :title="t('editor.toolbar.media')">
            <Video :size="18" />
        </button>
        

        <div class="divider"></div>
        
        <!-- 块级元素 -->
        <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ 'is-active': editor.isActive('codeBlock') }" class="menu-button" :title="t('editor.toolbar.codeBlock')">
            <Code2 :size="18" />
        </button>
        <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'is-active': editor.isActive('blockquote') }" class="menu-button" :title="t('editor.toolbar.blockquote')">
            <Quote :size="18" />
        </button>

        <!-- 表格 -->
        <div class="dropdown">
            <button type="button" @click="() => toggleDropdown('table')"
                :class="{ 'is-active': editor.isActive('table') }" class="menu-button dropdown-trigger" :title="t('editor.toolbar.table')">
                <TableIcon :size="18" />
                <ChevronDown :size="14" class="dropdown-arrow" />
            </button>
            <div v-if="showTableDropdown" class="dropdown-menu table-dropdown" @mouseleave="activeTableSubmenu = ''">
                <!-- 一级菜单 -->
                <div class="table-menu-primary">
                    <!-- 插入表格 -->
                    <button type="button" @mouseenter="activeTableSubmenu = 'insert'"
                        :class="['dropdown-item', { 'is-active': activeTableSubmenu === 'insert' }]">
                        <TableIcon :size="14" />
                        <span class="menu-text">{{ t('editor.table.insertTable') }}</span>
                        <ChevronDown :size="14" class="submenu-arrow" />
                    </button>

                    <!-- 行操作 -->
                    <button type="button" @mouseenter="activeTableSubmenu = 'row'"
                        :class="['dropdown-item', 'no-icon', { 'is-active': activeTableSubmenu === 'row' }]"
                        :disabled="!editor.can().addRowBefore()">
                        <span class="menu-text">{{ t('editor.table.row') }}</span>
                        <ChevronDown :size="14" class="submenu-arrow" />
                    </button>

                    <!-- 列操作 -->
                    <button type="button" @mouseenter="activeTableSubmenu = 'column'"
                        :class="['dropdown-item', 'no-icon', { 'is-active': activeTableSubmenu === 'column' }]"
                        :disabled="!editor.can().addColumnBefore()">
                        <span class="menu-text">{{ t('editor.table.column') }}</span>
                        <ChevronDown :size="14" class="submenu-arrow" />
                    </button>

                    <!-- 单元格操作 -->
                    <button type="button" @mouseenter="activeTableSubmenu = 'cell'"
                        :class="['dropdown-item', 'no-icon', { 'is-active': activeTableSubmenu === 'cell' }]"
                        :disabled="!editor.can().mergeCells() && !editor.can().splitCell()">
                        <span class="menu-text">{{ t('editor.table.cell') }}</span>
                        <ChevronDown :size="14" class="submenu-arrow" />
                    </button>

                    <!-- 分隔线 -->
                    <div class="table-menu-divider"></div>

                    <!-- 删除表格 -->
                    <button type="button" @click="editor.chain().focus().deleteTable().run()"
                        :disabled="!editor.can().deleteTable()" class="dropdown-item table-delete-item"
                        @mouseenter="activeTableSubmenu = ''">
                        <Trash2 :size="14" />
                        <span class="menu-text">{{ t('editor.table.deleteTable') }}</span>
                    </button>
                </div>

                <!-- 二级菜单 -->
                <div v-if="activeTableSubmenu" class="table-menu-secondary">
                    <!-- 插入表格的二级菜单 -->
                    <div v-if="activeTableSubmenu === 'insert'" class="table-size-picker">
                        <div class="size-grid">
                            <div v-for="row in 10" :key="row" class="size-row">
                                <div v-for="col in 10" :key="col"
                                    :class="['size-cell', { 'selected': tableSize.rows >= row && tableSize.cols >= col }]"
                                    @click="selectTableSize(row, col)" @mouseenter="hoverTableSize(row, col)">
                                </div>
                            </div>
                        </div>
                        <div class="size-info">
                            {{ tableSize.rows }} × {{ tableSize.cols }}
                        </div>
                    </div>

                    <!-- 行的二级菜单 -->
                    <div v-if="activeTableSubmenu === 'row'" class="table-submenu-items">
                        <button type="button" @click="editor.chain().focus().addRowBefore().run()"
                            :disabled="!editor.can().addRowBefore()" class="dropdown-item">
                            <Rows :size="14" />
                            {{ t('editor.table.addRowBefore') }}
                        </button>
                        <button type="button" @click="editor.chain().focus().addRowAfter().run()"
                            :disabled="!editor.can().addRowAfter()" class="dropdown-item">
                            <Rows :size="14" />
                            {{ t('editor.table.addRowAfter') }}
                        </button>
                        <button type="button" @click="editor.chain().focus().deleteRow().run()"
                            :disabled="!editor.can().deleteRow()" class="dropdown-item">
                            <Trash2 :size="14" />
                            {{ t('editor.table.deleteRow') }}
                        </button>
                    </div>

                    <!-- 列的二级菜单 -->
                    <div v-if="activeTableSubmenu === 'column'" class="table-submenu-items">
                        <button type="button" @click="editor.chain().focus().addColumnBefore().run()"
                            :disabled="!editor.can().addColumnBefore()" class="dropdown-item">
                            <Columns :size="14" />
                            {{ t('editor.table.addColumnBefore') }}
                        </button>
                        <button type="button" @click="editor.chain().focus().addColumnAfter().run()"
                            :disabled="!editor.can().addColumnAfter()" class="dropdown-item">
                            <Columns :size="14" />
                            {{ t('editor.table.addColumnAfter') }}
                        </button>
                        <button type="button" @click="editor.chain().focus().deleteColumn().run()"
                            :disabled="!editor.can().deleteColumn()" class="dropdown-item">
                            <Trash2 :size="14" />
                            {{ t('editor.table.deleteColumn') }}
                        </button>
                    </div>

                    <!-- 单元格的二级菜单 -->
                    <div v-if="activeTableSubmenu === 'cell'" class="table-submenu-items">
                        <button type="button" @click="editor.chain().focus().mergeCells().run()"
                            :disabled="!editor.can().mergeCells()" class="dropdown-item">
                            {{ t('editor.table.mergeCells') }}
                        </button>
                        <button type="button" @click="editor.chain().focus().splitCell().run()"
                            :disabled="!editor.can().splitCell()" class="dropdown-item">
                            {{ t('editor.table.splitCell') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <button type="button" @click="emit('openSourceDialog')" class="menu-button" :title="t('editor.toolbar.source')">
            <FileCode :size="18" />
        </button>
        <!-- 自定义按钮 -->
        <template v-if="customButtons && customButtons.length > 0 && editor">
            <div class="divider"></div>
            <button v-for="btn in customButtons" :key="btn.key" type="button" @click="() => editor && btn.onAction(editor)"
                :disabled="btn.disabled" :class="['menu-button', { 'menu-button-text': !btn.icon, 'is-active': btn.active }]"
                :title="btn.tooltip || btn.text">
                <component v-if="btn.icon" :is="btn.icon" :size="18" />
               {{ btn.text }}
            </button>
        </template>
    </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Highlighter,
    List,
    ListOrdered,
    Code2,
    Quote,
    Link2,
    ImageIcon,
    Minus,
    Undo2,
    Redo2,
    ChevronDown,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Indent,
    Outdent,
    Type,
    Palette,
    Video,
    Table as TableIcon,
    Columns,
    Rows,
    Trash2,
    Eraser,
    FileCode,
} from 'lucide-vue-next'
import { useToolbarState, useClickOutside, useEditorI18n } from '../composables'
import type { CustomButton } from '../types'

interface Props {
    editor: Editor | undefined
    customButtons?: CustomButton[]
}

interface Emits {
    (e: 'openLinkDialog'): void
    (e: 'openImageDialog'): void
    (e: 'openMediaDialog'): void
    (e: 'openSourceDialog'): void
}

const props = withDefaults(defineProps<Props>(), {
    customButtons: () => [],
})
const emit = defineEmits<Emits>()

// 使用编辑器 i18n
const { t } = useEditorI18n()

const {
    showHeadingDropdown,
    showBulletListDropdown,
    showOrderedListDropdown,
    showTextAlignDropdown,
    showFontSizeDropdown,
    showColorDropdown,
    showTableDropdown,
    activeTableSubmenu,
    tableSize,
    colorOptions,
    toggleDropdown,
    closeAllDropdowns,
} = useToolbarState()

// 使用统一的点击外部处理
useClickOutside({
    onCloseDropdowns: closeAllDropdowns,
})

// 文本对齐相关方法
const setTextAlign = (align: string) => {
    if (!props.editor) return
    props.editor.chain().focus().setTextAlign(align).run()
    showTextAlignDropdown.value = false
}

// 标题相关方法
const getCurrentHeadingText = () => {
    if (!props.editor) return t('editor.headings.paragraph')

    if (props.editor.isActive('heading', { level: 1 })) return t('editor.headings.heading1')
    if (props.editor.isActive('heading', { level: 2 })) return t('editor.headings.heading2')
    if (props.editor.isActive('heading', { level: 3 })) return t('editor.headings.heading3')
    if (props.editor.isActive('heading', { level: 4 })) return t('editor.headings.heading4')

    return t('editor.headings.paragraph')
}

const setHeading = (level: number | null) => {
    if (level === null) {
        props.editor?.chain().focus().setParagraph().run()
    } else {
        props.editor?.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()
    }
    showHeadingDropdown.value = false
}

// 列表样式相关方法
const getCurrentBulletListStyle = () => {
    if (!props.editor || !props.editor.isActive('bulletList')) return 'disc'
    const attrs = props.editor.getAttributes('bulletList')
    if (attrs.style) {
        const match = attrs.style.match(/list-style-type:\s*([^;!]+)/)
        return match ? match[1].trim() : 'disc'
    }
    return 'disc'
}

const getCurrentOrderedListStyle = () => {
    if (!props.editor || !props.editor.isActive('orderedList')) return 'decimal'
    const attrs = props.editor.getAttributes('orderedList')
    if (attrs.style) {
        const match = attrs.style.match(/list-style-type:\s*([^;!]+)/)
        return match ? match[1].trim() : 'decimal'
    }
    return 'decimal'
}

const setBulletListStyle = (style: string) => {
    if (!props.editor) return

    // 如果当前不是列表，先创建列表
    if (!props.editor.isActive('bulletList')) {
        props.editor.chain().focus().toggleBulletList().run()
    }

    // 使用nextTick确保DOM更新后再设置样式
    nextTick(() => {
        if (props.editor) {
            props.editor
                .chain()
                .focus()
                .updateAttributes('bulletList', {
                    style: `list-style-type: ${style}`,
                })
                .run()
        }
    })

    showBulletListDropdown.value = false
}

const setOrderedListStyle = (style: string) => {
    if (!props.editor) return

    // 如果当前不是列表，先创建列表
    if (!props.editor.isActive('orderedList')) {
        props.editor.chain().focus().toggleOrderedList().run()
    }

    // 使用nextTick确保DOM更新后再设置样式
    nextTick(() => {
        if (props.editor) {
            props.editor
                .chain()
                .focus()
                .updateAttributes('orderedList', {
                    style: `list-style-type: ${style}`,
                })
                .run()
        }
    })

    showOrderedListDropdown.value = false
}

// 字体大小和颜色相关方法
const setFontSize = (size: number) => {
    props.editor?.chain().focus().setFontSize(size.toString()).run()
    showFontSizeDropdown.value = false
}

const setTextColor = (color: string) => {
    if (props.editor) {
        props.editor.chain().focus().setColor(color).run()
        showColorDropdown.value = false
    }
}

const removeTextColor = () => {
    if (props.editor) {
        props.editor.chain().focus().unsetColor().run()
        showColorDropdown.value = false
    }
}

// 表格尺寸选择相关方法
const selectTableSize = (rows: number, cols: number) => {
    tableSize.value = { rows, cols }
    // 点击后直接插入表格
    insertTable()
}

const hoverTableSize = (rows: number, cols: number) => {
    // 鼠标悬停时实时更新预览
    tableSize.value = { rows, cols }
}

const insertTable = () => {
    if (!props.editor) return

    props.editor
        .chain()
        .focus()
        .insertTable({
            rows: tableSize.value.rows,
            cols: tableSize.value.cols,
            withHeaderRow: false,
        })
        .run()

    showTableDropdown.value = false
}

// 清除格式
const clearFormat = () => {
    if (!props.editor) return

    props.editor
        .chain()
        .focus()
        .clearNodes() // 清除节点类型，转换为普通段落
        .unsetAllMarks() // 清除所有文本标记
        .unsetTextAlign() // 移除对齐属性
        .updateAttributes('paragraph', { indent: 0 }) // 清除缩进
        .run()
}
</script>

<style lang="scss" scoped>
@use '../styles/toolbar.scss';
</style>

