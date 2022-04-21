import React, { useState, useEffect } from 'react';
import Slide from './Slide';
import ArrowIcon from '../Icons/ArrowIcon/ArrowIcon';
import './_slider-style.scss';
import EventImage from '../../images/koncertas.jpeg';
import PlaceImage from '../../images/lankytinos-vietos.jpg';
import MapImage from '../../images/map.png';
import PropTypes from 'prop-types';

export default function Slider({ styling }) {
    const [activeSlide, setActiveSlide] = useState(0);

    const handleArrowClick = (side) => {
        if (side === 'left') {
            activeSlide === 0 ? setActiveSlide(2) : setActiveSlide(activeSlide - 1)
        } else {
            activeSlide === 2 ? setActiveSlide(0) : setActiveSlide(activeSlide + 1)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleArrowClick('right');
        }, 7000);

        return () => clearTimeout(timer);
    });

    return (
        <div className={styling}>
            <div className='slider'>
                <Slide
                    highlightText='Renginiai'
                    leadingText='seniūnijose'
                    backgroundImage={EventImage}
                    index={0}
                    activeSlide={activeSlide}
                    href='http://localhost:3000/map?events=true&places=true&free=true'
                />

                <Slide
                    highlightText='Lankytinos'
                    leadingText='vietos seniūnijose'
                    backgroundImage={PlaceImage}
                    index={1}
                    activeSlide={activeSlide}
                    href='http://localhost:3000/map?events=true&places=true&free=true'
                />

                <Slide
                    highlightText='Susisiek'
                    leadingText='su seniūnija'
                    backgroundImage={MapImage}
                    index={2}
                    activeSlide={activeSlide}
                    href={'http://localhost:3000/#grid'}
                />

                <ArrowIcon side='left' onClick={() => handleArrowClick('left')} />
                <ArrowIcon side='right' onClick={() => handleArrowClick('right')} />

                <div className="dots-container">
                    <span className={`dot ${activeSlide === 0 ? 'dot--active' : ''}`}></span>
                    <span className={`dot ${activeSlide === 1 ? 'dot--active' : ''}`}></span>
                    <span className={`dot ${activeSlide === 2 ? 'dot--active' : ''}`}></span>
                </div>
            </div>
        </div>
     );
}

Slider.prototype = {
    styling: PropTypes.string
} 