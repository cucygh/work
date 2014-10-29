
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '360彩票' });
};
// 登录
exports.login = function(req, res){
  res.render('login', { title: '360彩票' });
};

