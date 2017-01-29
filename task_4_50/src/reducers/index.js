import { combineReducers } from 'redux';
import item from './item'; 
import question from './question';
	
const data = combineReducers({
	item,
	question
});

export default data;