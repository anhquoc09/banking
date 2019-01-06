var mongoose = require('mongoose');

//OPT schema
var optSchema = mongoose.Schema({
    otp: {
      type: String,
      required: true,
    },
    idUser:{
        type: String,
        required: true,
    },
    accountBankNo: {
        type: String,
        required: true,
    },
    accountTransferTo: {
        type: String,
        required: true,
    },
    transferMoney: {
        type: Number,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    createDate:{
        type: Date,
    },
    deleteFlag:{
        type: Number,
        default: 0,
    }
});

var opt = module.exports = mongoose.model('otp',optSchema);