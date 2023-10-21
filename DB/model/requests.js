
const mongoose = require('mongoose');

const userRequestSchema = new mongoose.Schema({
   
   username: {type:String},
   follow_no: {type:Number},
   
}, {
   timestamps: true
})

const reqModel = mongoose.model('request', userRequestSchema)

module.exports = reqModel