import React from 'react';
import '../style.css';
import PropTypes from 'prop-types';

export default function TextArea({
    styling,
    onClick,
    onChange,
    value,
    placeholder,
    limit = 200,
    rows = 4,
    cols = 50 }) {

    return (
        <textarea
            className={`text-area ${styling}`}
            onClick={onClick}
            onChange={onChange}
            value={value}
            rows={rows}
            cols={cols}
            maxLength={limit}
            placeholder={`${placeholder ? placeholder : ''} (max. simbolių - ${limit})`}
        >

        </textarea>
    );
}

TextArea.prototype = {
    styling: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    limit: PropTypes.number,
    rows: PropTypes.number,
    cols: PropTypes.number
}