const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');

// setv routes

router.post('/add-to-cart/:id', productController.addToCart)

router.get('/cart', productController.cart)

module.exports = router; 