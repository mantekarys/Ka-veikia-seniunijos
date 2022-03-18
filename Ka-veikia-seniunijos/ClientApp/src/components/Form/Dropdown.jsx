import React from 'react';
import PropTypes from 'prop-types';
import '../style.css';

export default function Dropdown({ values, placeholder, styling, onChange }) {
    return (
        <select className={styling} onChange={onChange}>
            <option defaultValue="" selected disabled hidden>{placeholder}</option>
            {values.map((name, key) => {
                return <option key={key} value={name}>{name}</option>
            })}
        </select>
    );
}

Dropdown.prototype = {
    values: PropTypes.array,
    placeholder: PropTypes.string,
    styling: PropTypes.string,
    onChange: PropTypes.func
}