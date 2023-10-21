var jwt = require("jsonwebtoken");
const axios = require('axios');
const cheerio = require("cheerio");
const reqModel = require("../../DB/model/requests")


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

   //  console.log(userData);
    res.json({ message: "User data ready!", userData});

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


const congrats = async (req, res) => {
   console.log(req.username, req.followers);
   const username = req.username;
   const follow_no = req.followers;
   try {
      const request = new reqModel({ username, follow_no });
      const savedReq = await request.save();
      res.json({ message: "Request Saved!", savedReq });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }

}


module.exports = {
   getData,
   selectFollowers,
   congrats,

}