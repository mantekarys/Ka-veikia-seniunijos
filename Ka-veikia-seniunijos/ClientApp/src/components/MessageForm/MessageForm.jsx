import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Form/Input';
import TextArea from '../Form/TextArea';
import Error from '../Error/Error';
import './_message-form-style.scss';
import '../Utils/_base.scss';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

// TODO: add verification if user wants to send mssg without topic
// TODO: add success message or banner after message was sent

export default function MessageForm({ onClose }) {
    const [messageTopic, setMessageTopic] = useState('');
    const [message, setMessage] = useState('');
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOnSubmit = () => {
        if (!message) {
            setErrorMessage('Žinutė negali būti tuščia!');
            setIsFormInvalid(true);
        }
    }

    return (
        <div className='message-form__container'>
            <FontAwesomeIcon className='form__icon' icon={faXmark} onClick={onClose} />
            <h2 className='header__secondary u-text-center u-margin-top-medium'>Nauja žinutė</h2>

            <form className='message-form__content' onSubmit={handleOnSubmit}>
                <Input
                    styling='form__input'
                    type='text'
                    placeholder='Žinutės tema'
                    value={messageTopic}
                    onChange={e => setMessageTopic(e.target.value)}
                />

                <TextArea
                    placeholder='Žinutės tekstas'
                    limit={1000}
                    styling='message-form__textarea'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />

                {isFormInvalid && <Error text={errorMessage} />}

                <div className='login__button-wrapper'>
                    <Button
                        text='Siųsti'
                        styling='btn btn--header'
                        type='submit'
                        onClick={handleOnSubmit}
                    />
                </div>
            </form>
        </div>
    );
}

MessageForm.prototype = {
    onClose: PropTypes.func
}