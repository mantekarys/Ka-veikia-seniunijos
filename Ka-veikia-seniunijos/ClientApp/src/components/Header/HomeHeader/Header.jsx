import React, { useContext } from 'react';
import Button from '../../Button/Button';
import Login from '../../Login/Login';
import Signup from '../../Signup/Signup';
import Sidebar from '../../Sidebar/Sidebar';
import { GlobalContext } from '../Context/HeaderState';
import BarIcon from '../../Icons/BarIcon/BarIcon';
import '../../style.css';

export default function Header() {
    const {
        state,
        toggleLoginPopup,
        toggleSignupPopup,
        toggleSidebar
    } = useContext(GlobalContext);

    const handleOnLoginRedirect = () => {
        toggleLoginPopup();
        toggleSignupPopup();
    }

    const handleSignupRedirect = () => {
        toggleSignupPopup();
        toggleLoginPopup();
    }

    const getSidebarContent = () => {
        return [
            {
                text: 'Prisijungti',
                onClick: toggleLoginPopup
            },
            {
                text: 'Registruotis',
                onClick: toggleSignupPopup
            },
            {
                text: 'Apie projektą',
                onClick: () => window.location.href = 'http://localhost:3000/about'
            }
        ];
    }
    
    return (
        <header className='header'>
            {state.isSidebarOpen && <Sidebar onClose={toggleSidebar} content={getSidebarContent()}/>}

            <BarIcon wrapperStyling='header__icon-wrapper' onClick={toggleSidebar} />

            <div className='header__button-wrapper'>
                <Button
                    text='Prisijungti'
                    styling='btn btn--header'
                    onClick={toggleLoginPopup}
                />

                <Button
                    text='Registruotis'
                    styling='btn btn--header'
                    onClick={toggleSignupPopup}
                />
            </div>

            {state.isLoginOpen &&
                <Login
                    onClose={toggleLoginPopup}
                    onLoginRedirect={handleOnLoginRedirect}
                />
            }
            {state.isSignupOpen &&
                <Signup
                    onClose={toggleSignupPopup}
                    onSignupRedirect={handleSignupRedirect}
                />
            }
        </header>
    );
}