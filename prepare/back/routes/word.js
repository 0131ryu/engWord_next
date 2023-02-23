const express = require("express");
const router = express.Router();
const axdata = require("../axdata");
const { Word, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { Op } = require("sequelize");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const findWord = await Word.findOne({
      where: { english: req.body.english, UserId: req.user.id },
    });
    if (findWord) {
      return res.status(403).send("이미 있는 단어이므로 생성되지 않습니다.");
    }
    const word = await Word.create({
      english: req.body.english,
      korean: req.body.korean,
      type: req.body.type,
      UserId: req.user.id,
    });

    const fullWord = await Word.findAll({
      where: { korean: word.korean },
    });
    res.status(201).json(fullWord);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  // DELETE /word/10
  try {
    const word = await Word.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id, //작성자가 본인이 맞는지?
      },
    });
    await Word.destroy({
      where: {
        id: req.params.id,
        UserId: req.user.id, //작성자가 본인이 맞는지?
      },
    });
    res.status(200).json({ id: parseInt(req.params.id), type: word.type });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:id", isLoggedIn, async (req, res, next) => {
  // PATCH /word/10
  try {
    await Word.update(
      {
        english: req.body.english,
        korean: req.body.korean,
        type: req.body.type,
      },
      {
        where: {
          id: req.params.id,
          UserId: req.user.id, //작성자가 본인이 맞는지?
        },
      }
    );
    res.status(200).json({
      id: parseInt(req.params.id),
      english: req.body.english,
      korean: req.body.korean,
      type: req.body.type,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:id/:status", isLoggedIn, async (req, res, next) => {
  // PATCH /word/10/status
  try {
    await Word.update(
      {
        status: req.params.status,
      },
      {
        where: {
          id: req.params.id,
          UserId: req.user.id, //작성자가 본인이 맞는지?
        },
      }
    );
    const fullWord = await Word.findOne({
      where: { id: req.params.id },
    });
    res.status(201).json(fullWord);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/all/:userId/:status", isLoggedIn, async (req, res, next) => {
  // (전체 수정) PATCH /word/status/1(userId)
  try {
    await Word.update(
      {
        status: req.params.status,
      },
      {
        where: {
          [Op.or]: [{ id: { [Op.gt]: 0 } }, { id: req.params.userId }],
          UserId: req.user.id,
        },
      }
    );
    const fullWord = await Word.findAll({
      where: { status: req.params.status, UserId: req.user.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    console.log("fullWord", fullWord);
    res.status(200).json(fullWord);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//입력했던 단어 검색
router.get("/search/:word", async (req, res, next) => {
  const searchWord = req.params.word;
  console.log("searchWord", searchWord);

  if (searchWord.match(/^[가-힣]*$/g)) {
    const result = await Word.findAll({
      where: {
        UserId: req.user.id,
        korean: { [Op.like]: "%" + searchWord + "%" },
      },
      attributes: { exclude: ["status", "createdAt", "updatedAt", "status"] },
    });
    res.status(200).json(result);
  }
  if (searchWord.match(/^[a-zA-Z]*$/g)) {
    const result = await Word.findAll({
      where: {
        UserId: req.user.id,
        english: { [Op.like]: "%" + searchWord + "%" },
      },
      attributes: { exclude: ["status", "createdAt", "updatedAt"] },
    });
    console.log("(eng) result", result);
    console.log("(eng) result type", typeof result);
    res.status(200).json(result);
  }
});

//API로 단어 검색
router.get("/:korean", async (req, res, next) => {
  const result = await axdata(
    req.params.korean,
    (error, { wordLists } = {}) => {
      if (error) {
        res.send(error);
      }
      res.send(wordLists);
    }
  );
  if (result) {
    return res.status(404).send("검색한 단어를 찾을 수 없습니다.");
  }
});

module.exports = router;
