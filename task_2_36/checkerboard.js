define(["chessman", "common"], function (Chess, $) {
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
	Board.fn.posChess = function () {
		this.chess.element.style.left = (this.chess.position.x - 1) * 31 + 29 + "px";
		this.chess.element.style.top = (this.chess.position.y - 1) * 31 + 29 + "px";
	};
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
	return Board;
});