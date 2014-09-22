/**
 * @fileOverview 彩票项目中使用各种基础函数
 * @author chengbingsheng chengbingsheng@360.cn
 * @version 0.0.1
 */
;( function() {
        //使用严格模式
        "use strict"
        var $ = window.jQuery;
        //定义Q对象，定义二级对象
        var Q = {
            version : '0.0.1',
            time_stamp : +new Date(),
            system : {}, ///一些浏览器通用内容
            number : {}, //数字计算相关
            date : {}, //日期时间相关
            string : {}, //字符串相关
            cookie : {}, //cookie相关
            pages : {} //供页面级代码均挂在此对象下
        };
        /**************************************************************************************************************
         *Q.system
         ***************************************************************************************************************/
        /**
         *常见智能手机访问，简单，不严谨
         */
        Q.system.is_mobile = ( function() {
                var UA = window.navigator.userAgent;
                var len = UA.length;
                var l = UA.replace(/iphone|ipad mini|ipad|ipod|android|Series60|BlackBerry|Windows Phone/gi, '').length;
                return l !== len;
            }());
        /**************************************************************************************************************
         *Q.number
         ***************************************************************************************************************/
        /**
         * @description 格式化数字,小数位不足被0
         * @param {Number} num 被格式化的数字【必选】
         * @param {Number} decimal  小数位【可选】
         * @param {Number} round 如何舍入 可选值为1，0，-1 ,465分别表示：只入不舍ceil,四舍五入round，只舍不入floor,四舍六入五留双【可选】
         * @return {String} 被格式化后的字符串型的数字
         * @example Q.number.format(123.456,2,0);
         */
        Q.number.format = function(num, decimal, round) {
            var pow;
            decimal = typeof (decimal * 1) !== 'number' || isNaN(decimal * 1) ? 2 : Math.abs(decimal);
            pow = Math.pow(10, decimal);
            num *= 1;
            //f_num处理浮点数问题，能保证保留10位小数以内计算得到正常结果
            var f_num = 0.000000000099999;
            switch (round) {
                case 1:
                    num = Math.ceil(num * pow) / pow;
                    break;
                case -1:
                    num = Math.floor(num * pow + f_num) / pow;
                    break;
                case 465:
                    //四舍六入五成双,如保留两位小数，第三位小数如果是5，则看第二位是奇偶，如果是奇，则进位，否则舍去
                    var is_jo = Math.floor(num * pow + f_num) % 10 % 2;
                    //要进位上数字是否是5
                    var is_five = Math.floor(num * pow * 10 + f_num) % 10 == 5;
                    var step = is_five && !is_jo ? 1 / pow : 0;
                    num = Q.number.format(num, decimal) - step;
                    break;
                default:
                    num = (num * pow + f_num) / pow;
            }
            return (num.toFixed(decimal) + '').replace(/^\./g, '0.').replace(/\.$/, '');
        };
        /**
         * @description 把数字格式化成货币型
         * @param {Number} num 被格式化的数字【必选】
         * @param {Number} decimal 小数位  默认两位【可选】
         * @param {Number} round  如何舍入 可选值为1，0，-1
         * 分别表示：只入不舍ceil四舍五入round，只舍不入floor默认四舍五入【可选】
         * @return {String} 货币格式的字符串型的数字
         * @example Q.number.currency(1234567.456,2,0)=>1,234,567.46
         */
        Q.number.currency = function(num, decimal, round) {
            var arr;
            if ( typeof decimal !== 'undefined') {
                num = Q.number.format(num, decimal, round);
            }
            arr = (num + '').split('.');
            arr[0] = arr[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
            return (arr[0] + (arr.length == 2 ? '.' + arr[1] : '')).replace(/^\./g, '0.');
        };
        /**
         * @description 格式成百分比，根据参数来格式化一个数的百分比或是千分比等
         * @param {Number} num 被格式化的数字【必选】
         * @param {Number} percent 比率，如100则是百分比，1000则是千分比，默认百分比【可选】
         * @param {Number}  decimal小数位，默认两位【可选】
         * @param {Number} round 如何舍入可选值为1，0，-1分别表示：只入不舍ceil四舍五入round，只舍不入floor默认0【可选】
         * @return {String} 百分比,不带%
         * @example Q.number.format(1/3,100,2,0)
         */
        Q.number.percent = function(num, percent, decimal, round) {
            return Q.number.format(num * 1 * (percent || 100), decimal, round);
        };
        /**
         * @description 求组合数，从m个项中选出n个项的无序排列数
         * @param {Number} m  总项数【必选】
         * @param {Number} n 选出的项数【必选】
         * @return {Number} 组合数
         * @example Q.number.combo(4,2)
         */
        Q.number.combo = function(m, n) {
            var v1, v2;
            //combo(11,9)>>combo(11,2)
            if (m / 2 < n) {
                n = m - n;
            }
            //处理m,n为负数
            if (m < n || n < 0) {
                return 0;
            }
            //处理combo(3,0)==1
            if (m >= 0 && n === 0) {
                return 1;
            }
            v1 = 1;
            v2 = m;
            for (var i = 1; i <= n; i++) {
                v1 *= i;
                if (i < n) {
                    v2 *= (m - i);
                }
            }
            return v2 / v1;
        };
        /**
         * @description 遍历所有组合项，从数组arr中选出numa项，采用递归，数据量太大时有性能问题
         * @param {Array} arr 所有项【必选】
         * @param {Number} num 选出的项数【必选】
         * @return {Array} 所有组合项的数组
         * @example Q.number.each_combo([1,2,3],2)
         */
        Q.number.each_combo = function(arr, num) {
            var r = [];
            (function f(t, a, n) {
                if (n === 0) {
                    return r.push(t);
                }
                for (var i = 0, l = a.length; i <= l - n; i++) {
                    f(t.concat(a[i]), a.slice(i + 1), n - 1);
                }
            })([], arr, num);
            return r;
        };
        /**
         * @description 给定个二维数组，遍历所以组合项
         * @param {Array} arr 二维数组  如：[[1,2,3],[4,5,6]]【必选】
         * @return {Array} [[1,4],[1,5,[1,6],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6]]
         */
        Q.number.each_array_combo = function(arr) {
            var idx = 0;
            var len = arr.length;
            var result = [];
            var tmp;
            var tmpArr = [];
            tmpArr.push(arr);
            (function each(arr) {
                var tmpArr = [];
                for (var i = 0, l = arr.length; i < l; i++) {
                    for (var j = 0, jl = arr[i][idx].length; j < jl; j++) {
                        tmp = [].concat(arr[i]);
                        tmp.splice(idx, 1, arr[i][idx][j]);
                        tmpArr.push(tmp);
                    }
                }
                idx++;
                if (idx < len) {
                    each(tmpArr);
                } else {
                    result = tmpArr;
                    return;
                }
            })(tmpArr);
            return result;
        };
        /**
         * @description 求排列数 ，从m个项中选出n个项的有序排列数
         * @param {Bumber} m 总项数【必选】
         * @param {Number} n 选出的项数【必选】
         * @return {Number} 排列数
         * @example Q.number.permutation(4,2)
         */
        Q.number.permutation = function(m, n) {
            var v = 1;
            if (m < n || n < 0) {
                return 0;
            }
            for (var i = 0; i < n; i++) {
                v *= (m - i);
            }
            return v;
        };
        /**
         * @description 遍历所有排列项，从数组arr中选出numa项，采用递归，数据量太大时有性能问题
         * @param {Array} arr 所有项【必选】
         * @param {Number} num 选出的项数【必选】
         * @return {Array} 所有排列项数组
         * @example Q.number.each_permutation([1,2,3],2)
         */
        Q.number.each_permutation = function(arr, num) {
            var r = [];
            (function f(t, a, n) {
                if (n === 0) {
                    return r.push(t);
                }
                for (var i = 0, l = a.length; i < l; i++) {
                    f(t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1);
                }
            })([], arr, num);
            return r;
        };
        /**
         * @description 从自然数n-m的范围随机选出k组z个数，主要用于彩票中的随机选号
         * @param {Object} options 对象参数
         * @param {Number} options.min 范围最小值
         * @param {Number} options.max 范围最大值
         * @param {Array} options.share 胆码，如果指定，随机每一组里都包含该数组内的元素【可选】
         * @param {Array} options.shahao 杀号，如果指定，随机每一组里都不会包含该数组内的元素【可选】
         * @param {Number} options.size 随机的个数
         * @param {Number} options.count 随机的组数，一组是options.size个默认为一组【可选】
         * @param {Boolean} options.repeat 是否可以重复 默认不重复【可选】
         * @param {Boolean} options.sort 是否排序 默认不排序【可选】
         * @param {Boolean} options.repeat_team 如果是一组时，组内是否可以重复，默认可以【可选】
         * @return {Array} 如：[[1,3,4],[3,4,6]]
         */
        Q.number.random = function(options_p) {
            var options = {
                min : 0,
                max : 9,
                share : [],
                shahao : [],
                size : 1
            };
            $.extend(options, options_p);
            options.count = options.count || 1;
            var one_random = function(options) {
                var ar, tmp, k = 0, ml, l;
                var pre_str = '0000000000000000';
                ml = (options.max + '').length;
                ar = (options.share || []).toString();
                ar = ar === '' ? [] : ar.split(/[,\-_=+\|]/);
                l = ar.length;
                if (l > 0 && options.max > 9) {//有胆且为两位数以上，前面补零
                    for (var i = 0; i < l; i++) {
                        if (ar[i].length < ml) {
                            ar[i] = pre_str.substr(0, ml - ar[i].length) + ar[i];
                        }
                    }
                }
                while (k < options.size) {
                    tmp = (Math.floor(Math.random() * (options.max - options.min + 1)) + options.min) + '';
                    tmp = pre_str.substr(0, ml - tmp.length) + tmp;
                    if (options.repeat || (!options.repeat) && $.inArray(tmp, ar) == -1 && $.inArray(tmp, options.shahao || []) == -1) {
                        ar.push(tmp);
                        k++;
                    }
                }
                if (!!options.sort) {
                    ar.sort();
                }
                return typeof options.split_str !== 'undefined' ? ar.join(options.split_str) : ar;
            };
            var result = [];
            var count = Q.number.combo(options.max - options.min + 1 - options.share.length - options.shahao.length, options.size);
            if (count < options.count) {
                options.repeat_team = 1;
            }
            for (var i = 0; i < options.count; i++) {
                var re_tmp = one_random(options);
                if (!options.repeat_team) {
                    var re_len = result.length;
                    var flag = 0;
                    for (var j = 0; j < re_len; j++) {
                        if (result[j].toString() == re_tmp.toString()) {
                            flag = 1;
                            break;
                        }
                    }
                    if (flag) {
                        i--;
                    } else {
                        result.push(re_tmp);
                    }
                } else {
                    result.push(re_tmp);
                }
            }
            return result;
        };
        /**
         *
         */
        Q.number.to_number = function(val) {
            val = val - 0;
            val = isNaN(val) ? 0 : val;
            return val;
        };

        Q.number.pass_key = function(e) {
            return $.inArray(e.keyCode, [8, 16, 17, 37, 38, 39, 40, 46, 67]) >= 0;
        };
        /**
         * 检测号码是否为连号
         * @param arr {Array}
         * @ignore created
         * @return result {Boolean}
         */
        Q.number.is_seq = function(arr) {
            var _arr = [].concat(arr), i, len;
            _arr.sort(function(a, b) {
                return a - b
            });
            for ( i = 0, len = _arr.length; i < len - 1; i++) {
                if (_arr[i + 1] - _arr[i] == 1) {
                    return true;
                }
            }
            if (arr.length < 2) {
                return false;
            }
            return false;
        }
        /**************************************************************************************************************
         *Q.date
         ***************************************************************************************************************/
        /**
         * @description 把日期对象格式化字符串格式
         * @example Q.date.format(new Date())
         * @param {Date/Number} date 时期对象或由Date.getTime()得到的时间数【必选】
         * @param {String} format_style 格式化样式，默认为YYYY-MM-DD hh:mm:ss【可选】
         * 可自定义。YYYY四位年份，YY两位年分，MM月份，DD天，hh小时，mm分种，ss秒
         * @return {String} 格式化后的字符串
         */
        Q.date.format = function(date, format_style) {
            var YYYY, YY, MM, DD, hh, mm, ss;
            date = typeof date == 'object' ? date : new Date(date * 1);
            format_style = format_style || 'YYYY-MM-DD hh:mm:ss';
            YYYY = date.getFullYear();
            MM = date.getMonth() + 1;
            DD = date.getDate();
            hh = date.getHours();
            mm = date.getMinutes();
            ss = date.getSeconds();
            YY = (YYYY + '').replace(/^\d\d/g, '');
            MM = MM < 10 ? '0' + MM : MM;
            DD = DD < 10 ? '0' + DD : DD;
            hh = hh < 10 ? '0' + hh : hh;
            mm = mm < 10 ? '0' + mm : mm;
            ss = ss < 10 ? '0' + ss : ss;
            return Q.string.mul_replace(format_style, [[/YYYY/, YYYY], [/YY/, YY], [/MM/, MM], [/DD/, DD], [/hh/, hh], [/mm/, mm], [/ss/, ss]]);
        };
        /**
         * @description 把日期字符串转成日期对象
         * @example Q.date.to_date('2011-09-09 12:12:12')
         * @param {String} dateStr 时期字符串，只支持国内日期格式，如2011-6-12 12:15:20【必选】
         * @return {Date} 转化后时间对象
         */
        Q.date.to_date = function(dateStr) {
            var str, date, time;
            str = $.trim(dateStr).split(' ');
            date = str[0].split(/[\-\/]/);
            time = str[1] ? str[1].split(':') : [0, 0, 0];
            return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        };
		
		/**
        * description 把日期字符串转成日期对象
        * @param dateStr {String}  dateStr 时期字符串，只支持国内日期格式，如2011-6-12或20110612【必选】
        * @ignore created  yinguohui@360.cn
        * @return date {Date} 转化后时间对象
        */
		Q.date.get_date = function (dateStr) {
			var regExp = /^\s*(\d{4})-?(\d\d)-?(\d\d)\s*$/,
			date = new Date(NaN),
			month,
			parts = regExp.exec(dateStr);
			if (parts) {
				month = +parts[2];
				date.setFullYear(parts[1], month - 1, parts[3]);
				if (month != date.getMonth() + 1) {
					date.setTime(NaN);
				}
			}
			return date;
		};
		
        /**
         * @description 获取日期在星期中的周几
         * @example Q.date.getWeekText("20140522")
         * @param {String} dateStr 时期字符串，只支持8位纯数字日期或国内日期格式，如2011-06-12 2011/06/12【必选】
         * @return {String} 返回日期所在的周几
         */
        Q.date.get_week_text = function(dateStr) {
            dateStr = dateStr.replace(/[\-\/]/g, "");
            var d = new Date(dateStr.substr(0, 4) * 1, dateStr.substr(4, 2) * 1 - 1, dateStr.substr(6, 2) * 1);
            var wi = d.getDay();
            var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            return weeks[wi];
        };
        /**************************************************************************************************************
         *Q.string
         ***************************************************************************************************************/
        /**
         * @description 计算字符串长度，中文字符算两个
         * @example Q.string.len('adf2asd中国')
         * @param {String} str 字符串【必选】
         * @return {Number} 字符串的长度
         */
        Q.string.len = function(str) {
            return str.replace(/[^\x00-\xff]/g, "--").length;
        };
        /**
         * @description 从字符串截取指定的长度，中文字符算两个,如果取到中文之符一半，则舍掉这个中文
         * @example Q.string.cut('adf2asd中国',5,'')
         * @param {String} str 被截取的字符串【必选】
         * @param {Number} len 要截取的长度【必选】
         * @param {String} ext 超过指定长度后的后缀，默认为空【可选】
         * @return {String} 截取后的字符串
         */
        Q.string.cut = function(str, len, ext) {
            ext = ext || '';
            if (Q.string.len(str) <= len - ext.length) {
                return str;
            }
            len -= ext.length;
            //双字节字符替换成两个//去掉临界双字节字符//还原
            return str.substr(0, len).replace(/([^\x00-\xff])/g, "$1 ").substr(0, len).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1") + ext;
        };
        /**
         * @description 取得URL中指定参数的值，简易版，复杂情况下没做考虑,如，多个同名参数，参数又是一个URL等
         * @example Q.string.get_url_param('par','http://mm.cn?par=test')
         * @param {String} name 参数名字符串,如果带#则取hash中的值【必选】
         * @param {String} url URL【可选】 默认为当前页面的URL
         * @return {String} 指定参数的值
         */
        Q.string.get_url_param = function(name, url) {
            var m, reg, tmp;
            url = (url || window.location.href).toLowerCase().split('#');
            if (name.indexOf('#') != -1) {
                tmp = url.length < 2 ? '' : url[1];
            } else {
                tmp = url[0];
            }
            m = tmp.match(new RegExp('(|[?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'));
            if (m) {
                return decodeURIComponent(m[0].split('=')[1]);
            } else {
                return '';
            }
        };
        /**
         * @description 批量替换
         * @param {String} str 被替换的字符串 【必选】
         * @param {Array} arr 替换规则 【必选】
         * @return {String} 替换后的字符串
         * @example Q.string.mul_replace('test',[['t','h'],['st','llo']]);
         */
        Q.string.mul_replace = function(str, arr) {
            for (var i = 0, l = arr.length; i < l; i++) {
                str = str.replace(arr[i][0], arr[i][1]);
            }
            return str;
        };
        /**
         * @description 把全角数字,空格，句号转换成半角
         * @param {String} str 被转换的字符串 【必选】
         * @return {Stirng} 替换后的字符串
         */
        Q.string.dbc_to_sbc = function(str) {
            return Q.string.mul_replace(str, [[/[\uff01-\uff5e]/g,
            function(a) {
                return String.fromCharCode(a.charCodeAt(0) - 65248);
            }], [/\u3000/g, ' '], [/\u3002/g, '.']]);
        };
        /**************************************************************************************************************
         *Q.cookie
         ***************************************************************************************************************/
        /**
         * @description 得到指定的cookie值
         * @example Q.cookie.get('name')
         * @param {String} name cookie名称【必选】
         * @param {Boolean} encode 是否encodeURIComponent 默认false【可选】
         * @return 指定cookie的值
         */
        Q.cookie.get = function(name, encode) {
            var m = document.cookie.match(new RegExp("(^| )" + name + "=([^;])*", "gi")), v = !m ? '' : m[0].split(name + '=')[1];
            return (!!encode ? v : decodeURIComponent(v));
        };
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
        Q.cookie.set = Q.cookie.del = function(options) {
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
        };
        //**************************************************************************************************************
        window.Q = window.qh360cp = Q;
    }());
