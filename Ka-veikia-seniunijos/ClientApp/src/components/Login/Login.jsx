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

export default function Login({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleOnSubmit = () => {
        if (!email || !password) {
            setIsFormInvalid(true);
            setErrorMessage('* Visi laukai yra būtini');
            return;
        }
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
                            className='login__input'
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
                            className='login__input'
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
                />
            </div>
        </Popup>
   );
}

Login.prototype = {
    onClose: PropTypes.func
}