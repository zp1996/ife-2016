import { Data } from '../utils';

const question = (state=Object.create(null), action) => {
	switch(action.type) {
		case 'ADD_QUESTION':
			return Data.addQuestion();
		default:
			return state;
	}
};

export default question;

