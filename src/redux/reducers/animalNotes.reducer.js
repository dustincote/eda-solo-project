const animalNotes = (state = [],action) => {
    if (action.type === "SET_ANIMAL_NOTE"){
        return action.payload
    }
    return state
}

export default animalNotes;