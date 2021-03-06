
// filters herd to new array that only includes cows who are yet to calf
const yetToCalf = (state = [], action) => {
    
    if(action.type === 'SET_YET_TO_CALF'){
        let calved = action.payload.filter(cow => cow.calf && !cow.archived).map(cow => Number(cow.dam_id));
        let yetToCalf = action.payload.filter(cow => calved.indexOf(cow.animal_id) === -1 && !cow.calf && cow.gender != 'bull' && !cow.close_to_calving)
        return yetToCalf
    }

    return state
}

export default yetToCalf