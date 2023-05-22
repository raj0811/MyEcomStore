const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');

// setv routes

router.post('/add-to-cart/:id', productController.addToCart)

router.get('/cart', productController.showCart)

router.get('/:id/delete', productController.deleteCartItem);

router.get('/confirm', productController.confirm)

// proceed to payment
router.post('/proceed', productController.proceed)

router.post('/addaddress',productController.addAddress)

router.get('/getproduct',productController.getOrder)


module.exports = router;  