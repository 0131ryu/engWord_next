const axios = require("axios");
const https = require("https");
const convert = require("xml-js");

const quoteData = async (callback) => {
  const url = process.env.QUOTES_URL;
  const XRapidAPIKey = process.env.X_RapidAPI_Key;
  const XRapidAPIHost = process.env.X_RapidAPI_Host;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-RapidAPI-Key": XRapidAPIKey,
        "X-RapidAPI-Host": XRapidAPIHost,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, //허가되지 않은 인증을 reject하지 않겠다!
      }),
    });

    const result = response.data;
    const quoteLists = {
      name: result.originator.name,
      content: result.content,
    };
    callback(undefined, { quoteLists });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = quoteData;
