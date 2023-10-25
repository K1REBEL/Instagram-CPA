const sqlite3 = require("sqlite3").verbose();

let db;

const sqlient = async () => {
  db = new sqlite3.Database('./requestat.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  });

  // db.run(`CREATE TABLE requests(id INTEGER PRIMARY KEY, username, followers_count, country, date, time)`);
  // db.run("DROP TABLE requests");
};

const getDatabase = () => {
  if (!db) {
    throw new Error("Database not connected. Call connect() first.");
  }
  return db;
};

module.exports = { sqlient, getDatabase };