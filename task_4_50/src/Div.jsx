import React, { Component } from 'react';

class Div extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<p>Hello World!</p>
				<a href='/test'>link to test</a>
			</div>
		);
	}
}

export default Div;