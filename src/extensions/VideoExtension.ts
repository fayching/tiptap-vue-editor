import { Node } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: {
        src: string
        poster?: string
        width?: string
        height?: string
        controls?: boolean
        autoplay?: boolean
        loop?: boolean
        muted?: boolean
      }) => ReturnType
    }
  }
}

export const VideoExtension = Node.create({
  name: 'video',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      poster: {
        default: null,
      },
      width: {
        default: '640',
      },
      height: {
        default: '360',
      },
      controls: {
        default: true,
      },
      autoplay: {
        default: false,
      },
      loop: {
        default: false,
      },
      muted: {
        default: false,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'video',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', HTMLAttributes]
  },

  addCommands() {
    return {
      setVideo:
        (options: {
          src: string
          poster?: string
          width?: string
          height?: string
          controls?: boolean
          autoplay?: boolean
          loop?: boolean
          muted?: boolean
        }) =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})


