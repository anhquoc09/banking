var express = require('express');
var userModel = require('../model/userModel'),
    accountBankModel = require('../model/accountBankModel'),
    md5 = require('crypto-js/md5'),
    moment = require('moment'),
    rfTokenModel = require('../model/refreshTokenModel');

var token = require('../fn/token');

var router = express.Router();

router.post('/updateToken', function (req, res) {
    const id = req.body.id;
    const rfToken = req.body.rfToken;
    console.log(rfToken);
    rfTokenModel.findOne({idUser: req.body.idUser, refreshToken: rfToken}, function (err, rfTokenM) {
        if (err) {
            console.log(err);
            res.json(err);
            res.statusCode = 401;
        } else {
            if (rfTokenM) {
                res.json({
                    msg: error,
                    auth: false,
                });
                res.statusCode = 401
            } else {
                userModel.findOne({idUser: idUser}, function (err, userM) {
                    var acToken = token.generateAccessToken(userM);
                    res.json({
                        auth: true,
                        user: userM,
                        accessToken: acToken
                    })
                })
            }
        }
    })
});

// thêm người dùng
router.post('/adduser', (req, res) => {
    var fullName = req.body.user.fullname;
    var cmnd = req.body.user.cmnd;
    var email = req.body.user.email;
    var password = req.body.user.password;
    var phoneNumber = req.body.user.phoneNumber;
    var createDate = moment().format();

    userModel.findOne({
        email: email
    }, function (err, user) {
        if (err) console.log(err);
        if (user) {
            console.log("user exist !!!");
            res.status(400).json({
                msg: "Username exists, choose another !!!"
            })
        } else {
            const user = userModel({
                fullname: fullName,
                idUser: cmnd,
                email: email,
                password: md5(password),
                phoneNumber: phoneNumber,
                createDate: createDate,
                permission: 0
            });

            user.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status(400).json({msg: "View error on console log"});
                } else {
                    userModel.findOne({email: email}, function (err, user) {
                        res.json({user: user});
                    })
                }
            })
        }
    });
});

//login người dùng
router.post('/login', (req, res) => {
    var md5_pwd = String(md5(req.body.password));
    userModel.findOne({
        email: req.body.email,
        password: md5_pwd
    }, function (err, result) {
        if (err) {
            console.log(err);
            res.statusCode = 401;
            res.json({
                msg: err
            });
            return;
        }

        if (result) {
            var acToken = token.generateAccessToken(result);
            var rfToken = token.generateRefreshToken();

            token.updateRefreshToken(result.idUser, rfToken);

            res.json({
                auth: true,
                user: result,
                accessToken: acToken,
                refreshToken: rfToken,
            })
        } else {
            res.status(400).json({
                auth: false,
                msg: "Email or Password not true !!!",
            });
            return;
        }
    })

});

//add account bank user
router.post('/addaccountbank', (req, res) => {
    var cmnd = req.body.account.cmnd;
    var accountBankNo = req.body.account.accountBankNo;
    var money = req.body.account.money;
    var createDate = moment().format();

    userModel.findOne({idUser: cmnd}, function (err, result) {
        if (err) {
            console.log(err);
            res.statusCode = 401;
            res.json({
                msg: "View error on console log !!!",
            });
            return;
        }

        if (result) {
            const accountBank = new accountBankModel({
                idUser: cmnd,
                accountBankNo: accountBankNo,
                money: money,
                createDate: createDate
            });

            accountBank.save(function (err) {
                if (err) {
                    console.log(err);
                    res.statusCode = 401;
                    res.json({
                        msg: "View error on console log !!!!"
                    });
                    return;
                }

                res.json({
                    result: true,
                    msg: "Account bank added user !!",
                });
            })
        } else {
            res.status(400).json({
                result: false,
                msg: "User not found !!!"
            });

        }
    })
});

//add money in account bank user
router.post('/addmoney', (req, res) => {
    var idUser = req.body.account.cmnd;
    var accountBankNo = req.body.account.accountBankNo;
    var money = Number(req.body.account.money);
    console.log(typeof money);

    userModel.findOne({idUser: idUser}, function (err, result) {
        if (err) {
            console.log(err);
            res.statusCode = 401;
            res.json({
                msg: "View error on console log !!!",
            });
            return;
        }

        if (result) {
            accountBankModel.findOne({
                idUser: idUser,
                accountBankNo: accountBankNo,
            }, function (err, account) {
                if (err) {
                    console.log(err);
                    res.statusCode = 401;
                    res.json({
                        msg: "View error on console log !!!",
                    });
                    return;
                }

                if (account) {
                    var totalmoney = Number(account.money) + money;
                    accountBankModel.findOneAndUpdate({
                        idUser: idUser,
                        accountBankNo: accountBankNo
                    }, {
                        $set: {
                            money: parseInt(totalmoney)
                        }
                    }, function (err, callback) {
                        if (err) {
                            console.log("err" + err);
                            res.statusCode = 401;
                            res.json({
                                msg: "View error on console log 123!!!",
                            });
                            return;
                        }

                        res.json({
                            result: true,
                            msg: "Money added user's account ",
                        });
                    });
                } else {
                    res.status(400).json({
                        result: false,
                        err: 2,
                        msg: "Account bank not found !!!"
                    })
                }
            });
        } else {
            res.status(400).json({
                result: false,
                err: 1,
                msg: "User not found !!!",
            });
        }
    });
});

//show account bank user
router.post('/showaccountbank', (req, res) => {
    var idUser = req.body.cmnd;

    accountBankModel.find({idUser: idUser, deleteFlag: 0}, function (err, accountBanks) {
        if (err) {
            res.statusCode = 401;
            res.json({
                msg: "View error on console log "
            });
        }

        if (accountBanks) {
            res.json({
                accountBanks
            })
        } else {
            res.status(400).json({
                msg: "Please add a account bank !!!"
            })
        }
    })
});

//tìm tài khoản của người dùng
router.post('/findAccount', (req, res) => {
    var idUser = req.body.idUser;
    accountBankModel.find({
        idUser: idUser
    }, function (err, result) {
        if (err) {
            console.log(err);
            res.statusCode = 401;
            res.json({
                msg: "View error on console log !!!",
            });
        }

        if (result) {
            res.json({
                accountBanks: result,
            });
        } else {
            res.status(400).json({
                msg: "User not account !!!",
            })
        }
    })
});

//đóng 1 tài khoản của người dùng
router.post('/closeAccount', (req, res) => {
    var idUser = req.body.idUser;
    var accountBankNo = req.body.accountBankNo;

    accountBankModel.findOne({
        idUser: idUser,
        accountBankNo: accountBankNo
    }, function (err, account) {
        if (err) {
            console.log(err);
            res.statusCode = 401;
            res.json({
                msg: "View error on console log !!!"
            })
        }

        if (account.money <= 0) {
            accountBankModel.findOneAndUpdate({
                idUser: idUser,
                accountBankNo: accountBankNo
            }, {
                $set: {
                    deleteFlag: 1
                }
            }, function (err, callback) {
                if (err) {
                    console.log(err);
                    res.statusCode = 401;
                    res.json({
                        msg: 'View error on console log !!!'
                    });
                }
                res.json({
                    result: true,
                    msg: "Account closed ",
                });
            });
        } else {
            res.status(400).json({
                msg: "Tài khoản của bạn còn tiền !!!"
            })
        }
    });
});


module.exports = router;