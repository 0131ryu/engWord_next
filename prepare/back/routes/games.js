const express = require("express");
const { Op } = require("sequelize");
const moment = require("moment");
const { Result } = require("../models");
moment.locale("ko");
const TODAY_START = moment().format("YYYY-MM-DD 00:00");
const NOW = moment().format("YYYY-MM-DD 23:59");

const router = express.Router();

// 1.1 0:00 ~ 23:59까지 정보들 불러오기
router.get("/", async (req, res, next) => {
  try {
    const games = await Result.findAll({
      raw: true,
      where: {
        UserId: req.user.id,
        createdAt: {
          [Op.between]: [TODAY_START, NOW],
        },
      },
      order: [
        ["createdAt", "DESC"], //최신 것부터
      ],
    });
    res.status(200).json(games);
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
