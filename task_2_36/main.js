require(["common", "textarea", "checkerboard", "strategies", "astar"], function ($, Cinarea, Board, s, Astar) {
	var area = new Cinarea(),
		board = new Board();
	var index = 0;
	$("#run").onclick = function () {
		var commands = area.textarea.value.split("\n");
		commands = $.filter(commands, area.label_area);
		for (var i = 0, len = commands.length; i < len; i++) {
			commands[i] = $.cancelCmd(commands[i]);
		}
		board.commands = commands;
		board.run();
	};
	$("#build-wall").onclick = function () {
		board.buildWall();
	};
	$("#target").onclick = function () {
		var res = $("#target-pos").value;
		res = res.split("-");
		var x = res[0] | 0,
			y = res[1] | 0;
		if (x >= 1 && x <= 20 && y >= 1 && y <= 20) {
			res = board.targetFun(res[0], res[1]);
			res ? (alert(res)) : 1;
		} else {
			alert("位置输入有错");
		}
	};
	$("#find").onclick = function () {
		console.log(board.target)
		if (!board.target) {
			alert("请先确定目标位置再开始寻路吧！");
		} else {
			var path = new Astar(board.col_row, {
				y: board.chess.position.x - 1,
				x: board.chess.position.y - 1
			}, board.target),
				res = path.create();
			if (res.length > 0) {
				res.length--;
				res.forEach(function (value) {
					board.boxs.rows[value.X + 1].cells[value.Y + 1].style.background = "#AADEAA";
				});
			} else {
				alert("未能寻找的可达路径");
			}
		}
	};
});