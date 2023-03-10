const express = require("express");
const quoteData = require("../quoteData");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await quoteData((error, { quoteLists } = {}) => {
    if (error) {
      res.send(error);
    }
    res.send(quoteLists);
  });
});

// router.get("/", async (req, res, next) => {
//   axios
//     .request(quoteData)
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// });

module.exports = router;
