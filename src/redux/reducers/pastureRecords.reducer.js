
//receives pasture records for user where date_out is null
//meaning these records are for those animals who are 
//currently in a pasture
const pastureRecords = (state = [], action) => {
    if (action.type === 'SET_PASTURE_RECORDS'){
        return action.payload
    }else return state;
}

export default pastureRecords;