
/*
 * GET home page.
 */
// ��ҳ
exports.index = function (req, res) {
	res.render('index', {
		title : 'Express-Bootstrap'
	});
};
// ��¼
exports.login = function (req, res) {
	res.render('login', {
		title : 'login'
	});
};
// ����������ҳ��
exports.testAPI = function (req, res) {
	res.render('testAPI', {
		title : 'testAPI'
	});
};
// ����������ҳ��
exports.personal = function (req, res) {
	res.render('personal', {
		title : 'personal'
	});
};

// ����
exports.ask = function (req, res) {
	if (req.query.callback) {
		res.jsonp(req.body);
	} else {
		res.json(req.body);
	}
};
// ���غͿ���
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

