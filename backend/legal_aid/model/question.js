var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true
	},
	parentPtr: String,
	createDate: Date,
	creator: String,
	questionAttachment: String
});
module.exports = mongoose.model('Question', questionSchema);