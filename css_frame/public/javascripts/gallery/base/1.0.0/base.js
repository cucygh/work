/**
 * @ignore  =====================================================================================
 * @fileoverview Javascript常用基础库
 * @author  cuc_ygh@163.com
 * @version 1.0.0
 * @ignore  created in 2014-09-09
 * @ignore  depend Library jQuery
 * @ignore  =====================================================================================
 */
;
(function (window, undefined) {
	var $ = window.jQuery,
	Q = window.Q || {};
	/**
	 * 常用正则校验
	 */
	Q.reg = {
		/**
		 * 验证是否为手机
		 * @param input {String}
		 * @return result {Boolean}
		 */
		mobile : function (input) {
			var reg_x = /^1[3|4|5|8][0-9]\d{4,8}$/gi;
			return reg_x.test(input);
		},
		/**
		 * 验证是否为身份证
		 * @param input {String}
		 * @return result {Boolean}
		 */
		card : function (input) {
			var reg_x = /^\d{15}|\d{18}$/gi;
			return reg_x.test(input);
		},
		/**
		 * 验证是否为固话
		 * @param input {String}
		 * @return result {Boolean}
		 */
		phone : function (input) {
			var reg_x = /^\d{3}-\d{8}|\d{4}-\d{7}$/gi;
			return reg_x.test(input);
		},
		/**
		 * 验证是否为邮箱
		 * @param input {String}
		 * @return result {Boolean}
		 */
		email : function (input) {
			var reg_x = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi;
			return reg_x.test(input);
		},
		/**
		 * 验证是否为工商注册号
		 * @param input {String}
		 * @return result {Boolean}
		 */
		registr : function (input) {
			var reg_x = /^\d{15}$/gi;
			return reg_x.test(input);
		}

	};
	/**
	 * 日期处理
	 */
	Q.date = {
		/**
		 * @description 把日期字符串转成日期对象
		 * @example Q.date.to_date('2011-09-09 12:12:12')
		 * @param {String} dateStr 时期字符串，只支持国内日期格式，如2011-6-12 12:15:20【必选】
		 * @return {Date} 转化后时间对象
		 */
		to_date : function (input) {
			var str,
			date,
			time;
			str = $.trim(input).split(' ');
			date = str[0].split(/[\-\/]/);
			time = str[1] ? str[1].split(':') : [0, 0, 0];
			return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
		}
	}

	/**
	 * 密码管理
	 */
	Q.pwd = {
		level : function (input) {
			var complex = 0;
			var length = input.length;
			var pre = '';
			var preType = 0;
			var gettype = function (str, i) {
				if (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) {
					return 1;
				} else if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) {
					return 2;
				} else if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
					return 3;
				}
				return 4;
			};
			var isregular = function (cur, pre, type) {
				var curCode = cur.charCodeAt(0);
				var preCode = pre.charCodeAt(0);
				if (curCode - preCode == 0) {
					return true;
				}
				if (type != 4 && (curCode - preCode == 1 || curCode - preCode == -1)) {
					return true;
				}
				return false;
			}
			var getcomplex = function (curType, preType) {
				if (preType == 0 || curType == preType) {
					return 0;
				} else if (curType == 4 || preType == 4) {
					return 2;
				} else {
					return 1;
				}
			}
			for (var i = 0; i < length; i++) {
				var cur = input.charAt(i);
				var curType = gettype(input, i);
				if (preType != curType || !isregular(cur, pre, curType)) {
					complex += curType + getcomplex(curType, preType);
				}
				pre = cur;
				preType = curType;
			}
			return complex;
		}
	}
	/**
	 * cookie管理
	 */
	Q.cookie = {
		/**
		 * @description set设置cookie, del删除cookie,当expires小于0时即为删除cookie
		 * @param {Object} options={name:,value:,expires:,domain:,path:,secure:,encode:}【必选】
		 * @param {String} name cookie的名称【必选】
		 * @param {String} value cookie的值【必选】
		 * @param {Number} expires cookie的过期时间，为整数，单位为天，为负时删除cookie【可选】
		 * @param {String} domain  指定cookie所属的域【可选】
		 * @param {String} path  指定cookie 的路径【可选】
		 * @param {Boolean} secure  是否安全传输 当协议为https时才可用【可选】
		 * @param {Boolean} encode  是否对值进行encodeURIComponent【可选】
		 */
		set : function (options) {
			var ck = [];
			ck.push(options.name + '=');
			if (options.value) {
				ck.push(!!options.encode ? options.value : encodeURIComponent(options.value));
				//是否encodeURIComponent
			}
			if (options.expires) {
				var d = new Date();
				d.setHours(0);
				d.setMinutes(0);
				d.setSeconds(0);
				d.setTime(d.getTime() + options.expires * 86400000);
				//24 * 60 * 60 * 1000
				ck.push(';expires=' + d.toGMTString());
			}
			if (options.domain) {
				ck.push(';domain=' + options.domain);
			}
			ck.push(';path=' + (options.path || '/'));
			if (options.secure) {
				ck.push(';secure');
			}
			document.cookie = ck.join('');
		},
		/**
		 * @description 得到指定的cookie值
		 * @example Q.cookie.get('name')
		 * @param {String} name cookie名称【必选】
		 * @param {Boolean} encode 是否encodeURIComponent 默认false【可选】
		 * @return 指定cookie的值
		 */
		get : function (name, encode) {
			var m = document.cookie.match(new RegExp("(^| )" + name + "=([^;])*", "gi")),
			v = !m ? '' : m[0].split(name + '=')[1];
			return (!!encode ? v : decodeURIComponent(v));
		}
	}

	// 扩展pages
	window.Q = $.extend(true, window.Q || {}, Q);
})(window);
