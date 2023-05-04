const Product = require("../models/product");
const User = require("../models/user")


module.exports.addToCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const qty = req.body.qty;
        const userId = req.user._id;

        const user = await User.findById(userId);

        // Check if the product already exists in the user's cart
        const cartItem = user.cart.find(item => item.product.equals(productId));
        if (cartItem) {
            // If the product already exists, update the quantity
            cartItem.quantity += qty;
        } else {
            // If the product doesn't exist, add a new item to the cart
            const product = await Product.findById(productId);

            const item = {
                product: product._id,
                quantity: qty
            };

            user.cart.push(item);
        }

        await user.save();
        console.log(user);

        res.redirect('back');
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
}


module.exports.cart = async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);
    const product = await Product.findById(user.product)

    console.log(user.product);
    const cartItem = user.cart;
    // console.log(cartItem);
    return res.render('cart', {
        title: "Cart",
        cartItem,
    })
}