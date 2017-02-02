import { Data, clone } from '../utils';

const item = (state=Data.data, action) => {
	switch(action.type) {
		case 'ADD_ITEM':
			return Data.addItem(action.info);
		case 'DEL_ITEM':
			return Data.delItem(action.id);
		default: 
			return state;
	}
};

export default item;