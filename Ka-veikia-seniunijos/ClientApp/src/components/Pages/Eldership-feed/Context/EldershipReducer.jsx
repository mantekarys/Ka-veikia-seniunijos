export default (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MESSAGE':
            return {
                ...state,
                isMessageFormOpen: action.isMessageFormOpen
            }
        case 'TOGGLE_POST_SELECTION':
            return {
                ...state,
                isPostSelectionOpen: action.isPostSelectionOpen
            }
        case 'TOGGLE_NEW_POST':
            return {
                ...state,
                isNewPostFromOpen: action.isNewPostFromOpen
            }
        case 'TOGGLE_NEW_EVENT':
            return {
                ...state,
                isNewEventFormOpen: action.isNewEventFormOpen
            }
        case 'TOGGLE_NEW_SURVEY':
            return {
                ...state,
                isNewSurveyFormOpen: action.isNewSurveyFormOpen
            }
        case 'SET_USER_TYPE':
            return {
                ...state,
                userType: action.userType
            }
        case 'SET_POST_TEXT':
            return {
                ...state,
                editablePost: action.postContent
            }
        default:
            return state;
    }
}