import React from 'react';
import PropTypes from 'prop-types';
import '../style.css';

export default function Input({ type, placeholder, value, onChange, styling }) {
    return (
        <input
            type={type}
            className={styling}
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
    onChange: PropTypes.func,
    styling: PropTypes.string,
}