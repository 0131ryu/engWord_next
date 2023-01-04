const express = require("express");
const { sequelize, Op } = require("sequelize");
const { Game, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

//game에 사용되는 단어들
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    await Game.create({
      answer: req.body.answer,
      wrongAnswer: req.body.wrongAnswer,
      score: req.body.score,
      UserId: req.user.id,
    });
    const fullScoreGame = await Game.findAll({
      where: {
        UserId: req.user.id,
        createdAt: {
          [Op.lte]: new Date(),
          [Op.gt]: new Date() - 60 * 1000,
        },
      },
    });
    console.log("fullScoreGame", fullScoreGame);
    res.status(201).json(fullScoreGame);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
