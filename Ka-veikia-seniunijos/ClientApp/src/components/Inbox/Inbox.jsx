import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
import './_inbox-style.scss';
import '../Utils/_utilities.scss';
import '../Utils/_typography.scss';
import axios from 'axios';

export default function Inbox() {
    const [activeTab, setActiveTab] = useState('received');
    const [wasSentClicked, setWasSentClicked] = useState(false);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const {Id, isEldership} = JSON.parse(sessionStorage['userData']);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://localhost:44330/api/message/${Id}/${!isEldership}/received`)
        .then(response => {
            setReceivedMessages(response.data.sort((a, b) => new Date(b.Date) - new Date(a.Date)))
            setIsLoading(false);
        })
        .catch(err => console.error(err));
    }, []);

    const handleOnTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'sent' && !wasSentClicked) {
            setWasSentClicked(true);
            fetchSentMessages();
        }
    }

    const fetchSentMessages = async () => {
        setIsLoading(true);
        await axios.get(`https://localhost:44330/api/message/${Id}/${!isEldership}/sent`)
        .then(response => {
            setIsLoading(false);
            setSentMessages(response.data.sort((a, b) => new Date(b.Date) - new Date(a.Date)));
        })
        .catch(err => console.error(err));
    }

    console.log(sentMessages)

    const renderMessages = (messages) => (
        <>
            {messages.map((message, index) => (
                <div className="inbox__content-item" key={index}>
                    <span className="message-sender">{activeTab === 'received' ? message.Sender : message.Receiver}</span>
                    <span className="message-topic">{message.Topic}</span>
                    <span className="message-date">{message.Date.slice(0, 10)}</span>
                </div>
            ))}
        </>
    );
    

    return (
        <div className="inbox__container">
            <div className="inbox__tabs">
                <span
                    className='inbox__tabs-name'
                    onClick={() => handleOnTabClick('received')}
                >
                    Gautos žinutės
                </span>
                <span
                    className='inbox__tabs-name '
                    onClick={() => handleOnTabClick('sent')}
                >
                    Išsiųstos žinutės
                </span>
                <hr className={`inbox__tabs-border ${activeTab === 'received' ? 'inbox__tabs-border--received' : 'inbox__tabs-border--sent'}`}/>
            </div>

            <div className="inbox__content">
                {((activeTab === 'received' && !receivedMessages.length) || (activeTab === 'sent' && !sentMessages.length)) && !isLoading &&
                 <div className='inbox__content-no-results'>
                    <span className='inbox-error-message'>
                        {`Jūs neturite ${activeTab === 'received' && !receivedMessages.length ? 'gautų' : 'išsiųstų'} pranešimų`}
                        <FontAwesomeIcon className='inbox-error-message-icon' icon={faFaceSadTear} />
                    </span>
                </div>}
                {isLoading && <div className='loading-spinner' /> }
                {((activeTab === 'received' && receivedMessages.length) || (activeTab === 'sent' && sentMessages.length)) && !isLoading &&
                    <>
                        {activeTab === 'received' ? renderMessages(receivedMessages) : renderMessages(sentMessages)}
                    </>
                }

                {/* <div className="inbox__content-item">
                    <span className="message-sender">Vilniaus seniūnija</span>
                    <span className="message-topic">Atsakymas</span>
                    <span className="message-date">03-22</span>
                </div>

                <div className="inbox__content-item inbox__content-item--black">
                    <span className="message-sender">Vilniaus seniūnija</span>
                    <span className="message-topic">Atsakymas</span>
                    <span className="message-date">03-22</span>
                </div>

                <div className="inbox__content-item">
                    <span className="message-sender">Vilniaus seniūnija</span>
                    <span className="message-topic">Atsakymas</span>
                    <span className="message-date">03-22</span>
                </div>

                <div className="inbox__content-item inbox__content-item--black">
                    <span className="message-sender">Vilniaus seniūnija</span>
                    <span className="message-topic">Atsakymas</span>
                    <span className="message-date">03-22</span>
                </div>

                <div className="inbox__content-item">
                    <span className="message-sender">Vilniaus seniūnija</span>
                    <span className="message-topic">Atsakymas</span>
                    <span className="message-date">03-22</span>
                </div>

                <div className="inbox__content-item inbox__content-item--black">
                    <span className="message-sender">Vilniaus seniūnija</span>
                    <span className="message-topic">Atsakymas</span>
                    <span className="message-date">03-22</span>
                </div>

                <div className="inbox__content-item">
                    <span className="message-sender">Vilniaus seniūnija</span>
                    <span className="message-topic">Atsakymas</span>
                    <span className="message-date">03-22</span>
                </div>

                <div className="inbox__content-item inbox__content-item--black">
                    <span className="message-sender">Vilniaus seniūnija</span>
                    <span className="message-topic">Atsakymas</span>
                    <span className="message-date">03-22</span>
                </div>

                <div className="inbox__content-item">
                    <span className="message-sender">Vilniaus seniūnija</span>
                    <span className="message-topic">Atsakymas</span>
                    <span className="message-date">03-22</span>
                </div>

                <div className="inbox__content-item inbox__content-item--black">
                    <span className="message-sender">Vilniaus seniūnija</span>
                    <span className="message-topic">Atsakymas</span>
                    <span className="message-date">03-22</span>
                </div> */}
            </div>
        </div>
    );
}