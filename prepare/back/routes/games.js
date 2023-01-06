const express = require("express");
const { Op } = require("sequelize");
const { User, Word, Game, Result } = require("../models");
const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();

const router = express.Router();

//전체 단어들
router.get("/", async (req, res, next) => {
  try {
    const games = await Result.findAll({
      UserId: req.user.id,
      createdAt: {
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW,
      },
      order: [
        ["createdAt", "DESC"], //최신 게시글부터
      ],
    });
    const scores = games.map((g) => g.score);

    res.status(200).json(scores);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/now", async (req, res, next) => {
  //Result 중 가장 최근값 조
  try {
    // if (parseInt(req.query.lastId, 10)) {
    //   // 초기 로딩이 아닐 때
    //   where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    // } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

    const ResultAll = await Result.findAll({
      limit: 1,
      where: {
        UserId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });
    console.log("ResultAll", ResultAll);
    res.status(200).json(ResultAll);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
