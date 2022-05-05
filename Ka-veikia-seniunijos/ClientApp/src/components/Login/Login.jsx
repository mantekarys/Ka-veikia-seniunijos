import React, { useState } from 'react';
import Input from '../Form/Input';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import Error from '../Error/Error';
import FormFooter from '../Form/Footer/FormFooter';
import LoadingSpinner from '../LoadingSpiner/LoadingSpinner';
import PropTypes from 'prop-types';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Login({ onClose, onLoginRedirect }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);

    const handleOnSubmit = async () => {
        if (fieldsAreEmpty()) return;
        setIsSpinnerVisible(true);
        axios.post('https://localhost:44330/api/user/auth', {
                'email': email,
                'password': password
            })
            .then(res => {
                const isEldership = res.data.FirstName && res.data.LastName ? false : true;
                const data = {
                    ...res.data,
                    isEldership
                }
                sessionStorage['userData'] = JSON.stringify(data);
                window.location.href = "http://localhost:3000/home";
            })
            .catch(err => {
                const {message} = err.response.data;
                setIsSpinnerVisible(false);
                setErrorMessage(message);
            })
    }

    const fieldsAreEmpty = () => {
        if (!email || !password) {
            setErrorMessage('Visi laukai yra būtini');
            return true;
        } 
    }


    return (
        <Popup>
            <div className='login__container'>
                {isSpinnerVisible && <LoadingSpinner />}
                <FontAwesomeIcon className='form__icon' icon={faXmark} onClick={onClose} />
                <h2 className='header__secondary u-text-center'>Prisijungimas</h2>

                <form className='login__content' method='post' onSubmit={handleOnSubmit}>
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

                    {errorMessage && <Error text={errorMessage} />}
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