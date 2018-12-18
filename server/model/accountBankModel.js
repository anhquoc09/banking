var mongoose = require('mongoose');

var accountBank = mongoose.Schema({
    idUser:{
        type: String,
        required: true,
    },
    accountBankNo: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        default: 0
    }
});

module.exports = accountBank;