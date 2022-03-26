import React, { useState } from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

export default function GridElement({ text }) {
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [isParagraphVisible, setIsParagraphVisible] = useState(true);

    const handleOnHover = () => {
        setIsParagraphVisible(false);
        setIsButtonVisible(true);
    }

    const handleOnLeave = () => {
        setIsButtonVisible(false);
        setIsParagraphVisible(true);
    }


    return (
        <div className='grid__element' onMouseEnter={handleOnHover} onMouseLeave={ handleOnLeave }>
            <div className='grid__element--header'>
                <img className='grid__img' src={require(`../../images/${text}.png`)} alt={text}></img>
            </div>
            <div className='grid__element--footer'>
                <div className='grid__element--footer-wrapper'>
                    <h3
                        className={`header__tertiary ${isParagraphVisible ? '' : 'header--hidden'}`}>
                        {text}
                    </h3> 
                    <Button
                        text='Daugiau'
                        styling={`btn btn--header btn--animated ${isButtonVisible ? '' : 'btn--hidden'}`}
                        onClick={() => window.location.href = `http://localhost:3000/eldership?eldership=${text}`}
                    />
                </div>
            </div>
        </div>
    );
}

GridElement.propTypes = {
    text: PropTypes.string,
}