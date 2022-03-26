export default (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MESSAGE':
            return {
                ...state,
                isMessageFormOpen: action.isMessageFormOpen
            }
        default:
            return state;
    }
}