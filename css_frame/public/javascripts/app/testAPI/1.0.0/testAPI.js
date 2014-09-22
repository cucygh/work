/**
 * @ignore  =====================================================================================
 * @fileoverview 服务器端测试接口
 * @author  cuc_ygh@163.com
 * @version 1.0.0
 * @ignore  created in 2014-09-19
 * @ignore  depend Library jQuery store.js json_format
 * @ignore  =====================================================================================
 */
;
(function (window, undefined) {
	var $ = window.jQuery,
	Q = window.Q || {};

	// 继承页面私有空间
	Q.pages = Q.pages || {};

	/**
	 * 功能函数-保存记录
	 */
	Q.pages.save = function (key, value) {
		var src_val = Q.store.get(key);
		if (src_val) {
			src_val = src_val.split(';');
			src_val.push(value);
			src_val = $.unique(src_val).join(';');
		} else {
			src_val = value;
		}
		Q.store.set(key, src_val);
	}
	/**
	 * 功能函数-获取记录
	 */
	Q.pages.get = function (key) {
		var src_val = Q.store.get(key);
		if (src_val) {
			src_val = src_val.split(';');
			for (var i = 0, len = src_val.length; i < len; i++) {
				src_val[i] = '<option>' + src_val[i] + '</option>';
			}
			$('#' + key).html(src_val.join(''));
		} else {
			$('#' + key).html('');
		}
	}

	/**
	 * 页面事件定义
	 */
	Q.pages.event = function () {
		/**
		 * 父级元素
		 */
		var $body = $('.body');

		/**
		 * 异步接口执行
		 */
		$body.on('click', '.run', function (e) {
			var host = $('#server').val().replace(/\/+$/g, ''); //服务器地址
			var url = $('#api').val(); //接口地址
			var abs_url;
			// 检测接口地址是否合法
			if (!/^\/[a-z0-9A-Z]+/g.test(url)) {
				alert('接口地址不合法');
				return false;
			}
			// 检测服务器地址是否合法
			if (/^[http:\/\/|https:\/\/|\/]/g.test(host)) {
				abs_url = host + url;
			} else {
				abs_url = url;
			}
			// 获取参数
			var param = $('#param').val();
			try {
				param = JSON.parse(param);
			} catch (err) {
				alert('参数格式错误，必须为严谨的JSON格式，即key和value都使用英文双引号');
				return false;
			}
			Q.ajax.post(abs_url, param, function (res) {
				if (host) {
					Q.pages.save('his-server', host);
				}
				if (url) {
					Q.pages.save('his-api', url);
				}
				if (param) {
					Q.pages.save('his-param-name', JSON.stringify(param));
				}
				$('#res-param').val(JSON.stringify(res));
				Q.pages.get('his-api');
				Q.pages.get('his-server');
				Q.pages.get('his-param-name');
			}, function (err) {
				alert('网络错误');
			})
		});
		/**
		 * 选择历史服务器地址
		 */
		$body.on('click', '#his-server', function (e) {
			var host = $(this).val();
			if (host) {
				$('#server').val(host);
			}
		});

		/**
		 * 选择历史接口地址
		 */
		$body.on('click', '#his-api', function (e) {
			var url = $(this).val();
			if (url) {
				$('#api').val(url);
			}
		});

		/**
		 * 选择历史参数
		 */
		$body.on('click', '#his-param-name', function (e) {
			var url = $(this).val();
			if (url) {
				$('#param').val(url);
			}
		});

		/**
		 * 清空记录
		 */
		$body.on('click', '.clear-all', function (e) {
			Q.store.clear();
			Q.pages.get('his-api');
			Q.pages.get('his-server');
		});

		/**
		 * 格式化JSON
		 */
		$body.on('click', '.format', function (e) {
			Process();
			$('#json-formated').show();
		});
		/**
		 * 上传文件
		 */
		$body.on('click', '.start-upload', function (e) {
			$('#file_upload').uploadify('upload');
		});

		/**
		 * 上传文件
		 */
		$('#file_upload').uploadify({
			'swf' : 'javascripts/gallery/upload/1.0.0/uploadify.swf',
			'uploader' : '/work/upload.do',
			// Put your options here
			auto : false,
			buttonText : '上传文件',
			formData : {
				'name' : '第一次心',
				'time' : '2014-09-19'
			}
		});
		
		
	}

	/**
	 * 页面加载结束执行
	 */
	$(function () {
		Q.pages.event();
		Q.pages.get('his-server');
		Q.pages.get('his-api');
		Q.pages.get('his-param-name');
	});

})(window);
