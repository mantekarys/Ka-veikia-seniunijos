import React from 'react';
import PropTypes from 'prop-types';

export default function UserRadio({ firstOption, secondOption, onTypeChange }) {
    return (
        <div className='user-radio-wrapper'>
            <input type="radio" name="select" id="option-1" className='radio' checked />
            <input type="radio" name="select" id="option-2" className='radio' />
            <label htmlFor="option-1" className="option option-1" onClick={() => onTypeChange(firstOption)}>
                <div className="dot"></div>
                <span>{firstOption}</span>
            </label>
            <label htmlFor="option-2" className="option option-2" onClick={() => onTypeChange(secondOption)}>
                <div className="dot"></div>
                <span>{secondOption}</span>
            </label>
        </div>
    );
}

UserRadio.propTypes = {
    firstOption: PropTypes.string,
    secondOption: PropTypes.string,
    onTypeChange: PropTypes.func
}