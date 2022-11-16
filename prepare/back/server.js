const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const axdata = require("./axdata.js");

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

//json 파일 불러오기
// app.get("/", async (req, res) => {
//   await axdata("사과", (error, { wordLists } = {}) => {
//     if (error) {
//       res.send(error);
//     }
//     res.send(wordLists);
//   });
// });

app.listen(8000, () => {
  console.log("The server is running at port 8000");
});
