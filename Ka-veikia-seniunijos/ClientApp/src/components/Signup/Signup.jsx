import React, { useState } from 'react';
import Popup from '../Popup/Popup';
import Button from '../Button/Button';
import SignupUserType from './SignupUserType/SignupUserType';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Signup() {
    const [userType, setUserType] = useState('Gyventojas');
    const [isUserTypeSelected, setIsUserTypeSelected] = useState(false);

    const handleOnTypeChange = (userType) => {
        setUserType(userType);
    }

    const handleOnNextClick = () => {
        setIsUserTypeSelected(true);
    }

    return (
        <Popup>
            <div className='login__container'>
                <FontAwesomeIcon className='form__icon' icon={faXmark} />
                <h2 className='header__secondary u-text-center'>Registracija</h2>
                {!isUserTypeSelected &&
                    <SignupUserType onTypeChange={handleOnTypeChange} onClick={handleOnNextClick} />
                }

            </div>
        </Popup>
    );
}


