import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import '../../style.css';

export default function FormFooter({ paragraphText, textButtonMessage, onClick }) {
    return (
        <div className='form__footer'>
            <p className='paragraph paragraph--grey'>{paragraphText}</p>
            <div className='form__footer-text-button-wrapper'>
                <Button
                    text={textButtonMessage}
                    styling='btn--text btn--text-grey'
                    onClick={onClick}
                />
            </div>
        </div>
    );
}

FormFooter.propTypes = {
    paragraphText: PropTypes.string,
    textButtonMessage: PropTypes.string,
    onClick: PropTypes.func
}

