

//filters herd to a new array that only contains cows who have already calved
const alreadyCalved = (state=[], action) => {
    if(action.type === 'SET_ALREADY_CALVED'){
        let calved = action.payload.filter(cow => cow.calf && !cow.archived).map(cow => Number(cow.dam_id));
        let alreadyCalved = action.payload.filter(cow => calved.indexOf(cow.animal_id) != -1 )
        return alreadyCalved
    }
    return state
}

export default alreadyCalved;