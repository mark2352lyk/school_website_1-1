require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/schedule", require("./routes/schedule"));
const noticeRouter = require("./routes/notice"); // 라우터 파일 불러오기

app.use("/notice", noticeRouter); // 라우터를 경로 '/notice'에 적용

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
