/*
 * 利用localStroage进行数据存储
 * 数据结构如下a：
 * {
 *    next_id: xxx,
 *    items: {
 *      '0': {
 *          title: xxx,
 *          status: 0,   // 0 未发布 1 发布中 -1 已经结束
 *          questions: {
 *             '0': {
 *                  type: xxx, 
 *                  title: xxx,
 *                  options: {
 *                      '0': xxxx
 *                 } 
 *              }
 *          }
 *       }
 *    } 
 * }
 */
var g;
try {
    g = window;
} catch(e) {
    g = global;
}
class Data {
    constructor() {
        var data = this.readLocalStorage();
        this.data = data == null ? Data.defaultData() : JSON.parse(data).data;
    } 
    readLocalStorage() {
        return g.localStorage && g.localStorage.getItem('data');
    }
    writeLocalStroage() {
        g.localStorage && g.localStorage.setItem(
            'data', 
            JSON.stringify(this)
        );
    }
    addItem({ title, questions, status, date }) {
        const item = Object.create(null),
            { data } = this;
        item.title = title;
        item.questions = questions;
        item.status = status;
        item.date = date;

        data.items[data.next_id++] = item;
        data.items.length++;

        this.writeLocalStroage();
        return data;
    }
    delItem(id) {
        const { data } = this;
        delete data.items[id];
        data.items.length--;
        this.writeLocalStroage();
        return data;
    }
    addQuestion({ pid, type, title, options }) {
        const { data } = this,
            item = data[pid];
        
    }
    static defaultData() {
        const data = Object.create(null);
        data.next_id = 0;
        data.items = Object.create(null);
        data.items.length = 0;
        return data;
    }
}

const utils = {
    Data: new Data(),
    getDays: (year, month) => {
        return new Date(year, month, 0).getDate();
    },
    getFirstDate: (year, month) => {
        return new Date(year, month - 1, 1).getDay();
    }
};

module.exports = utils;