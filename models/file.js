var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        unique: true,
        required: true
    },
    parentPtr: {
        type: String,
        required: true
    },
    createDate: Date,
    lastModDate: Date,
    creator: String
});

module.exports = mongoose.model('File', fileSchema);