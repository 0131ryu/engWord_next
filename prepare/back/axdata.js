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
    const word = obj.channel.item;

    //없는 단어 입력 시
    if (word === undefined) {
      korean = wordName;
      korean_dfn = "사전에 입력되지 않은 단어입니다.";
      english = "잘못 검색한 단어입니다.";
      english_dfn = "값을 찾을 수 없습니다.";

      ex_english = "단어 없음";
      ex_english_dfn = "단어 뜻 없음";
    }
    // 단어 존재하는 경우
    else if (word !== undefined) {
      if (obj.channel.item.legnth === undefined) {
        // korean = word.word._text;
        // console.log("korean", korean);
        if (word[0] === undefined) {
          //단어가 한 개인 경우(레몬)
          korean = word.word._text;
        } else {
          //단어가 1개 이상인 경우(오늘)
          korean = word[0].word._text;
        }

        //뜻이 한 개인 경우(레몬, 음악)
        if (word[0] === undefined) {
          if (word.sense[0] === undefined) {
            korean_dfn = word.sense.definition._text;
            english = word.sense.translation.trans_word._cdata;
            english_dfn = word.sense.translation.trans_dfn._cdata;

            ex_english = "중복된 단어는 없습니다.";
            ex_english_dfn = "중복된 뜻은 없습니다.";
          } else if (word.sense[0] !== undefined) {
            korean_dfn = word.sense[0].definition._text;
            english = word.sense[0].translation.trans_word._cdata;
            english_dfn = word.sense[0].translation.trans_dfn._cdata;

            ex_english = word.sense[1].translation.trans_word._cdata;
            ex_english_dfn = word.sense[1].translation.trans_dfn._cdata;
          }
        } else if (word[0].sense !== undefined) {
          // //뜻이 여러 개인 경우(오늘, 내일)
          korean_dfn = word[0].sense[0].definition._text;
          english = word[0].sense[0].translation.trans_word._cdata;
          english_dfn = word[0].sense[0].translation.trans_dfn._cdata;
          ex_english = word[0].sense[1].translation.trans_word._cdata;
          ex_english_dfn = word[0].sense[0].translation.trans_dfn._cdata;
        }
      } else if (word.sense.length !== undefined && word.length > 1) {
        //단어도 뜻도 여러 개인 경우(사과)
        korean = word[0].word._text;
        korean_dfn = word[0].sense.definition._text;

        if (word[0].origin) {
          english = word[0].origin._text;
          console.log("영문", english);
        } else {
          english = word[0].sense.translation.trans_word._cdata;
          english_dfn = word[0].sense.translation.trans_dfn._cdata;
        }

        ex_english = word[1].sense.translation.trans_word._cdata;
        ex_english_dfn = word[1].sense.translation.trans_dfn._cdata;
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
