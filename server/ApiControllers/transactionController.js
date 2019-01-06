var express = require('express');
var moment = require('moment');
var transactionModel = require('../model/transactionModel');
var userModel = require('../model/userModel');
var accountBankModel = require('../model/accountBankModel');

var router = express.Router();
var nodemailer = require('nodemailer');
var otpModel = require('../model/otpModel');
var temp = "";

router.post('/sendOtp', (req, res) => {
    var otp = req.body.otp;
    var idUser = req.body.idUser;

    otpModel.findOne({
        otp: otp,
        idUser: idUser,
        deleteFlag: 0
    }, function (err, otp) {
        if (err) {
            console.log(err);
            res.statusCode = 401;
            res.json({
                msg: "View error on console log !!!"
            })
        } else {
            if (otp) {

                accountBankModel.findOne({
                    idUser: otp.idUser,
                    accountBankNo: otp.accountBankNo,
                }, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.statusCode = 401;
                        res.json({
                            msg: "View error on console log !!!"
                        })
                    }

                    if (result) {
                        if (result.money >= otp.transferMoney) {
                            accountBankModel.findOneAndUpdate({
                                idUser: result.idUser,
                                accountBankNo: result.accountBankNo
                            }, {$set: {money: result.money - otp.transferMoney}}, function (err, callback) {
                                if (err) {
                                    console.log(err);
                                    res.statusCode = 401;
                                    res.json({
                                        msg: "View error on console log !!!",
                                    });
                                    return;
                                }

                                accountBankModel.findOne({accountBankNo: otp.accountTransferTo}, function (err, accountBankUserReceive) {
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
                                        }, {$set: {money: accountBankUserReceive.money + otp.transferMoney}}, function (err, callback) {
                                            if (err) {
                                                console.log(err);
                                                res.statusCode = 401;
                                                res.json({
                                                    msg: "View error on console log 123!!!",
                                                });
                                                return;
                                            }

                                            const transaction = new transactionModel({
                                                idUser: otp.idUser,
                                                accountBankNo: otp.accountBankNo,
                                                accountTransferTo: otp.accountTransferTo,
                                                transferMoney: otp.transferMoney,
                                                notes: otp.notes,
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

                                                otpModel.findOneAndUpdate({
                                                    otp: otp.otp,
                                                    idUser: idUser,
                                                }, {$set: {deleteFlag: 1}}, function (err, callback) {
                                                    if (err) {
                                                        console.log(err);
                                                        res.statusCode = 401;
                                                        res.json({
                                                            msg: "View error on console log 123!!!",
                                                        });
                                                        return;
                                                    }

                                                    res.json({result: true})
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
            } else {
                res.status(400).json({
                    msg: "Mã OTP của bạn đã sai !!! Mời bạn nhập lại !!!"
                })
            }
        }
    });
});

router.post('/addTransaction', function (req, res) {

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

                        var val = Math.floor(1000 + Math.random() * 9000);

                        const otp = new otpModel({
                            otp: val,
                            idUser: idUser,
                            accountBankNo: accountBankNo,
                            accountTransferTo: accountTransferTo,
                            transferMoney: transferMoney,
                            notes: notes,
                            createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                            deleteFlag: false,
                        });

                        otp.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.statusCode = 401;
                                res.json({
                                    msg: "View error on console log!!!",
                                });
                                return;
                            } else {
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'anson1907@gmail.com',
                                        pass: '01628010342'
                                    }
                                });
                                userModel.findOne({idUser: idUser}, function (err, userM) {
                                    if (err) {
                                        console.log(err);
                                        res.statusCode = 401;
                                        res.json({
                                            msg: "View error on console log !!!"
                                        })
                                    } else {
                                        mailOptions = {
                                            from: 'anson1907@gmail.com',
                                            to: userM.email,
                                            subject: 'Xác thực chuyển tiền',
                                            html: `Hi,<br/>Thank you for your transeactions!<br/><br/>Please verify you email by typing following OTP : <br/> OTP: <b>${val}</b><br/>Thank you very much`,
                                        };
                                        transporter.sendMail(mailOptions, function (errors, info) {
                                            if (errors) {
                                                console.log(errors);
                                                res.statusCode = 401;
                                                res.json({
                                                    msg: "View error on console log !!!"
                                                })
                                            } else {
                                                res.json({
                                                    result: true,
                                                })
                                            }
                                        });
                                    }
                                });

                            }
                        });
                    } else {
                        res.status(400).json({
                            result: false,
                            msg: "Số tài khoản người nhận không được tìm thấy !!!"
                        });
                    }
                })
            }
            else {
                res.status(400).json({
                    msg: "Số dư không đủ để thực hiện giao dịch"
                })
            }
        } else {
            res.status(400).json({
                msg: "Tài khoản của bạn không được tìm thấy !!!"
            })
        }
    });
});

router.post('/addTransaction2', function (req, res) {

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

                                var val = Math.floor(1000 + Math.random() * 9000);
                                console.log(val);

                                const otp = new otpModel({
                                    otp: val,
                                    idUser: idUser,
                                    accountBankNo: accountBankNo,
                                    accountTransferTo: accountTransferTo,
                                    transferMoney: transferMoney,
                                    notes: notes,
                                    createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                    deleteFlag: false,
                                });

                                otp.save(function (err) {
                                    if (err) {
                                        console.log(err);
                                        res.statusCode = 401;
                                        res.json({
                                            msg: "View error on console log!!!",
                                        });
                                        return;
                                    } else {
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: 'anson1907@gmail.com',
                                                pass: '01628010342'
                                            }
                                        });
                                        mailOptions = {
                                            from: 'anson1907@gmail.com',
                                            to: 'anhquoc.haq09@gmail.com',
                                            subject: 'Xác thực chuyển tiền',
                                            html: `Hi,<br/>Thank you for your transeactions!<br/><br/>Please verify you email by typing following OTP : <br/> OTP: <b>${val}</b><br/>Thank you very much`,
                                        };
                                        transporter.sendMail(mailOptions, function (errors, info) {
                                            if (errors) {
                                                console.log(errors);
                                                res.statusCode = 401;
                                                res.json({
                                                    msg: "View error on console log !!!"
                                                })
                                            } else {
                                                res.json({
                                                    result: true,
                                                })
                                            }
                                        });
                                    }
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
    });
});

// thêm 1 giao dich cho idUser
router.post('/addTransaction1', (req, res) => {
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

        if (accountBanks) {
            res.json({accountBanks});
        } else {
            res.status(400).json({
                msg: "User didn't found !!!",
            });
        }

    })
});

module.exports = router;