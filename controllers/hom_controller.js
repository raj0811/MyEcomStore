const Product = require('../models/product');

module.exports.home = async (req, res) => {
    try {
        const allProduct=await Product.find({})
        const products = await Product.aggregate([{ $sample: { size: 10 } }]);
        res.render('home', {
            title: 'Home',
            products: products,
            allProduct,
        });
    } catch (err) {
        console.log(err);
    }
};




module.exports.info = async (req, res) => {

    try{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const catProduct=await Product.find({category:product.category}).limit(5)

    // console.log(product);

    return res.render('info', {
        title: 'Product Details',
        product: product,
        catProduct,
    });
    }catch(err){
        res.send(err)
    }
    


};