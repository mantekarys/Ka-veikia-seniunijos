import React from 'react';
import './_slider-style.scss';
import '../Utils/_typography.scss';
import PropTypes from 'prop-types';

export default function Slide({highlightText, leadingText, backgroundImage}) {
    return (
        <div className='slide'>
            <div
                className='slide__content'
                style={{ backgroundImage: `linear-gradient(105deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 50%, transparent 50%), url(${backgroundImage})` }}>
                <div className='slide__content-text'>
                    <h1>
                        <span className='highlight highlight-text'>
                            {highlightText}
                        </span>
                        <br />
                        <span className='highlight-text--follow'>
                            {leadingText}
                        </span>
                    </h1>
                </div>
            </div>

            <div class="dots-container">
                <span class="dot dot--active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
     );
}

Slide.prototype = {
    highlightText: PropTypes.string,
    leadingText: PropTypes.string,
    backgroundImage: PropTypes.string
}