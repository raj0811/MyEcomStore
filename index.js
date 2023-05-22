const express = require('express');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const session = require('express-session');
const qrcode = require('qrcode');
const port = 8008
const app = express();
const flash = require('connect-flash');
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static('assets'));

const MongoStore = require('connect-mongo');


app.use(session({
    name: 'My ecom store',
    secret: 'your-secret-key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 1000)
    },
    store: MongoStore.create({

        mongoUrl: 'mongodb://localhost/myecomStore',
        autoRemove: 'disabled'

    },
        function (err) {
            console.log(err || 'error in connect - mongodb setup ok');
        }
    )
}));



app.use(passport.initialize());
app.use(passport.session());
// app.use(expressLayouts);

app.use(passport.setAuthenticatedUser)

app.set('view engine', 'ejs');
app.set('views', './views');






app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);

})