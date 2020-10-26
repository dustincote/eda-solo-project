import { put, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';


//this saga is used to add a note to an animal action.payload should look like
// {animal_id: id_goes_here, note: note_goes_here}
function* addNote(action) {
    try {
        yield Axios.post('/api/animal/note', action.payload);

    } catch (e) { console.log('error posting note', e) };
};//end add Note

//this saga is used to add a cow to the database.  it waits for a response
//and then adds a note for the animal when axios returns the animal_id
//from the server
function* addCow(action) {
    try {
        const response = yield Axios.post('/api/animal/cow', action.payload.newCow);
        if(action.payload.note != ""){
        yield put({ type: 'ADD_NOTE', payload: { animal_id: response.data.animal_id, note: action.payload.note } })}

        yield put({ type: 'GET_HERD' })
    } catch (e) { console.log('error adding cow', e) };
};

function* fetchHerd(action) {
    try {
        const response = yield Axios.get('/api/animal');
        yield put({ type: 'SET_HERD', payload: response.data })
    } catch (err) { console.log('error getting herd', err) }
}

function* animalSaga(){
    yield takeLatest('ADD_COW', addCow);
    yield takeLatest('ADD_NOTE', addNote);
    yield takeLatest('GET_HERD', fetchHerd);
}

export default animalSaga;