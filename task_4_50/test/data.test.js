const assert = require('chai').assert,
	mocha = require('mocha'),
	Data = require('../src/utils').Data,
	default_title = require('../src/config').default_title;

describe('测试数据操作相关', function() {
	const { data } = Data;
	it('初始化数据', function() {
		assert(data.next_id === 0);
		assert(data.items.prototype !== Object);
	});
	it('新增问卷', function() {
		Data.addItem({
			title: default_title,
			questions: []
		});
		assert(data.next_id === 1);
		assert(data.items['0'].title === default_title);
	})
});