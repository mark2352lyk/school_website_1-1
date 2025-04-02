const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM schedule", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { day, subject, time } = req.body;
  db.query(
    "INSERT INTO schedule (day, subject, time) VALUES (?, ?, ?)",
    [day, subject, time],
    (err, result) => {
      if (err) throw err;
      res.send("Schedule added!");
    }
  );
});

module.exports = router;
