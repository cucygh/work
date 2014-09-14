/**
 * @ignore  =====================================================================================
 * @fileoverview 注册交互
 * @author  cuc_ygh@163.com
 * @version 1.0.0
 * @ignore  created in 2014-09-12
 * @ignore  depend Library jQuery, ajax.js
 * @ignore  =====================================================================================
 */
;
(function (window, undefined) {
	var $ = window.jQuery,
	Q = window.Q || {};

	/**
	 * 定义页面空间
	 */
	Q.pages = Q.pages || {};
	/**
	 * 定义页面事件
	 */
	Q.pages.login = function () {
		var $modal = $('.modal[data-login]');
		// 关闭
		$modal.on('click', '.close', function (e) {
			e.preventDefault();
			var $self = $(this);
			$self.parents('.modal[data-login]').modal('hide');
		});

		// 登录
		$modal.on('click', '.close', function (e) {
			e.preventDefault();
			var $self = $(this);
			$self.parents('.modal[data-login]').modal('hide');
		});

	};
	/**
	 * 页面加载结束执行
	 */
	$(function () {
		Q.pages.login();
	});
})(window);
