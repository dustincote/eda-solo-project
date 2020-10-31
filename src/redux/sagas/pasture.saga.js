import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';
import swal from 'sweetalert';


function* getPastures (action){
    try{
        const response = yield Axios.get('api/pasture');

        yield put({type:'SET_PASTURES', payload: response.data})
    }catch(e){console.log('error getting pastures', e);  };

};

function* addPasture (action){
    try{
        yield Axios.post('api/pasture', action.payload);
        yield swal('Successfully Added Pasture', { timer: 1500, buttons: false, icon: 'success' });
        yield put({type:'GET_PASTURES'});
    } catch (e) { console.log('error adding pasture', e); swal('Error Adding Pasture', { timer: 1500, buttons: false, icon: 'error' }) }
}

function* getPastureRecords(action) {
    try {
        const response = yield Axios.get('api/pasture/records');

        yield put({ type: 'SET_PASTURE_RECORDS', payload: response.data })
    } catch (e) { console.log('error getting pastures', e); };

};






function* pastureSaga () {
    yield takeEvery('GET_PASTURES', getPastures);
    yield takeEvery('ADD_PASTURE', addPasture);
    yield takeEvery('GET_PASTURE_RECORDS', getPastureRecords);
} 

export default pastureSaga;