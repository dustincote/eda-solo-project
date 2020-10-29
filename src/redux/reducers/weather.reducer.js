const weather = (state = [], action) => {
    if(action.type === 'SET_WEATHER'){
        return action.payload
    }else return state;
}

export default weather;