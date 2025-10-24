import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

// Import locales
import enLocale from '../src/locales/en'
import zhCNLocale from '../src/locales/zh-cn'
import zhTWLocale from '../src/locales/zh-tw'

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

