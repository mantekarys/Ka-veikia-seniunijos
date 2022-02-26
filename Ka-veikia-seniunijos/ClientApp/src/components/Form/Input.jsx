import React from 'react';
import PropTypes from 'prop-types';
import '../style.css';

export default function Input({ type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            className='form__input'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

Input.propTypes  = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}