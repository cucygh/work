/**
 * @ignore  =====================================================================================
 * @fileoverview Javascript常用基础库
 * @author  cuc_ygh@163.com
 * @version 1.0.0
 * @ignore  created in 2013-10-11
 * @ignore  depend Library jQuery
 * @ignore  =====================================================================================
 */
;
(function (window, undefined) {
	var $ = window.jQuery,
	Q = window.pages || {};
	// 常用正则校验
	Q.reg = {
		mobile : function (input) {
			var reg_x = /^\d{11}$/gi;
			return reg_x.test(input);
		},
		card : function (input) {
			var reg_x = /^\d{15}|\d{18}$/gi;
			return reg_x.test(input);
		},
		phone : function (input) {
			var reg_x = /^\d{3}-\d{8}|\d{4}-\d{7}$/gi;
			return reg_x.test(input);
		},
		email : function (input) {
			var reg_x = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi;
			return reg_x.test(input);
		}
	};

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
	// 扩展pages
	window.pages = $.extend(true, window.pages || {}, Q);
})(window);
