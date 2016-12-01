var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
	heading: String,
	body: {
		type: String,
		required: true
	},
	createDate: Date,
	creator: String,
	lastModDate: Date
});
module.exports = mongoose.model('Question', questionSchema);
