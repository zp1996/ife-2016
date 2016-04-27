define(["common", "drag", "layer"], function ($, Drag, Layer) {
	var layer = new Layer();
	$("#btn").onclick = function () {
		layer.open({
			yes: function () {
				layer.confirm({
					title: "SHSF",
					content: "是否继续",
					callback: {
						yes: function () {
							layer.alert({
								content: "layer演示继续",
								callback: {
									yes: function () {
										layer.prompt({
											title: "填写",
											callback: {
												yes: function () {
													layer.alert({
														title: "SHSF",
														content: "SHSF出品,欢迎拍砖"
													})
												},
												no: function () {
													layer.alert({
														title: "SHSF",
														content: "SHSF出品,欢迎拍砖"
													})
												}
											}
										});	
									}
								}
							})
						},
						no: function () {
							layer.alert({
								title: "SHSF",
								content: "SHSF出品,欢迎拍砖"
							});
						}
					}
				});
			},
			no: function () {
				layer.alert({
					title: "SHSF",
					content: "SHSF出品,欢迎拍砖"
				});
			}
		});
	}
});