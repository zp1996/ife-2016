define([], function () {
	/**
	 * 简易选择器
	 * @param  string
	 * @return htmlElement || htmlCollection
	 * @zp
	 */     
	var $ = function (str) {
		var temp = "#.".indexOf(str[0]) === -1 ? "tag" : str[0];
		if (strategy.hasOwnProperty(str[0])) {
			str = str.substr(1);
		}
		return strategy[temp](str);
	};
	var strategy = {
		"#": function (str) {
			return document.getElementById(str);
		},
		".": function (str) {
			return document.getElementsByClassName(str);
		},
		tag: function (str) {
			return document.getElementsByTagName(str);
		}
	};
	/**
	 * 生成角度值
	 * @param  作用对象
	 * @return number
	 * @zp
	 */ 
	$.rotate = function (ele) {
		var rotate = ele.style.transform;
		if (rotate) {
			var result = /rotate\((\-?\d*(\.?\d*)?)deg\)/.exec(rotate)[1];
			return result > 0 ? Math.ceil(result) : Math.floor(result);
		} else {
			return 0;
		}
	};
	/**
	 * 转向函数
	 * @param  作用对象,度数
	 * @return void 0 
	 * @zp
	 */ 
	$.turn = function (ele, deg, rotate) {
		var
			end =  rotate + deg,
			start = 0,
			speed = 0,
			timer = setInterval(function () {
				if (Math.abs(start) - Math.abs(deg) > -1) {
					ele.style.transform = "rotate(" + end + "deg)";
					clearInterval(timer);
					timer = null;
					return void 0;
				}
				speed = (deg - start) / 5;
				start += speed;
				ele.style.transform = "rotate(" + (rotate + start) + "deg)";
			}, 20);
	};
	return $;
});