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
	
	
	
	// 扩展pages
	window.pages=$.extend(true,window.pages||{},Q);
})(window);
