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
	// $.rotate = function (ele) {
	// 	var rotate = ele.style.transform;
	// 	if (rotate) {
	// 		var result = /rotate\((\-?\d*(\.?\d*)?)deg\)/.exec(rotate)[1];
	// 		return result > 0 ? Math.ceil(result) : Math.floor(result);
	// 	} else {
	// 		return 0;
	// 	}
	// };
	/**
	 * 转向函数
	 * @param  作用对象,度数
	 * @return void 0 
	 * @zp
	 */ 
	$.turn = function (ele, deg) {
		var
			start = 0,
			speed = 0,
			timer = setInterval(function () {
				if (Math.abs(start) - Math.abs(deg) > -1) {
					ele.style.transform = "rotate(" + deg + "deg)";
					clearInterval(timer);
					timer = null;
					return void 0;
				}
				speed = (deg - start) / 5;
				start += speed;
				ele.style.transform = "rotate(" + start + "deg)";
			}, 20);
	};
	/**
	 * 运动函数
	 * @param  作用对象,结束位置,纵向||横向
	 * @return void 0 
	 * @zp
	 */
	$.run = function (ele, pos, dir) {
		console.log(pos);
		var 
			strategies = {
				vertical: {
					type: "top",
					old: ele.offsetTop,
					dis: 29 + (pos.y - 1) * 31 - ele.offsetTop,
				},
				plane: {
					type: "left",
					old: ele.offsetLeft,
					dis: 29 + (pos.x  - 1) * 31 - ele.offsetLeft,
				}
			}, 
			old = strategies[dir].old,
			dis = strategies[dir].dis,
			start = 0, 
			speed = 0,
			timer = setInterval(function () {
				if (Math.abs(start) - Math.abs(dis) > -1) {
					ele.style[strategies[dir].type] = old + dis + "px";
					clearInterval(timer);
					timer = null;
					return void 0;
				}
				speed = (dis - start) / 8;
				start += speed;
				ele.style[strategies[dir].type] = old + start + "px";
 			}, 20);	
	};
	/**
	 * 解析指令函数
	 * @param  字符串
	 * @return 指令对象
	 * @zp
	 */
	$.cancelCmd = function (command) {
		command = command.toLowerCase();
		command = command.split(" ");
		var len = command.length,
			step = /^\d+$/.test(command[len - 1]) ? 
						 command[len - 1] | 0 : 1,
			cmd = len > 2 ? command[0] + command[1] : command[0];
		return {
			cmd: cmd,
			step: step
		};				 
	};
	/**
	 * 生成需要到达位置
	 * @param  棋盘对象,指令对象
	 * @return pos对象
	 * @zp
	 */
	$.pos = function (board, cmd, undefined) {
		var 
			flag,
			commonFun = function (num) {
				if (num >= 1 && num <= 20) {
					return num;
				} else {
					return undefined;
				}
			},
			operation = {
				go: {
					left: function () {
						flag = commonFun(board.chess.position.x - cmd.step); 
						return flag && {
							x: flag,
							y: board.chess.position.y
						};
					},
					right: function () {
						flag = commonFun(board.chess.position.x + cmd.step); 
						return flag && {
							x: flag,
							y: board.chess.position.y
						}
					},
					top: function () {
						flag = commonFun(board.chess.position.y - cmd.step);
						return flag && {
							x: board.chess.position.x,
							y: flag
						};
					},
					bottom: function () {
						flag = commonFun(board.chess.position.y + cmd.step);
						return flag && {
							x: board.chess.position.x,
							y: flag
						};
					}
				}				
			};
		operation.tralef = operation.movlef = operation.go.left;
		operation.tratop = operation.movtop = operation.go.top;
		operation.trarig = operation.movrig = operation.go.right;
		operation.trabot = operation.movbot = operation.go.bottom;	
		return operation[cmd.cmd][board.chess.direction] ? 
					 operation[cmd.cmd][board.chess.direction]() : 
					 operation[cmd.cmd]();
	};
	$.filter = function (arr, label) {
		return arr.filter(function (val, i) {
			if (val) {
				return val;				
			} else {
				label = label.getElementsByTagName("div");
				label[i].style.background = "red";
			}
		});
	};
	return $;
});