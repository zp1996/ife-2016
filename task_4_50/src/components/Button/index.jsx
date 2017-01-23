import React, { PropTypes } from 'react';
import classnames from 'classnames';

const classPrefix  = "button";

const Button = ({ handleClick, text, isActive, isFixed }) => { 
	const classes = classnames({
		[classPrefix]: true,
		[`${classPrefix}-fixed-width`]: isFixed,
		[`${classPrefix}-active`]: isActive
	});
	return (
		<button onClick={handleClick} className={classes}>
			{text}
		</button>
	);
};

Button.propTypes = {
	handleClick: PropTypes.func,
	text: PropTypes.string.isRequired,
	isActive: PropTypes.bool,
	isFixed: PropTypes.bool
};

Button.defaultProps = {
	handleClick: () => {},
	isActive: false,
	isFixed: true
};

export default Button;