var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	lgnName: String,
	password: String,
	userName: String,
	race: String,
	income: Number,
	age: Date,
	email: String,
	phone: Number
});
mongoose.model('User', userSchema);