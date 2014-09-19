/**
 * @ignore  =====================================================================================
 * @fileoverview 数据异步交互
 * @author  cuc_ygh@163.com
 * @version 1.0.0
 * @ignore  created in 2014-09-12
 * @ignore  depend Library jQuery
 * @ignore  =====================================================================================
 */
;
(function (window, undefined) {
	var $ = window.jQuery,
	Q = window.Q || {};
	/**
	 * 数据异步交互空间
	 */
	Q.ajax = {};

	/**
	 * 交互公共接口
	 */
	Q.ajax.post = function (url, option, callback, err) {
		$.ajax({
			url : url,
			type : 'POST',
			dataType : 'json',
			data : option,
			success : function (res) {
				callback && callback.call(null, res);
			},
			error : function (res) {
				err && err.call(null, res);
			},
			timeout : 2000
		});
	};
	/**
	 * 交互公共接口配置
	 */
	Q.ajax.config = {
		user_check : '/user/validateUserName.do',
		user_login : '/user/login/',
		user_regist : '/user/register.do'
	}

	// 扩展pages
	window.Q = $.extend(true, window.Q || {}, Q);
})(window);
