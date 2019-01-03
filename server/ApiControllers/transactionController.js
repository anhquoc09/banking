var express = require('express');
var moment = require('moment');
var transactionModel = require('../model/transactionModel');
var userModel = require('../model/userModel');
var accountBankModel = require('../model/accountBankModel');

var router = express.Router();

// thêm 1 giao dich cho idUser
router.post('/addTransaction', (req, res) => {
    var idUser = req.body.transaction.idUser;
    var accountBankNo = req.body.transaction.accountBankNo;
    var accountTransferTo = req.body.transaction.accountTransferTo;
    var transferMoney = Number(req.body.transaction.transferMoney);
    var notes = req.body.transaction.notes;

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
                                        msg: "View error on console log 123!!!",
                                    });
                                    return;
                                }

                                const transaction = new transactionModel({
                                    idUser: idUser,
                                    accountBankNo: accountBankNo,
                                    accountTransferTo: accountTransferTo,
                                    transferMoney: transferMoney,
                                    notes: notes,
                                    createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                    deleteFlag: false,
                                });

                                transaction.save(function (err) {
                                    if (err) {
                                        console.log(err);
                                        res.statusCode = 401;
                                        res.json({
                                            msg: "View error on console log!!!",
                                        });
                                        return;
                                    }

                                    res.json({
                                        result: true,
                                    })
                                });
                            });
                        } else {
                            res.status(400).json({
                                result: false,
                                msg: "Account bank user receive not found !!!"
                            });
                        }
                    })
                })
            } else {
                res.status(400).json({
                    msg: "Số dư không đủ để thực hiện giao dịch"
                })
            }
        }
    })

});

//hiển thị lịch sử giao dich người dùng
router.post('/historyTransaction', (req, res) => {
    var accountBankNo = req.body.accountBankNo;

    transactionModel.find({
        accountBankNo: accountBankNo
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

//Show danh bạ gợi nhớ cho người dùng
router.post('/getAccountHistory', (req, res) => {
    transactionModel.aggregate([{$group: {_id: "$accountTransferTo"}}], function (err, accountBanks) {
        if (err) {
            res.statusCode = 400;
            console.log(err);
            res.json({
                msg: "View error on console log !!!"
            });
        }

        if(accountBanks){
            res.json({accountBanks});
        }else
        {
            res.status(400).json({
                msg: "User didn't found !!!",
            });
        }

    })
});

module.exports = router;