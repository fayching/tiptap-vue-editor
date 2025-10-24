import { onMounted, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import locales from '../locales'

/**
 * 编辑器国际化 Composable
 * 自动将编辑器语言包合并到全局 i18n 实例
 */
export function useEditorI18n() {
  const instance = getCurrentInstance()
  const i18n = useI18n()

  // 在组件挂载时合并语言包
  onMounted(() => {
    if (instance?.appContext?.config?.globalProperties?.$i18n) {
      const globalI18n = instance.appContext.config.globalProperties.$i18n as any
      
      // 合并编辑器语言包到全局 i18n
      Object.keys(locales).forEach((locale) => {
        const messages = globalI18n.getLocaleMessage?.(locale) || {}
        globalI18n.setLocaleMessage?.(locale, {
          ...messages,
          ...locales[locale as keyof typeof locales],
        })
      })
    }
  })

  return {
    t: i18n.t,
    locale: i18n.locale,
  }
}


