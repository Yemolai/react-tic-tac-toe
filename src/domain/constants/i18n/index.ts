import { i18n as en } from './en'

const langMap: Record<string, Record<string, string>> = {
  en,
}

function i18n (lang?: string) {
  return lang ? langMap[lang] ?? en : en
}

export default i18n
