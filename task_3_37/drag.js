define(["util"], function ($) {
	/**
	 * 拖拽函数
	 * @param  object
	 * @return null
	 * @zp
	 */ 
	function Drag (obj) {
		obj = obj || {};
		this.element = obj.element || $("#wrapper");
		this.callback = obj.callback || function () {};
		this.curretnX = 0;
		this.curretnY = 0;
		this.flag = false;
		this.init.call(this);
	}
	Drag.fn = Drag.prototype;
	/**
	 * 修正属性&&绑定事件
	 * @param  null
	 * @return null
	 * @zp
	 */
	Drag.fn.init = function () {
		this.height = this.element.offsetHeight;
		this.width = this.element.offsetWidth;
		this.update();
		this.bindMouse(Drag.checkArea, this.callback);
	};
	/**
	 * 更新top,left
	 * @param  null
	 * @return null
	 * @zp
	 */
	Drag.fn.update = function () {
		var left = $.getCss(this.element, "left"),
			top = $.getCss(this.element, "top");
		this.left = left === "auto" ? 0 : left;
		this.top = top === "auto" ? 0 : top;
	};
	/**
	 * 为element绑定事件
	 * @param  检测函数
	 * @return null
	 * @zp
	 */
	Drag.fn.bindMouse = function (check) {
		check = check || function () {};
		var _self = this;
		/**
		 * 按下鼠标
		 */
		$.addHandler(this.element, "mousedown", function (event) {
			event = event || window.event;
			_self.flag = true;
			_self.curretnX = event.clientX;
			_self.curretnY = event.clientY;
		});
		/**
		 * 鼠标移动
		 */
		$.addHandler(document, "mousemove", function (event) {
			event = event || window.event;
			if (!_self.flag) return;
			var nowX = event.clientX, 
				nowY = event.clientY,
				pos = {
					left: parseInt(_self.left) + nowX - _self.curretnX,
					top: parseInt(_self.top) + nowY - _self.curretnY
				};
			check(pos, {
				width: _self.width,
				height: _self.height
			});
			_self.element.style.left = pos.left + "px";
			_self.element.style.top = pos.top + "px";
		});
		/**
		 * 鼠标放起
		 */
		$.addHandler(document, "mouseup", function () {
			_self.flag = false;
			_self.update();
			_self.callback();
		});
	};
	/**
	 * 碰撞检测
	 * @param  pos(移动的值)
	 * @return 
	 * @zp
	 */
	Drag.checkArea = function () {
		var height = document.documentElement.clientHeight,
			width = document.documentElement.clientWidth;
		return function (pos, attr) {			
			// 检测水平
			if (pos.left < 0) {
				pos.left = 0;
			} else if (pos.left > width - attr.width) {
				pos.left = width - attr.width;
			}
			// 检测竖直
			if (pos.top < 0) {
				pos.top = 0;
			} else if (pos.top > height - attr.height) {
				pos.top = height - attr.height;
			}
		};
	}();
	return Drag;
});