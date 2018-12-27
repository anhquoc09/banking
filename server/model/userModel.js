var mongoose = require('mongoose');
var accountBank = require('./accountBankModel');

var userSchema = mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
    },
    deleteFlag: {
        type: Boolean,
        default: false
    },
    permission: {
        type: Number,
        default: 0
    }
});

var User = module.exports = mongoose.model('User',userSchema);