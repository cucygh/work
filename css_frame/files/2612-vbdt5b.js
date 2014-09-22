/**
 * @fileOverview ��Ʊ��Ŀ��ʹ�ø��ֻ�������
 * @author chengbingsheng chengbingsheng@360.cn
 * @version 0.0.1
 */
;( function() {
        //ʹ���ϸ�ģʽ
        "use strict"
        var $ = window.jQuery;
        //����Q���󣬶����������
        var Q = {
            version : '0.0.1',
            time_stamp : +new Date(),
            system : {}, ///һЩ�����ͨ������
            number : {}, //���ּ������
            date : {}, //����ʱ�����
            string : {}, //�ַ������
            cookie : {}, //cookie���
            pages : {} //��ҳ�漶��������ڴ˶�����
        };
        /**************************************************************************************************************
         *Q.system
         ***************************************************************************************************************/
        /**
         *���������ֻ����ʣ��򵥣����Ͻ�
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
         * @description ��ʽ������,С��λ���㱻0
         * @param {Number} num ����ʽ�������֡���ѡ��
         * @param {Number} decimal  С��λ����ѡ��
         * @param {Number} round ������� ��ѡֵΪ1��0��-1 ,465�ֱ��ʾ��ֻ�벻��ceil,��������round��ֻ�᲻��floor,������������˫����ѡ��
         * @return {String} ����ʽ������ַ����͵�����
         * @example Q.number.format(123.456,2,0);
         */
        Q.number.format = function(num, decimal, round) {
            var pow;
            decimal = typeof (decimal * 1) !== 'number' || isNaN(decimal * 1) ? 2 : Math.abs(decimal);
            pow = Math.pow(10, decimal);
            num *= 1;
            //f_num�����������⣬�ܱ�֤����10λС�����ڼ���õ��������
            var f_num = 0.000000000099999;
            switch (round) {
                case 1:
                    num = Math.ceil(num * pow) / pow;
                    break;
                case -1:
                    num = Math.floor(num * pow + f_num) / pow;
                    break;
                case 465:
                    //�����������˫,�籣����λС��������λС�������5���򿴵ڶ�λ����ż��������棬���λ��������ȥ
                    var is_jo = Math.floor(num * pow + f_num) % 10 % 2;
                    //Ҫ��λ�������Ƿ���5
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
         * @description �����ָ�ʽ���ɻ�����
         * @param {Number} num ����ʽ�������֡���ѡ��
         * @param {Number} decimal С��λ  Ĭ����λ����ѡ��
         * @param {Number} round  ������� ��ѡֵΪ1��0��-1
         * �ֱ��ʾ��ֻ�벻��ceil��������round��ֻ�᲻��floorĬ���������롾��ѡ��
         * @return {String} ���Ҹ�ʽ���ַ����͵�����
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
         * @description ��ʽ�ɰٷֱȣ����ݲ�������ʽ��һ�����İٷֱȻ���ǧ�ֱȵ�
         * @param {Number} num ����ʽ�������֡���ѡ��
         * @param {Number} percent ���ʣ���100���ǰٷֱȣ�1000����ǧ�ֱȣ�Ĭ�ϰٷֱȡ���ѡ��
         * @param {Number}  decimalС��λ��Ĭ����λ����ѡ��
         * @param {Number} round ��������ѡֵΪ1��0��-1�ֱ��ʾ��ֻ�벻��ceil��������round��ֻ�᲻��floorĬ��0����ѡ��
         * @return {String} �ٷֱ�,����%
         * @example Q.number.format(1/3,100,2,0)
         */
        Q.number.percent = function(num, percent, decimal, round) {
            return Q.number.format(num * 1 * (percent || 100), decimal, round);
        };
        /**
         * @description �����������m������ѡ��n���������������
         * @param {Number} m  ����������ѡ��
         * @param {Number} n ѡ������������ѡ��
         * @return {Number} �����
         * @example Q.number.combo(4,2)
         */
        Q.number.combo = function(m, n) {
            var v1, v2;
            //combo(11,9)>>combo(11,2)
            if (m / 2 < n) {
                n = m - n;
            }
            //����m,nΪ����
            if (m < n || n < 0) {
                return 0;
            }
            //����combo(3,0)==1
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
         * @description ������������������arr��ѡ��numa����õݹ飬������̫��ʱ����������
         * @param {Array} arr �������ѡ��
         * @param {Number} num ѡ������������ѡ��
         * @return {Array} ��������������
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
         * @description ��������ά���飬�������������
         * @param {Array} arr ��ά����  �磺[[1,2,3],[4,5,6]]����ѡ��
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
         * @description �������� ����m������ѡ��n���������������
         * @param {Bumber} m ����������ѡ��
         * @param {Number} n ѡ������������ѡ��
         * @return {Number} ������
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
         * @description �������������������arr��ѡ��numa����õݹ飬������̫��ʱ����������
         * @param {Array} arr �������ѡ��
         * @param {Number} num ѡ������������ѡ��
         * @return {Array} ��������������
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
         * @description ����Ȼ��n-m�ķ�Χ���ѡ��k��z��������Ҫ���ڲ�Ʊ�е����ѡ��
         * @param {Object} options �������
         * @param {Number} options.min ��Χ��Сֵ
         * @param {Number} options.max ��Χ���ֵ
         * @param {Array} options.share ���룬���ָ�������ÿһ���ﶼ�����������ڵ�Ԫ�ء���ѡ��
         * @param {Array} options.shahao ɱ�ţ����ָ�������ÿһ���ﶼ��������������ڵ�Ԫ�ء���ѡ��
         * @param {Number} options.size ����ĸ���
         * @param {Number} options.count �����������һ����options.size��Ĭ��Ϊһ�顾��ѡ��
         * @param {Boolean} options.repeat �Ƿ�����ظ� Ĭ�ϲ��ظ�����ѡ��
         * @param {Boolean} options.sort �Ƿ����� Ĭ�ϲ����򡾿�ѡ��
         * @param {Boolean} options.repeat_team �����һ��ʱ�������Ƿ�����ظ���Ĭ�Ͽ��ԡ���ѡ��
         * @return {Array} �磺[[1,3,4],[3,4,6]]
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
                if (l > 0 && options.max > 9) {//�е���Ϊ��λ�����ϣ�ǰ�油��
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
         * �������Ƿ�Ϊ����
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
         * @description �����ڶ����ʽ���ַ�����ʽ
         * @example Q.date.format(new Date())
         * @param {Date/Number} date ʱ�ڶ������Date.getTime()�õ���ʱ��������ѡ��
         * @param {String} format_style ��ʽ����ʽ��Ĭ��ΪYYYY-MM-DD hh:mm:ss����ѡ��
         * ���Զ��塣YYYY��λ��ݣ�YY��λ��֣�MM�·ݣ�DD�죬hhСʱ��mm���֣�ss��
         * @return {String} ��ʽ������ַ���
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
         * @description �������ַ���ת�����ڶ���
         * @example Q.date.to_date('2011-09-09 12:12:12')
         * @param {String} dateStr ʱ���ַ�����ֻ֧�ֹ������ڸ�ʽ����2011-6-12 12:15:20����ѡ��
         * @return {Date} ת����ʱ�����
         */
        Q.date.to_date = function(dateStr) {
            var str, date, time;
            str = $.trim(dateStr).split(' ');
            date = str[0].split(/[\-\/]/);
            time = str[1] ? str[1].split(':') : [0, 0, 0];
            return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        };
		
		/**
        * description �������ַ���ת�����ڶ���
        * @param dateStr {String}  dateStr ʱ���ַ�����ֻ֧�ֹ������ڸ�ʽ����2011-6-12��20110612����ѡ��
        * @ignore created  yinguohui@360.cn
        * @return date {Date} ת����ʱ�����
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
         * @description ��ȡ�����������е��ܼ�
         * @example Q.date.getWeekText("20140522")
         * @param {String} dateStr ʱ���ַ�����ֻ֧��8λ���������ڻ�������ڸ�ʽ����2011-06-12 2011/06/12����ѡ��
         * @return {String} �����������ڵ��ܼ�
         */
        Q.date.get_week_text = function(dateStr) {
            dateStr = dateStr.replace(/[\-\/]/g, "");
            var d = new Date(dateStr.substr(0, 4) * 1, dateStr.substr(4, 2) * 1 - 1, dateStr.substr(6, 2) * 1);
            var wi = d.getDay();
            var weeks = ["����", "��һ", "�ܶ�", "����", "����", "����", "����"];
            return weeks[wi];
        };
        /**************************************************************************************************************
         *Q.string
         ***************************************************************************************************************/
        /**
         * @description �����ַ������ȣ������ַ�������
         * @example Q.string.len('adf2asd�й�')
         * @param {String} str �ַ�������ѡ��
         * @return {Number} �ַ����ĳ���
         */
        Q.string.len = function(str) {
            return str.replace(/[^\x00-\xff]/g, "--").length;
        };
        /**
         * @description ���ַ�����ȡָ���ĳ��ȣ������ַ�������,���ȡ������֮��һ�룬������������
         * @example Q.string.cut('adf2asd�й�',5,'')
         * @param {String} str ����ȡ���ַ�������ѡ��
         * @param {Number} len Ҫ��ȡ�ĳ��ȡ���ѡ��
         * @param {String} ext ����ָ�����Ⱥ�ĺ�׺��Ĭ��Ϊ�ա���ѡ��
         * @return {String} ��ȡ����ַ���
         */
        Q.string.cut = function(str, len, ext) {
            ext = ext || '';
            if (Q.string.len(str) <= len - ext.length) {
                return str;
            }
            len -= ext.length;
            //˫�ֽ��ַ��滻������//ȥ���ٽ�˫�ֽ��ַ�//��ԭ
            return str.substr(0, len).replace(/([^\x00-\xff])/g, "$1 ").substr(0, len).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1") + ext;
        };
        /**
         * @description ȡ��URL��ָ��������ֵ�����װ棬���������û������,�磬���ͬ����������������һ��URL��
         * @example Q.string.get_url_param('par','http://mm.cn?par=test')
         * @param {String} name �������ַ���,�����#��ȡhash�е�ֵ����ѡ��
         * @param {String} url URL����ѡ�� Ĭ��Ϊ��ǰҳ���URL
         * @return {String} ָ��������ֵ
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
         * @description �����滻
         * @param {String} str ���滻���ַ��� ����ѡ��
         * @param {Array} arr �滻���� ����ѡ��
         * @return {String} �滻����ַ���
         * @example Q.string.mul_replace('test',[['t','h'],['st','llo']]);
         */
        Q.string.mul_replace = function(str, arr) {
            for (var i = 0, l = arr.length; i < l; i++) {
                str = str.replace(arr[i][0], arr[i][1]);
            }
            return str;
        };
        /**
         * @description ��ȫ������,�ո񣬾��ת���ɰ��
         * @param {String} str ��ת�����ַ��� ����ѡ��
         * @return {Stirng} �滻����ַ���
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
         * @description �õ�ָ����cookieֵ
         * @example Q.cookie.get('name')
         * @param {String} name cookie���ơ���ѡ��
         * @param {Boolean} encode �Ƿ�encodeURIComponent Ĭ��false����ѡ��
         * @return ָ��cookie��ֵ
         */
        Q.cookie.get = function(name, encode) {
            var m = document.cookie.match(new RegExp("(^| )" + name + "=([^;])*", "gi")), v = !m ? '' : m[0].split(name + '=')[1];
            return (!!encode ? v : decodeURIComponent(v));
        };
        /**
         * @description set����cookie, delɾ��cookie,��expiresС��0ʱ��Ϊɾ��cookie
         * @param {Object} options={name:,value:,expires:,domain:,path:,secure:,encode:}����ѡ��
         * @param {String} name cookie�����ơ���ѡ��
         * @param {String} value cookie��ֵ����ѡ��
         * @param {Number} expires cookie�Ĺ���ʱ�䣬Ϊ��������λΪ�죬Ϊ��ʱɾ��cookie����ѡ��
         * @param {String} domain  ָ��cookie�������򡾿�ѡ��
         * @param {String} path  ָ��cookie ��·������ѡ��
         * @param {Boolean} secure  �Ƿ�ȫ���� ��Э��Ϊhttpsʱ�ſ��á���ѡ��
         * @param {Boolean} encode  �Ƿ��ֵ����encodeURIComponent����ѡ��
         */
        Q.cookie.set = Q.cookie.del = function(options) {
            var ck = [];
            ck.push(options.name + '=');
            if (options.value) {
                ck.push(!!options.encode ? options.value : encodeURIComponent(options.value));
                //�Ƿ�encodeURIComponent
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
