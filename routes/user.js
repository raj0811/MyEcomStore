const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');
// setv routes
router.get('/signin', userController.renderSignin);
router.get('/signup', userController.renderSignup);


router.post('/create', userController.create);

router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/signin' }
), userController.createSession)

router.get('/sign-out', userController.destroySession);
module.exports = router; 