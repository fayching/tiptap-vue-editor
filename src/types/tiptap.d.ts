import '@tiptap/core'

// 扩展 Tiptap 的 Commands 接口，添加自定义命令的类型定义
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      /**
       * 增加选中内容的缩进级别
       */
      indent: () => ReturnType
      /**
       * 减少选中内容的缩进级别
       */
      outdent: () => ReturnType
    }
    video: {
      /**
       * 插入 video 视频元素
       */
      setVideo: (attrs: {
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
    fontSize: {
      /**
       * 设置字体大小
       */
      setFontSize: (size: string) => ReturnType
    }
  }
}
