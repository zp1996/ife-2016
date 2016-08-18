define(["util", "drag", "layer"], function ($, Drag, Layer) {
	var layer = new Layer({
		title: "SHSF",
		content: "<h1 class='layer-h'>百度前端学院任务</h1>"
	});
	function end () {
		return layer.alert({
			title: "SHSF",
			content: "SHSF出品,欢迎拍砖"
		});
	}
	$("#btn").onclick = function () {
		layer.open()
		.then(function () {
			return layer.alert({
				title: "SHSF",
				content: "layer演示"
			});
		})
		.then(function () {
			return layer.confirm({
				title: "SHSF",
				content: "是否继续"
			});
		})
		.then(function () {
			return layer.prompt({
				title: "填写"
			});
		})
		.then(end, end);
		// layer.open({ 
		// 	yes: function () {
				// layer.confirm({
				// 	title: "SHSF",
				// 	content: "是否继续",
		// 			callback: {
		// 				yes: function () {
		// 					layer.alert({
		// 						content: "layer演示继续",
		// 						callback: {
		// 							yes: function () {
										// layer.prompt({
										// 	title: "填写",
		// 									callback: {
		// 										yes: function () {
		// 											layer.alert({
		// 												title: "SHSF",
		// 												content: "SHSF出品,欢迎拍砖"
		// 											})
		// 										},
		// 										no: function () {
													// layer.alert({
													// 	title: "SHSF",
													// 	content: "SHSF出品,欢迎拍砖"
													// })
		// 										}
		// 									}
		// 								});	
		// 							}
		// 						}
		// 					})
		// 				},
		// 				no: function () {
		// 					layer.alert({
		// 						title: "SHSF",
		// 						content: "SHSF出品,欢迎拍砖"
		// 					});
		// 				}
		// 			}
		// 		});
		// 	},
		// 	no: function () {
		// 		layer.alert({
		// 			title: "SHSF",
		// 			content: "SHSF出品,欢迎拍砖"
		// 		});
		// 	}
		// });
	}
});