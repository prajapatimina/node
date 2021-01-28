const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product.model')
const checkAuth = require('../middleware/check-auth')

const productsController = require('../controllers/product.controller')

router.get('/',productsController.product_get_all);

router.post('/',checkAuth, productsController.product_create);


router.get('/:id',productsController.product_get)

router.patch('/:id',checkAuth, productsController.product_update)

router.delete('/:id',checkAuth, productsController.product_delete)


module.exports=router;