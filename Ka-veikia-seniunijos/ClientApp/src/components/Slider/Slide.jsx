import React from 'react';
import Button from '../Button/Button';
import './_slider-style.scss';
import '../Utils/_typography.scss';
import PropTypes from 'prop-types';

export default function Slide({ highlightText, leadingText, backgroundImage, index, activeSlide, href }) {
    return (
        <div className={`slide slide--${index}`}>
            <div
                className='slider__container-box'
                style={{
                    backgroundImage: `linear-gradient(105deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 50%, transparent 50%), url(${backgroundImage})`,
                    transform: `translateX(${activeSlide === 0 ? 0 : -activeSlide * 100}%)`
                }}
            >
                <div className='slide__content'>
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
                    <Button
                        text={['Daugiau ', <>&#8594;</>]}
                        styling='btn--slide'
                        href={href}
                    />
                </div>
            </div>
        </div>
     );
}

Slide.prototype = {
    highlightText: PropTypes.string,
    leadingText: PropTypes.string,
    backgroundImage: PropTypes.string,
    key: PropTypes.number,
    activeSlide: PropTypes.number,
    href: PropTypes.string
}