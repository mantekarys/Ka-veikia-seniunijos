import React, { useState } from 'react';
import Input from '../Form/Input';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import Error from '../Error/Error';
import FormFooter from '../Form/Footer/FormFooter';
import PropTypes from 'prop-types';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { login } from '../../API/auth';

export default function Login({ onClose, onLoginRedirect }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOnSubmit = async () => {
        if (fieldsAreEmpty()) return;
        const [userData, error] = await login({email,password})
        if(error != null){
            setFormError(error);
            return;
        }
        sessionStorage['userData'] = JSON.stringify(userData);
        window.location.href = "http://localhost:3000/home";
    }

    const fieldsAreEmpty = () => {
        if (!email || !password) {
            setFormError('* Visi laukai yra būtini');
            return true;
        } 
    }

    const setFormError = (message) => {
        setIsFormInvalid(true);
        setErrorMessage(message);
    }

    return (
        <Popup>
            <div className='login__container'>
                <FontAwesomeIcon className='form__icon' icon={faXmark} onClick={onClose} />
                <h2 className='header__secondary u-text-center'>Prisijungimas</h2>

                <form className='login__content'>
                    <div className="login__input-wrapper">
                        <span>
                            <FontAwesomeIcon className='form__placeholder-icon' icon={faEnvelope} />
                        </span>
                        <Input
                            styling='form__input'
                            type='text'
                            placeholder='El. paštas'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="login__input-wrapper">
                        <span>
                            <FontAwesomeIcon className='form__placeholder-icon' icon={faLock} />
                        </span>
                        <Input
                            styling='form__input'
                            type='password'
                            placeholder='Slaptažodis'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='login__button-wrapper'>
                        <Button
                            text='Prisijungti'
                            styling='btn btn--login'
                            type='submit'
                            onClick={handleOnSubmit}
                        />
                    </div>

                    {isFormInvalid && <Error text={errorMessage} />}
                </form>

                <FormFooter
                    paragraphText='Neturite paskyros?'
                    textButtonMessage='Sukurti paskyrą'
                    onClick={onLoginRedirect}
                />
            </div>
        </Popup>
   );
}

Login.prototype = {
    onClose: PropTypes.func,
    onLoginRedirect: PropTypes.func
}