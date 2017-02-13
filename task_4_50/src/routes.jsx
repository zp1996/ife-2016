import React from 'react';
import { Route } from 'react-router';
import Index from './containers/index';
import DataQuestion from './containers/Question';
import Answer from './containers/Answer';

const routers = (
    <div>
        <Route path="/" component={Index} />
        <Route path="/add-question" component={DataQuestion} />
        <Route path="/question/:id" component={DataQuestion} />
        <Route path="/answer/:id" component={Answer} />
    </div>    
);

export default routers;