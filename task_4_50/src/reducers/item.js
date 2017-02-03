import { Data, clone } from '../utils';

const item = (state=Data.data, action) => {
	switch(action.type) {
		case 'ADD_ITEM':
			return Data.addItem(action.info);
		case 'DEL_ITEM':
			return Data.delItem(action.id);
		case 'CHANGE_TITLE':
			return Data.changeTitle(action.id, action.title);
		case 'CHANGE_DATE':
			return Data.changeDate(action.id, action.date);
		default: 
			return state;
	}
};

export default item;