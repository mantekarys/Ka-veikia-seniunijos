export default (state, action) => {
    switch (action.type) {
        case 'TOGGLE_SPINER':
            return {
                ...state,
                isSpinerVisible: action.isSpinerVisible
            }

        default:
            return state;
    }
}