/**
 * @ignore  =====================================================================================
 * @fileoverview 个人主页
 * @author  cuc_ygh@163.com
 * @version 1.0.0
 * @ignore  created in 2014-09-22
 * @ignore  depend Library jQuery, base.js
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
	Q.pages.event = function () {
		var $form = $('.form-register');

		/**
		 * 用户名是否被占用
		 */
		$form.on('blur', '#set_user', function () {
			var $self = $(this);
			
		});

		

	};
	/**
	 * 页面加载结束执行
	 */
	$(function () {
		Q.pages.event();
	});
})(window);
