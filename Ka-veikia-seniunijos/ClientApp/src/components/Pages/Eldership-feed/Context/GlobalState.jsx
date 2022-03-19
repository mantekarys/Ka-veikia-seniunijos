import React, { createContext, useReducer } from "react";
import EldershipReducer from './EldershipReducer';

const initialState = {
    isSpinerVisible: false,
    isMessageFormOpen: false
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EldershipReducer, initialState);

    const toggleSpiner = () => {
        dispatch({ type: 'TOGGLE_SPINER', isSpinerVisible: !state.isSpinerVisible })
    }

    const toggleMessageForm = () => {
        dispatch({ type: 'TOGGLE_MESSAGE', isMessageFormOpen: !state.isMessageFormOpen })
    }

    return (
        <GlobalContext.Provider value={{
            state: state,
            toggleSpiner,
            toggleMessageForm
        }}>
            {children}
        </GlobalContext.Provider>
    );
}