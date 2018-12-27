var jwt = require('jsonwebtoken'),
    rndToken = require('rand-token'),
    moment = require('moment'),
    lodash = require('lodash'),
    refreshToken = require('../model/refreshTokenModel');

const SECRETKEY = 'ANSON';
const AC_LIFETIME = 30000;

exports.generateAccessToken = userEntity => {
    var payload = {
        user: userEntity,
        info: 'more info'
    };

    var token = jwt.sign(payload, SECRETKEY, {
        expiresIn: AC_LIFETIME
    });

    // console.log(userEntity);
    return token;
};

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];

    if (token) {

        jwt.verify(token, SECRETKEY, (err, payload) => {
            if (err) {
                res.statusCode = 401;

                res.json({
                    msg: 'INVALID TOKEN',
                    error: err
                })
            } else {
                req.token_payload = payload;

                next();
            }
        });
    } else {
        res.statusCode = 403;
        res, json({
            msg: 'NO_TOKEN',
            auth: false
        });
    }
};

exports.generateRefreshToken = () => {
    const size = 80;
    return rndToken.generate(size);
};

exports.updateRefreshToken = (idUser, rfToken) => {
    return new Promise((resolve, reject) => {
        refreshToken.findOne({iduser: idUser}).exec((err, user) => {
          if(user){
              user.createDate = moment().format('YYYY-MM-DD HH:mm:ss');
              user.rfToken = rfToken;
              user.save(function(err){
                  if (err) console.log(err);
              });
          }else{
              var userToken = new refreshToken({
                  rfToken: rfToken,
                  createDate: moment().format('YYYY-MM-DD  HH:mm:ss'),
                  iduser: idUser
              });

              userToken.save(function(err){
                  if (err) console.log(err);
              });
          }
        })
    });
};