let mongoose = require ('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {type :String, required: true}, 
   

  });
  module.exports =  mongoose.model('User',userSchema)