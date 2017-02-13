import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Header from './components/Header/index';
import routes from './routes';

import reducer from './reducers/index';
import styles from './index.scss';

const initialState = window.__INITIAL_STATE__,
	store = createStore(reducer, initialState);

render(
	<Provider store={store}>
		<div>
			<Header />
			<Router history={browserHistory}>
				{routes}
			</Router>
		</div>
	</Provider>,
	document.getElementById('root')
);