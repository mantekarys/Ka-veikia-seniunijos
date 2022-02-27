import React, { useContext } from 'react';
import Button from '../../Button/Button';
import Login from '../../Login/Login';
import Signup from '../../Signup/Signup';
import { GlobalContext } from '../../Pages/Home/Context/GlobalState';
import '../../style.css';

export default function HomeHeader() {
    const { state, toggleLoginPopup, toggleSignupPopup } = useContext(GlobalContext);
    
    return (
        <header className='header'>
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

            {state.isLoginOpen && <Login onClose={toggleLoginPopup} />}
            {state.isSignupOpen && <Signup onClose={toggleSignupPopup} />}
        </header>
    );
}