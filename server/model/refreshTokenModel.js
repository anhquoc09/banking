var mongoose = require('mongoose');

var rfTokenSchema = mongoose.Schema({
    iduser: {
        type: String,
        required: true
    },
    rfToken: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
    }
});

module.exports = mongoose.model('rfToken',rfTokenSchema);