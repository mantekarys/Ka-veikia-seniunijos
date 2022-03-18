import React, { useState } from 'react';
import Input from '../Form/Input';
import Button from '../Button/Button';
import './_user-profile-styling.scss';
import '../Utils/_utilities.scss';
import '../Utils/_typography.scss';
import userProfile from '../../images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'

// If user type is resident - display dropdown

export default function UserProfile() {
    const [name, setName] = useState('Vardas');
    const [surname, setSurname] = useState('Pavardė');
    const [email, setEmail] = useState('Paštas');
    const [isEditEnabled, setIsEditEnabled] = useState(false);

    const hadleIconClick = (e) => {
        e.target.classList.add('user-profile__icon--black');
        e.target.closest('.user-profile__input-container').childNodes[0]
            .classList.add('user-profile__input--edit');

        setIsEditEnabled(true);
    }

    const handleOnSubmit = () => {
        
    }

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
                        <div className='user-profile__input-container'>
                            <Input
                                styling='form__input user-profile__input'
                                type='text'
                                placeholder={name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={true}
                            />
                            <span>
                                <FontAwesomeIcon icon={faPen} className='user-profile__icon' onClick={hadleIconClick} />
                            </span>
                        </div>

                        <div className='user-profile__input-container'>
                            <Input
                                styling='form__input user-profile__input'
                                type='text'
                                placeholder={surname}
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                disabled={true}
                            />
                            <span>
                                <FontAwesomeIcon icon={faPen} className='user-profile__icon' onClick={hadleIconClick} />
                            </span>
                        </div>

                        <div className='user-profile__input-container'>
                            <Input
                                styling='form__input user-profile__input'
                                type='text'
                                placeholder={email}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={true}
                            />
                            <span>
                                <FontAwesomeIcon icon={faPen} className='user-profile__icon' onClick={hadleIconClick} />
                            </span>
                        </div>
                    </div>

                    {isEditEnabled &&
                        <div className='user-profile__button-wrapper'>
                        <Button
                            text='Išsaugoti'
                            styling='btn btn--user-profile'
                            type='submit'
                        />
                    </div>
                 }
                </div>
            </div>
        </div>
    );
}