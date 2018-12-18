var express = require('express');
var userModel = require('../model/userModel'),
    accountBankModel = require('../model/accountBankModel'),
    md5 = require('crypto-js/md5'),
    moment = require('moment');

var token = require('../fn/token');

var router = express.Router();

// thêm người dùng
router.post('/adduser', (req, res) => {
    var fullName = req.body.fullName;
    var cmnd = req.body.cmnd;
    var email = req.body.email;
    var password = req.body.password;
    var phoneNumber = req.body.phoneNumber;
    var createDate = moment().format();

    userModel.findOne({
        email: email
    }, function (err, user) {
        if (err) console.log(err);
        if (user) {
            console.log("user exist !!!");
            res.json({
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
            });

            user.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({msg: "View error on console log"});
                } else {
                    userModel.findOne({email: email}, function (err, users) {
                        console.log(users);
                        res.json({users: users});
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
    },function (err,result) {
        if(err){
            console.log(err);
            res.statusCode = 401;
            res.json({
                msg: err
            });
            return;
        }

        if(result){
            var acToken = token.generateAccessToken(result);
            var rfToken = token.generateRefreshToken();

            token.updateRefreshToken(result.idUser,rfToken);

            res.json({
                auth: true,
                user: result,
                accessToken: acToken,
                refreshToken: rfToken,
            })
        }else{
            res.json({
                auth: false,
                msg: "Email or Password not true !!!",
            });
            return;
        }
    })

});

//add account bank user
router.post('/addaccountbank', (req, res) => {
    var idUser = req.body.idUser;
    var accountBankNo = req.body.accountBankNo;
    var money = req.body.money;

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
            const accountBank = new accountBankModel({
                idUser: idUser,
                accountBankNo: accountBankNo,
                money: money
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
            res.json({
                result: false,
                msg: "User not found !!!"
            });

        }
    })
});

//add money in account bank user
router.post('/addmoney', (req, res) => {
    var idUser = req.body.idUser;
    var accountBankNo = req.body.accountBankNo;
    var money = req.body.money;

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
                    accountBankModel.findOneAndUpdate({
                        idUser: idUser,
                        accountBankNo: accountBankNo
                    }, {
                        $set: {
                            money: account.model + money
                        }
                    }, function (err, callback) {
                        if(err){
                            console.log(err);
                            res.statusCode = 401;
                            res.json({
                                msg: "View error on console log !!!",
                            });
                            return;
                        }

                        res.json({
                            result: true,
                            msg: "Money added user's account ",
                        });
                    });
                } else {
                    res.json({
                        result: false,
                        err: 2,
                        msg: "Account bank not found !!!"
                    })
                }
            });
        } else {
            res.json({
                result: false,
                err: 1,
                msg: "User not found !!!",
            });
        }
    });
});

module.exports = router;