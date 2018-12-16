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
    accountBank : [accountBank],
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
});

var User = module.exports = mongoose.model('User',userSchema);