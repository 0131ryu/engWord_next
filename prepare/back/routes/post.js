const express = require("express");
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const fs = require("fs");

const { Post, Image, Comment, User, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 새로 생성합니다.");
  fs.mkdirSync("uploads");
}

// AWS.config.update({
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: "ap-northeast-2",
// });

const upload = multer({
  // storage: multerS3({
  //   s3: new AWS.S3(),
  //   bucket: "nodebird-seongong", //이 부분 주의할 것
  //   key(req, file, cb) {
  //     cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
  //   },
  // }),
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
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

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
      nickname: req.user.nickname,
      profileImg: req.user.profileImg,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      ); // [[노드, true], [리액트, true]]
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        //이미지 여러개 올리면 배열
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      } else {
        //이미지 하나면 image
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, //댓글 작성자
              attributes: ["id", "nickname", "profileImg"],
            },
          ],
        },
        {
          model: User, //게시글 작성자
          attributes: ["id", "nickname", "profileImg"],
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
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//이미지

router.post(
  "/images",
  isLoggedIn,
  upload.array("image"),
  async (req, res, next) => {
    console.log("req.files", req.files);
    res.json(req.files.map((v) => v.filename));
  }
);

router.delete("/images/:imageId", isLoggedIn, async (req, res, next) => {
  // DELETE /post/images/1
  try {
    const post = await Image.destroy({
      where: { id: req.params.imageId },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    res.json({ PostId: parseInt(req.params.imageId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch(
  "/images/revise",
  isLoggedIn,
  upload.array("image"),
  async (req, res, next) => {
    // PATCH /post/images
    try {
      const post = await Post.findOne({
        where: { id: req.body.id },
      });
      if (!post) {
        return res.status(403).send("게시글이 존재하지 않습니다.");
      }
      if(req.files) {
        const images = await Promise.all(
          req.files.map((image) => Image.create({ src: image.filename }))
        );
        await post.addImages(images);
      }
    
      const findImage = await Promise.all(
        req.files.map((image) =>  Image.findOne({
          where: {src : image.filename},
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        }))
      )
      
      res.json({ PostId: parseInt(req.body.id), findImage: findImage });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(`/:postId/comment`, isLoggedIn, async (req, res, next) => {
  try {
    //게시글 존재하는지 검사
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id,
      nickname: req.user.nickname,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId/bookmark", isLoggedIn, async (req, res, next) => {
  // PATCH /post/1/bookmark
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    // await post.addLikers(req.user.id);
    await post.addBookmarks(req.user.id);
    console.log("Post", post);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/bookmark", isLoggedIn, async (req, res, next) => {
  // DELETE /post/1/bookmark
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeBookmarks(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/retweet", isLoggedIn, async (req, res, next) => {
  // POST /post/1/retweet
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: "Retweet",
        },
      ],
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send("자신의 글은 리트윗할 수 없습니다.");
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send("이미 리트윗했습니다.");
    }
    console.log("유저 아이디", req.user.id);
    console.log("retweetTargetId", retweetTargetId);
    const retweet = await Post.create({
      UserId: req.user.id,
      nickname: req.user.nickname,
      RetweetId: retweetTargetId,
      content: "retweet",
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
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
        {
          model: User,
          attributes: ["id", "nickname", "profileImg"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.patch("/:postId", isLoggedIn, async (req, res, next) => {
//   //게시글 수정
//   //해시태그 수정하는 경우
//   const hashtags = req.body.content.match(/#[^\s#]+/g);

//   try {
//     await Post.update(
//       { content: req.body.content },
//       {
//         where: {
//           id: req.params.postId,
//           UserId: req.user.id,
//         },
//       }
//     );
//     const post = await Post.findOne({ where: { id: req.params.postId } });
//     if (hashtags) {
//       const result = await Promise.all(
//         //저장은 소문자만
//         hashtags.map((tag) =>
//           Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } })
//         )
//       ); //[[노드, true], [리액트, true]] 이런 모양이므로 첫 번째 것만 추출하게 함
//       await post.setHashtags(result.map((v) => v[0]));
//     }
//     res.status(200).json({
//       PostId: parseInt(req.params.postId, 10),
//       content: req.body.content,
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

//게시글 삭제
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id, //작성자가 본인이 맞는지?
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//게시글 수정
router.patch("/:postId", isLoggedIn, async (req, res, next) => {
  // PATCH /post/10
  try {
    await Post.update(
      { content: req.body.editText },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id, //작성자가 본인이 맞는지?
        },
      }
    );
    res.status(200).json({
      PostId: parseInt(req.params.postId, 10),
      content: req.body.editText,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//댓글 삭제
router.delete("/:postId/comment", isLoggedIn, async (req, res, next) => {
  // DELETE /post/10/comment
  try {
    await Comment.destroy({
      where: {
        PostId: req.params.postId,
        UserId: req.user.id, //작성자가 본인이 맞는지?
      },
    });
    res.status(200).json({
      postId: parseInt(req.params.postId, 10),
      commentId: req.body.commentId, //안 나옴'
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//댓글 수정
router.patch("/:postId/comment", isLoggedIn, async (req, res, next) => {
  // PATCH /post/10/comment
  try {
    await Post.update(
      { content: req.body.editText },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id, //작성자가 본인이 맞는지?
        },
      }
    );
    res.status(200).json({
      PostId: parseInt(req.params.postId, 10),
      content: req.body.editText,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//리트윗
router.post(`/:postId/retweet`, isLoggedIn, async (req, res, next) => {
  try {
    //게시글 존재하는지 검사
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: "Retweet",
        },
      ],
      nt,
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      //자신의 게시글을 본인이 리트윗 하는 경우 || 남이 리트윗한 게시글을 본인이 리트윗 하는 것
      return res.status(403).send("자신의 글은 리트윗할 수 없습니다.");
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send("이미 리트윗했습니다.");
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: "retweet",
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//게시글 1개
router.get(`/:postId`, async (req, res, next) => {
  try {
    //게시글 존재하는지 검사
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send("존재하지 않는 게시글입니다.");
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
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
        {
          model: User,
          attributes: ["id", "nickname", "profileImg"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
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
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//게시글 검색
router.get("/search/:detail", async (req, res, next) => {
  const where = { [Op.like]: "%" + req.params.detail + "%" };
  // if (parseInt(req.query.lastId, 10)) {
  //   // 초기 로딩이 아닐 때
  //   where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
  // } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

  const posts = Post.findAll({
    where,
    // limit: 10,
    // include: [
    //   {
    //     model: User,
    //     attributes: ["id", "nickname", "profileImg"],
    //   },
    //   {
    //     model: Image,
    //   },
    //   {
    //     model: Comment,
    //     include: [
    //       {
    //         model: User,
    //         attributes: ["id", "nickname", "profileImg"],
    //       },
    //     ],
    //   },
    //   {
    //     model: User, //좋아요 누른 사람
    //     as: "Likers", //post.Likers 생성
    //     attributes: ["id"],
    //   },
    //   {
    //     model: User, //좋아요 누른 사람
    //     as: "Bookmarks", //post.Bookmarks 생성
    //     attributes: ["id"],
    //   },
    //   {
    //     model: Post,
    //     as: "Retweet",
    //     include: [
    //       {
    //         model: User,
    //         attributes: ["id", "nickname", "profileImg"],
    //       },
    //       {
    //         model: Image,
    //       },
    //     ],
    //   },
    // ],
  });
  console.log("posts", posts);
  res.status(200).json(posts);
});

module.exports = router;
