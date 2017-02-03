import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { noop } from '../../utils';

const Mask = ({ handleClick, children, refFunc }) => (
	<ReactCSSTransitionGroup 
		transitionName="mask"
		transitionEnterTimeout={300}
        transitionLeaveTimeout={500}
	>				
		<div className="mask" 
			onClick={handleClick}
			ref={(ref) => refFunc(ref)}
		>
			{children}
		</div>
	</ReactCSSTransitionGroup>
);
Mask.propTypes = {
	handleClick: PropTypes.func.isRequired,
	refFunc: PropTypes.func.isRequired
};
Mask.defaultProps = {
	handleClick: noop
};

export default Mask;