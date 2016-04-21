define(["common"], function ($) {
	/*
	 * 指令策略函数集合
	 * @param  number
	 * @return void 0
	 * @zp
	 */
	var strategies = {
		go: function (ele, cmd, flag) {
			var pos = $.pos(ele, cmd),
				dir = ele.chess.direction, 
				vp = (dir === "left" || dir === "right") ? "plane" : "vertical",
				chessDir = (dir === "left" || dir === "right") ? 2 : 1,
				ways = (dir === "left" || dir === "top") ? "sub" : "add";
			var ban = common(cmd, ele.chess, {
				dir: chessDir,
				way: ways
			}, ele.boxs);

			if (!ban) {
				flag.flag = true;
				return void 0;
			}

			if (pos) {
				$.run(ele.chess.element, pos, vp);
				ele.chess.position = pos;
			} else {
				alert("越界了,指令不在执行");
				flag.flag = true;
			}
		},
		tralef: function (ele, cmd, flag) {
			comtra(cmd, ele, flag, 2, "sub", "plane");
		},
		movlef: function (ele, cmd, flag) {
			commov(cmd, ele, flag, "left", -90, 2, "sub", "plane");
		},
		trarig: function (ele, cmd, flag) {
			comtra(cmd, ele, flag, 2, "add", "plane");
		},
		movrig: function (ele, cmd, flag) {
			commov(cmd, ele, flag, "right", 90, 2, "add", "plane");
		},
		tratop: function (ele, cmd, flag) {
			comtra(cmd, ele, flag, 1, "sub", "vertical");
		},
		movtop: function (ele, cmd, flag) {
			commov(cmd, ele, flag, "top", 360, 1, "sub", "vertical");
		},
		trabot: function (ele, cmd, flag) {
			comtra(cmd, ele, flag, 1, "add", "vertical");
		},
		movbot: function (ele, cmd, flag) {
			commov(cmd, ele, flag, "bottom", 180, 1, "add", "vertical");
		}, 
	};
	/**
	 不转向运动公共函数
	 */
	var comtra = function (cmd, ele, flag, dir, ways, rundir) {
		var ban = common(cmd, ele.chess, {
			dir: dir,
			way: ways
		}, ele.boxs);

		if (!ban) {
			flag.flag = true;
			return void 0;
		}

		var pos = $.pos(ele, cmd);
		if (pos) {
			$.run(ele.chess.element, pos, rundir);
			ele.chess.position = pos;
			console.log(pos);
		} else {
			alert("越界了,指令不在执行");
			flag.flag = true;
		}
	}
	/**
	 转向运动公共函数
	 */
	var commov = function (cmd, ele, flag, direction, degree, dir, ways, rundir) {
		var ban = common(cmd, ele.chess, {
			dir: dir,
			way: ways
		}, ele.boxs);

		if (!ban) {
			flag.flag = true;
			return void 0;
		}
		
		$.turn(ele.chess.element, degree);
		ele.chess.direction = direction;
		setTimeout(function () {
			var pos = $.pos(ele, cmd);
			if (pos) {
				$.run(ele.chess.element, pos, rundir);
				ele.chess.position = pos;
			} else {
				alert("越界了,指令不在执行");
				flag.flag = true;
			}
		}, 500); 
	};
	/**
	 * 验证墙
	 * @param  命令,棋子,方向{1为水平,2为垂直,1为加,2为减}
	 * @return boolean    
	 */
	var	common = function (cmd, chess, dir, boxs) {
		var other = dir.dir === 1 ? chess.position.x : chess.position.y,
			step = dir.dir === 1 ? chess.position.y : chess.position.x,
			direction = dir.dir === 1 ? "rows" : "cells";		
		var ways = {
			add: function () {
				for (var i = step; i <= step + cmd.step; i++) {
					if (dirs[direction](i)) return false;
				}
				return true;
			},
			sub: function () {
				for (var i = step; i >= step - cmd.step; i--) {
					if (dirs[direction](i)) return false;
				}
				return true;
			}
		};
		var dirs = {
			rows: function (index) {
				if (boxs.rows[index].cells[other].getAttribute("data-index") === "2") {
					alert(cmd.cmd + cmd.step + "撞墙了,停止运行");	
					return true;
				}
			}, 
			cells: function (index) {
				if (boxs.rows[other].cells[index].getAttribute("data-index") === "2") {
					alert(cmd.cmd + cmd.step + "撞墙了,停止运行");	
					return true;
				}
			}
		};
		return ways[dir.way]();
	}
	return strategies;
});