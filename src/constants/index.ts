const { Configuration, OpenAIApi } = require("openai");

const configurationOpenIA = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configurationOpenIA);
