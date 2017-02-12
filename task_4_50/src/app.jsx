import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Router from './router';
import Header from './components/Header/index';

import config from './config';
import reducer from './reducers/index';

import styles from './index.scss';

const store = createStore(reducer);

render(
	<Provider store={store}>
		<div>
			<Header data={config.header} />
			<Router />
		</div>
	</Provider>,
	document.getElementById('root')
);