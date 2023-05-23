const Product = require("../models/product");
const User = require("../models/user")
const qrcode = require('qrcode');
const Razorpay = require('razorpay');
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
const Orders = require('../models/orders')



module.exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id
        const productId = req.params.id

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new cart item
        const newCartItem = {
            productId: productId,
            quantity: req.body.qty
        };

        // Add the new cart item to the user's cart
        user.cart.push(newCartItem);

        // Save the updated user document
        const savedUser = await user.save();

        return res.redirect('back')
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

};


function calculateTotalAmount(transformedCartItems) {
    let totalAmount = 0;
    for (const cartItem of transformedCartItems) {
        totalAmount += cartItem.productPrice * cartItem.quantity;
    }
    return totalAmount;
}

function getItems(transformedCartItems){
    for (let cart of transformedCartItems) {
        console.log(cart.productName);

    }
}

module.exports.showCart = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find the user by ID
        const user = await User.findById(userId).populate('cart.productId');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract cart items from the user
        const cartItems = user.cart;

        // Prepare an array to store the transformed cart items
        const transformedCartItems = [];

        // Iterate through each cart item
        for (const cartItem of cartItems) {
            const productId = cartItem.productId._id;
            const productName = cartItem.productId.productName;
            const productPrice = cartItem.productId.price;
            const productImage = cartItem.productId.image; // Assuming image is a field in the Product model
            const quantity = cartItem.quantity;

            // Create an object with the desired properties
            const transformedItem = {
                productId,
                productName,
                productPrice,
                productImage,
                quantity
            };

            // Push the transformed item to the array
            transformedCartItems.push(transformedItem);
        }

        return res.render('cart', {
            title: 'Cart',
            transformedCartItems,
            calculateTotalAmount,
        });
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports.deleteCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the index of the cart item to be deleted
        const cartItemIndex = user.cart.findIndex(
            (item) => item.productId.toString() === productId
        );

        // If the cart item is found, remove it from the cart
        if (cartItemIndex !== -1) {
            user.cart.splice(cartItemIndex, 1);
        }

        // Save the updated user document
        const savedUser = await user.save();
        return res.redirect('back')
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



function getItems(cartItems,transformedCartItems){
    for (const cartItem of cartItems) {
        const productId = cartItem.productId._id;
        const productName = cartItem.productId.productName;
        const productPrice = cartItem.productId.price;
        const productImage = cartItem.productId.image; // Assuming image is a field in the Product model
        const quantity = cartItem.quantity;

        // Create an object with the desired properties
        const transformedItem = {
            productId,
            productName,
            productPrice,
            productImage,
            quantity
        };

        // Push the transformed item to the array
        transformedCartItems.push(transformedItem);
    }
    return transformedCartItems
}


module.exports.confirm=async(req,res)=>{
   
    
    try{
        const amount = req.query.amt
    const userId=req.user.id
   
   

    // Find the user by ID
   
    // const user = await User.findById(userId);
    const user = await User.findById(userId).populate('cart.productId');
    const cartItems = user.cart;

    const transformedCartItems = [];

    getItems(cartItems,transformedCartItems)
    // console.log(transformedCartItems);
    console.log(amount);
    console.log(userId);
    return res.render('confirm',{
        title:'Confirm',
        amount,
        userId,
        user,
        cartItems,
        transformedCartItems,
        
        
    })
    }catch(err){
        res.send(err)
    }
  
    
}



module.exports.addAddress=async(req,res)=>{

    try{

        const amount = req.params.amt
    const address=req.body.address
    const newAddress = req.body.newAddress
    const userId=req.user.id

    const user = await User.findById(userId);

    // if(address){
    //     console.log(address);
    // }

    if(newAddress){
        user.address.push(newAddress);
        await user.save();
        console.log('New address added:', newAddress);
    }

    return res.redirect('back')
    }catch(err){
        console.log(err);
    }
    
    
}

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_EKuGtEbTppcZBh',
    key_secret: 'GHPeK6Tw9PmROd7zuNvBnems'
});



module.exports.proceed = async(req,res)=>{
  
    try {
        const address = req.body.address;

        console.log(address);
        const amount = req.body.amount*100
        console.log(amount);
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    
                    // console.log(order);
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id:'rzp_test_EKuGtEbTppcZBh',
                        product_name:req.body.name,
                        description:req.body.description,
                        contact:"8567345632",
                        name: "Sandeep Sharma",
                        email: "sandeep@gmail.com", 
                        
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}

module.exports.getOrder=async(req,res)=>{

    try{
        const userId=req.user.id
    const user = await User.findById(userId).populate('cart.productId');
    const cartItems = user.cart;

    const transformedCartItems = [];
    getItems(cartItems,transformedCartItems)
    console.log(transformedCartItems);

    if(user.cart.length !== 0){
        const order = new Orders({
            items:transformedCartItems,
            userId:userId
    
        })

    }
   
    
    // await order.save();

    //   user.cart = []; 
    // await user.save();

    let recentOrderes = await Orders.find({userId:userId})

    console.log(recentOrderes);

    return res.render('order',{
        title:'Orders',
        orders: recentOrderes,
    })
    }catch(err){
        console.log(err);
    }

    
}