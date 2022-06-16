import React, { useEffect, useContext, useState } from 'react';
import Button from '../../Button/Button';
import Login from '../../Login/Login';
import Signup from '../../Signup/Signup';
import Sidebar from '../../Sidebar/Sidebar';
import { GlobalContext } from '../Context/HeaderState';
import BarIcon from '../../Icons/BarIcon/BarIcon';
import { useLocation } from 'react-router-dom';
import '../../style.css';

export default function Header() {
    const { state, toggleLoginPopup, toggleSignupPopup, toggleSidebar } =
    useContext(GlobalContext);

    const [isAtTop, setIsAtTop] = useState(true);
    const location = useLocation();

    useEffect(() => {
    window.onscroll = () => {
        if (window.pageYOffset === 0) setIsAtTop(true);
        else setIsAtTop(false);
    };

    return () => (window.onscroll = null);
    }, []);

    const handleOnLoginRedirect = () => {
    toggleLoginPopup();
    toggleSignupPopup();
    };

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
                text: 'Žemėlapis',
                onClick: () => window.location.href = 'http://localhost:3000/map?events=true&places=true&free=true'
            },
            {
                text: 'Apie projektą',
                onClick: () => window.location.href = 'http://localhost:3000/about'
            }
        ];
    }
    

  return (
    <header className={location.pathname === '/home' || location.pathname === '/' ?
    `header ${isAtTop && !state.isLoginOpen && !state.isSignupOpen && 'header--hidden'}` :
    'header header--feed'}>

      {state.isSidebarOpen && (
        <Sidebar onClose={toggleSidebar} content={getSidebarContent()} />
      )}
      <div className="button-wrapper">
        <Button
          text="Prisijungti"
          styling="button-wrapper__button"
          onClick={toggleLoginPopup}
        />

        <Button
          text="Registruotis"
          styling="button-wrapper__button"
          onClick={toggleSignupPopup}
        />

        {state.isLoginOpen && (
          <Login
            onClose={toggleLoginPopup}
            onLoginRedirect={handleOnLoginRedirect}
          />
        )}
        {state.isSignupOpen && (
          <Signup
            onClose={toggleSignupPopup}
            onSignupRedirect={handleSignupRedirect}
          />
        )}
      </div>
    </header>
  );
}
