import { ref } from 'vue'
import type { LinkData, ImageData, IframeData } from '../types'

export function useDialogs() {
  // 对话框显示状态
  const showLinkDialog = ref(false)
  const showImageDialog = ref(false)
  const showIframeDialog = ref(false)
  const showSourceDialog = ref(false)

  // 对话框数据
  const linkData = ref<LinkData>({
    href: '',
    text: '',
    target: '_blank',
  })

  const imageData = ref<ImageData>({
    src: '',
    alt: '',
    width: '',
    height: '',
    align: '',
  })

  const iframeData = ref<IframeData>({
    src: '',
    width: '640',
    height: '360',
    poster: '',
  })

  // 打开对话框
  const openLinkDialog = (data?: Partial<LinkData>) => {
    if (data) {
      linkData.value = { ...linkData.value, ...data }
    }
    showLinkDialog.value = true
  }

  const openImageDialog = (data?: Partial<ImageData>) => {
    if (data) {
      imageData.value = { ...imageData.value, ...data }
    }
    showImageDialog.value = true
  }

  const openIframeDialog = (data?: Partial<IframeData>) => {
    if (data) {
      iframeData.value = { ...iframeData.value, ...data }
    }
    showIframeDialog.value = true
  }

  const openSourceDialog = () => {
    showSourceDialog.value = true
  }

  // 关闭对话框
  const closeLinkDialog = () => {
    showLinkDialog.value = false
    linkData.value = { href: '', text: '', target: '_blank' }
  }

  const closeImageDialog = () => {
    showImageDialog.value = false
    imageData.value = { src: '', alt: '', width: '', height: '', align: '' }
  }

  const closeIframeDialog = () => {
    showIframeDialog.value = false
    iframeData.value = { src: '', width: '640', height: '360', poster: '' }
  }

  const closeSourceDialog = () => {
    showSourceDialog.value = false
  }

  const closeAllDialogs = () => {
    closeLinkDialog()
    closeImageDialog()
    closeIframeDialog()
    closeSourceDialog()
  }

  return {
    showLinkDialog,
    showImageDialog,
    showIframeDialog,
    showSourceDialog,
    linkData,
    imageData,
    iframeData,
    openLinkDialog,
    openImageDialog,
    openIframeDialog,
    openSourceDialog,
    closeLinkDialog,
    closeImageDialog,
    closeIframeDialog,
    closeSourceDialog,
    closeAllDialogs,
  }
}


