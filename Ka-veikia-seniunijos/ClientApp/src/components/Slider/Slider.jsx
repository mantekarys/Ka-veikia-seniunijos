import React from 'react';
import Slide from './Slide';
import './_slider-style.scss';
import EventImage from '../../images/koncertas.jpeg';
import PropTypes from 'prop-types';

export default function Slider({ styling }) {
    return (
        <div className={styling}>
            <div className='slider'>
                <Slide
                    highlightText='Renginiai'
                    leadingText='seniūnijose'
                    backgroundImage={EventImage}
                />
            </div>
        </div>
     );
}

Slider.prototype = {
    styling: PropTypes.string
}