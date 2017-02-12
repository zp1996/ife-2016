import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Index from './containers/index';
import DataQuestion from './containers/Question';
import Answer from './containers/Answer';

const routers = () => (
	<Router history={browserHistory}>
		<Route path="/" component={Index} />
		<Route path="/add-question" component={DataQuestion} />
		<Route path="/question/:id" component={DataQuestion} />
		<Route path="/answer/:id" component={Answer} />
	</Router>
);

export default routers;