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
import axios from 'axios';

export default function MessageForm({ onClose, eldershipName }) {
    const [messageTopic, setMessageTopic] = useState('');
    const [message, setMessage] = useState('');
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmited, setIsSubmited] = useState(false);
    const sessionData = JSON.parse(sessionStorage['userData']);

    const handleOnSubmit = () => {
        if (!message) {
            setErrorMessage('Žinutė negali būti tuščia!');
            setIsFormInvalid(true);
        }

        axios.get(`https://localhost:44330/api/eldership/getEldership/${eldershipName}`)
        .then(response => {
            return axios.post('https://localhost:44330/api/message', {
                sender: sessionData.FirstName ? sessionData.FirstName : sessionData.Name,
                senderType: 'user',
                receiver: eldershipName,
                receiverType: 'eldership',
                topic: messageTopic,
                text: message,
                FkUser: sessionData.Id,
                FkEldership: response.data.Id
            })
        })
        .then(_ => {
            setIsSubmited(true);
            setMessage('');
            setMessageTopic('');
        }).catch(error => console.error(error));
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
                {isSubmited && <p className='message-form__success-message'>Pranešimas buvo sėkmingai išsiųstas</p>}
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
    onClose: PropTypes.func,
    eldershipName: PropTypes.string
}