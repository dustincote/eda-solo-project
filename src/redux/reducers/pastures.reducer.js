
// holds all of the users pasture names
const pastures = (state = [], action) => {
    if(action.type === 'SET_PASTURES'){
        return action.payload;
    }else return state;
};


export default pastures;