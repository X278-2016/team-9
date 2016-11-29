var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
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
	createDate: Date,
	lastModDate: Date
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);