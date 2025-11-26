const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));


// Correct DB path inside container
const db = new sqlite3.Database("/usr/src/app/data/cloudtrail.db");


// Ensure table exists
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT)");
  console.log("🔧 Table logs ready!");
});

app.post("/ingest", (req, res) => {
  console.log("📥 Incoming log record:", req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    console.error("⚠️ Empty body received!");
    return res.status(400).send("No data");
  }

  const payload = JSON.stringify(req.body);
  db.run("INSERT INTO logs (data) VALUES (?)", [payload]);
  console.log("💾 Log saved to database!");
  res.status(200).send("OK");
});


app.listen(8080, () => console.log("🚀 App Running on 8080"));