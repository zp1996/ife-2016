define([], function () {
	/**
	 * A*算法应用节点
	 * @param  {x坐标,y坐标,父节点}
	 * @return object
	 * @zp
	 */
	var Node = function (x, y, parent) {
		var obj = {
			_x: x, 
			_y: y,
			_g: 0,
			_h: 0,
			_f: 0,
			_parent: parent
		};
		return Object.defineProperties(obj, {
			X: {
				get: function () {
					return this._x;
				}, 
				set: function (value) {
					this._x = value;
				}
			},
			Y: {
				get: function () {
					return this._y;
				},
				set: function (value) {
					this._y = value;
				}
			},
			G: {
				get: function () {
					return this._g;
				},
				set: function (value) {
					this._g = value;
				}
			},
			H: {
				get: function () {
					return this._h;
				},
				set: function (value) {
					this._h = value;
				}
			},
			F: {
				get: function () {
					return this._f;
				},
				set: function (value) {
					this._f = value;
				}
			},
			parent: {
				get: function () {
					return this._parent;
				},
				set: function (value) {
					this._parent = value;
				}
			}
		});
	};
	return Node;
});