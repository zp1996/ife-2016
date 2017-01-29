var g;
try {
    g = window;
} catch(e) {
    g = global;
}
/*
 * 利用localStroage进行数据存储
 * 数据结构如下：
 * {
 *    next_id: xxx,
 *    items: {
 *      '0': {
 *          title: xxx,
 *          status: 0,
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
class Data {
    constructor() {
        var data = this.readLocalStorage();
        this.data = data == null ? Data.defaultData() : JSON.parse(data);
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
    addItem({ title, questions }) {
        const item = Object.create(null),
            { data } = this;
        item.title = title;
        item.questions = questions;
        data.items[data.next_id++] = item;
        return data;
    }
    delItem(id) {
        const { data } = this;
        delete data.items[id];
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
        return data;
    }
}

const utils = {
    Data: new Data()
}

module.exports = utils;