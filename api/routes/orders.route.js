const express = require('express');
const router = express.Router();
const mongoose =require('mongoose')
const Order = require('../models/order.model')
const Product = require('../models/product.model')
const ordersController = require('../controllers/order.controller');
const checkAuth = require('../middleware/check-auth')


router.get('/',checkAuth, ordersController.order_get_all)

router.post('/',checkAuth, ordersController.order_create)

router.get('/:id',checkAuth, ordersController.order_get)

router.delete('/:id',checkAuth, ordersController.order_delete)
 


module.exports = router;