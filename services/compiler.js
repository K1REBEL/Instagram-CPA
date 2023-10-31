const sqlite3 = require('sqlite3').verbose();
const XLSX = require('xlsx');
const path = require ("path");
const { sqlient, getDatabase } = require("../DB/sqliteconnection");

const today = new Date();
const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

function getMonthString(num) {
  switch (num) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "Invalid number!";
  }
}


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
  XLSX.writeFile(workbook, path.join(__dirname, `../excel/${getMonthString(today.getMonth())}.xlsx`));
});

