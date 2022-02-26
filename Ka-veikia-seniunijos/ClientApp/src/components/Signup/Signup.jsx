import React, { useState } from 'react';
import Popup from '../Popup/Popup';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Signup() {
    const [userType, setUserType] = useState('');
    const [isUserTypeSelected, setIsUserTypeSelected] = useState(false);

    return (
        <Popup>
            <div className='login__container'>
                <FontAwesomeIcon className='form__icon' icon={faXmark} />
                <h2 className='header__secondary u-text-center'>Registracija</h2>

                <div className='signup__type-container'>
                    <h2 className='header__secondary u-text-center'>Pasirinkiti registracijos tipą</h2>
                </div>
            </div>
        </Popup>
    );
}