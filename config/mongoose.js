const mongoose = require('mongoose')
const mongodb = require('mongodb')
// mongoose.connect('mongodb://localhost/myecomStore');

mongoose.connect('mongodb://localhost/myecomStore', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// if any kind of error found 
db.on('error', console.error.bind(console, 'error in binding'));
db.once('open', function () {
    console.log('successfully connected to Database')
})


module.exports = db;