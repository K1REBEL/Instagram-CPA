var jwt = require("jsonwebtoken");
const axios = require('axios');
const cheerio = require("cheerio");


const getData = async (req, res) => {
   const {username} = req.body;
   const URL = `https://privatephotoviewer.com/usr/${username}`

   try {
    const response = await axios.get(URL);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract the desired information from the HTML
   //  const result = $('.result').text();
   const imageSrc = $('#myImg').attr('src');
   const followers = $('.profile-followers:first').text();
   const following = $('.profile-following:first').text();
   const rawBio = $('.profile-desc:first').text().replace(/\n/g, `<br>`);
   // let bio = rawBio.split("You are current view")[0]
   const userData = { username, imageSrc, followers, following, rawBio }

    // Return the result
   //  console.log(userData);
    res.json({ message: "User data ready!", userData});

   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}


module.exports = {
   getData,

}