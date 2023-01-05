const express = require("express");
const { Op } = require("sequelize");
const { User, Word } = require("../models");

const router = express.Router();

//전체 단어들
router.get("/", async (req, res, next) => {
  try {
    const where = { UserId: req.user.id };
    // if (parseInt(req.query.lastId, 10)) {
    //   // 초기 로딩이 아닐 때
    //   where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    // } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

    const words = await Word.findAll({
      //모든 게시글 가져옴
      where,
      // limit: 10,
      order: [
        ["createdAt", "DESC"], //최신 게시글부터
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    console.log(words);
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
    console.log(words);
    res.status(200).json(words);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
