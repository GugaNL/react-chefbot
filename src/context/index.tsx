import { createContext } from "react";

type PropsLanguageContext = {
  currentLanguage: string;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const DefaultValue = {
  currentLanguage: "",
  setCurrentLanguage: () => {},
};

export const LanguageContext =
  createContext<PropsLanguageContext>(DefaultValue);
