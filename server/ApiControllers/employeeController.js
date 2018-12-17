var express = require('express'),
    md5 = require('crypto-js/md5'),
    moment = require('moment');

var employeeModel = require('../model/employeeModel');
var token = require('../fn/token');

var router = express.Router();

// add nhân viên
router.post('/addemployee',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var md5_pwd = String(md5(password));

    employeeModel.findOne({
        username: username
    }, function (err,result) {
        if(err) console.log(err);

        if(result){
            res.json({
                msg: "Username exists, choose another !!!"
            });
        }else{
            const employee = employeeModel({
                username: username,
                password: md5_pwd,
                createDate: moment().format('YYYY-MM-DD HH:mm:sss')
            });

            employee.save(function(err){
                if(err){
                    console.log(err);
                    res.statusCode = 401;
                    res.json({
                        msg: "View error on console log !!!"
                    });
                    return;
                }else{
                    employeeModel.findOne({username:username},function(err,result){
                        res.json({
                            employee: result
                        })
                    })
                }
            });
        }
    });
});

// login nhân viên
router.post('/login',(req,res)=>{
    var username = req.body.username;
    var md5_pwd = String(md5(req.body.password));

    employeeModel.findOne({
        username: username,
        password: md5_pwd
    },function(err,result){
        if (err){
            console.log(err);
            res.statusCode = 401;
            res.json({
                msg: "View error on console log !!!"
            });
            return;
        }

        if(result){
            var acToken = token.generateAccessToken(result);
            var rfToken = token.generateRefreshToken();

            token.updateRefreshToken(result._id,rfToken);

            res.json({
                auth: true,
                user: result,
                accessToken: acToken,
                refreshToken: rfToken
            });
        }else{
            res.json({
                auth: false,
                msg:  "Username or Password not true !!!"
            });
            return;
        }
    })
});

module.exports = router;