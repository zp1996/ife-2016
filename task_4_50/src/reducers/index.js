import { combineReducers } from 'redux';
import config from './config';
	
const data = combineReducers({
	header: config.header
});

export default data;