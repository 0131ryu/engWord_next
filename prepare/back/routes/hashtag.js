const express = require("express");
const router = express.Router();
const { Hashtag, Post, Image, Comment, User } = require("../models");
const { Op } = require("sequelize");

router.get("/:hashtag", async (req, res, next) => {
  // GET /hashtag/노드
  try {
    const hashtag = req.params.hashtag;
    const where = {
      content: {
        [Op.like]: `%#${decodeURIComponent(hashtag)}%`,
      },
    };
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
        },
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

              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: User, // 좋아요 누른사람
          as: "Likers",
          attiributes: ["id"],
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
              attiributes: ["id", "nickname", "profileImg"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
