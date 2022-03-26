import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './_navigation-list-style.scss';
import '../Utils/_base.scss';
import PropTypes from 'prop-types';

export default function NavigationList({ content }) {
    return (
        <ul className='navigation-list__container'>
            {content.map(({ text, icon, onClick }, index) => {
                return (
                    <li className='navigation-list__item' key={index}>
                        <a onClick={onClick}>
                            {icon ? <FontAwesomeIcon className='navigation-list__icon' icon={icon} /> : ''}
                            {text}
                        </a>
                    </li>  
               );
            })}
        </ul>
    );
}

NavigationList.prototype = {
    content: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }))
}