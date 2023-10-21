var jwt = require("jsonwebtoken");

const auth = () => {
   return async (req, res, next) => {
      if(!req.headers || req.headers == undefined || req.headers == null || !req.headers["authorization"] || 
      !req.headers["authorization"].startsWith('Bearer')){
         res.status(400).json({message: "Bad authorization key"});
      }else{
         let authToken = req.headers["authorization"];
         let token = authToken.split(" ")[1]
         let verifiedkey = await jwt.verify(token, process.env.verifyTokenKey);
         
         if(verifiedkey){
            if(verifiedkey.username && verifiedkey.followers){
               req.username = verifiedkey.username;
               req.followers = verifiedkey.followers;
               next()
            }else{
               res.status(400).json({message: "You didn't provide a username or a follower count, Go back and do so."});
            }
         }
      }
   }
}


module.exports = {
   auth,
};