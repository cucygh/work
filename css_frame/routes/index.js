
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
// ע��ҳ��
exports.register = function (req, res) {
	res.render('register', {
		title : 'register'
	});
};
// ר��ҳ��
exports.special = function (req, res) {
	res.render('special', {
		title : 'register'
	});
};
// ��Ȩҳ��
exports.copyright = function (req, res) {
	res.render('personal_des', {
		title : 'register'
	});
};
// �����Ȩģʽҳ��
exports.mode = function (req, res) {
	res.render('mode', {
		title : 'ģʽ'
	});
};

// ����ҳ��
exports.notice = function (req, res) {
	res.render('notice', {
		title : 'notice'
	});
};

// ����ҳ��
exports.video = function (req, res) {
	res.render('zhuanti', {
		title : 'notice'
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

