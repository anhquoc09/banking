var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    password: {
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

var Employee = module.exports = mongoose.model('employee',employeeSchema);