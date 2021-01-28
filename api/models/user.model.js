const { builtinModules } = require('module')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {type:String , required:false},
    password:  {type:String , required:false}
});

module.exports = User = mongoose.model('User',userSchema);