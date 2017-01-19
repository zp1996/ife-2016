import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Div from './div';
import Test from './Test';


render(
	<Router history={browserHistory}>
		<Route path="/" component={Div} />
		<Route path="/test" component={Test} />
	</Router>,
	document.getElementById('root')
);

console.log('success, so nice!');

