const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");

const db = require("./models");
const passportConfig = require("./passport");
const wordRouter = require("./routes/word");
const wordsRouter = require("./routes/words");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const gameRouter = require("./routes/game");
const gamesRouter = require("./routes/games");
const hashtagRouter = require("./routes/hashtag");

dotenv.config();
const app = express();

db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: ["http://engword.shop", "http://43.201.108.146"],
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true, // "http://localhost:3000",
      credentials: true,
    })
  );
}

passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/", express.static(path.join(__dirname, "uploads"))); //업로드 폴더

app.use("/word", wordRouter);
app.use("/words", wordsRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/game", gameRouter);
app.use("/games", gamesRouter);
app.use("/hashtag", hashtagRouter);

app.listen(80, (req, res) => {
  console.log("The server is running at port 80");
});
