import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

// Import locales
import enLocale from './locales/en'
import zhCNLocale from './locales/zh-cn'
import zhTWLocale from './locales/zh-tw'

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: enLocale,
    'zh-cn': zhCNLocale,
    'zh-tw': zhTWLocale,
  },
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')

