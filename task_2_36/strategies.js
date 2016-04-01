define(["common"], function ($) {
	/*
	 * 指令策略函数集合
	 * @param  number
	 * @return void 0
	 * @zp
	 */
	var strategies = {
		go: function (ele, cmd) {
			var pos = $.pos(ele, cmd),
				dir = ele.chess.direction, 
				vp = (dir === "left" || dir === "right") ? "plane" : "vertical";
			if (pos) {
				$.run(ele.chess.element, pos, vp);
				ele.chess.position = pos;
			} else {
				alert("越界了");
				return true;
			}
		},
		tralef: function (ele, cmd) {
			var pos = $.pos(ele, cmd);
			if (pos) {
				$.run(ele.chess.element, pos, "plane");
				ele.chess.position = pos;
			} else {
				alert("越界了");
				return true;
			}
		},
		movlef: function (ele, cmd) {
			$.turn(ele.chess.element, -90);
			ele.chess.direction = "left";
			setTimeout(function () {
				var pos = $.pos(ele, cmd);
				if (pos) {
					$.run(ele.chess.element, pos, "plane");
					ele.chess.position = pos;
				} else {
					alert("越界了");
					console.error("nihao");
					return true;
				}
			}, 500); 
		},
		trarig: function (ele, cmd) {
			var pos = $.pos(ele, cmd);
			if (pos) {
				$.run(ele.chess.element, pos, "plane");
				ele.chess.position = pos;
			} else {
				alert("越界了");
				return true;
			}
		},
		movrig: function (ele, cmd) {
			$.turn(ele.chess.element, 90);
			ele.chess.direction = "right";
			setTimeout(function () {
				var pos = $.pos(ele, cmd);
				if (pos) {
					$.run(ele.chess.element, pos, "plane");
					ele.chess.position = pos;
				} else {
					alert("越界了");
					return true;
				}
			}, 500); 
		},
		tratop: function (ele, cmd) {
			var pos = $.pos(ele, cmd);
			if (pos) {
				$.run(ele.chess.element, pos, "vertical");
				ele.chess.position = pos;
			} else {
				alert("越界了");
				return true;
			}
		},
		movtop: function (ele, cmd) {
			$.turn(ele.chess.element, 360);
			ele.chess.direction = "top";
			setTimeout(function () {
				var pos = $.pos(ele, cmd);
				if (pos) {
					$.run(ele.chess.element, pos, "vertical");
					ele.chess.position = pos;
				} else {
					alert("越界了");
					return true;
				}
			}, 500); 
		},
		trabot: function (ele, cmd, flag) {
			var pos = $.pos(ele, cmd);
			if (pos) {
				$.run(ele.chess.element, pos, "vertical");
				ele.chess.position = pos;
			} else {
				alert("越界了");
				flag.flag = true;
			}
		},
		movbot: function (ele, cmd, flag) {
			$.turn(ele.chess.element, 180);
			ele.chess.direction = "bottom";
			setTimeout(function () {
				var pos = $.pos(ele, cmd);
				if (pos) {
					$.run(ele.chess.element, pos, "vertical");
					ele.chess.position = pos;
				} else {
					alert("越界了");
					flag.flag = true;
				}
			}, 500); 
		}
	};
	return strategies;
});