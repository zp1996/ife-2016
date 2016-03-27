define(["common"], function ($) {
	var Cinarea = function (options) {
		options = options || {};
		this.init.call(this, options);
	};
	Cinarea.fn = Cinarea.prototype;
	/**
	 * 初始构造函数
	 * @param  obj
	 * @return void 0
	 * @zp
	 */
	Cinarea.fn.init = function (options) {
		this.label_area = options.label_area || $("#label-area");
		this.textarea = options.textarea || $("#commands");
		this.config = {
			height: options.height || 22,
			max: options.max || 22
		};
		this.commands = options.commands || [];
		this.labels = Cinarea.burnLabel(this.commands.length, Cinarea.paint, this.label_area, true);
		this.insert.call(this);
	};
	/**
	 * 重绘label
	 * @param  number, function[dom操作函数]
	 * @return array
	 * @zp
	 */
	Cinarea.paint = function () {
		var cacheElement = document.createDocumentFragment();
		return {
			add: function (num) {
				var div = document.createElement("div"),
					text = document.createTextNode(num);
				div.appendChild(text);
				cacheElement.appendChild(div);	
			},
			append: function (element, flag, number) {
				var self = this;
				flag = flag ? element.childNodes.length = +flag : 
							 element.innerHTML = "";
				element.appendChild(cacheElement);
				cacheElement = document.createDocumentFragment();
				Cinarea.prePaint.reset.call(self, number);
				Cinarea.prePaint.sport.call(self, number);
			}
		};
	}();
	/**
	 * 重绘移动函数对象
	 * @param  number
	 * @return void 0
	 * @zp
	 */
	Cinarea.prePaint = {
		sport: function (num) {
			if (!(this instanceof Cinarea)) return void 0;
			var flag = this.config.max - num;
			if (flag < 0) {
				this.label_area.style.top = -this.textarea.scrollTop + "px";
			}
		},
		reset: function () {
			if (!(this instanceof Cinarea)) return void 0;
			this.label_area.style.top = "0px";
		}
	};
	/**
	 * 生成初始指令
	 * @param  number, function[dom操作函数]
	 * @return array
	 * @zp
	 */
	Cinarea.burnLabel = function (number, fnObj, element, flag) {	
		var arr = [];
		for (var i = 0; i < number; i++) {
			arr[i] = i + 1;
			fnObj.add(i + 1);
		}
		fnObj.append.call(this, element, flag, number);
		return arr;
	};
	/**
	 * 插入指令
	 * @param  number
	 * @return array
	 * @zp
	 */
	Cinarea.fn.insert = function () {
		var self = this;
		this.textarea.onkeyup = function (event) {
			if (event.keyCode === 13 || event.keyCode === 8) {
				self.update(this.value.split("\n"));
			}
		};	
	};
	/**
	 * 更新label,修正指令
	 * @param  commands
	 * @return array
	 * @zp
	 */
	Cinarea.fn.update = function (commands) {
		var len = commands.length;
		commands.length -= 1;
		this.commands = commands;
		Cinarea.burnLabel.call(this, len, Cinarea.paint, this.label_area);
	}
	return Cinarea;
});