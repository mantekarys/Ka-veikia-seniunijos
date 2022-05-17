import React, { useState } from 'react'
import userImage from '../../images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

export default function MessageTeaser({messageContent, getDate, getTime}) {
    const {FirstName, Name} = JSON.parse(sessionStorage['userData']);
    const [isContentOpen, setIsContentOpen] = useState(false);

    return (
        <>
            <div className='message-teaser' onClick={() => setIsContentOpen(!isContentOpen)}>
                <span className='message-teaser__icon'>
                    {(messageContent.Sender === Name || messageContent.Sender === FirstName) ? 
                        <FontAwesomeIcon icon={faReply} /> :
                        <img src={messageContent.SenderType === 'eldership' ? require(`../../images/${messageContent.Sender}.png`) : userImage} alt='user' className='user-picture'/>
                    }
                    
                </span>
                <span className='message-teaser__name'>{messageContent.Sender}</span>
                <span className='message-teaser__text'>-{messageContent.Text}</span>
                <span className='message-teaser__date'>{getDate(messageContent.Date)} {getTime(messageContent.Date)}</span>
            </div>
            {isContentOpen &&
                <div className='message-text-wrapper'>
                    <p className='message-text'>
                        {messageContent.Text}
                    </p>
                </div>
            }
        </>
    )
}
