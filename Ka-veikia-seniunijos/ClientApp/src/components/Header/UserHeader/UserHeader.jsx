import React, { useState } from 'react';
import Button from '../../Button/Button';
import LoadingSpiner from '../../LoadingSpiner/LoadingSpinner';
import UserPicture from '../../../images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import '../../style.css';

export default function UserHeader() {
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const handleLogOut = () => {
        setIsLoaderVisible(true);

        const timer = setTimeout(() => {
            setIsLoaderVisible(false);
        }, 1500);
    }

    return (
        <header className='header__user'>
            {isLoaderVisible && <LoadingSpiner />}

            <div className='header__user-info'>
                <FontAwesomeIcon className='header__user-icon' icon={faCaretDown} />
                <h4 className='header__user-name'>Patrikas</h4>
                <img src={UserPicture} alt='Vartotojo nuotrauka' className='header__user-picture' />
            </div>
        </header>
    );
}

