const express = require("express");
const router = express.Router();
const axdata = require("../axdata");

//API로 단어 검색
router.get("/:korean", async (req, res, next) => {
  await axdata(req.params.korean, (error, { wordLists } = {}) => {
    if (error) {
      res.send(error);
    }
    res.send(wordLists);
  });
});

module.exports = router;
