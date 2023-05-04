const User = require("../models/user")

module.exports.renderSignin = (req, res) => {
    return res.render('signin', {
        title: "Sign-in"
    })
}

module.exports.renderSignup = (req, res) => {
    return res.render('signup', {
        title: "Sign-in"
    })
}


module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            const newUser = await User.create(req.body);
            return res.redirect('/users/signin');
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log("error while signing up:", error);
        return res.redirect('back');
    }
}


module.exports.createSession = function (req, res) {

    return res.redirect('/');
}

module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/')

    });

}