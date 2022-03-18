import React from 'react';
import Button from '../../Button/Button';
import Popup from '../../Popup/Popup';
import MessageForm from '../../MessageForm/MessageForm';
import eldershipPhoto from '../../../images/Vilnius.png';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMap } from '@fortawesome/free-solid-svg-icons';
import './_eldership-style.scss';
import '../../Utils/_base.scss';

export default function EldershipFeedContent({ photo, eldershipName }) {
    return (
        <div className='eldership__content'>
            <div className='eldership__photo-container'>
                <img
                    src={eldershipPhoto}
                    alt={'Vilnius'}
                    className='eldership__photo' />
            </div>

            <div className='eldership__header--content'>
                <h1 className='header__primary eldership__header'>Vilniaus seniūnija</h1>

                <div className='eldership__header--buttons'>
                    <Button
                        text={<FontAwesomeIcon icon={faEnvelope} />}
                        styling='btn btn--icon'
                    />

                    <Button
                        text={<FontAwesomeIcon icon={faMap} />}
                        styling='btn btn--icon'
                    />
                </div>
            </div>


        </div>
    );
}

EldershipFeedContent.prototype = {
    photo: PropTypes.string.isRequired,
    eldershipName: PropTypes.string.isRequired
}