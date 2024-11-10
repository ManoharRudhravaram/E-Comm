import React, { createContext, useState } from 'react'
import { useTranslation } from 'react-i18next';
export const languageContext = createContext();

export default function LanguageContext({ children }) {
  const { i18n } = useTranslation();
  const [lang,setLang]=useState("en");
  function languageHandler({ target: { value } }) {
    setLang(value);
    i18n.changeLanguage(value);
  }
  return (
    <languageContext.Provider value={{ languageHandler, lang}}>
      {children}
    </languageContext.Provider>
  )
}
