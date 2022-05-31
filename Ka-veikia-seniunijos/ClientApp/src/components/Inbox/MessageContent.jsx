import React, { useState } from 'react'
import userImage from '../../images/user-profile.png';
import TextArea from '../Form/TextArea';
import Error from '../Error/Error';
import MessageTeaser from './MessageTeaser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faArrowLeft, faReply } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './_inbox-style.scss';
import axios from 'axios';

export default function MessageContent({ message, onBack, activeTab }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [messageText, setMessageText] = useState('');
    const {FirstName, Name, isEldership} = JSON.parse(sessionStorage['userData']);

    const isToday = (date) => {
        const today = new Date()
        date = new Date(date);
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    const getDate = (date) => {
        const index = date.indexOf('T');
        const parsedDate = date.slice(0, index);

        return (
            <>
                {isToday(parsedDate) ? `Šiandien ${parsedDate}` : parsedDate}
            </>
        );
    }

    const getTime = (date) => {
        const index = date.indexOf('T');
        return (
            <>
                {date.slice(index + 1, date.length - 3)}
            </>
        );
    }

    const handleOnSend = () => {
        if(!messageText) {
            setErrorMessage('Žinutė negali būti tuščia!');
            return;
        }
        message=message[0]
        axios.post('https://localhost:44330/api/message', {
            Sender: isEldership ? Name : FirstName,
            SenderType: isEldership ? 'eldership' : 'user',
            Receiver: isEldership ? message.Sender : message.Receiver,
            ReceiverType: isEldership ? 'user' : 'eldership',
            Topic: message.Topic,
            Text: messageText,
            FkUser: message.FkUser,
            FkEldership: message.FkEldership,
            Reply: message.Id
        })
        .then(_ => {
            window.location.reload();
        }).catch(error => console.error(error))
    }

    const renderLastMessage = (messageContent) => (
        <div className='last-message'>
            <div className='message-teaser message-teaser--last'>
                <span className='message-teaser__icon'>
                    {(messageContent.Sender === Name || messageContent.Sender === FirstName) ?
                        <FontAwesomeIcon icon={faReply} /> :
                        <img src={messageContent.SenderType === 'eldership' ? require(`../../images/${messageContent.Sender}.png`) : userImage} alt='user' className='user-picture'/>
                    }
                </span>
                <span className='message-teaser__name'>{messageContent.Sender}</span>
                <span className='message-teaser__text'>- {messageContent.Text}</span>
                <span className='message-teaser__date'>{getDate(messageContent.Date)} {getTime(messageContent.Date)}</span>
            </div>

            <div className='message-text-wrapper'>
                <p className='message-text'>
                    {messageContent.Text}
                </p>
            </div>

            {activeTab === 'received' && ((isEldership && messageContent.Sender !== Name) || (FirstName && messageContent.Sender !== FirstName)) &&
                <div className='message-input-wrapper'>
                    <TextArea 
                        placeholder='Žinutės tekstas'
                        styling='message-input'
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                    />

                    <Error text={errorMessage} />
                    <div className='message-button-wrapper'>
                        <a className='btn send-button' onClick={handleOnSend}>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                            <span className='send-button__text'>Siųsti</span>
                        </a>
                    </div>
                </div>
            }
        </div>
    )

    const renderMessagesContent = () => (
        <>
            {message.map((messageReply, index) => (
                <>
                    {index + 1 === message.length ? 
                        renderLastMessage(messageReply) :
                        <MessageTeaser messageContent={messageReply} getDate={getDate} getTime={getTime}/>
                    }
                </>
            ))}
        </>
    )

    return (
        <div className='message-content'>
            <div className='message-header'>
                <div className='message-header__date'>
                    <FontAwesomeIcon icon={faArrowLeft} className='icon-arrow' onClick={onBack} />
                    <span>{getDate(message[0].Date)} {getTime(message[0].Date)}</span>
                </div>
                <h2 className='header__secondary'>{message[0].Topic}</h2> 
            </div>
            <div className='messages-container'>
                {message.length === 1 ?
                    renderLastMessage(message[0]) :
                    renderMessagesContent()
                }
            </div>
        </div> 
    )
}


MessageContent.propTypes = {
    onBack: PropTypes.func,
    message: PropTypes.arrayOf(PropTypes.shape({
        Date: PropTypes.string,
        Id: PropTypes.number,
        sender: PropTypes.string,
        senderType: PropTypes.string,
        receiver: PropTypes.string,
        receiverType: PropTypes.string,
        topic: PropTypes.string,
        text: PropTypes.string,
        FkUser: PropTypes.number,
        FkEldership: PropTypes.number,
        reply: PropTypes.number
    })),
    activeTab: PropTypes.string
}