import React, { useContext } from 'react';
import Button from '../../Button/Button';
import Login from '../../Login/Login';
import Signup from '../../Signup/Signup';
import { GlobalContext } from '../../Pages/Home/Context/GlobalState';
import BarIcon from '../../Icons/BarIcon/BarIcon';
import '../../style.css';

export default function HomeHeader() {
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
    
    return (
        <header className='header'>
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