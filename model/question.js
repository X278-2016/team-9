var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true
	},
	yesPtr: Number,
	noPtr: Number,
	createDate: Date,
	creator: String
});
module.exports = mongoose.model('Question', questionSchema);