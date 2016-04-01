require(["common", "textarea", "checkerboard", "strategies"], function ($, Cinarea, Board, s) {
	var area = new Cinarea(),
		board = new Board();
	var index = 0;
	$("#run").onclick = function () {
		var commands = area.textarea.value.split("\n");
		commands = $.filter(commands);
		for (var i = 0, len = commands.length; i < len; i++) {
			commands[i] = $.cancelCmd(commands[i]);
		}
		board.commands = commands;
		board.run();
	};
});