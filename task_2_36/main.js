require(["common", "textarea", "checkerboard", "strategies"], function ($, Cinarea, Board, s) {
	var area = new Cinarea(),
		board = new Board();
	var index = 0;
	$("#turn").onclick = function () {
		var arr = [-90, 90, 360, 180];
		$.turn(board.chess.element, arr[index++ % 4]);
	};
	$("#run1").onclick = function () {
		s.tralef(board);
	};
});