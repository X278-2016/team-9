var mongoose = require('mongoose');
var buttonSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createDate: Date,
    creator: String,
    lastModDate: Date,
    parentPtr: {
        type: String,
        required: true
    },
    childPtr: String
});
module.exports = mongoose.model('Button', buttonSchema);