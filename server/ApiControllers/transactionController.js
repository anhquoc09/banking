var express = require('express');
var moment = require('moment');
var transactionModel = require('../model/transactionModel');
var userModel = require('../model/userModel');
var accountBankModel = require('../model/accountBankModel');

var router = express.Router();

// thêm 1 giao dich cho idUser
router.post('/addTransaction', (req, res) => {
    var idUser = req.body.idUser;
    var accountBankNo = req.body.accountBankNo;
    var money = req.body.money;
    var accountTransferTo = req.body.accountTransferTo;
    var transferMoney = req.body.transferMoney;
    var notes = req.body.notes;

    accountBankModel.findOne({
        idUser: idUser,
        accountBankNo: accountBankNo
    }, function (err, result) {
        if (err) {
            console.log(err);
            res.statusCode = 401;
            res.json({
                msg: "View error on console log !!!"
            });
            return;
        }

        if (result) {
            if (result.money >= transferMoney) {
                accountBankModel.findOneAndUpdate({
                    idUser: idUser,
                    accountBankNo: accountBankNo
                }, {$set: {money: result.money - transferMoney}}, function (err, callback) {
                    if (err) {
                        console.log(err);
                        res.statusCode = 401;
                        res.json({
                            msg: "View error on console log !!!",
                        });
                        return;
                    }

                    accountBankModel.findOne({accountBankNo: accountTransferTo}, function (err, accountBankUserReceive) {
                        if (err) {
                            console.log(err);
                            res.statusCode = 401;
                            res.json({
                                msg: "View error on console log !!!"
                            });
                            return;
                        }

                        if (accountBankUserReceive) {
                            accountBankModel.findOneAndUpdate({
                                idUser: accountBankUserReceive.idUser,
                                accountBankNo: accountBankUserReceive.accountBankNo
                            }, {$set: {money: accountBankUserReceive.money + transferMoney}}, function (err, callback) {
                                if (err) {
                                    console.log(err);
                                    res.statusCode = 401;
                                    res.json({
                                        msg: "View error on console log !!!",
                                    });
                                    return;
                                }

                                const transaction = new transactionModel({
                                    idUser: idUser,
                                    accountTransferTo: accountTransferTo,
                                    transferMoney: money,
                                    notes: notes,
                                    createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                    deleteFlag: false,
                                });

                                transaction.save(function (err) {
                                    if (err) {
                                        console.log(err);
                                        res.statusCode = 401;
                                        res.json({
                                            msg: "View error on console log !!!",
                                        });
                                        return;
                                    }

                                    res.json({
                                        result: true,
                                    })
                                });
                            });
                        } else {
                            res.json({
                                result: false,
                                msg: "Account bank user receive not found !!!"
                            });
                        }
                    })
                })
            }
        }
    })

});

//hiển thị lịch sử giao dich người dùng
router.post('/historyTransaction', (req, res) => {
    var idUser = req.body.idUser;

    transactionModel.find({
        idUser: idUser
    }, function (err, result) {
        if (err) {
            console.log(err);
            res.statusCode = 401;
            res.json({
                msg: "View error on console log !!!",
            });
            return;
        }

        if (result) {
            res.json({
                result: true,
                transactions: result,
            });
        } else {
            res.json({
                result: false,
                msg: "User didn't transaction !!!"
            });
        }
    });
});

module.exports = router;