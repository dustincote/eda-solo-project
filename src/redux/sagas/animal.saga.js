import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';
import swal from 'sweetalert';


//this saga is used to add a note to an animal action.payload should look like
// {animal_id: id_goes_here, note: note_goes_here}
function* addNote(action) {
    try {
        yield Axios.post('/api/animal/note', action.payload);
        yield put({type:'GET_NOTES', payload: action.payload.animal_id});
        yield put({type:'GET_ALL_NOTES'});

    } catch (e) { console.log('error posting note', e) };
};//end add Note

//this saga is used to add a cow to the database.  it waits for a response
//and then adds a note for the animal when axios returns the animal_id
//from the server only if the note contains something other than an empty string
function* addCow(action) {
    try {
        const response = yield Axios.post('/api/animal/cow', action.payload.newCow);
        if(action.payload.note != ""){
        yield put({ type: 'ADD_NOTE', payload: {tag_number:response.data.tag_number, animal_id: response.data.animal_id, note: action.payload.note } })}
        yield swal('Successfully added animal', { timer: 1500, buttons: false, icon: 'success' });
        yield put({ type: 'GET_HERD' })
    } catch (e) { console.log('error adding cow', e) 
        swal('Error Adding Cow', { timer: 1500, buttons: false, icon: 'error' });

};
};

//this saga is used to add a calf to the database.  it waits for a response
//and then adds a note for the animal when axios returns the animal_id
//from the server only if the note contains something other than an empty string
function* addCalf(action) {
    try {
        const response = yield Axios.post('/api/animal/calf', action.payload.newCalf);
        if (action.payload.note != "") {
            yield put({ type: 'ADD_NOTE', payload: {tag_number: response.data.tag_number, animal_id: response.data.animal_id, note: action.payload.note } })
        };
        yield swal('Successfully Added Calf', { timer: 1500, buttons: false, icon: 'success' });
        yield put({ type: 'GET_HERD' })
    } catch (e) {
        console.log('error adding cow', e)
        swal('Error Adding Calf', { timer: 1500, buttons: false, icon: 'error' });
 };
};

// get request to retrieve entire herd
function* fetchHerd(action) {
    try {
        const response = yield Axios.get('/api/animal');
        yield put({ type: 'SET_HERD', payload: response.data });
        yield put({ type: 'SET_ALREADY_CALVED', payload: response.data });
        yield put({ type: 'SET_YET_TO_CALF', payload: response.data });
        yield put({ type: 'SET_CLOSE_TO_CALVING', payload: response.data });

    } catch (err) { console.log('error getting herd', err) };
};

// updates cows close to calving status
function* closeToCalving(action){
    try{
        yield Axios.put('/api/animal/close', action.payload);
        yield put({type: 'GET_HERD'});
    }catch(e){console.log('error updating close to calving', e)};
};


// updates cows archived status, once archived it will no longer show up in the herd but it remains in the database
function* updateArchived(action){
    try{
        yield Axios.put('/api/animal/archive', action.payload);
        yield put({type: 'GET_HERD'});
    }catch(e){console.log('error archiving animal', e)};
};

// get request to receive all notes for specific animal
function* getNotes(action){
    try{
        const response = yield Axios.get(`/api/animal/note/${action.payload}`);
        yield put({type:"SET_ANIMAL_NOTE", payload: response.data});
    }catch(e){console.log('error getting notes', e)};
};


// get request to get 10 most recent notes
function* getAllNotes(action) {
    try {
        const response = yield Axios.get(`/api/animal/note/`);
        yield put({ type: "SET_ALL_NOTES", payload: response.data });
    } catch (e) { console.log('error getting notes', e) };
};

// delete note 
function* deleteNote(action){
    try{
        yield Axios.delete(`/api/animal/note/${action.payload.id}`)
        yield put({type:'GET_NOTES', payload: action.payload.animal_id});
    }catch(e){console.log('error deleting note', e)}
}

function* animalSaga(){
    yield takeLatest('ADD_COW', addCow);
    yield takeLatest('ADD_NOTE', addNote);
    yield takeEvery('GET_NOTES', getNotes);
    yield takeLatest('GET_HERD', fetchHerd);
    yield takeLatest('ADD_CALF', addCalf);
    yield takeEvery('UPDATE_CLOSE_TO_CALVING', closeToCalving);
    yield takeLatest('UPDATE_ARCHIVED', updateArchived);
    yield takeEvery('GET_ALL_NOTES', getAllNotes);
    yield takeLatest('DELETE_NOTE', deleteNote);
}

export default animalSaga;