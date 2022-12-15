const express = require("express");
const router = express.Router();
const axdata = require("../axdata");
const { Word, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const word = await Word.create({
      english: req.body.english,
      korean: req.body.korean,
      type: req.body.type,
      UserId: req.user.id,
    });
    const fullWord = await Word.findOne({
      where: { id: word.id },
    });
    res.status(201).json(fullWord);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

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
