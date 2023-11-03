var jwt = require("jsonwebtoken");
const axios = require('axios');
const cheerio = require("cheerio");
const { getDatabase } = require('../../DB/sqliteconnection');
const moment = require('moment');
const http = require("http");
// const countryip = require("ip-countryside")
const requestIp = require('request-ip');
const geoip = require('geoip-lite');




const getData = async (req, res) => {
   const {username} = req.body;
   const URL = `https://privatephotoviewer.com/usr/${username}`

   try {
    const response = await axios.get(URL);
    const html = response.data;
    const $ = cheerio.load(html);

   // Extract the desired information from the HTML
   const imageSrc = $('#myImg').attr('src');
   const followers = $('.profile-followers:first').text();
   const following = $('.profile-following:first').text();
   // const bio = $('.profile-desc:first').text().replace(/\n/g, `<br>`);
   const rawBio = $('.profile-desc').text();  //.replace(/\n/g, `<br>`);
   let bio = rawBio.split("You are current view")[0]
   const userData = { username, imageSrc, followers, following, bio }
   
   if (!followers){ res.json({ message: "Wrong username or server down."})}
   else{
    //  console.log(userData);
    res.json({ message: "User data ready!", userData});
   }
   

   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

const selectFollowers = (req, res) => {
   const username = req.params.username;
   const followers = req.body.follower_count;
   try {
      console.log(username, followers);
      var token = jwt.sign(
         { username, followers },
         process.env.verifyTokenKey
      );
      res.json({ message: "Token Generated!", token });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

const getCountry = (req) => {
   const clientIp = requestIp.getClientIp(req);
   const geo = geoip.lookup(clientIp);
   // const geo = geoip.lookup("testip");
   // console.log(clientIp);
 
   if (geo && geo.country) {
     return geo.country;
   } else {
     return 'Unknown';
   }
 };

const congrats = async (req, res) => {
   console.log(req.username, req.followers);
   const username = req.username;
   const follow_no = req.followers;
   const today = new Date();
   const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
   const now = moment().format('hh:mm');
   // console.log(req.ip);
   const country = getCountry(req);
   

   try {
      const db = getDatabase();

      db.run("INSERT INTO requests(username, followers_count, country, date, time) VALUES (?, ?, ?, ?, ?)",
      username, follow_no, country, date, now, (err) => {
      if (err) {
         console.error(err.message);
      } else {
         // console.log("Data inserted successfully.");
         res.json({ message: "Done!", username, follow_no });
      }
  });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}



const retrieve = async (req, res) => {
   const db = getDatabase();
   let sql = `SELECT * FROM requests`;
 
   db.all(sql, [], (err, rows) => {
     if (err) {
       console.error(err.message);
       res.status(500).json({ error: 'An error occurred' });
     } else {
       const result = rows.map((row) => {
         return {
           id: row.id,
           username: row.username,
           followers_count: row.followers_count,
           country: row.country,
           date: row.date,
           time: row.time
         };
       });
       res.json(result);
       console.log(result);
     }
   });
 };

 const retrieve_today = async (req, res) => {
   const today = new Date();
   const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
   const db = getDatabase();
   let sql = `SELECT * FROM requests WHERE date = '${date}'`;
 
   db.all(sql, [], (err, rows) => {
     if (err) {
       console.error(err.message);
       res.status(500).json({ error: 'An error occurred' });
     } else {
       const result = rows.map((row) => {
         return {
           id: row.id,
           username: row.username,
           followers_count: row.followers_count,
           country: row.country,
           date: row.date,
           time: row.time
         };
       });
       res.json(result);
       console.log(result);
     }
   });
 };


module.exports = {
   getData,
   selectFollowers,
   congrats,
   retrieve,
   retrieve_today,
}