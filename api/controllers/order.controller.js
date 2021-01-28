const Order = require('../models/order.model')
const Product = require('../models/product.model')
const mongoose =require('mongoose')


exports.order_get_all = async(req,res,next)=>{
    try {
        let order = await Order.find()
        .select('-__v')
        .populate('product','name price')
        // .populate('product','price')
    
    
        res.status(200).json({
            orders:order
        })
    } catch (error) {
        
    }
    }

    exports.order_create = async(req,res,next)=>{
        try {
            let orderObject = await Product.find({_id:req.body.id})
         
            
            if(orderObject.length<1){
                return res.status(404).json({
                    message:'Product not found'
                })
            }
            let order = new Order({
                _id:mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.id
            });
            console.log('order',order)
            let orderedObj = await order.save();
            res.status(201).json({
                message:'successful',
                data: orderedObj
            })
        } catch (error) {
            return res.status(400).json({
                error: error.message
    })
            
        }
    }

    exports.order_get = async(req,res,next)=>{
        try {
            const id = req.params.id;
            let orderObject = await Order.findOne({_id:id})
         
            console.log(orderObject);
     
            res.status(200).json({
                message:'successful',
                data:orderObject
            })
        } catch (error) {
            return res.status(400).json({
                message:error.message
            })
        }
    }
    exports.order_delete = async(req,res,next)=>{
        let deleteObject = await Order.remove({_id:req.params.id})
        
        res.status(200).json({
            message:'order deleted'
        })
        }
