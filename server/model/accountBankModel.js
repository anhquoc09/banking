var mongoose = require('mongoose');

var accountBankSchema = mongoose.Schema({
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

var accountBankModel = module.exports = mongoose.model('accountBank',accountBankSchema);