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
			dataType : url.charAt(0)=='/'?'json':'jsonp',
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
		user_login : '/user/login.do',
		user_regist : '/user/register.do'
	}

	// 扩展pages
	window.Q = $.extend(true, window.Q || {}, Q);
})(window);

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

/**
 * @ignore  =====================================================================================
 * @fileoverview 注册交互
 * @author  cuc_ygh@163.com
 * @version 1.0.0
 * @ignore  created in 2014-09-12
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
	 * 校验数据
	 */
	Q.pages.form_check = function () {
		var flag = true;
		var $item;
		$('#form-rigister :text,#form-rigister :password').each(function (index, item) {
			$item = $(item);
			if ($item.val() == '' || $item.parents('.control-group').hasClass('error')) {
				flag = false;
				return false;
			}
		});
		return flag;
	};
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
			var name = $.trim($self.val());
			if (name != '') {
				$self.siblings('span').html('');
				$self.parents('.control-group').removeClass('error');
				Q.ajax.post(Q.ajax.config.user_check, {
					UserName : name
				}, function (res) {
					if (res.returncode == "1") {
						$self.siblings('span').html('<i class="icon-remove"></i> 用户名已被占用！');
						$self.parents('.control-group').addClass('error');
					} else {
						$self.siblings('span').html('<i class="icon-add"></i> 用户名已被占用！');
						$self.parents('.control-group').removeClass('error');
					}
				}, function (err) {
					$self.siblings('span').html('<i class="icon-remove"></i> 网络错误！');
					$self.parents('.control-group').addClass('error');
				});
			} else {
				$self.siblings('span').html('<i class="icon-remove"></i> 用户名不能为空！');
				$self.parents('.control-group').addClass('error');
			}
		});

		/**
		 * 密码强度验证
		 */
		$form.on('keyup', '#set_pwd', function () {
			var $self = $(this);
			var pwd = $self.val();
			var $pwd_level = $('.pwd-level');
			$pwd_level.removeClass('btn-success btn-warning btn-danger btn-info');
			if (!pwd) {
				$self.siblings('span').html('<i class="icon-remove"></i> 密码不能为空！');
				$self.parents('.control-group').addClass('error');
			} else {
				var level = Q.pwd.level(pwd);
				// 清空状态
				$self.parents('.control-group').removeClass('error');
				$self.siblings('span').html('');
				if (level < 10) {
					$pwd_level.filter(':lt(1)').addClass('btn-danger');
				} else {
					if (level < 20) {
						$pwd_level.filter(':lt(2)').addClass('btn-warning');
					} else {
						if (level < 25) {
							$pwd_level.filter(':lt(3)').addClass('btn-info');
						} else {
							$pwd_level.filter(':lt(4)').addClass('btn-success');
						}
					}
				}
			}
		});

		/**
		 * 密码确认
		 */
		$form.on('keyup', '#repeat_pwd', function () {
			var set_pwd = $('#set_pwd').val();
			var $self = $(this);
			var repeat_pwd = $self.val();
			if (set_pwd != repeat_pwd) {
				$self.siblings('span').html('<i class="icon-remove"></i> 两处密码不一致！');
				$self.parents('.control-group').addClass('error');
			} else {
				// 清空状态
				$self.parents('.control-group').removeClass('error');
				$self.siblings('span').html('');
			}
		});

		/**
		 * 验证手机
		 */
		$form.on('keyup', '#set_mobile', function () {
			var $self = $(this);
			var mobile = $self.val();
			if (!Q.reg.mobile(mobile)) {
				$self.siblings('span').html('<i class="icon-remove"></i> 请输入有效的手机号！');
				$self.parents('.control-group').addClass('error');
			} else {
				// 清空状态
				$self.parents('.control-group').removeClass('error');
				$self.siblings('span').html('');
			}
		});

		/**
		 * 验证邮箱
		 */
		$form.on('keyup', '#set_email', function () {
			var $self = $(this);
			var email = $self.val();
			if (!Q.reg.email(email)) {
				$self.siblings('span').html('<i class="icon-remove"></i> 请输入有效的邮箱！');
				$self.parents('.control-group').addClass('error');
			} else {
				// 清空状态
				$self.parents('.control-group').removeClass('error');
				$self.siblings('span').html('');
			}
		});
		/**
		 * 验证证件
		 */
		$form.on('keyup', '#set_identity', function () {
			var $self = $(this);
			var value = $self.val();
			var type = $('#credential :selected').attr('val');
			if (!Q.reg[type](value)) {
				$self.siblings('span').html('<i class="icon-remove"></i> 请输入有效的证件号码！');
				$self.parents('.control-group').addClass('error');
			} else {
				// 清空状态
				$self.parents('.control-group').removeClass('error');
				$self.siblings('span').html('');
			}
		});

		/**
		 * 注册类别切换
		 */
		$form.on('change', ':radio[name=identity]', function () {
			var $self = $(this);
			var $type = $self.parents('.controls').find(':checked');
			$('#credential option').prop('disabled', true).filter('[val=' + $type.val() + ']').prop('disabled', false).prop('selected', true);
		});

		/**
		 * 提交注册按钮
		 */
		$form.on('click', '#run', function (e) {
			e.preventDefault();
			$form = $('#form-rigister');
			var checked = Q.pages.form_check();
			var $pwd;
			if (checked) {
				// 密码加密
				$pwd = $('#set_pwd');
				$pwd.val(Q.md5.run($pwd.val()));
				$pwd = $('#repeat_pwd');
				$pwd.val(Q.md5.run($pwd.val()));

			}
			if (Q.pages.form_check()) {
				$form.get(0).submit();
				setTimeout(function () {
					$('#set_pwd').val('');
					$('#repeat_pwd').val('');
				}, 500);
			}
		});

	};
	/**
	 * 页面加载结束执行
	 */
	$(function () {
		Q.pages.event();
	});
})(window);
