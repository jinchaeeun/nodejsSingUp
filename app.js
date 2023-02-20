var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var authRouter = require('./lib_login/auth');
var mainRouter = require('./routes/main');
var authCheck = require('./lib_login/authCheck.js');
var template = require('./views/template.js');
//var listView = require('./views/list.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(
	session({
		secret: '~~~', // 원하는 문자 입력
		resave: false,
		saveUninitialized: true,
		store: new FileStore(),
	}),
);

app.use('/', indexRouter);
app.use('/auth', authRouter); // 인증 라우터
app.use('/main', mainRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
