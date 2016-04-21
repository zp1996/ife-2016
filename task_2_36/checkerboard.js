define(["chessman", "common", "strategies"], function (Chess, $, s) {
	/**
	 * 棋盘构造函数
	 * @param  {棋子元素,方向,位置}
	 * @return void 0
	 * @zp
	 */
	var Board = function (options) {
		options = options || {};
		this.titleArea = options.titleArea || $("#title");
		this.boxs = options.boxs || $("#boxs");
		this.volume = options.volume || 20;
		this.commands = [];
		this.col_row = [];
		this.target = null;
		this.chess = new Chess();
		this.init.call(this);
	};
	Board.fn = Board.prototype;
	Board.fn.init = function () {
		this.col_row = Board.buildArr(this.volume);
		this.buildTitle.call(this, this.volume);
		this.build.call(this, this.volume);
		this.posChess.call(this);
		this.clickWall.call(this);
	};
	/*
	 * 创建二维数组
	 * @param  null
	 * @return void 0
	 * @zp
	 */
	Board.buildArr = function (num) {
		var result = [];
		for (var i = 0; i < num; i++) {
			result[i] = new Int32Array(num);
		}
		return result;
	};
	/*
	 * 定位棋子
	 * @param  null
	 * @return void 0
	 * @zp
	 */
	Board.fn.posChess = function () {
		this.chess.element.style.left = (this.chess.position.x - 1) * 31 + 29 + "px";
		this.chess.element.style.top = (this.chess.position.y - 1) * 31 + 29 + "px";
		this.col_row[this.chess.position.x - 1][this.chess.position.y - 1] = 1;
		this.boxs.rows[this.chess.position.y].cells[this.chess.position.x].setAttribute("data-index", 1);
	};
	/*
	 * 修建表格
	 * @param  null
	 * @return void 0
	 * @zp
	 */
	Board.fn.build = function (num) {
		var cacheElement = document.createDocumentFragment(),
			tr,
			text,
			td;
		for (var i = 0; i < num; i++) {
			tr = document.createElement("tr");
			tr.className = "col";
			for (var j = 0; j <= num; j++) {
				td = document.createElement("td");
				td.className = "box";
				if (j === 0) {
					text = document.createTextNode(i + 1);
					td.appendChild(text);
				} else {
					td.setAttribute("data-index", 0);
					td.setAttribute("data-pos", i + "-" + (j - 1));
				}
				tr.appendChild(td);
			}
			cacheElement.appendChild(tr); 
		}
		this.boxs.appendChild(cacheElement);
	};
	/*
	 * 创建表格头
	 * @param  null
	 * @return void 0
	 * @zp
	 */
	Board.fn.buildTitle = function (num) {
		var cacheElement = document.createDocumentFragment(),
			td,
			text;	
		for (var i = 0; i < num; i++) {
			td = document.createElement("td");
			text = document.createTextNode(i + 1);
			td.appendChild(text);
			td.className = "box";
			cacheElement.appendChild(td);
		}
		this.titleArea.appendChild(cacheElement);	
	};
	/*
	 * 执行命令
	 * @param  null
	 * @return void 0
	 * @zp
	 */
	Board.fn.run = function (undefined) {
		var i = 0,
			self = this,
			flag = {
				flag: undefined,
			},
			cmds =  this.commands,
			len = cmds.length,
			runs = cmds.map(function (val, i) {
				return function () {
					if ( s.hasOwnProperty(val['cmd']) ) {
						s[val['cmd']].call(self, self, val, flag);
					} else {
						alert(val['cmd'] + "指令出现错误,程序跳过该指令" + i);
					}
				};
			}),
			timer = setInterval(function () {
				if (flag.flag || i === len) {
					clearInterval(timer);
					timer = null;
					return void 0;
				}
				runs[i++]();
			}, 1200);
	};
	/*
	 * 修建墙
	 * @param  null
	 * @return void 0
	 * @zp
	 */
	Board.fn.buildWall = function (fn) {
		for (var i = 0; i < this.volume; i++) {
			for (var j = 0; j < this.volume; j++) {
				if (this.col_row[i][j] === 0) {
					Math.random() > 0.3 ? 1 : (this.buildWallFun.call(this, i, j));
				}
			}
		}
	};
	/*
	 * 修建墙的DOM操作以及更改数组
	 * @param  null
	 * @return void 0
	 * @zp
	 */
	Board.fn.buildWallFun = function (i, j) {
		var td = this.boxs.rows[i + 1].cells[j + 1];
		this.col_row[i][j] = 2;
		td.setAttribute("data-index", 2);
		td.style.background = "rgb(214, 152, 152)";
	};
	/*
	 * 点击生成目标位置
	 * @param  null
	 * @return void 0
	 * @zp
	 */
	Board.fn.targetFun = function (i, j) {
		var ele = null;
		if (this.col_row[i - 1][j - 1] === 0) {
			if (this.target) {
				this.col_row[this.target.x][this.target.y] = 0;
				ele = this.boxs.rows[this.target.x + 1].cells[this.target.y + 1];
				ele.style.background = "#fff";
				ele.setAttribute("data-index", 0);
			}
			this.boxs.rows[i].cells[j].style.background = "#000";
			this.boxs.rows[i].cells[j].setAttribute("data-index", 3);
			this.col_row[i - 1][j - 1] = 3;
			this.target = {
				x: i - 1,
				y: j - 1
			};
		} else {
			return "该位置不能为目标位置";
		}
	};
	Board.fn.clickWall = function () {
		var self = this;
		this.boxs.onclick = function (e) {
			ele = e.target;
			var index = ele.getAttribute("data-index");
			if (index !== undefined) {
				self.wallsObj[index] ? self.wallsObj[index].call(self, ele) : alert("该点不能为墙");	
			}
		};
	};
	Board.fn.wallsObj = {
		"0": function (ele) {
			var pos = ele.getAttribute("data-pos").split("-");
			this.col_row[pos[0]][pos[1]] = 2;
			ele.setAttribute("data-index", 2);
			ele.style.background = "rgb(214, 152, 152)";
		},
		"2": function (ele) {
			var pos = ele.getAttribute("data-pos").split("-");
			console.log(this);
			this.col_row[pos[0]][pos[1]] = 0;
			ele.setAttribute("data-index", 0);
			ele.style.background = "#fff";
		}
	}
	return Board;
});