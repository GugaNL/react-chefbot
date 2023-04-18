import { useState, useEffect, useContext } from "react";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import "./styles.css";
import { LanguageContext } from "../../../context";
import { openai } from "../../../constants";

const Content = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useContext(LanguageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const translateRecipe = async () => {
    setIsLoading(true);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Converta todo conteúdo de ${searchResult} para ${currentLanguage}`,
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.0,
    });
    setSearchResult(completion.data.choices[0].text);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentLanguage && searchResult) {
      translateRecipe();
    }
  }, [currentLanguage]);

  const generateRecipe = async (e: any) => {
    e.preventDefault();
    if (isLoading || ingredients === "") return setErrorMessage(true);
    setIsLoading(true);
    setSearchResult(null);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Show a food recipe made with ${ingredients}, inside a html div with class named 'ingredients' create a main header with the recipe name and other html header with the word 'Ingredients' and list the ingredients in a html ul li, do the same with the recipe prepare and put it in the same tag 'ingredients'. All texts need to in ${t(
        "home.language"
      )}`,
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.0,
    });
    setSearchResult(completion.data.choices[0].text);
    setIsLoading(false);
  };

  const onChangeInput = (textInput: string) => {
    if (errorMessage) {
      setErrorMessage(false);
    }
    setIngredients(textInput);
  };

  return (
    <div className="container pt-5">
      <div className="pt-5">
        <h1 className="text-center m-4">{t("home.creativityTitle")}</h1>
        <p className="text-center pt-5">
          {t("home.digitYourIngredientsTextOne")} <b>ChefBot</b>{" "}
          {t("home.digitYourIngredientsTextTwo")}
        </p>
      </div>

      <div className="m-4">
        <form className="text-center">
          <div>
            <textarea
              className="shadow-none form-control w-75 mx-auto rounded text-area-input"
              placeholder={`${t("home.exampleWordsText")}`}
              style={{ height: "100px" }}
              onChange={(e) => onChangeInput(e.target.value)}
            />
          </div>
          <div className="d-flex space-between justify-content-center">
            <button
              type="submit"
              className="vw-50 btn-lg text-center m-3 p-2 recipe-btn"
              onClick={(e) => generateRecipe(e)}
            >
              {isLoading
                ? `${t("home.generatingRecipeText")}`
                : `${t("home.generateRecipeText")}`}
            </button>
            <button
              className="vw-50 btn-lg text-center m-3 p-2 recipe-btn-clear"
              onClick={() => setIngredients("")}
            >
              {t("home.clearText")}
            </button>
          </div>
        </form>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {t("home.informSomeIngredients")}
          </div>
        )}
        {isLoading && (
          <div className="text-center">
            <div
              className="spinner-border text-info"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">{t("home.loading")}</span>
            </div>
          </div>
        )}
      </div>
      <div>{searchResult && !isLoading && parse(searchResult)}</div>
    </div>
  );
};

export default Content;
