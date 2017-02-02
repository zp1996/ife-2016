import { Data } from '../utils';

const question = (state=Object.create(null), action) => {
	switch(action.type) {
		case 'ADD_QUESTION':
			return Data.addQuestion();
		case 'TOGGLE_ITEM':
			return Data.data.items[action.id];
		default:
			return state;
	}
};

export default question;

