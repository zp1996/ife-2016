const assert = require('chai').assert,
	mocha = require('mocha'),
	utils = require('../src/utils'),
	{ Data } = utils,
	{ getDays } = utils,
	{ getFirstDate } = utils,
	default_title = require('../src/config').default_title;

function loopArr(arr, days) {
	const len = arr.length;
	for (let i = 0; i < len; i++) {
		assert(
			getDays(2016, arr[i]) === days
		);
	}
}
function isRun(year) {
	return !(
		year % 4 || (year % 100 === 0 && year % 400 !== 0)
	);
}

describe('测试数据操作相关', () => {
	const { data } = Data;
	it('初始化数据', () => {
		assert(data.next_id === 0);
		assert(data.items.prototype !== Object);
	});
	it('新增问卷', () => {
		Data.addItem({
			title: default_title,
			questions: []
		});
		assert(data.next_id === 1);
		assert(data.items['0'].title === default_title);
	})
});

describe('测试日历操作相关', () => {
	const thirtyOne = [1, 3, 5, 7, 8, 10, 12],
		thirty = [4, 6, 9, 11];
	it(`${thirtyOne.join(' ')}为31天`, () => {
		loopArr(thirtyOne, 31);
	});
	it(`${thirty.join(' ')}为30天`, () => {
		loopArr(thirty, 30);
	});
	it('2为28天或者29天', () => {
		for (let i = 1990; i <= 2017; i++) {
			const day = isRun(i) ? 29 : 28;
			assert(getDays(i, 2) === day);
		}
	});
	it('测试每月第一天的星期', () => {
		assert(getFirstDate(2017, 2) === 3);
		assert(getFirstDate(2017, 1) === 0);
		assert(getFirstDate(2016, 12) === 4);
		assert(getFirstDate(2016, 11) === 2);
		assert(getFirstDate(2016, 10) === 6);
		assert(getFirstDate(2016, 6) === 3);
	});
});