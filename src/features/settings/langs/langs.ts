import { createGlobalState, useLocalStorage } from "@vueuse/core"
import { computed } from "vue"

export const useLangs = createGlobalState(() => {
  const sourceLang = useLocalStorage<Lang>("v1/lang/source", "zh-Hans")
  const targetLang = useLocalStorage<Lang>("v1/lang/target", "en")

  const sourceLangName = computed(() => langs.find(t => t.code === sourceLang.value)!.name)
  const targetLangName = computed(() => langs.find(t => t.code === targetLang.value)!.name)
  
  return { sourceLang, targetLang, sourceLangName, targetLangName }
})

export type Lang = typeof langs[number]["code"]

export const langs = [
  { 
    "code": "en", 
    "name": "English", 
    "nameEn": "English" 
},
  {
    "code": "zh-Hans",
    "nameEn": "Simplified Chinese",
    "name": "简体中文",
  },
  {
    "code": "zh-Hant",
    "nameEn": "Traditional Chinese",
    "name": "繁體中文",
  },
  {
    "code": "ja",
    "name": "日本語",
    "nameEn": "Japanese"
  },
  {
    "code": "ko",
    "nameEn": "Korean",
    "name": "한국어"
  },
  {
    "code": "ko-banmal",
    "nameEn": "Korean",
    "name": "한국어 반말",
  },
  {
    "code": "fr",
    "nameEn": "French",
    "name": "Français"
  },
  {
    "code": "de",
    "nameEn": "German",
    "name": "Deutsch"
  },
  {
    "code": "es",
    "nameEn": "Spanish",
    "name": "Español"
  },
  {
    "code": "it",
    "nameEn": "Italian",
    "name": "Italiano"
  },
  {
    "code": "ru",
    "nameEn": "Russian",
    "name": "Русский"
  },
  {
    "code": "pt",
    "nameEn": "Portuguese",
    "name": "Português"
  },
  {
    "code": "nl",
    "nameEn": "Dutch",
    "name": "Nederlands"
  },
  {
    "code": "pl",
    "nameEn": "Polish",
    "name": "Polski"
  },
  {
    "code": "ar",
    "nameEn": "Arabic",
    "name": "العربية",
    "direction": "rtl"
  },
  {
    "code": "af",
    "nameEn": "Afrikaans",
    "name": "Afrikaans"
  },
  {
    "code": "am",
    "nameEn": "Amharic",
    "name": "አማርኛ"
  },
  {
    "code": "az",
    "nameEn": "Azerbaijani",
    "name": "Azərbaycan"
  },
  {
    "code": "be",
    "nameEn": "Belarusian",
    "name": "Беларуская"
  },
  {
    "code": "bg",
    "nameEn": "Bulgarian",
    "name": "Български"
  },
  {
    "code": "bn",
    "nameEn": "Bengali",
    "name": "বাংলা"
  },
  {
    "code": "bs",
    "nameEn": "Bosnian",
    "name": "Bosanski"
  },
  {
    "code": "ca",
    "nameEn": "Catalan",
    "name": "Català"
  },
  {
    "code": "ceb",
    "nameEn": "Cebuano",
    "name": "Cebuano"
  },
  {
    "code": "co",
    "nameEn": "Corsican",
    "name": "Corsu"
  },
  {
    "code": "cs",
    "nameEn": "Czech",
    "name": "Čeština"
  },
  {
    "code": "cy",
    "nameEn": "Welsh",
    "name": "Cymraeg"
  },
  {
    "code": "da",
    "nameEn": "Danish",
    "name": "Dansk"
  },
  {
    "code": "el",
    "nameEn": "Greek",
    "name": "Ελληνικά"
  },
  {
    "code": "eo",
    "nameEn": "Esperanto",
    "name": "Esperanto"
  },
  {
    "code": "et",
    "nameEn": "Estonian",
    "name": "Eesti"
  },
  {
    "code": "eu",
    "nameEn": "Basque",
    "name": "Euskara"
  },
  {
    "code": "fa",
    "nameEn": "Persian",
    "name": "فارسی",
    "direction": "rtl"
  },
  {
    "code": "fi",
    "nameEn": "Finnish",
    "name": "Suomi"
  },
  {
    "code": "fj",
    "nameEn": "Fijian",
    "name": "Fijian"
  },
  {
    "code": "fy",
    "nameEn": "Frisian",
    "name": "Frysk"
  },
  {
    "code": "ga",
    "nameEn": "Irish",
    "name": "Gaeilge"
  },
  {
    "code": "gd",
    "nameEn": "Scottish Gaelic",
    "name": "Gàidhlig"
  },
  {
    "code": "gl",
    "nameEn": "Galician",
    "name": "Galego"
  },
  {
    "code": "gu",
    "nameEn": "Gujarati",
    "name": "ગુજરાતી"
  },
  {
    "code": "ha",
    "nameEn": "Hausa",
    "name": "Hausa"
  },
  {
    "code": "haw",
    "nameEn": "Hawaiian",
    "name": "Hawaiʻi"
  },
  {
    "code": "he",
    "nameEn": "Hebrew",
    "name": "עברית",
    "direction": "rtl"
  },
  {
    "code": "hi",
    "nameEn": "Hindi",
    "name": "हिन्दी"
  },
  {
    "code": "hmn",
    "nameEn": "Hmong",
    "name": "Hmong"
  },
  {
    "code": "hr",
    "nameEn": "Croatian",
    "name": "Hrvatski"
  },
  {
    "code": "ht",
    "nameEn": "Haitian Creole",
    "name": "Kreyòl Ayisyen"
  },
  {
    "code": "hu",
    "nameEn": "Hungarian",
    "name": "Magyar"
  },
  {
    "code": "hy",
    "nameEn": "Armenian",
    "name": "Հայերեն"
  },
  {
    "code": "code",
    "nameEn": "Indonesian",
    "name": "Bahasa Indonesia"
  },
  {
    "code": "ig",
    "nameEn": "Igbo",
    "name": "Igbo"
  },
  {
    "code": "is",
    "nameEn": "Icelandic",
    "name": "Íslenska"
  },
  {
    "code": "jw",
    "nameEn": "Javanese",
    "name": "Jawa"
  },
  {
    "code": "ka",
    "nameEn": "Georgian",
    "name": "ქართული"
  },
  {
    "code": "kk",
    "nameEn": "Kazakh",
    "name": "Қазақ"
  },
  {
    "code": "mn",
    "nameEn": "Mongolian",
    "name": "Монгол хэл"
  },
  {
    "code": "tr",
    "nameEn": "Turkish",
    "name": "Türkçe"
  },
  {
    "code": "ug",
    "nameEn": "Uyghur",
    "name": "ئۇيغۇر تىلى",
    "direction": "rtl"
  },
  {
    "code": "uk",
    "nameEn": "Ukrainian",
    "name": "Українська"
  },
  {
    "code": "ur",
    "nameEn": "Urdu",
    "name": "اردو",
    "direction": "rtl"
  },
  {
    "code": "vi",
    "nameEn": "Vietnamese",
    "name": "Tiếng Việt"
  },
  {
    "code": "sv",
    "nameEn": "Swedish",
    "name": "Svenska"
  },
  {
    "code": "th",
    "nameEn": "Thai",
    "name": "ไทย"
  }
] as const