
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express-Bootstrap' });
};
exports.login = function(req, res){
  res.render('login', { title: 'login' });
};
