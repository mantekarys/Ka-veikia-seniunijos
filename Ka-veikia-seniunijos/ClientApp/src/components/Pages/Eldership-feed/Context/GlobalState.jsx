import React, { createContext, useReducer } from "react";
import EldershipReducer from './EldershipReducer';

const initialState = {
    isMessageFormOpen: false,
    isPostSelectionOpen: false,
    isNewPostFromOpen: false,
    isNewEventFormOpen: false,
    isNewSurveyFormOpen: false,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EldershipReducer, initialState);


    const toggleMessageForm = () => {
        dispatch({ type: 'TOGGLE_MESSAGE', isMessageFormOpen: !state.isMessageFormOpen })
    }

    const togglePostSelectionForm = () => {
        dispatch({ type: 'TOGGLE_POST_SELECTION', isPostSelectionOpen: !state.isPostSelectionOpen })
    }

    const toggleNewPostForm = () => {
        dispatch({ type: 'TOGGLE_NEW_POST', isNewPostFromOpen: !state.isNewPostFromOpen })
    }

    const toggleNewEventForm = () => {
        dispatch({ type: 'TOGGLE_NEW_EVENT', isNewEventFormOpen: !state.isNewEventFormOpen })
        return 
    }

    const toggleNewSurveyForm = () => {
        dispatch({ type: 'TOGGLE_NEW_SURVEY', isNewSurveyFormOpen: !state.isNewSurveyFormOpen })
    }

    const setUserType = (userType) => {
        dispatch({type: 'SET_USER_TYPE', userType: userType})
    }

    return (
        <GlobalContext.Provider value={{
            state: state,
            toggleMessageForm,
            togglePostSelectionForm,
            toggleNewPostForm,
            toggleNewEventForm,
            toggleNewSurveyForm,
            setUserType
        }}>
            {children}
        </GlobalContext.Provider>
    );
}