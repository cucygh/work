
/*
 * GET home page.
 */

exports.index = function (req, res) {
	res.render('index', {
		title : 'Express-Bootstrap'
	});
};
exports.login = function (req, res) {
	res.render('login', {
		title : 'login'
	});
};

exports.testAPI = function (req, res) {
	res.render('testAPI', {
		title : 'testAPI'
	});
};

exports.ask = function (req, res) {
	if (req.query.callback) {
		res.jsonp(req.body);
	} else {
		res.json(req.body);
	}
};

exports.ygh = function (req, res) {
	if (req.query.callback) {
		res.jsonp({
			h : '123',
			result : {
				name : 'ygh',
				time : '2014'
			}
		});
	} else {
		res.json({
			h : '123',
			result : {
				name : 'ygh',
				time : '2014'
			}
		});
	}
};
