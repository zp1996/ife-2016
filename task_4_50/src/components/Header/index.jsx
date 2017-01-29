import React from 'react';
import { browserHistory } from 'react-router';
import Icon from '../Icon/index';

function toIndex(e) {
    e.preventDefault();
    browserHistory.push('/');
}

const Header = ({ data }) => {
    const { icon, title, sm_title } = data; 
    return (
        <header className="header">
            <strong className="header-title">
                <Icon name={icon} />
                {title}
            </strong>
            <a className="sm-title" onClick={toIndex}>{sm_title}</a>
        </header>
    );
};

export default Header;