export default (state, action) => {
    switch (action.type) {
        case 'TOGGLE_SPINER':
            return {
                ...state,
                isSpinerVisible: action.isSpinerVisible
            }

        case 'TOGGLE_LOGIN':
            return {
                ...state,
                isLoginOpen: action.isOpen
            }

        case 'TOGGLE_SIGNUP':
            return {
                ...state,
                isSignupOpen: action.isOpen
            }

        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                isSidebarOpen: action.isOpen
            }

        default:
            return state;
    }
}