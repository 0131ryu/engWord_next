const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const axdata = require("./axdata.js");
const wordRouter = require("./routes/word");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello express");
});

//json 파일 불러오기
// app.get("/", async (req, res) => {
//   await axdata("나무", (error, { wordLists } = {}) => {
//     if (error) {
//       res.send(error);
//     }
//     res.send(wordLists);
//   });
// });

app.use("/word", wordRouter);
app.get("/", (req, res) => {
  console.log("연결됨");
});

app.listen(3005, () => {
  console.log("The server is running at port 8000");
});
