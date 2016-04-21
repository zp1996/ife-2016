define(["Node"], function (Node) {
	function Path (map, start, end) {
		this.openList = [];
		this.closeList = [];
		this.map = map;
		this.mapRow = map.length;    // 地图
		this.mapCol = map[0].length;
		this.sNode = new Node(start.x, start.y, null);
		this.eNode = new Node(end.x, end.y, null);
		this.cost = 10;   // 上下移动时G值的增加量
	}
	Path.fn = Path.prototype;
	/**
	 * 创建路径
	 * @param  null
	 * @return boolean    
	 */
	Path.fn.create = function () {
		this.openList.push(this.sNode);
		return this.search(this.sNode, this.eNode);
	};
	/**
	 * 查找路径
	 * @param  起始节点,终止节点
	 * @return boolean    
	 */
	Path.fn.search = function () {
		var resultList = [],
			flag = false,  // 是否找到标识
			node = null;
		while (this.openList.length > 0) {
			node = this.openList[0];
			// 检测是否找到
			if (node.X === this.eNode.X && node.Y === this.eNode.Y) {
				flag = true;
				break;
			}
			if (node.X - 1 >= 0) {
				this.checkPath(node.X - 1, node.Y, node);
			}
			if (node.Y + 1 <= this.mapRow) {
				this.checkPath(node.X, node.Y + 1, node);
			}
			if (node.Y - 1 >= 0) {
				this.checkPath(node.X, node.Y - 1, node);
			}
			if (node.X + 1 <= this.mapCol) {
				this.checkPath(node.X + 1, node.Y, node);
			}
			this.closeList.push(this.openList.shift());
			this.openList.sort(function (a, b) {
				return a.F - b.F;
			});
		}
		if (flag) {
			resultList = this.pathTo(node);
		}
		return resultList;
	};
	/**
	 * 检查该点
	 * @param  x坐标,y坐标,父节点
	 * @return void 0    
	 */
	Path.fn.checkPath = function (x, y, parentNode) {
		var node = new Node(x, y, parentNode);   
		// 可以通过情况
		if (this.map[x][y] === 2) {
		  this.closeList.push(node);
			return void 0;
		}
		// 查看close内是否有
		if (this.contains(this.closeList, x, y) !== - 1) {
			return void 0;
		}
		var index = this.contains(this.openList, x, y);
		this.count(node);
		if (index === - 1) {
			this.openList.push(node);
		} else {
			if (parentNode.G + this.cost < this.openList[index].G) {
				this.openList[index] = node;
			}
		}
	};
	/**
	 * 数组中是否还有该点
	 * @param  arr,X,Y
	 * @return -1 || node  
	 */
	Path.fn.contains = function (list, x, y) {
		var i = -1;
		list.forEach(function (value, id) {
			if (value.X === x && value.Y === y) {
				i = id;
			}
		});
		return i;
	}; 
	/**
	 * 计算F,G,H值
	 * @param  当前节点
	 * @return void 0    
	 */
	Path.fn.count = function (node) {
		this.countG(node);
		this.countH(node);
		this.countF(node);
	};
	/**
	 * 计算G值
	 * @param  当前节点
	 * @return void 0    
	 */
	Path.fn.countG = function (node) {
		if (node.parent === null) {
			node.G = 0;
		} else {
			node.G = node.parent.G + this.cost;
		}
	};
	/**
	 * 计算H值
	 * @param  当前节点
	 * @return void 0    
	 */
	Path.fn.countH = function (node) {
		node.H = (Math.abs(this.eNode.X - node.X) + 
						  Math.abs(this.eNode.Y - node.Y) ) * 10;
	};
	/**
	 * 计算F值
	 * @param  当前节点
	 * @return void 0    
	 */
	Path.fn.countF = function (node) {
		node.F = node.H + node.G;
	};
	/**
	 * 取出路径
	 * @param  当前节点
	 * @return array    
	 */
	Path.fn.pathTo = function (node) {
		var path = [];
		while (node.parent) {
			path.unshift(node);
			node = node.parent;
		}
		return path;
	};
	return Path;
});