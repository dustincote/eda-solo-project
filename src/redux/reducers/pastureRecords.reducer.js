const pastureRecords = (state = [], action) => {
    if (action.type === 'SET_PASTURE_RECORDS'){
        return action.payload
    }else return state;
}

export default pastureRecords;