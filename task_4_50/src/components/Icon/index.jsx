import React, { PropTypes } from 'react';

const Icon = ({ name }) => (
	<i className={`icon-${name}`}></i>
);

Icon.propTypes = {
	name: PropTypes.string.isRequired
};

export default Icon;