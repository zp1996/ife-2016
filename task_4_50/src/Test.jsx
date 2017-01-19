import React from 'react';
import Button from './Button';

function handleClick() {
	console.log('click button');
}

const Test = () => (
	<div>
		<Button text="Click" handleClick={handleClick} />
	</div>
);

export default Test;