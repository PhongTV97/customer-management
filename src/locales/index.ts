import { createI18n } from 'vue-i18n'
import jp from './jp.js'

const i18n = createI18n({
  locale: process.env.VITE_APP_LOCALES,
  legacy: false,
  messages: {
    jp
  }
})

export default i18n
