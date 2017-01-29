import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon/index';

const classPrefix = 'icon-button';

const IconButton = ({ handleClick, text, icon, isActive }) => {
	const classes = classnames({
		[`${classPrefix}`]: true,
		[`${classPrefix}-active`]: isActive
	});
	return (
		<button className={classes} onClick={handleClick}>
			<Icon name={icon} />
			{text}
		</button>
	);
};

IconButton.propTypes = {
	text: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired
};

IconButton.defaultProps = {
	handleClick: () => {},
	isActive: false
};

export default IconButton;