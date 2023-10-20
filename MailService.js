const nodemailer = require("nodemailer");
require('dotenv').configDotenv();

async function sendEmail(dest, message, subjecto, texto, perfecto) {
   let transporter = nodemailer.createTransport({
      service: "gmail",
      //port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.senderEmail, // generated ethereal user
        pass: process.env.senderPass, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Instagram CPA" <${process.env.senderEmail}>`, // sender address
      to: dest, // list of receivers
      subject: subjecto, // Subject line
      text: texto, // plain text body
      html: message, // html body
    });
}


module.exports = sendEmail