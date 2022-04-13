import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

export default function NewPostHeader({ onClose, text }) {
    return (
        <>
            <FontAwesomeIcon className='form__icon' icon={faXmark} onClick={onClose} />
            <h2 className='header__secondary u-text-center u-margin-top-medium'>
                {text}
            </h2>
        </>
    );
}

NewPostHeader.propTypes = {
    onClose: PropTypes.func,
    text: PropTypes.string
}