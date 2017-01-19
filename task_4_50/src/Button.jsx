import React from 'react';

const Button = ({ text, handleClick }) => (
	<button onClick={handleClick}>
		{text}
	</button>
);

export default Button;