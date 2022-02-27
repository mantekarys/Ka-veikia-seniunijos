import React, { createContext, useReducer } from "react";
import HomeReducer from './HomeReducer';

const initialState = {
    isLoginOpen: false,
    isSignupOpen: false
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

    return (
        <GlobalContext.Provider value={{
            state: state,
            toggleLoginPopup,
            toggleSignupPopup
        }}>
            {children}
        </GlobalContext.Provider>
    );
}