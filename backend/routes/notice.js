// routes/notice.js
const express = require("express");
const router = express.Router();

// 예시 라우트 설정
router.get("/", (req, res) => {
  res.send("공지사항");
});

module.exports = router;
