const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
   image:String
})

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;