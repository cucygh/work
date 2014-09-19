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

		// 用户名，密码空检测
		$modal.on('keyup blur', '#login_name,#login_pwd', function (e) {
			var $self = $(this);
			if ($self.val() != '') {
				$self.parents('.control-group').find('.ms-tishi').html('');
			}
			if (e.type == 'blur') {
				if ($self.val() != '') {
					$self.parents('.control-group').find('.ms-tishi').html('');
				} else {
					$self.parents('.control-group').find('.ms-tishi').html('<i class="icon-remove"></i>用户名不能为空');
				}
			}
		});

		// 登录
		$modal.on('click', '.ms-denglu', function (e) {
			e.preventDefault();
			var $self = $(this);
			var $login_name = $('#login_name');
			var $pwd = $('#login_pwd');
			var options = {
				name : $login_name.val(),
				pwd : $pwd.val()
			};
			if (options.name == '') {
				$login_name.parents('.control-group').find('.ms-tishi').html('<i class="icon-remove"></i>用户名不能为空');
				return false;
			} else {
				$login_name.parents('.control-group').find('.ms-tishi').html('');
			}
			if (options.pwd == '') {
				$pwd.parents('.control-group').find('.ms-tishi').html('<i class="icon-remove"></i>密码不能为空');
				return false;
			} else {
				$pwd.parents('.control-group').find('.ms-tishi').html('');
				options.pwd = Q.md5.run(options.pwd);
			}
			Q.ajax.post(Q.ajax.config.user_login, options, function (res) {
				if (res.status == '0') {
					Q.cookie.set({
						name : 'syyGUID',
						value : res.cookie,
						expire : res.expire
					})
					$self.parents('.modal[data-login]').modal('hide');
				}else{
					$pwd.parents('.control-group').find('.ms-tishi').html('<i class="icon-remove"></i>'+res.error);				
				}
			}, function (err) {
				alert('登录失败');
				console.log(err);
				// $self.parents('.modal[data-login]').modal('hide');
			});
		});

	};
	/**
	 * 页面加载结束执行
	 */
	$(function () {
		Q.pages.login();
	});
})(window);
