import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import config from './config';
import reducer from './reducers/index';

import Div from './div';
import Test from './containers/index';
import Header from './components/Header/index';

import styles from './index.scss';

const store = createStore(reducer);

render(
	<Provider store={store}>
		<div>
			<Header data={config.header} />
			<Router history={browserHistory}>
				<Route path="/" component={Div} />
				<Route path="/test" component={Test} />
			</Router>
		</div>
	</Provider>,
	document.getElementById('root')
);

console.log('success, so nice!');