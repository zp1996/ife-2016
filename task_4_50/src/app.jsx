import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import config from './config';
import reducer from './reducers/index';

import Index from './containers/index';
import DataQuestion from './containers/Question';
import Answer from './containers/Answer';
import Header from './components/Header/index';

import styles from './index.scss';

const store = createStore(reducer);

render(
	<Provider store={store}>
		<div>
			<Header data={config.header} />
			<Router history={browserHistory}>
				<Route path="/" component={Index} />
				<Route path="/add-question" component={DataQuestion} />
				<Route path="/question/:id" component={DataQuestion} />
				<Route path="/answer/:id" component={Answer} />
			</Router>
		</div>
	</Provider>,
	document.getElementById('root')
);