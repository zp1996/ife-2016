import React, { Component } from 'react';
import { Link } from 'react-router'; 
import Button from './components/Button/index';

class Div extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Button text="新建" />
				<Button text="删除" />
				<Button text="查看数据" />
				<p>Hello World!</p>
				<i className='icon-question-sign'></i>
				<Link to='/test'>link to test</Link>
			</div>
		);
	}
}

export default Div;