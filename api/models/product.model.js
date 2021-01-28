const { builtinModules } = require('module')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type:String , required:false},
    price:  {type:Number , required:false},
    created_at: {type:Date, default:Date.now()},
    updated_at: {type:Date, default:Date.now()},
    is_archived:{type:Boolean, default:false}
})

module.exports = Product = mongoose.model('Product',productSchema)