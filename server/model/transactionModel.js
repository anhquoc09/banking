var mongoose = require('mongoose');

//transaction schema
var transactionSchema = mongoose.Schema({
    idUser:{
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
        type: Boolean,
        required: false,
    }
});

var Transaction = module.exports = mongoose.model('transaction',transactionSchema);