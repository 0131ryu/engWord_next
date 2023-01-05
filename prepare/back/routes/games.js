const express = require("express");
const { Op, Sequelize } = require("sequelize");
const { User, Word, Game, Result } = require("../models");

const sequelize = new Sequelize("sequelize", "root", process.env.DB_PASSWORD, {
  host: "127.0.0.2",
  dialect: "mysql",
});
const router = express.Router();

//전체 단어들
router.get("/", async (req, res, next) => {
  try {
    const where = { UserId: req.user.id };
    // if (parseInt(req.query.lastId, 10)) {
    //   // 초기 로딩이 아닐 때
    //   where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    // } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

    const games = await Word.findAll({
      //모든 게시글 가져옴
      where,
      // limit: 10,
      order: [
        ["createdAt", "DESC"], //최신 게시글부터
      ],
    });
    console.log("games", games);
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
