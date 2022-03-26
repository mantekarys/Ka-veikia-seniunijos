import React, { createContext, useReducer } from "react";
import EldershipReducer from './EldershipReducer';

const initialState = {
    isMessageFormOpen: false
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EldershipReducer, initialState);


    const toggleMessageForm = () => {
        dispatch({ type: 'TOGGLE_MESSAGE', isMessageFormOpen: !state.isMessageFormOpen })
    }

    return (
        <GlobalContext.Provider value={{
            state: state,
            toggleMessageForm
        }}>
            {children}
        </GlobalContext.Provider>
    );
}