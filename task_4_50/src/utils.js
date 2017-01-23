/*
 * 利用localStroage进行数据存储
 * 数据结构如下：
 * {
 *    next_id: xxx,
 *    data: {
 *      '0': {
 *          title: xxx,
 *          status: 0,
 *          questions: []
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
// const id = 0;
// const utils = {
//     data: Object.create(null),
//     readLocalStorage: function() {
//         const data = window.localStorage.getItem('data');
//         this.data = data == null ? this.data : JSON.parse(data);
//         return this.data;
//     },
//     writeLocalStroage: function() {
//         window.localStorage.setItem('data', JSON.stringify(this.data));
//     },
//     getNextItemId: function() {
//         return this.data.next_id;
//     },
//     add: function() {
//         return this.valueBase(function() {
//             const itemId = this.id || id;
//             this.update(itemId, {
//                 title: default_title,
//                 questions: []
//             });
//         });
//         return this.data;
//     },
//     del: function(id) {
//         return this.valueBase(function(id) {
//             delete this.value[id];
//         }, id); 
//     },
//     update: function(...args) {
//         return this.valueBase(function(id, item) {
//             const questions = this.value[id] || (this.value[id] = []);
//             questions.push(item);
//             this.value.id = ++item.id;
//         }, args);
//     },
//     addQuestion: function(...args) {
//         return this.questionBase(function(questions, question) {
//             questions.push(question);
//         }, args);
//     },
//     updateTitle: function(...args) {
//         return this.questionBase(function(questions, title) {
//             questions.title = title;
//         }, args);
//     },
//     updateQuestion: function(...args) {
//         return this.questionBase(function(questions, id, question) {
//             questions[id] = question;
//         }, args);             
//     },
//     delQuestion: function(...args) {
//         return this.questionBase(function(questions, id) {
//             questions.splice(id, 1);
//         }, args);
//     }   
// };

module.exports = utils;