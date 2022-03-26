import React, { useState } from 'react';
import './_inbox-style.scss';
import '../Utils/_utilities.scss';
import '../Utils/_typography.scss';

export default function Inbox() {
    const [activeTab, setActiveTab] = useState('reveived');

    return (
        <div className="inbox__container">
            <div className="inbox__tabs">
                <span
                    className={`inbox__tabs-name ${activeTab === 'reveived' ? 'inbox__tabs-name--active' : ''}`}
                    onClick={() => setActiveTab('reveived')}
                >
                    Gautos žinutės
                </span>
                <span
                    className={`inbox__tabs-name ${activeTab === 'sent' ? 'inbox__tabs-name--active' : ''}`}
                    onClick={() => setActiveTab('sent')}
                >
                    Išsiųstos žinutės
                </span>
            </div>

            <div className="inbox__content">
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
            </div>
        </div>
    );
}