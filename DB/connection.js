const mongoose = require("mongoose");

const connect = async() => {
  await mongoose
   //  .connect(process.env.DB_CONNECTION)
    .connect("mongodb://localhost:27017")
    .then((res) => console.log("DB connected ..."))
    .catch((err) => console.log("Error connecting to DB", err));
    return mongoose;
    
};
 
module.exports = connect;