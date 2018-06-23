
var mongoose = require("mongoose");
var databaseUri ="mongodb://localhost/newsscraper";
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