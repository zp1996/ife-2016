import React from 'react';
import Button from './Button';
import { Link } from 'react-router'; 

function handleClick() {
	console.log('click button');
}

const Test = () => (
	<div>
		<Button text='Click' handleClick={handleClick} />
		<Link to='/'>回首页</Link>
	</div>
);

export default Test;