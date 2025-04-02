const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

router.post("/add", (req, res) => {
  const { day, subject, time } = req.body;
  const sql = "INSERT INTO schedule (day, subject, time) VALUES (?, ?, ?)";
  db.query(sql, [day, subject, time], (err, result) => {
    if (err) {
      res.status(500).send("Error adding schedule");
    } else {
      res.send("Schedule added successfully");
    }
  });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { day, subject, time } = req.body;
  const sql = "UPDATE schedule SET day = ?, subject = ?, time = ? WHERE id = ?";
  db.query(sql, [day, subject, time, id], (err, result) => {
    if (err) {
      res.status(500).send("Error updating schedule");
    } else {
      res.send("Schedule updated successfully");
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM schedule WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting schedule");
    } else {
      res.send("Schedule deleted successfully");
    }
  });
});

module.exports = db;
