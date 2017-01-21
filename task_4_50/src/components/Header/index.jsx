import React from 'react';
import Icon from '../Icon/index';

const Header = ({ data }) => {
	const { icon, title, sm_title } = data; 
    return (
        <header className="header">
        	<strong className="header-title">
       			<Icon name={icon} />
       			{title}
       		</strong>
            <span className="sm-title">{sm_title}</span>
        </header>
    );
};

export default Header;