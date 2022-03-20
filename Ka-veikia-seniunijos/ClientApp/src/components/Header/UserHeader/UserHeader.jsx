import React, { useState } from 'react';
import Button from '../../Button/Button';
import BarIcon from '../../Icons/BarIcon/BarIcon';
import NavigationList from '../../NavigationList/NavigationList';
import LoadingSpiner from '../../LoadingSpiner/LoadingSpinner';
import UserPicture from '../../../images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import '../../style.css';

export default function UserHeader() {
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [isNavListVisible, setIsNavListVisible] = useState(false);

    const handleOnArrowClick = () => {
        setIsNavListVisible(!isNavListVisible);
    }

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
                <div className='header__user-info-wrapper'>
                    <FontAwesomeIcon className='header__user-icon' icon={faCaretDown} onClick={handleOnArrowClick} />
                    <h4 className='header__user-name'>Patrikas</h4>

                    {isNavListVisible && <NavigationList /> }
                </div>

                <img src={UserPicture} alt='Vartotojo nuotrauka' className='header__user-picture' />
            </div>
        </header>
    );
}

