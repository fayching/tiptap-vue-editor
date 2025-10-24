import { Extension } from '@tiptap/core'
import type { Transaction } from '@tiptap/pm/state'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType
      outdent: () => ReturnType
    }
  }
}

export const IndentExtension = Extension.create({
  name: 'indent',

  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      minLevel: 0,
      maxLevel: 6,
      indentSize: 30, // 每级缩进30px
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const marginLeft = element.style.marginLeft
              if (!marginLeft) return 0
              const indent = parseInt(marginLeft.replace('px', ''), 10)
              return isNaN(indent) ? 0 : Math.round(indent / this.options.indentSize)
            },
            renderHTML: (attributes) => {
              if (attributes.indent && attributes.indent > 0) {
                return { style: `margin-left: ${attributes.indent * this.options.indentSize}px;` }
              }
              return {}
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ tr, state }: { tr: Transaction; state: any }) => {
          const { selection } = state
          const { from, to } = selection

          let hasChanges = false

          state.doc.nodesBetween(from, to, (node: any, pos: number) => {
            if (this.options.types.includes(node.type.name)) {
              const currentIndent = node.attrs.indent || 0
              if (currentIndent < this.options.maxLevel) {
                tr.setNodeMarkup(pos, null, {
                  ...node.attrs,
                  indent: currentIndent + 1,
                })
                hasChanges = true
              }
            }
          })

          return hasChanges
        },

      outdent:
        () =>
        ({ tr, state }: { tr: Transaction; state: any }) => {
          const { selection } = state
          const { from, to } = selection

          let hasChanges = false

          state.doc.nodesBetween(from, to, (node: any, pos: number) => {
            if (this.options.types.includes(node.type.name)) {
              const currentIndent = node.attrs.indent || 0
              if (currentIndent > this.options.minLevel) {
                tr.setNodeMarkup(pos, null, {
                  ...node.attrs,
                  indent: currentIndent - 1,
                })
                hasChanges = true
              }
            }
          })

          return hasChanges
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      'Shift-Tab': () => this.editor.commands.outdent(),
    }
  },
})


