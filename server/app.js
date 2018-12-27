var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    cors = require('cors');

var dbConnection = require('./fn/db');
var verifyAccessToken = require('./fn/token').verifyAccessToken;
var userController = require('./ApiControllers/userController');
var employeeController = require('./ApiControllers/employeeController');
var transactionController = require('./ApiControllers/transactionController');

mongoose.connect(dbConnection.database);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection: error!'));
db.once('open',()=>{
    console.log("connected to DB !!!");
});


var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));
app.use(cors());

app.use('/userController',userController);
app.use('/employeeController',employeeController);
app.use('/transactionController',transactionController);

var PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`API running on PORT ${PORT}`);
});
