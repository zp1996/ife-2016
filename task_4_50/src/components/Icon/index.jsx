import React, { PropTypes } from 'react';

const Icon = ({ name, handleClick }) => (
	<i className={`icon-${name}`} onClick={handleClick}></i>
);

Icon.propTypes = {
	name: PropTypes.string.isRequired
};

export default Icon;