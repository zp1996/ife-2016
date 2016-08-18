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
	 * 获取css
	 * @param  element(元素),key(需要得的属性)
	 * @return string value
	 * @zp
	 */ 
	$.getCss = function (element, key) {
		return element.currentStyle ? element.currentStyle[key] : 	
		 			 document.defaultView.getComputedStyle(element, null)[key];
	};
	/**
	 * 绑定事件
	 * @param  element(元素),type(事件类型),handler(处理函数)
	 * @return void 0
	 * @zp
	 */ 
	$.addHandler = function (w) {
		if (w.addEventListener) {
			return function (element, type, handler) {
				element.addEventListener(type, handler, false);
			}
		} else if (w.attachEvent) {
			return function (element, type, handler) {
				element.attachEvent("on" + type, handler);
			}
		} else {
			return function (element, type, handler) {
				element["on" + type] = handler;
			}
		}
	}(window);	
	/**
	 * 移除事件
	 * @param  element(元素),type(事件类型),handler(处理函数)
	 * @return void 0
	 * @zp
	 */
	$.removeHandler = function (w) {
		if (w.removeEventListener) {
			return function (ele, type, handler) {
				ele.removeEventListener(type, handler, false);
			}
		} else if (w.detachEvent) {
			return function (ele, type, handler) {
				ele.detachEvent("on" + type, handler);
			}
		} else {
			return function (ele, type, handler) {
				ele["on" + type] = null;
			}
		}
	}(window);
	/**
	 * 扩展对象属性
	 * @param  作用对象,扩展对象
	 * @return void 0
	 * @zp
	 */ 
	$.extend = function (obj, supple) {
		for (var i in supple) {
			obj[i] = supple[i];
		}
	};
	/**
	 * 在函数前执行函数breforefun
	 * @param  function,object
	 * @return void 0
	 * @zp
	 */
	Function.prototype.brefore = function (breforefun, obj) {
		var _self = this;
		return function () {
			var bindObj = obj || this;
			breforefun.apply(bindObj, arguments);
			return _self.apply(bindObj, arguments);
		};
	};
	/**
	 * 在函数后执行函数afterfun
	 * @param  function,object
	 * @return void 0
	 * @zp
	 */
	Function.prototype.after = function (afterfun, obj) {
		var _self = this;
		return function () {
			var bindObj = obj || this,
				res = _self.apply(bindObj,arguments); 	
			afterfun.apply(bindObj, arguments);
			return res;
		}
	};
	return $;
});