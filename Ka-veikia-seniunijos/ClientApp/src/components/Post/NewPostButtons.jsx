import React from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

export default function NewPostButtons({ onBack, onSubmit }) {
    return (
        <div className='buttons__container'>
            {onBack && 
                <Button
                    text='Atgal'
                    styling='btn btn--post-small'
                    onClick={onBack}
                />
            }

            <Button
                text={onBack ? 'Skelbti' : 'Atnaujinti'}
                styling='btn btn--post-small'
                onClick={onSubmit}
            />
        </div>
    );
}

NewPostButtons.propTypes = {
    onBack: PropTypes.func,
    onSubmit: PropTypes.func
}