import axios from "axios";
import React, { createContext, useReducer } from "react";
import EldershipReducer from './EldershipReducer';

const initialState = {
    isMessageFormOpen: false,
    isPostSelectionOpen: false,
    isNewPostFromOpen: false,
    isNewEventFormOpen: false,
    isNewSurveyFormOpen: false,
    editablePost: null,
    editableEvent: null,
    isLoadingSpinnerVisible: false,
    isDeleteModalOpen: false
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

    const setEditablePostText = (postContent) => {
        dispatch({type: 'SET_POST_TEXT', postContent})
    }

    const setEditableEventContent = (eventContent) => {
        dispatch({type: 'SET_EDITABLE_EVENT_CONTENT', eventContent})
    }

    const resetEditableContent = () => {
        dispatch({type: 'RESET_EDITABLE_CONTENT'})
    }

    const toggleLoadingSpinner = () => {
        dispatch({type: 'TOGGLE_LOADING_SPINNER', isLoadingSpinnerVisible: !state.isLoadingSpinnerVisible})
    }

    const toggleDeleteModal = () => {
        dispatch({type: 'TOGGLE_DELETE_MODAL', isDeleteModalOpen: !state.isDeleteModalOpen})

    }

    const deleteEvent = () => {
        axios.delete(`https://localhost:44330/api/event/${state.editableEvent?.id}`)
        .then(_ => {
                toggleDeleteModal();
                toggleLoadingSpinner()
            });
    }

    const deletePost = () => {
        axios.delete(`https://localhost:44330/api/post/${state.editablePost?.id}`)
        .then(_ => {
            toggleDeleteModal();
            toggleLoadingSpinner()
        });
    }

    return (
        <GlobalContext.Provider value={{
            state: state,
            toggleMessageForm,
            togglePostSelectionForm,
            toggleNewPostForm,
            toggleNewEventForm,
            toggleNewSurveyForm,
            setUserType,
            setEditablePostText,
            setEditableEventContent,
            resetEditableContent,
            toggleLoadingSpinner,
            toggleDeleteModal,
            deleteEvent,
            deletePost
        }}>
            {children}
        </GlobalContext.Provider>
    );
}