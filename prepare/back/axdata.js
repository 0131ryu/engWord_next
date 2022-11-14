const axios = require("axios");
const https = require("https");
const convert = require("xml-js");

const axdata = async (wordName, callback) => {
  const url = process.env.WORD_URL;
  let ServiceKey = decodeURIComponent(process.env.WORD_API);

  let korean = "";
  let korean_dfn = "";
  let english = "";
  let english_dfn = "";

  let ex_english = "";
  let ex_english_dfn = "";

  try {
    const response = await axios.get(url, {
      params: {
        key: ServiceKey,
        q: wordName,
        advanced: "y",
        method: "exact",
        translated: "y",
        trans_lang: 1,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, //허가되지 않은 인증을 reject하지 않겠다!
      }),
    });

    // console.log("response.data", response.data);

    //xml -> json으로 변환
    const result = response.data;
    const xmlToJson = convert.xml2json(result, { compact: true, spaces: 1 });

    const obj = JSON.parse(xmlToJson);
    // console.log(obj.channel.item);
    // console.log(Object.keys(obj.channel.item).includes("0"));

    //이상한 단어 입력 시 obj.channel.item === undefined

    if (obj.channel.item === undefined) {
      korean = wordName;
      korean_dfn = "사전에 입력되지 않은 단어입니다.";
      english = "잘못 검색한 단어입니다.";
      english_dfn = "값을 찾을 수 없습니다.";

      english = "잘못 검색한 단어";
      english_dfn = "값을 찾을 수 없습니다.";
    } else if (obj.channel.item !== undefined) {
      // console.log(obj.channel.item.sense[1] !== undefined); //값이 한 개면 undefined
      korean = obj.channel.item.word._text;
      if (obj.channel.item.sense[1] !== undefined) {
        //값이 여러 개라면
        korean_dfn = obj.channel.item.sense[0].definition._text;
        english = obj.channel.item.sense[0].translation.trans_word._cdata;
        english_dfn = obj.channel.item.sense[0].translation.trans_dfn._cdata;

        ex_english = obj.channel.item.sense[1].translation.trans_word._cdata;
        ex_english_dfn = obj.channel.item.sense[1].translation.trans_dfn._cdata;
      } else {
        //값이 한 개라면
        korean_dfn = obj.channel.item.sense.definition._text;
        english = obj.channel.item.sense.translation.trans_word._cdata;
        english_dfn = obj.channel.item.sense.translation.trans_dfn._cdata;
      }
    }

    const wordLists = {
      korean: korean,
      korean_dfn: korean_dfn,
      english: english,
      english_dfn: english_dfn,
      ex_english: ex_english,
      ex_english_dfn: ex_english_dfn,
    };

    console.log(wordLists);

    callback(undefined, { wordLists });
  } catch (error) {
    console.log("error broke out:  ", error);
  }
};

module.exports = axdata;
