const Product = require('../models/product');

module.exports.home = async (req, res) => {
    try {
        const products = await Product.aggregate([{ $sample: { size: 10 } }]);
        res.render('home', {
            title: 'Home',
            products: products
        });
    } catch (err) {
        console.log(err);
    }
};




module.exports.info = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);


    // console.log(product);

    return res.render('info', {
        title: 'Product Details',
        product: product
    });


};