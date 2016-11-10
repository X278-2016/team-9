var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	lgnName: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	userName: String,
	race: String,
	income: Number,
	age: Date,
	email: String,
	phone: Number,
	county: String,
	hhNum: Number,
	gender: String,
	isDisabled: Boolean,
	isVeteran: Boolean,
	isForeign: Boolean,
	createDate: Date
});
module.exports = mongoose.model('User', userSchema);