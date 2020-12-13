var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const cors = require('cors');
const drive = require('./drive')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hsRoute = require("./routes/hsRoute");
var driveRoute = require("./routes/driveRoute");
var companyRoute = require("./routes/companyRoute");

var app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', hsRoute);
app.use('/api', driveRoute);
app.use('/api', companyRoute);
//app.use(express.static('build'));

//const buildPath = path.join(__dirname, '../', 'build');
//app.use(express.static(buildPath));

//app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => res.sendFile(path.resolve(buildPath, 'index.html')));
// << db setup >>
const db = require("./db");
const dbName = "hstproj";
const collectionName = 'hstcodes';

db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
   console.log("successful init");

}, function (err) { // failureCallback
   throw (err);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});


module.exports = app;
