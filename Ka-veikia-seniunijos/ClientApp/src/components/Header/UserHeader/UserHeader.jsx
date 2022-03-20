import React, { useState, useLayoutEffect } from 'react';
import BarIcon from '../../Icons/BarIcon/BarIcon';
import NavigationList from '../../NavigationList/NavigationList';
import Sidebar from '../../Sidebar/Sidebar';
import UserPicture from '../../../images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function UserHeader() {
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

    return (
        <header className='header__user'>
            {isMobile && !isSidebarOpen && <BarIcon wrapperStyling='header__icon-wrapper' onClick={() => setIsSidebarOpen(true)} />}
            {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} /> }
            {!isMobile &&
                <div className='header__user-info'>
                    <div className='header__user-info-wrapper'>
                    <FontAwesomeIcon className='header__user-icon' icon={faCaretDown} onClick={() => setIsNavListVisible(!isNavListVisible)} />
                        <h4 className='header__user-name'>Patrikas</h4>

                        {isNavListVisible && <NavigationList />}
                    </div>

                    <img src={UserPicture} alt='Vartotojo nuotrauka' className='header__user-picture' />
                </div>
            }
        </header>
    );
}

