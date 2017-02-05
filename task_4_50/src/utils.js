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
 *          questions: [
 *             {
 *                  type: xxx, 
 *                  title: xxx,
 *                  options: {
 *                      '0': xxxx
 *                 } 
 *              }
 *          ]
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
    static getAnswer = {
        text: (answer, question) => {
            question.answers.push(answer.value);
        },
        radio: (answer, question) => {
            question.options[answer.value].count++;
        },
        check: (answer, question) => {
            const arr = answer.value,
                { length } = arr;
            for (let i = 0; i < length; i++) {
                question.options[arr[i]].count++;
            }
        }
    }
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
    updateQuestions(id, questions) {
        return this.baseChange(id, 'questions', questions);
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
    changeItem(id, fn) {
        const { data } = this;
        fn(data);
        this.writeLocalStroage();
        // 需要变化data的引用,不然不能触发redux的自动更新
        return clone(data);
    }
    delItem(id) {
        return this.changeItem(id, ({ items }) => {
            delete items[id];
        });
    }
    addQuestion({ pid, type, title, options }) {
        const { data } = this,
            item = data[pid];
                
    }
    publishItem(id) {
        return this.changeItem(id, ({ items }) => {
            items[id].status = 1;
        });
    }
    answerItem(id, answers) {
        const { length } = answers,
            { data: { items } } = this,
            { questions } = items[id];
        for (let i = 0; i < length; i++) {
            Data.getAnswer[questions[i].type](
                answers[i], questions[i]
            );
        }
        this.writeLocalStroage();
        return this.data;
    }
    static defaultData() {
        const data = Object.create(null);
        data.next_id = 0;
        data.items = Object.create(null);
        return data;
    }
}

const clone = (obj) => {
    if (typeof obj !== 'object') return obj;
    const flag = Array.isArray(obj),
        res = flag ? [] : {};
    if (flag) {
        const len = obj.length;
        for (let i = 0; i < len; i++) {
            res[i] = typeof obj[i] !== 'object' ? 
                obj[i] : clone(obj[i]);
        }
    }  else {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) { 
                res[key] = typeof obj[key] !== 'object' ? 
                    obj[key] : clone(obj[key]);
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
    noop: () => {},
    clone,
    getDomData: (dom, val) => {
        return dom.getAttribute(`data-${val}`);
    }
};

module.exports = utils;