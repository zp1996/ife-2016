import { Data } from '../utils';

const numberRE = /\/(\d+)$/;

const defaultState = function() {
	try {
		var { href } = location
	} catch(e) {
		href = '';
	}
	const matches = href.match(numberRE),
		id = matches && matches[1];
	return id == null ? Object.create(null) : Data.data.items[id];
};

const question = (state=defaultState(), action) => {
	switch(action.type) {
		case 'ADD_QUESTION':
			return Data.addQuestion(action.type);
		case 'TOGGLE_ITEM':
			return Data.data.items[action.id];
		default:
			return state;
	}
};

export default question;

