import React, { useState } from 'react';
import './_user-profile-styling.scss';
import '../Utils/_utilities.scss';
import '../Utils/_typography.scss';
import userProfile from '../../images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'

export default function UserProfile() {
    return (
        <div className='user-profile__container'>
            <div className='user-profile__header'>
                <h2 className='header__secondary u-text-center u-padding-medium'>Profilis</h2>
            </div>
            <div className='user-profile__card'>
                <div className='user-profile__card--left'>
                    <div className='user-profile__picture-container'>
                        <img src={userProfile} alt='user profile picture' className='image' />
                    </div>
                </div>

                <div className='user-profile__card--right'>
                    <div className='user-profile__info-container'>
                        <p className='paragraph'>Vardas <FontAwesomeIcon icon={faPen} /></p>
                        <p className='paragraph'>Pavardė <FontAwesomeIcon icon={faPen} /></p>
                        <p className='paragraph'>Paštas <FontAwesomeIcon icon={faPen} /></p>
                    </div>
                </div>
            </div>
        </div>
    );
}