const express = require("express");
const { Op } = require("sequelize");
const { Post, Image, User, Comment } = require("../models");

const router = express.Router();

//전체 게시글
router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

    const posts = await Post.findAll({
      //모든 게시글 가져옴
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"], //최신 게시글부터
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profileImg"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname", "profileImg"],
            },
          ],
        },
        {
          model: User, //좋아요 누른 사람
          as: "Likers", //post.Likers 생성
          attributes: ["id"],
        },
        {
          model: User, //좋아요 누른 사람
          as: "Bookmarks", //post.Bookmarks 생성
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname", "profileImg"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
