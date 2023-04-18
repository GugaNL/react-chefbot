import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Flag from "../Flag";
import "./styles.css";
import { LanguageContext } from "../../../context";
//Icons
import brazilFlag from "../../../assets/brasil-flag.svg";
import usaFlag from "../../../assets/usa-flag.svg";

const I18n = () => {
  const { i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const { setCurrentLanguage } = useContext(LanguageContext);

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <div className="flags-container">
      <Flag
        image={brazilFlag}
        isSelected={selectedLanguage === "pt-BR"}
        onClick={() => handleChangeLanguage("pt-BR")}
      />
      <Flag
        image={usaFlag}
        isSelected={selectedLanguage === "en-US"}
        onClick={() => handleChangeLanguage("en-US")}
      />
    </div>
  );
};

export default I18n;
