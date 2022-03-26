import React from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'


export default function Sidebar({ onClose, content }) {
    return (
        <div className='sidebar'>
            <FontAwesomeIcon className='form__icon' icon={faXmark} onClick={onClose} />
            <ul className='sidebar__list'>
                {content.map(({ text, onClick }, index) => {
                    return (
                        <li className='sidebar__list--item' key={index}>
                            <Button
                                text={text}
                                styling='btn--sidebar'
                                onClick={onClick}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

Sidebar.prototype = {
    onClose: PropTypes.func,
    content: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func
    }))
}