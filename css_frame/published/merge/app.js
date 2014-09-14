/**
 * @ignore  =====================================================================================
 * @fileoverview 数据异步交互
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
		user_check : '/user/check/',
		login : '/user/login/',
		user_regist : '/user/regist'
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
	// 是否
	Q.pages.flag=false;
	/**
	 * 定义页面事件
	 */
	Q.pages.event = function () {
		var $form = $('.form-register');
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
			$('#credential option').prop('disabled',true).filter('[val='+$type.val()+']').prop('disabled',false).prop('selected',true);
		});

	};
	/**
	 * 页面加载结束执行
	 */
	$(function () {
		Q.pages.event();
	});
})(window);
