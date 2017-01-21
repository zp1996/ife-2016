import React, { Component } from 'react';
import { Link } from 'react-router'; 

class Div extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<p>Hello World!</p>
				<i className='icon-question-sign'></i>
				<Link to='/test'>link to test</Link>
			</div>
		);
	}
}

export default Div;