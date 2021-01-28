const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.user_signup = async(req,res,next)=>{
    try {
        let userObject = await User.find({email:req.body.email})
        if(userObject.length>=1){
            return res.status(409).json({
                message:'Mail exists'
            })
        }else{
          bcrypt.hash(req.body.password,10, async(err,hash)=>{
                if(err){
                    return res.status(400).json({
                        error:err
                    })
                }
                let user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password:hash 
                })
                console.log('newUser', user)
                let newUser = await user.save()
                return res.status(200).json({
                    message:'successful',
                    data: newUser
                })

            })
           
        }
    } 
    catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

exports.user_login = async(req,res,next)=>{
    try {
        let userEmail= await User.find({email: req.body.email})
        if(userEmail.length<1){
            return res.status(401).json({
                message:'Auth failed'
            });
        }
        let userPassword = await bcrypt.compare(req.body.password,userEmail[0].password)
       
         
        if(userPassword){
            const token= jwt.sign({
                email:userEmail[0].email,
                userId:userEmail[0]._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
            );
            return res.status(200).json({
                message:'Auth success',
                token : token
            })
        }else{
            return res.status(400).json({
                message:'Auth fail'
        })      
    }

    } 
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message:'Auth fail',
            error
    })  
    }
}

exports.user_delete = async(req,res,next)=>{
    try {
        let deletedUser =await User.remove({_id:req.params.id})
     
        res.status(200).json({
            message:'user deleted'
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}