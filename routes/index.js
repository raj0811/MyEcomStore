const express = require('express');
const router = express.Router();
const homeController = require('../controllers/hom_controller');

// setv routes
router.get('/', homeController.home);
router.get('/productinfo/:id', homeController.info)

router.use('/admin', require('./admin'))
router.use('/users', require('./user'))
router.use('/products', require('./product'))


module.exports = router; 