const nodemailer = require("nodemailer");
require('dotenv').configDotenv();
const PATH = require ("path");

const today = new Date();
const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();


   let transporter = nodemailer.createTransport({
      service: "gmail",
      //port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.senderEmail, // generated ethereal user
        pass: process.env.senderPass, // generated ethereal password
      },
    });
    async function send() {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Instagram CPA" <${process.env.senderEmail}>`, // sender address
      to: 'mohamedzineldin555@gmail.com', // list of receivers
      subject: `Follower requests for ${date}`, // Subject line
      text: 'These are the users that requested an increase of followers today, Please attend to their request soon.',
      attachments: { filename: `${getMonthString(today.getMonth())}.xlsx`, path: PATH.join(__dirname, `../excel/${getMonthString(today.getMonth())}.xlsx`) }
    });
    // console.log(info);
}

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

send();

