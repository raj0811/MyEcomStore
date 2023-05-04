const Product = require("../models/product");
const User = require("../models/user")

module.exports.addToCart = async (req, res) => {
    const product = req.params.id

    console.log(req.body.qty);
    console.log(product);


    return res.redirect('back')
}