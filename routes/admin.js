const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller')

const upload = require('../middleware/upload')


router.get('/addData', adminController.renderAddProduct);
router.post('/addproduct', upload.single('image'), adminController.addProduct)

router.get('/', adminController.home)

module.exports = router; 