var express = require('express');
var userModel = require('../model/userModel'),
    md5 = require('crypto-js/md5'),
    moment = require('moment');

var token = require('../fn/token');

var router = express.Router();

router.post('/adduser', (req, res) => {
    var fullName = req.body.fullName;
    var cmnd = req.body.cmnd;
    var email = req.body.email;
    var password = req.body.password;
    var accountBank = [];
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
                accountBank: accountBank,
                phoneNumber: phoneNumber,
                createDate: createDate,
            });

            user.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({msg: "View error on console log"});
                } else {
                    userModel.find(function (err, users) {
                        console.log(users);
                        res.json({users: users});
                    })
                }
            })
        }
    });
});

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
                msg: "Email or Password not true !!!",
            });
            return;
        }
    })

});

module.exports = router;