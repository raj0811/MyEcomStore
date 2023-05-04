const Product = require('../models/product');
const multer = require('multer');
const path = require('path');


module.exports.home = (req, res) => {

    return res.render('adminPannel', {
        title: "Admin"
    })
}

module.exports.renderAddProduct = async (req, res) => {

    let product = await Product.find({}).exec();

    console.log(product);
    return res.render('addProduct', {
        title: "Admin",
        product: product
    })
}





module.exports.addProduct = (req, res) => {
    const product = new Product({
        productName: req.body.productName,
        price: req.body.price,
        qty: req.body.qty,
        category: req.body.category,
        description: req.body.description,
        image: req.file.filename
    });




    product.save()
        .then(() => {
            console.log('Product saved to database');
            return res.redirect('back')
        })
        .catch((err) => {
            console.log('Error saving product to database', err);
            res.status(500).json({ error: 'Error saving product to database' });
        });


};

