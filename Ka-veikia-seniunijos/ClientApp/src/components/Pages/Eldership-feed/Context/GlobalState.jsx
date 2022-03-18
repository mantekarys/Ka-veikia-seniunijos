import React, { createContext, useReducer } from "react";
import EldershipReducer from './EldershipReducer';

const initialState = {
    isSpinerVisible: false
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EldershipReducer, initialState);

    const toggleSpiner = () => {
        dispatch({ tpye: 'TOGGLE_SPINER', isSpinerVisible: !state.isSpinerVisible })
    }

    return (
        <GlobalContext.Provider value={{
            state: state,
            toggleSpiner
        }}>
            {children}
        </GlobalContext.Provider>
    );
}