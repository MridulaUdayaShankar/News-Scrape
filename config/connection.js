
var mongoose = require("mongoose");
var databaseUri = 'mongodb://heroku_f9k673n3:odppl2jrg0k3iaaf0ukg6r5fnh@ds115971.mlab.com:15971/heroku_f9k673n3' //"mongodb://localhost/newsscraper";
// If deployed, use the deployed database. Otherwise use the local database

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(databaseUri);
}

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Mongoose error: ', err);
});
db.once('open', function () {
    console.log('Mongoose connected!');
});