
//receives 10 most recent notes for current user
const allNotes = (state = [], action) => {

    if(action.type === 'SET_ALL_NOTES'){
        return action.payload
    }

    return state
}

export default allNotes;