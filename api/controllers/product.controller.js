const mongoose = require('mongoose');
const Product = require('../models/product.model')
var _ = require('lodash')

exports.product_get_all = async(req,res,next)=>{
    try {
        let products = await Product.find({
            is_archived :false
        })
        
        console.log(products)
        return res.status(200).json({
            data:products.map(product=>{
                return{
                    _id: product._id,
                    name:product.name,
                    price:product.price,
                    url:'http://localhost:3000/products/' + product._id
                }
            })
        })
        
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
 }

 exports.product_create = async(req,res,next)=>{
    try {
        let errors={};
        if(!req.body.hasOwnProperty("name")){
            errors.name = 'name is required'
        }
        if(!req.body.hasOwnProperty("price")){
            errors.price = 'price is required'
        }
        if(errors.length>0){
            return res.status(400).json(errors)
        }
        let newProduct = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price:req.body.price
        });
        console.log('new product',newProduct)
        let newlyCreatedProduct = await newProduct.save();
        if (newlyCreatedProduct){
            return res.status(201).json({
                message:'success',
                data: newProduct,
                url:'http://localhost:3000/products' 

            })
        }
        else{
            throw new Error("something went wrong")
        }
    } catch (error) {
                return res.status(400).json({
                    error: error.message
        })
        
    }
    }

    exports.product_get = async(req,res,next)=>{
        try {
            const id = req.params.id;
            let productObject = await Product.findOne({_id:id})
         
            console.log(productObject);
     
            res.status(200).json({
                message:'successful',
                data:productObject
            })
        } catch (error) {
            return res.status(400).json({
                message:error.message
            })
        }
         }

exports.product_update = async(req,res,next)=>{
    try {
        const id = req.params.id;
        var updateObject = await Product.findOne({_id:id})

        if(_.isEmpty(updateObject)){
            res.status(400).json({
                message:'product not found'
            })
        }else{
            if(req.body.hasOwnProperty('name')){
                updateObject.name= req.body.name
            }
            if(req.body.hasOwnProperty('price')){
                updateObject.price = req.body.price
            }
            var updatedproductObj = await updateObject.save();
            res.status(200).json({
                message:'successful',
                data : updatedproductObj
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}
exports.product_delete = async(req,res,next)=>{
    try {
        const id = req.params.id;
        var deleteProductObj = await Product.updateOne({_id:id},{$set:{is_archived:req.body.archived}})
        res.status(200).json({
            message:'data archived'
        });
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}