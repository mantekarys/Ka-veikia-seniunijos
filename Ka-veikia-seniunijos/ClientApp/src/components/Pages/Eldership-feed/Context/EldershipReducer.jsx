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
        default:
            return state;
    }
}