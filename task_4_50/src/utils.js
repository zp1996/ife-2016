/*
 * 利用localStroage进行数据存储
 * 数据结构如下a：
 * {
 *    next_id: xxx,
 *    items: {
 *      '0': {
 *          id: 0,
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
    baseChange(id, key, val) {
        const { data } = this;
        data.items[id][key] = val;
        return data;
    }
    changeTitle(id, title) {
        return this.baseChange(id, 'title', title);
    }
    changeDate(id, date) {
        return this.baseChange(id, 'date', date);
    }
    addItem({ title, questions, status, date }) {
        const { data } = this,
            item = {
                title,
                questions,
                status,
                date,
                id: data.next_id
            };
        data.items[data.next_id++] = item;
        this.writeLocalStroage();
        return data;
    }
    delItem(id) {
        const { data } = this;
        delete data.items[id];
        this.writeLocalStroage();
        // 删除时,需要变化data的引用,不然不能触发redux的更新
        return clone(data);
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

const clone = (obj) => {
    const res = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (Array.isArray(obj[key])) {
                res[key] = obj[key].slice();
            } else if (obj[key] instanceof Object) {
                res[key] = clone(obj[key]);
            } else {
                res[key] = obj[key];
            }  
        }
    }
    return res;
};

const utils = {
    Data: new Data(),
    getDays: (year, month) => {
        return new Date(year, month, 0).getDate();
    },
    getFirstDate: (year, month) => {
        return new Date(year, month - 1, 1).getDay();
    },
    clone
};

module.exports = utils;