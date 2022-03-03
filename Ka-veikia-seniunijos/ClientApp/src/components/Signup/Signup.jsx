import React, { useState } from 'react';
import Popup from '../Popup/Popup';
import Input from '../Form/Input';
import Dropdown from '../Form/Dropdown';
import Button from '../Button/Button';
import SignupUserType from './SignupUserType/SignupUserType';
import FormFooter from '../Form/Footer/FormFooter';
import Error from '../Error/Error';
import PropTypes from 'prop-types';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Signup({ onClose, onSignupRedirect }) {
    const [userType, setUserType] = useState('Gyventojas');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [area, setArea] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isUserTypeSelected, setIsUserTypeSelected] = useState(false);
    const [isFormInvalid, setIsFormInvalid] = useState(false);

    const handleOnTypeChange = (userType) => {
        setUserType(userType);
    }

    const handleOnNextClick = () => {
        setIsUserTypeSelected(true);
    }

    const handleOnChange = (e) => {
        e.target.classList.remove('form__dropdown--default');
        setArea(e.target.value);
    }

    const handleOnSubmit = () => {
        if (!name || !surname || !email || !area || !password || !passwordRepeat) {
            setIsFormInvalid(true);
            setErrorMessage('* Visi laukai yra būtini')
            return;
        }

        if (!validatePassword()) return;

    }

    const validatePassword = () => {
        if (password !== passwordRepeat) {
            setIsFormInvalid(true);
            setErrorMessage('* Slaptažodžiai turi sutapti')
            return false;
        }

        if (password.length <= 8) {
            setIsFormInvalid(true);
            setErrorMessage('* Slaptažodžio ilgis turi būti nemažiau nei 8')
            return false;
        }

        return true;
    }

    return (
        <Popup>
            <div className='login__container login__container--signup'>
                <FontAwesomeIcon className='form__icon' icon={faXmark} onClick={onClose} />
                <h2 className='header__secondary u-text-center'>Registracija</h2>
                {!isUserTypeSelected &&
                    <SignupUserType onTypeChange={handleOnTypeChange} onClick={handleOnNextClick} />
                }

                {isUserTypeSelected && <form className='signup__content'>
                    <div className="login__input-wrapper">
                        <Input
                            className='login__input'
                            type='text'
                            placeholder='Vardas'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="login__input-wrapper">
                        <Input
                            className='login__input'
                            type='text'
                            placeholder='Pavardė'
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>

                    <div className="login__input-wrapper">
                        <Input
                            className='login__input'
                            type='email'
                            placeholder='El. paštas'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="login__input-wrapper">
                        <Dropdown
                            styling='form__dropdown form__dropdown--default'
                            placeholder='Savivaldybė'
                            values={['Vilnius', 'Kaunas']}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="login__input-wrapper">
                        <Input
                            className='login__input'
                            type='password'
                            placeholder='Slaptažodis'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="login__input-wrapper">
                        <Input
                            className='login__input'
                            type='password'
                            placeholder='Pakartokite slaptažodį'
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                        />
                    </div>

                    <div className='login__button-wrapper'>
                        <Button
                            text='Registruotis'
                            styling='btn btn--login'
                            type='submit'
                            onClick={handleOnSubmit}
                        />
                    </div>

                    {isFormInvalid && <Error text={errorMessage} />}
                </form>}

                <FormFooter
                    paragraphText='Turite paskyrą?'
                    textButtonMessage='Prisijungti'
                    onClick={onSignupRedirect}
                />
            </div>
        </Popup>
    );
}

Signup.prototype = {
    onClose: PropTypes.func,
    onSignupRedirect: PropTypes.func
}
