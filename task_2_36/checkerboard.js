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
		this.chess = new Chess();
		this.init.call(this);
	};
	Board.fn = Board.prototype;
	Board.fn.init = function () {
		this.buildTitle.call(this, this.volume);
		this.build.call(this, this.volume);
		this.posChess.call(this);
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
	return Board;
});