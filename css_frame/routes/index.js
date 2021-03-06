
/*
 * GET home page.
 */
// 首页
exports.index = function (req, res) {
	res.render('index', {
		title : 'Express-Bootstrap'
	});
};
// 登录
exports.login = function (req, res) {
	res.render('login', {
		title : 'login'
	});
};
// 服务器测试页面
exports.testAPI = function (req, res) {
	res.render('testAPI', {
		title : 'testAPI'
	});
};
// 服务器测试页面
exports.personal = function (req, res) {
	res.render('personal', {
		title : 'personal'
	});
};
// 注册页面
exports.register = function (req, res) {
	res.render('register', {
		title : 'register'
	});
};
// 专题页面
exports.special = function (req, res) {
	res.render('special', {
		title : 'register'
	});
};
// 版权页面
exports.copyright = function (req, res) {
	res.render('personal_des', {
		title : 'register'
	});
};
// 定义版权模式页面
exports.mode = function (req, res) {
	res.render('mode', {
		title : '模式'
	});
};

// 公告页面
exports.notice = function (req, res) {
	res.render('notice', {
		title : 'notice'
	});
};

// 公告页面
exports.video = function (req, res) {
	res.render('zhuanti', {
		title : 'notice'
	});
};

// 协议页面
exports.xieyi = function (req, res) {
	res.render('alert', {
		title : 'notice'
	});
};
// 协议页面
exports.imgupload = function (req, res) {
	res.render('uploadimg', {
		title : 'img'
	});
};


// 跨域
exports.ask = function (req, res) {
	if (req.query.callback) {
		res.jsonp(req.body);
	} else {
		res.json(req.body);
	}
};
// 本地和跨域
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

