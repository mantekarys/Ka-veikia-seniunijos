import React from 'react';
import UserRadio from '../../Radio/UserRadio'; 
import Button from '../../Button/Button';
import '../../style.css';
import PropTypes from 'prop-types';

export default function SignupUserType({ onTypeChange, onClick }) {
    return (
        <div className='signup__type-container'>
            <h3 className='header__tertiary u-text-center'>Pasirinkiti registracijos tipą</h3>
            <UserRadio
                firstOption='Gyventojas'
                secondOption='Seniūnija'
                onTypeChange={onTypeChange}
                onClick={onClick}
            />
            <div className='login__button-wrapper'>
                <Button
                    text='Toliau'
                    styling='btn btn--login'
                    type='submit'
                    onClick={onClick}
                />
            </div>
        </div>
    );
}

SignupUserType.prototype = {
    onTypeChange: PropTypes.func,
    onClick: PropTypes.func
}
