define(["common"], function ($) {
	/*
	 * 指令策略函数集合
	 * @param  number
	 * @return void 0
	 * @zp
	 */
	var strategies = {
		go: function (ele) {
			var pos = $.pos(ele, $.cancelCmd("go 2"));
			if (pos) {
				$.run(ele.chess.element, pos, "vertical");
				ele.chess.position = pos;
			} else {
				alert("越界了");
			}
		},
		tralef: function (ele) {
			var pos = $.pos(ele, $.cancelCmd("tra lef 6"));
			if (pos) {
				$.run(ele.chess.element, pos, "plane");
				ele.chess.position = pos;
			} else {
				alert("越界了");
			}
		}
	};
	return strategies;
});