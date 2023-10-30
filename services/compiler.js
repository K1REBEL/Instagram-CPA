const sqlite3 = require('sqlite3').verbose();
const XLSX = require('xlsx');
const path = require ("path");
const { sqlient, getDatabase } = require("../DB/sqliteconnection");

const today = new Date();
const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

// Open the database connection
sqlient();
const db = getDatabase();

// Query the table and extract the data
db.all(`SELECT * FROM requests WHERE date = '${date}'`, [], (err, rows) => {
  if (err) {
    throw err;
  }

  // console.log(rows);
  // Convert the data to a worksheet
  let worksheet = XLSX.utils.json_to_sheet(rows);

  // Create a new workbook and add the worksheet
  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, today.getDate());

  // Write the workbook to a file
  XLSX.writeFile(workbook, path.join(__dirname, `../excel/${(today.getMonth()+1)}.xlsx`));
});

