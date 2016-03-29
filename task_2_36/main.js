require(["common", "textarea", "checkerboard"], function ($, Cinarea, Board) {
	var area = new Cinarea(),
		board = new Board();
	var index = 0;
	$("#turn").onclick = function () {
		console.log($.rotate(board.chess.element));
		var arr = [-90, 90, 180, -180];
		$.turn(board.chess.element, arr[index++ % 4], $.rotate(board.chess.element));
	};
});