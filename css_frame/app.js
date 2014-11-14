
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: './files' }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/test', routes.testAPI);
app.get('/personal', routes.personal);
app.get('/register', routes.register);
app.get('/special', routes.special);
app.get('/desc', routes.copyright);
app.get('/notice', routes.notice);
app.get('/video', routes.video);
app.get('/mode', routes.mode);
app.get('/users', user.list);
app.post('/ask', routes.ask);
app.post('/get', routes.ygh);
app.get('/xieyi', routes.xieyi);
app.post('/upload', function (req, res) {
	console.log(req.files);
	res.json({
		ygh : 'nothing',
		file: req.files||'none',
		body:req.body
	})
});

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
