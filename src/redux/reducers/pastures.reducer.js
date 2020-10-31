const pastures = (state = [], action) => {
    if(action.type === 'SET_PASTURES'){
        return action.payload;
    }else return state;
};


export default pastures;