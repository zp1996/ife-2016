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
 * 构造随机数组,顺序混乱的10-69,方便查看排序
 * @param  null
 * @return arr
 * @zp
 */
var shuffle = function (len) {
	len = len || 25;
	var arr = Array(len), i, j, k, temp;
	for (i = 0, j = 10; i < len; i++, j+=3) {
		arr[i] = j;
	}
	while (len) {
		k = Math.floor(Math.random() * len--);
		temp = arr[k];
		arr[k] = arr[len];
		arr[len] = temp;
	}
	return arr;
};
/**
 * 冒泡排序
 * @param  null
 * @return arr
 * @zp
 */
var BubbleExchangeSort = function () {
	var i = 0, j, temp, flag, 
		self = this,
		arr = this.arr,
		len = arr.length,
		timer = null;
	if (timer !== null) return void 0;
	timer = setInterval(function () {
		if (i === len || flag === false) {
			clearInterval(timer);
			timer = null;
			setTimeout(function () {
				SortSuccess.all.call(self);
			});
		} 
		flag = false;
		for (j = len - 1; j > i; j--) {
			if (arr[j] < arr[j - 1]) {
				temp = arr[j - 1];
				arr[j - 1] = arr[j];
				arr[j] = temp;
				flag = true;
			}
		}
		self.paintArea(arr);
		SortSuccess.unique.call(self, i++);
	}, 200);
};
/**
 * 排序成功后函数
 * @param  null
 * @return arr
 * @zp
 */
var SortSuccess = {
	all: function () {
		var spans = this.sortArea.childNodes;
		for (var i = 0, item; item = spans[i++];) {
			item.style.background = "green";
		}
		alert("排序完成");
	},
	unique: function (i) {
		this.sortArea.childNodes[i].style.background = "green";
	}
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
	this.sortArea = obj.sortArea || $("arr-sort");
	this.arr = [];
	this.update = function () {
		var childs = this.container.childNodes;
		for (var i = 0, len = this.arr.length; i < len; i++) {
			childs[i].setAttribute("data-index", i);
			this.sortArea.childNodes[i].style.left = i * 18 + "px";
		}
	};
	this.inQueue = function (type) {
		var num = this.check();
		if (num !== undefined) {
			CancelQueue.publicInQueue[type].inArr.call(this, num);
			CancelQueue.publicInQueue[type].inDom.call(this, num);
			CancelQueue.publicInQueue[type].inSort.call(this, num);		
			this.update();
		}
	};
	this.outQueue = function (type) {
		if (this.arr.length !== 0) {
			CancelQueue.publicOutQueue[type].outArr.call(this);
			CancelQueue.publicOutQueue[type].outDom.call(this);
			CancelQueue.publicOutQueue[type].outSort.call(this);
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
				self.sortArea.removeChild(self.sortArea.childNodes[index]);
				self.arr.splice(index, 1);
				self.update();
			}
		};
	};
	/*重绘排序区域*/
	this.paintArea = function () {
		var cacheElement = CancelQueue.cacheElement();
		this.sortArea.innerHTML = "";
		for (var i = 0, len = this.arr.length; i < len; i++) {
			CancelQueue.burnSpan(i, this.arr[i], cacheElement);
		}
		this.sortArea.appendChild(cacheElement);
	};
	/*进行排序*/
	this.sortFun = BubbleExchangeSort.bind(this);
	/*生成乱序数组*/
	this.shuffle = function () {
		this.arr = shuffle();
		this.container.innerHTML = "";
		this.paintArea.innerHTML = "";
		this.paintArea();
	}
};
CancelQueue.fn = CancelQueue.prototype;

CancelQueue.cacheElement = function () {
	return document.createDocumentFragment();
};
/**
 * 生成待排序span
 * @param  宽度,高度,缓存元素
 * @return null
 * @zp
 */
CancelQueue.burnSpan = function (index, num, cacheElement) {
	var span = document.createElement("span");
	span.style.height = num + "%";
	span.style.left = index * 20 + "px";
	cacheElement.appendChild(span);
};
/**
 * 生成新的队列dom元素
 * @param  number
 * @return HtmlSpanObejct
 * @zp
 */
CancelQueue.fn.burnDom = function (number) {
	var span = document.createElement("span"),
		text = document.createTextNode(number);
	span.appendChild(text);
	return span;
};
/**
 * 生成新待排序om元素
 * @param  number
 * @return HtmlSpanObejct
 * @zp
 */
CancelQueue.fn.burnSortDom = function (number) {
	var span = document.createElement("span");
	span.style.height = number + "%";
	return span;
};
/**
 * 检验表单输入元素
 * @param  stirng
 * @return true || undefined
 * @zp
 */
CancelQueue.fn.check = function () {
	var pattern = /^\d{2,3}$/,
		strNum = +this.input.value,
		flag = pattern.test(strNum) && strNum >= 10 && strNum <= 100;
	if (flag) {
		this.input.value = "";
		return strNum;
	} else {
		alert("您输入的数字有误!");
		return void 0;
	}
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
		inArr: function (num) {
			CancelQueue.throwError.call(this);
			this.arr.unshift(+num);
		},
		inDom: function (num) {
			CancelQueue.throwError.call(this);
			this.container.insertBefore(this.burnDom(num), this.container.childNodes[0]);
		},
		inSort: function (num) {
			CancelQueue.throwError.call(this);
			this.sortArea.insertBefore(this.burnSortDom(num), this.sortArea.childNodes[0]);
		}
	}, 
	right: {
		inArr: function (num) {
			CancelQueue.throwError.call(this);
			this.arr.push(+num);
		},
		inDom: function (num) {
			CancelQueue.throwError.call(this);
			this.container.appendChild(this.burnDom(num));
		},
		inSort: function (num) {
			CancelQueue.throwError.call(this);
			this.sortArea.appendChild(this.burnSortDom(num));
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
		outArr: function () {
			CancelQueue.throwError.call(this);
			alert(this.arr.shift());
		},
		outDom: function () {
			CancelQueue.throwError.call(this);
			this.container.removeChild(this.container.firstElementChild);
		}, 
		outSort: function () {
			CancelQueue.throwError.call(this);
			this.sortArea.removeChild(this.sortArea.firstElementChild);
		}
	},
	right: {
		outArr: function () {
			CancelQueue.throwError.call(this);
			alert(this.arr.pop());
		},
		outDom: function () {
			CancelQueue.throwError.call(this);
			this.container.removeChild(this.container.lastElementChild);
		},
		outSort: function () {
			CancelQueue.throwError.call(this);
			this.sortArea.removeChild(this.sortArea.lastElementChild);
		}
	}
};
/*测试*/
(function (){
	var test = new CancelQueue(),
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
	$("sort").onclick = function () {
		test.sortFun();
	};
	$("shuffle").onclick = function () {
		test.shuffle();
	};
})();