import React, { createContext, useReducer } from "react";
import HomeReducer from './HomeReducer';

const initialState = {
    isLoginOpen: false,
    isSignupOpen: false,
    isSidebarOpen: false
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(HomeReducer, initialState);

    const toggleLoginPopup = () => {
        dispatch({ type: 'TOGGLE_LOGIN', isOpen: !state.isLoginOpen })
    }

    const toggleSignupPopup = () => {
        dispatch({ type: 'TOGGLE_SIGNUP', isOpen: !state.isSignupOpen })
    }

    const toggleSidebar = () => {
        dispatch({ type: 'TOGGLE_SIDEBAR', isOpen: !state.isSidebarOpen })
    }

    return (
        <GlobalContext.Provider value={{
            state: state,
            toggleLoginPopup,
            toggleSignupPopup,
            toggleSidebar
        }}>
            {children}
        </GlobalContext.Provider>
    );
}