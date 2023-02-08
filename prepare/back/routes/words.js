const express = require("express");
const { Op } = require("sequelize");
const { User, Word } = require("../models");
const moment = require("moment");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

//개별 유저들의 전체 단어들
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    // const where = { UserId: req.user.id };
    // if (parseInt(req.query.lastId, 10)) {
    //   // 초기 로딩이 아닐 때
    //   where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    // }

    const words = await Word.findAll({
      //모든 게시글 가져옴
      where: { UserId: req.user.id },
      order: [
        ["createdAt", "DESC"], //최신 게시글부터
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id"],
        },
      ],
    });
    if (!words) {
      return res.status(500).send("로그인을 다시 한 번 확인하세요");
    }
    console.log(words);
    res.status(200).json(words);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/easy", isLoggedIn, async (req, res, next) => {
  //words/easy
  try {
    const where = { UserId: req.user.id, type: "easy" };
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const words = await Word.findAll({
      //모든 게시글 가져옴
      where,
      limit: 3,
      order: [
        ["createdAt", "DESC"], //최신 게시글부터
      ],
      exclude: ["createdAt", "updatedAt"],
    });
    if (!words) {
      return res.status(500).send("로그인을 다시 한 번 확인하세요");
    }
    console.log("easy words", words);
    res.status(200).json(words);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/middle", isLoggedIn, async (req, res, next) => {
  //words/middle
  try {
    const where = { UserId: req.user.id, type: "middle" };
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const words = await Word.findAll({
      //모든 게시글 가져옴
      where,
      limit: 3,
      order: [
        ["createdAt", "DESC"], //최신 게시글부터
      ],
      exclude: ["createdAt", "updatedAt"],
    });
    if (!words) {
      return res.status(500).send("로그인을 다시 한 번 확인하세요");
    }
    console.log("middle words", words);
    res.status(200).json(words);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/advance", isLoggedIn, async (req, res, next) => {
  //words/advance
  try {
    const where = { UserId: req.user.id, type: "advance" };
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const words = await Word.findAll({
      //모든 게시글 가져옴
      where,
      limit: 3,
      order: [
        ["createdAt", "DESC"], //최신 게시글부터
      ],
      exclude: ["createdAt", "updatedAt"],
    });
    if (!words) {
      return res.status(500).send("로그인을 다시 한 번 확인하세요");
    }
    console.log("advance words", words);
    res.status(200).json(words);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/checked", async (req, res, next) => {
  try {
    // const where = { status: "C", UserId: req.user.id };
    // if (parseInt(req.query.lastId, 10)) {
    //   // 초기 로딩이 아닐 때
    //   where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    // } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

    const words = await Word.findAll({
      //모든 게시글 가져옴
      where: { status: "C", UserId: req.user.id },
      // limit: 10,
      order: [
        ["createdAt", "DESC"], //최신 게시글부터
      ],
    });
    res.status(200).json(words);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/weekend", async (req, res, next) => {
  try {
    today = moment().format();
    dateFrom = moment().subtract(7, "d").format("YYYY-MM-DD");
    console.log("dateFrom", dateFrom);
    const words = await Word.findAll({
      where: {
        createdAt: {
          [Op.between]: [dateFrom, today], //일주일 동안의 값
        },
      },
      order: [
        ["createdAt"], //날짜 순
      ],
      attributes: {
        exclude: [
          "id",
          "english",
          "korean",
          "type",
          "status",
          "updatedAt",
          "UserId",
        ],
      },
    });
    res.status(200).json(words);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
