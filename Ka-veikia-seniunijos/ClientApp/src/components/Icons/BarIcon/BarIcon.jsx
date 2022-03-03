import React from 'react';
import './_bar-icon-style.scss';
import PropTypes from 'prop-types';

export default function BarIcon({ wrapperStyling, onClick }) {
    return (
        <div className={wrapperStyling} onClick={onClick}>
            <span className='bar__icon'>&nbsp;</span>
        </div>
    );
}

BarIcon.prototype = {
    wrapperStyling: PropTypes.string,
    onClick: PropTypes.string
}