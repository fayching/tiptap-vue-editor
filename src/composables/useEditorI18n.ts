import { getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import locales from '../locales'

/**
 * Locale 映射表
 * 将不同格式的 locale 映射到编辑器的 locale
 */
const localeMap: Record<string, keyof typeof locales> = {
  'zh_CN': 'zh-cn',
  'zh-CN': 'zh-cn',
  'zh-cn': 'zh-cn',
  'zh_TW': 'zh-tw',
  'zh-TW': 'zh-tw',
  'zh-tw': 'zh-tw',
  'en': 'en',
  'en-US': 'en',
  'en_US': 'en',
}

// 全局标记，确保语言包只合并一次
let mergedLocales = false

/**
 * 合并编辑器语言包到全局 i18n
 */
function mergeEditorLocales(globalI18n: any) {
  if (mergedLocales) return
  
  try {
    // 合并编辑器语言包到所有可能的 locale 格式
    Object.entries(localeMap).forEach(([targetLocale, sourceLocale]) => {
      const existingMessages = globalI18n.getLocaleMessage?.(targetLocale) || {}
      const editorMessages = locales[sourceLocale]
      
      if (editorMessages) {
        globalI18n.setLocaleMessage?.(targetLocale, {
          ...existingMessages,
          ...editorMessages,
        })
      }
    })
    
    mergedLocales = true
  } catch (error) {
    console.warn('Failed to merge editor locales:', error)
  }
}

/**
 * 编辑器国际化 Composable
 * 自动将编辑器语言包合并到全局 i18n 实例
 */
export function useEditorI18n() {
  const instance = getCurrentInstance()
  const i18n = useI18n()

  // 立即尝试合并语言包（不等待 onMounted）
  if (instance?.appContext?.config?.globalProperties?.$i18n) {
    const globalI18n = instance.appContext.config.globalProperties.$i18n as any
    mergeEditorLocales(globalI18n)
  }

  return {
    t: i18n.t,
    locale: i18n.locale,
  }
}


