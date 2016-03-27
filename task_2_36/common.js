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
	return $;
});