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
	Q.pages.param = {};
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
			} else {
				if ($item.attr('type') != 'password') {
					Q.pages.param[$item.attr('name')] = $item.val();
				} else {
					Q.pages.param[$item.attr('name')] = Q.md5.run($item.val());
				}
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
		 * 文件上传
		 */
		/* $('#file').uploadify({
			'fileTypeExts' : '*.gif; *.jpg; *.png',
			// 'uploader' : '/upload',
			'uploader' : Q.ajax.config.user_regist,
			'swf' : '/www/javascripts/gallery/upload/1.0.0/uploadify.swf',
			buttonText : '选择文件',
			auto : false,
			width : 220,
			height : 30,
			queueSizeLimit : 1,
			fileObjName:'file',
			formData : {},
			'onUploadStart' : function (file) {
				console.log(Q.pages.param);
				$("#file").uploadify("settings", "formData", Q.pages.param);
			},
			onSelectError : function (file, errorCode, errorMsg) {
				console.log('做多选择一张证件复印件，支持*.gif; *.jpg; *.png格式!');
			},
			'onUploadSuccess' : function (file, data, response) {
				console.log('The file ' + file.name + ' was successfully uploaded with a response of ' + response + ':' + data);
			}
		}); */

		/**
		 * 提交注册按钮
		 */
		$form.on('click', '#run', function (e) {
			e.preventDefault();
			$form = $('#form-rigister');
			var checked = Q.pages.form_check();
			var $pwd;
			if (checked) {
				// $('#file').uploadify('upload')
			}
			
			
		});
		
		$('.pic-show').on('click', '.mover-next-ico', function (e) {
			e.preventDefault();
			var $container = $(this).parents('.pic-scroll').find('.pic-content-all');
			var $ceil = $container.find('.pic-item');
			var ceil_width = $ceil.width() + 30;
			var roll_num = 6;
			var i=0;
			var scroll = function () {
				var $first = $container.find('.pic-item:eq(0)');
				$first.animate({
					'margin-left' : ceil_width * -1
				}, 50, 'linear', function () {
					$container.find('.pic-item:last').after($first.clone().css('margin-left', 0));
					$first.remove();
					i++;
					if(i<roll_num){
						scroll();
					}
				});
			}
			scroll();
		});
		
		// 合买定制滚屏翻页-向后翻
		$('.pic-show').on('click', '.mover-pre-ico', function (e) {
			e.preventDefault();
			var $container = $(this).parents('.pic-scroll').find('.pic-content-all');
			var $ceil = $container.find('.pic-item');
			var ceil_width = $ceil.width() + 30;
			var roll_num = 6;
			var i=0;
			var scroll = function () {
				var $last = $container.find('.pic-item:last');
				$container.find('.pic-item:first').before($last.clone().css('margin-left', ceil_width*-1));
				$last.remove();
				$container.find('.pic-item:first').animate({
					'margin-left' : 0
				}, 50, 'linear', function () {
					i++;
					if(i<roll_num){
						scroll();
					}
				});
			}
			scroll();
		});
		
	};
	/**
	 * 页面加载结束执行
	 */
	$(function () {
		Q.pages.event();
	});
})(window);
