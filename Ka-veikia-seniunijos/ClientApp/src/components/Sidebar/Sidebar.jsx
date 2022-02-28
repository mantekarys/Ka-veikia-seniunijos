import React from 'react';
import PropTypes from 'prop-types';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'


export default function Sidebar({ onClose }) {
    return (
        <div className='sidebar'>
            <FontAwesomeIcon className='form__icon' icon={faXmark} onClick={onClose} />
        </div>
    );
}

Sidebar.prototype = {
    onClose: PropTypes.func
}