/**
 * @ignore  =====================================================================================
 * @fileoverview 专题页面
 * @author  cuc_ygh@163.com
 * @version 1.0.0
 * @ignore  created in 2014-10-23
 * @ignore  depend Library jQuery
 * @ignore  =====================================================================================
 */
;
(function (window, undefined) {
	var $ = window.jQuery,
	Q = window.Q || {};

	// 继承页面私有空间
	Q.pages = Q.pages || {};

	/**
	 * 页面事件定义
	 */
	Q.pages.event = function () {
		var slider = new IdealImageSlider.Slider('#slider');
		slider.addCaptions();
		slider.start();
	}

	/**
	 * 页面加载结束执行
	 */
	$(function () {
		Q.pages.event();
	});

})(window);
