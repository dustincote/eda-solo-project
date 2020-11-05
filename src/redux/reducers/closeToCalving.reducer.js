
//filters herd to new array that only contains cows who are close to calving
const closeToCalving = (state=[], action) => {
    
    if(action.type === 'SET_CLOSE_TO_CALVING'){
        let close = action.payload.filter(cow => cow.close_to_calving && !cow.archived && cow.gender != 'bull' && !cow.calf);
        return close
    }
    return state
}

export default closeToCalving;