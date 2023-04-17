import { useState } from "react";
import parse from "html-react-parser";
import "./styles.css";
import { openai } from "../../../constants";

const Content = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const generateRecipe = async (e: any) => {
    e.preventDefault();
    if (isLoading || ingredients === "") return setErrorMessage(true);
    setIsLoading(true);
    setSearchResult(null);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      //prompt: `Show a recipe made with ${ingredients}, inside a html div with class named 'ingredients' create a main header with the recipe name and other header with the word 'Ingredientes'`,
      prompt: `apresente uma receita feita com ${ingredients}, dentro de uma div com classe 'ingredients' crie um cabeçalho html principal com o nome da receita e outro cabeçalho html com a palavra 'Ingredientes' e em seguida liste os ingredientes em uma html ul li, faça o mesmo com o modo de preparo`,
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
        <h1 className="text-center m-4">Sem criatividade para sua refeição?</h1>
        <p className="text-center pt-5">
          Digite os ingredientes que você possui e deixe que o <b>ChefBot</b>{" "}
          monte uma deliciosa refeição!
        </p>
      </div>

      <div className="m-4">
        <form className="text-center">
          <div>
            <textarea
              className="shadow-none form-control w-75 mx-auto rounded text-area-input"
              placeholder="Ex. arroz, ovos, macarrão ..."
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
              {isLoading ? "Gerando receita" : "Gerar Receita"}
            </button>
            <button
              className="vw-50 btn-lg text-center m-3 p-2 recipe-btn-clear"
              onClick={() => setIngredients("")}
            >
              Limpar
            </button>
          </div>
        </form>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            Necessário informar alguns ingredientes!
          </div>
        )}
        {isLoading && (
          <div className="text-center">
            <div
              className="spinner-border text-info"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        )}
      </div>
      <div>{searchResult && !isLoading && parse(searchResult)}</div>
    </div>
  );
};

export default Content;
