/**
 * 返回id
 * @param  string
 * @return htmlElement
 * @zp
 */
var $ = function (id) {
	return document.getElementById(id);
};
/**
 * 页面js逻辑构造函数
 * @param  object
 * @return null
 * @zp
 */
var CancelQueue = function (obj) {
	obj = obj || {};
	this.input = obj.input || $("new-number");
	this.container = obj.container || $("arr-area");
	this.searchInput = obj.search || $("search-text");
	this.arr = [];
	this.update = function () {
		var childs = this.container.childNodes;
		for (var i = 0, len = this.arr.length; i < len; i++) {
			childs[i].setAttribute("data-index", i);
		}
	};
	this.inQueue = function (type) {
		var num = this.check();
		if (num !== undefined) {
			CancelQueue.publicInQueue[type].inArr.call(this, num);
			CancelQueue.publicInQueue[type].inDom.call(this, num);
			this.update();
		}
	};
	this.outQueue = function (type) {
		if (this.arr.length !== 0) {
			CancelQueue.publicOutQueue[type].outArr.call(this);
			CancelQueue.publicOutQueue[type].outDom.call(this);
			this.update();
		} else {
			alert("该队列已经为空");
		}
	};
	/*事件委托*/
	this.childClick = function () {
		var self = this;
		this.container.onclick = function (event) {
			if (event.target.tagName.toLowerCase() === "span") {
				var index = event.target.getAttribute("data-index");
				this.removeChild(this.childNodes[index]);
				self.arr.splice(index, 1);
				self.update();
			}
		};
	};
	this.search = function () {
		if (this.searchInput.value === "") {
			alert("请输入需要查询内容");
			return void 0;
		}
		var pattern = new RegExp(this.searchInput.value),
			childs = this.container.childNodes;
		this.searchInput.value = "";
		this.arr.forEach(function (val, index) {
			if (pattern.test(val)) {
				childs[index].style.background = "green";
			} else {
				childs[index].style.background = "red";
			}
		});
	}
};
CancelQueue.fn = CancelQueue.prototype;
/**
 * 生成新的队列dom元素
 * @param  number
 * @return HtmlSpanObejct
 * @zp
 */
CancelQueue.fn.burnDom = function (arr) {
	var cacheElement = document.createDocumentFragment(),
		span = null, text = null;	
	for (var i = 0, str; str = arr[i++];) {
		span = document.createElement("span");
		text = document.createTextNode(str);
		span.appendChild(text);
		cacheElement.appendChild(span);
	}
	return cacheElement;
};
/**
 * 检验表单输入元素
 * @param  stirng
 * @return true || undefined
 * @zp
 */
CancelQueue.fn.check = function () {
	var str = this.input.value;
	this.input.value = "";
	return str.split(",");
};
/**
 * 对调用函数进行检验
 * @zp
 */
CancelQueue.throwError = function () {
	if (!(this instanceof CancelQueue)) {
		throw new Error("该函数不能直接调用");
	}
};
/**
 * 入公共函数对象,添加至对象中
 * 注意所有函数不能直接调用
 * @zp
 */
CancelQueue.publicInQueue = {
	left: {
		inArr: function (arr) {
			CancelQueue.throwError.call(this);
			this.arr.unshift.apply(this.arr, arr);
		},
		inDom: function (arr) {
			CancelQueue.throwError.call(this);
			this.container.insertBefore(this.burnDom(arr), this.container.childNodes[0]);
		}
	},
	right: {
		inArr: function (arr) {
			CancelQueue.throwError.call(this);
			this.arr.push.apply(this.arr, arr);
		},
		inDom: function (arr) {
			CancelQueue.throwError.call(this);
			this.container.appendChild(this.burnDom(arr));
		}
	}
};
/**
 * 出公共函数对象,添加至对象中
 * 注意所有函数不能直接调用
 * @zp
 */
CancelQueue.publicOutQueue = {
	left: {
		outArr: function (num) {
			CancelQueue.throwError.call(this);
			alert(this.arr.shift());
		},
		outDom: function (num) {
			CancelQueue.throwError.call(this);
			this.container.removeChild(this.container.firstElementChild);
		}
	},
	right: {
		outArr: function (num) {
			CancelQueue.throwError.call(this);
			alert(this.arr.pop());
		},
		outDom: function (num) {
			CancelQueue.throwError.call(this);
			this.container.removeChild(this.container.lastElementChild);
		}
	}
};
/*测试*/
(function (){
	var test = new CancelQueue({
			input: $("text")
		}),
		buttons = $("button-area");
	test.childClick();
	$("left-in").onclick = function () {
		test.inQueue("left");
	};
	$("right-in").onclick = function () {
		test.inQueue("right");
	};
	$("left-out").onclick = function () {
		test.outQueue("left");
	};
	$("right-out").onclick = function () {
		test.outQueue("right");
	};
	$("search").onclick = function () {
		test.search();
	};
})();