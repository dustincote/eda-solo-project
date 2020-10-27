
const herd = (state=[], action) => {
    if(action.type=== 'SET_HERD'){
        return action.payload;
    }return state;
}





export default herd