import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';
import swal from 'sweetalert';

// gets list of users pasture names from database
function* getPastures (action){
    try{
        const response = yield Axios.get('api/pasture');

        yield put({type:'SET_PASTURES', payload: response.data})
    }catch(e){console.log('error getting pastures', e);  };

};

//adds pasture name to database
function* addPasture (action){
    try{
        yield Axios.post('api/pasture', action.payload);
        yield swal('Successfully Added Pasture', { timer: 1500, buttons: false, icon: 'success' });
        yield put({type:'GET_PASTURES'});
    } catch (e) { console.log('error adding pasture', e); swal('Error Adding Pasture', { timer: 1500, buttons: false, icon: 'error' }) }
}


// gets all rows out of pasture_records table where date_out is null
// this means every object in the array will be the pasture that 
// particular animal is in
function* getPastureRecords(action) {
    try {
        const response = yield Axios.get('api/pasture/records');

        yield put({ type: 'SET_PASTURE_RECORDS', payload: response.data })
    } catch (e) { console.log('error getting pastures', e); };

};


// adds a new pasture record for an animal
function* addToPasture(action)  {
    try{
        yield Axios.post('/api/pasture/records', action.payload);
        yield put({type:'GET_PASTURE_RECORDS'});
    } catch (e) { console.log('error adding to pasture', e); swal('Error Adding To Pasture', { timer: 1500, buttons: false, icon: 'error' }) }
};


// updates pasture record to remove animal from pasture
function* removeFromPasture(action) {
    try{
        yield Axios.put('/api/pasture/records', action.payload);
        yield put({type:'GET_PASTURE_RECORDS'});
    }catch(e){console.log('error removing from pasture', e)}
}






function* pastureSaga () {
    yield takeEvery('GET_PASTURES', getPastures);
    yield takeEvery('ADD_PASTURE', addPasture);
    yield takeEvery('GET_PASTURE_RECORDS', getPastureRecords);
    yield takeEvery('ADD_TO_PASTURE', addToPasture);
    yield takeEvery('REMOVE_FROM_PASTURE', removeFromPasture);
} 

export default pastureSaga;