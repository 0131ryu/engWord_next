const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { User, Post, Image, Comment, Word } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploads/userImg");
} catch (error) {
  console.log("uploads/userImg 폴더가 없으므로 새로 생성합니다.");
  fs.mkdirSync("uploads/userImg");
}

//프로필 이미지
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/userImg");
    },
    filename(req, file, done) {
      //파일이미지.png
      const ext = path.extname(file.originalname); //확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); //파일이미지
      done(null, basename + "_" + new Date().getTime() + ext); //파일이미지1234849.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.get("/", upload.none(), async (req, res, next) => {
  // GET /user
  console.log("req.headers", req.headers);
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: Word,
            attributes: ["id", "type"],
          },
          {
            model: User,
            as: "Followings",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: User,
            as: "Blockings",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: User,
            as: "Followers",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: User,
            as: "Blockeds",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
        ],
      });
      console.log("fullUserWithoutPassword", fullUserWithoutPassword);
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  "/image",
  isLoggedIn,
  upload.single("image"),
  async (req, res, next) => {
    await User.update(
      { profileImg: req.file.filename },
      { where: { id: req.user.id } }
    );
    res.json(req.file);
    console.log("req.file", req.file);
  }
);

router.get("/followers", isLoggedIn, async (req, res, next) => {
  // GET /user/followers
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send("없는 사람을 찾으려고 하시네요?");
    }
    const followers = await user.getFollowers({
      // limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/followings", isLoggedIn, async (req, res, next) => {
  // GET /user/followings
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send("없는 사람을 찾으려고 하시네요?");
    }
    const followings = await user.getFollowings({
      // limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/blockings", isLoggedIn, async (req, res, next) => {
  // GET /user/blocking
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send("차단한 사람이 없습니다.");
    }
    const blockings = await user.getBlockings({
      // limit: parseInt(req.query.limit, 10),
    });
    console.log("blockings 결과들", blockings);
    res.status(200).json(blockings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/blockeds", isLoggedIn, async (req, res, next) => {
  // GET /user/blockfollowed
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send("차단된 경우가 없습니다.");
    }
    const blockeds = await user.getBlockeds({
      // limit: parseInt(req.query.limit, 10),
    });
    console.log("blockeds 결과들", blockeds);
    res.status(200).json(blockeds);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  // GET /user/1
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Post,
          attributes: ["id"],
        },
        {
          model: User,
          as: "Followings",
          attributes: ["id"],
        },
        {
          model: User,
          as: "Followers",
          attributes: ["id"],
        },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인정보 침해 예방
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json("존재하지 않는 사용자입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:userId/posts", async (req, res, next) => {
  // GET /user/1/posts
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [["createdAt", "DESC"]],
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
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id", "nickname", "profileImg"],
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
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      console.log("req.user", req.user);
      console.log("fullUserWithoutPassword", fullUserWithoutPassword);
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
  // POST /user/
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

//loadUserPosts
router.get("/:userId/posts", async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
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

router.post("/logout", (req, res) => {
  req.logout((err) => {
    res.clearCookie("connect.sid"); //쿠키 삭제
    req.session.destroy();
    res.send("로그아웃 완료");
  });
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
  // PATCH /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send("없는 사람을 팔로우하려고 하시네요?");
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
  // DELETE /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send("없는 사람을 언팔로우하려고 하시네요?");
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/block/:userId", isLoggedIn, async (req, res, next) => {
  // post /user/block/2
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send("로그인이 필요합니다.");
    }
    await user.removeFollowers(req.params.userId);
    await user.addBlocking(req.params.userId);
    res.status(200).json({
      blockedUser: parseInt(req.user.id),
      blockingUser: parseInt(req.params.userId, 10),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:userId/block", isLoggedIn, async (req, res, next) => {
  // DELETE /user/1/block
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send("없는 사람을 차단해제 하려고 하시네요?");
    }
    await user.removeBlockings(req.params.userId);
    await user.addFollowers(req.params.userId);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
