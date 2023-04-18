import { useState } from "react";
import { LanguageContext } from "../../../context";
import Content from "../../organisms/Content";
import Navbar from "../../organisms/Navbar";

const Home = () => {
  const [currentLanguage, setCurrentLanguage] = useState('');

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      <Navbar />
      <Content />
    </LanguageContext.Provider>
  );
};

export default Home;
