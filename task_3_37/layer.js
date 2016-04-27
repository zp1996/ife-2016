define(["common", "drag"], function ($, Drag) {
	/**
	 * 弹出层
	 * @param  object 配置项
	 * @return void 0
	 * @zp
	 */ 
	const _height = document.documentElement.clientHeight;
	const _width = document.documentElement.clientWidth;
	function Layer (obj) {
		obj = obj || {};

		this.config = {
			width: obj.width || 500,
			height: obj.height || 300,
			content: "<h3>给点内容吧还是！</h3>",
			title: "弹出层",
			btns: ["确定", "取消"]
		};
		$.extend(this.config,	{
			left: obj.left || (_width - this.config.width) / 2,
			top: obj.top || (_height - this.config.height) /2
		});

		this.mask = obj.mask || $("#mask");
		this.wrapper = obj.wrapper || $("#wrapper");
		this.maskFlag = obj.maskFlag || true; /*点击遮罩层关闭,默认true,关闭*/
		this.dragFlag = obj.dragFlag || true; /*是否可以拖动*/
		this.dragObj = null;
		this.animateType = obj.animateType || "sport";

		this.init();
		Layer.init(this.wrapper, this.config);
		this.burnWrapper();
	}
	Layer.fn = Layer.prototype;
	// 其余类型弹窗配置参数
	Layer.other_config = {
		left: (_width - 300) / 2,
		top: (_height - 200) / 2,
		width: 300,
		height: 200
	};
	// 出现弹出层
	Layer.show = null;
	/**
	 * 初始效果函数
	 * @param  绑定对象
	 * @return void 0
	 * @zp
	 */
	Layer.init = function (ele, config) {
		ele.style.left = config.left + "px";
		ele.style.top = config.top + "px";
		ele.style.width = config.width + "px";
		ele.style.height = config.height + "px";
	};
	/**
	 * 注册拖拽
	 * @param  null
	 * @return void 0
	 * @zp
	 */ 
	Layer.fn.drag = function (ele) {
		var temp;
		if (this.dragFlag && !this.dragObj) {
			ele === void 0 ? ( this.dragObj = new Drag({ element: this.wrapper}) ) :
											 ( temp = new Drag({ element: ele}) );
		} else {
			this.wrapper.style.cursor = "pointer";
		}
	};
	/**
	 * 弹出层出现
	 * @param  object
	 * @return void 0
	 * @zp
	 */ 
	Layer.fn.open = function (obj) {
		Layer.show =  this.wrapper;
		this.wrapper.style.display = "block";
	};
	/**
	 * 弹出层消失
	 * @param  object
	 * @return void 0
	 * @zp
	 */ 
	Layer.fn.close = function () {
		this.maskClose();
		if (Layer.show === this.wrapper) {
			Layer.show.style.display = "none";
		} else {
			document.body.removeChild(Layer.show);
			Layer.show = null;
		}
	};
	/**
	 * 遮罩层开启
	 * @param  null
	 * @return void 0
	 * @zp
	 */ 
	Layer.fn.maskOpen = function () {
		var _self = this;
		this.mask.style.display = "block";
		if (this.maskFlag) {
			$.addHandler(this.mask, "click", function () {
				_self.close();
			});
		}
	};
	/**
	 * 遮罩层关闭
	 * @param  object
	 * @return void 0
	 * @zp
	 */
	Layer.fn.maskClose = function () {
		var _self = this;
		this.mask.style.display = "none";
		if (this.maskClose) {
			$.removeHandler(this.mask, "click", function () {
				_self.close();
			});
		}
	};
	/**
		* 动画函数基类
		*/
	Layer.animateStrategies = {
		opac: function (obj) {
			var index = 0, 
				timer,
				ele = Layer.show;
			ele.style.opacity = index;
			timer = setInterval(function () {
				if (Math.abs(index - 1) <= 0.01) {
					clearInterval(timer);
					timer = null;
					ele.style.opacity = 1;
					obj.fn(ele);
					return void 0;
				}
				index += ((1 - index) / 20);
				ele.style.opacity = index;
			});
		}, 
		sport: function (obj) {
			var top = -obj.config.height, 
				timer,
				target = obj.config.top,
			  ele = Layer.show;
			ele.style.top = top + "px";
			ele.style.left = obj.config.left + "px";
			timer = setInterval(function () {
				if (Math.abs(target - top) <= 2) {
					clearInterval(timer);
					timer = null;
					ele.style.top = target + "px";
					obj.fn(ele);
					return void 0;
				}
				top += (target - top) / 20;
				ele.style.top = top + "px";
			});
		},
		defaults: function (obj) {
			obj.fn(Layer.show); 
		}
	};
	/**
	 * 产生wrapper内容
	 * @param  null
	 * @return void 0
	 * @zp
	 */ 
	Layer.fn.burnWrapper = function (obj) {
		var header = this.burnHeader(this.config.title),
			main = this.burnBtnArea(this.config.btns, 2), 
			html = header.html;
		html += this.config.content;
		html += main.html;
		this.wrapper.innerHTML = html;
	};
	/**
	 * 产生头部
	 * @param  string title
	 * @return string html
	 * @zp
	 */ 
	Layer.fn.burnHeader = function (title, type) {
		type = type || "";
		return {
			html: "<header class='layer-header'><span class='header-title'>" + title + 
				    "</span><span id='close-btn" + type + "'>x</span></header>",
			id: "#close-btn" + type	    	
		};
	}; 
	/**
	 * 按钮区域
	 * @param  object 按钮内容
	 * @return string html
	 * @zp
	 */ 
	Layer.fn.burnBtnArea = function (content, len, type) {
		type = type || "";
		var btns = len === 1 ? "<button id='layer-yes" + type + "'>" + content + "</button>" : 
													 ("<button id='layer-no" + type + "'>" + content[1] + "</button>" +
													 	"<button id='layer-yes" + type + "'>" + content[0] + "</button>");											 
		return {
			html: "<div class='layer-button-area'>" + btns + "</div>"
		};
	};
	/**
	 * 产生其余类型弹窗文字内容
	 * @param  string html
	 * @return void 0
	 * @zp
	 */
	Layer.fn.burnContent = function (content) {
		return "<div class='layer-content-main'>" + content + "</div>"
	};
	/**
	 * 产生其余类型弹窗主体
	 * @param  string html
	 * @return void 0
	 * @zp
	 */ 
	Layer.fn.burnOtherContainer = function (obj) {
		var div = document.createElement("div")
		div.setAttribute("id", "other-main");
		div.innerHTML = obj.html;
		Layer.init(div, Layer.other_config);
		Layer.show = div;
		document.body.appendChild(div);
	};
	/**
	 * 修正函数
	 * @param  null
	 * @return void 0
	 * @zp
	 */
	Layer.fn.init = function () {
		var fn = Layer.fn.burnOtherContainer,
			fuc = Layer.fn.open,
			_self = this;
		fn = fn.brefore(Layer.fn.maskOpen, this);
		fn = fn.after(Layer.fn.closeBtn, this);
		fn = fn.after(Layer.animateStrategies[this.animateType]);
		fuc = fuc.brefore(Layer.fn.maskOpen, this);
		fuc = fuc.after(Layer.fn.closeBtn, this);
		fuc = fuc.after(Layer.animateStrategies[this.animateType]);
		Layer.fn.burnOtherContainer = fn;
		Layer.fn.open = function (callback) {
			fuc({
				fn: _self.drag.bind(_self),
				config: this.config
			});
			_self.registerEvent({
				yes: "#layer-yes", 
				no:"#layer-no"
			}, callback);
		}
	};
	/**
	 * 注册关闭按钮事件
	 * @param  绑定对象
	 * @return void 0
	 * @zp
	 */
	Layer.fn.closeBtn = function (obj) {
		obj.ele = obj.ele || $("#close-btn");
		var _self = this;
		obj.ele.onclick = function () {
			_self.close();
		}
	};
	/**
	 * 注册回调按钮事件
	 * @param  id集合
	 * @return void 0
	 * @zp
	 */
	Layer.fn.registerEvent = function (ids, callback) {
		var _self = this;
		callback = callback || {
			yes: function () {},
			no: function () {}
		};
		for (var i in ids) {
			(function (key) { 
				$(ids[key]).onclick = function () {
					_self.close();
					callback[key]();
				}
			})(i);
		}
	};
	/**
	 * alert弹窗
	 * @param  objext
	 * @return void 0
	 * @zp
	 */ 
	Layer.fn.alert = function (obj) {
		obj = obj || {};
		$.extend(obj, {
			len: 1,
			btns: ["确定"],
			type: "-alert",
			ids: {
				yes: "#layer-yes-alert"
			}
		});
		this.otherCommon.call(this, obj);
	};
	/**
	 * confirm弹窗
	 * @param  objext
	 * @return void 0
	 * @zp
	 */
	Layer.fn.confirm = function (obj) {
		obj = obj || {};
		obj.len = 2;
		obj.btns = ["确定", "取消"];
		obj.type = "-confirm";
		obj.ids = {
			yes: "#layer-yes-confirm",
			no: "#layer-no-confirm"
		};
		this.otherCommon.call(this, obj);
	};
	/**
	 * prompt弹窗
	 * @param  objext
	 * @return void 0
	 * @zp
	 */
	Layer.fn.prompt = function (obj) {
		obj = obj || {};
		obj.len = 2;
		obj.btns = ["确定", "取消"];
		obj.type = "-prompt";
		obj.html = "<input type='text' class='layer-prompt-input' />",
		obj.ids = {
			yes: "#layer-yes-prompt",
			no: "#layer-no-prompt"
		};
		this.otherCommon.call(this, obj);
	};
	/**
	 * 其它类型公共函数
	 * @param  objext
	 * @return void 0
	 * @zp
	 */
	Layer.fn.otherCommon = function (obj) {
		var header = this.burnHeader(obj.title || "弹窗", obj.type),
			btns = this.burnBtnArea(obj.btns, obj.len,  obj.type),
			html = header.html,
			_self = this;
		html += obj.html || this.burnContent(obj.content || "");
		html += btns.html;		
		this.burnOtherContainer({
			html: html,
			fn: this.drag.bind(this),
			config: Layer.other_config
		});
		$(header.id).onclick = function () {
			_self.close();
		};
		_self.registerEvent(obj.ids, obj.callback);
	};
	return Layer;
});