import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Icon = ({ name, handleClick, extendClass }) => {
	const classes = classnames({
		[extendClass]: extendClass,
		[`icon-${name}`]: true
	});
	return (
		<i className={classes} 
			onClick={handleClick}>
		</i>
	);
};
Icon.propTypes = {
	name: PropTypes.string.isRequired
};

export default Icon;