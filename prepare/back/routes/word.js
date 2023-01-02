const express = require("express");
const router = express.Router();
const axdata = require("../axdata");
const { Word, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { Op } = require("sequelize");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const word = await Word.create({
      english: req.body.english,
      korean: req.body.korean,
      type: req.body.type,
      UserId: req.user.id,
    });
    const fullWord = await Word.findAll({
      where: { korean: word.korean },
    });
    console.log("fullWord", fullWord);
    res.status(201).json(fullWord);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  // DELETE /word/10
  try {
    await Word.destroy({
      where: {
        id: req.params.id,
        UserId: req.user.id, //작성자가 본인이 맞는지?
      },
    });
    res.status(200).json({ id: parseInt(req.params.id) });
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

router.patch("/:userId/:status", isLoggedIn, async (req, res, next) => {
  // (전체 수정) PATCH /word/status/1(userId)
  try {
    await Word.update(
      {
        status: req.params.status,
      },
      {
        where: {
          [Op.or]: [{ id: { [Op.gt]: 0 } }, { id: req.params.id }],
          UserId: req.user.id,
        },
      }
    );
    const fullWord = await Word.findAll({
      where: { status: req.params.status },
    });
    console.log("fullWord", fullWord);
    res
      .status(200)
      .json({ id: parseInt(req.params.id), status: req.params.status });
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
