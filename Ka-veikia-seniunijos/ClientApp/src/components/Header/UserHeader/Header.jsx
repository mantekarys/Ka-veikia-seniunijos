import React, { useState, useLayoutEffect } from 'react';
import BarIcon from '../../Icons/BarIcon/BarIcon';
import NavigationList from '../../NavigationList/NavigationList';
import Sidebar from '../../Sidebar/Sidebar';
import UserPicture from '../../../images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faMap, faArrowRightFromBracket, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const [isNavListVisible, setIsNavListVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useLayoutEffect(() => {
        const updateSize = () => {
            window.innerWidth <= 600 ? setIsMobile(true) : setIsMobile(false);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleOnProfileClick = () => {
        const { name, surname } = JSON.parse(sessionStorage['userData']);
        window.location.href = `http://localhost:3000/profile?name=${name}.${surname}`;
    }

    const handleOnMessageClick = () => {

    }

    const handleOnMapClick = () => {

    }

    const handleOnLogoutClick = () => {
        sessionStorage.removeItem('userData');
        window.location.href = 'http://localhost:3000/';
    }

    const getNavigationListContent = () => {
        return [
            {
                text: 'Profilis',
                icon: faUser,
                onClick: handleOnProfileClick
            },
            {
                text: 'Žinutės',
                icon: faEnvelope,
                onClick: handleOnMessageClick
            },
            {
                text: 'Žemėlapis',
                icon: faMap,
                onClick: handleOnMapClick
            }, 
            {
                text: 'Atsijungti',
                icon: faArrowRightFromBracket,
                onClick: handleOnLogoutClick
            }
        ];
    }

    return (
        <header className='header__user'>
            {isMobile && !isSidebarOpen && <BarIcon wrapperStyling='header__icon-wrapper' onClick={() => setIsSidebarOpen(true)} />}
            {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} content={getNavigationListContent()} />}
            {!isMobile &&
                <div className='header__user-info'>
                    <div className='header__user-info-wrapper'>
                    <FontAwesomeIcon className='header__user-icon' icon={faCaretDown} onClick={() => setIsNavListVisible(!isNavListVisible)} />
                        <h4 className='header__user-name'>Patrikas</h4>

                    {isNavListVisible && <NavigationList content={getNavigationListContent() }/>}
                    </div>

                    <img src={UserPicture} alt='Vartotojo nuotrauka' className='header__user-picture' />
                </div>
            }
        </header>
    );
}

