import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

// gets weather data from server side axios call
function* getWeather(action) {
    try{
        const response = yield Axios.get(`api/weather/${action.payload.latitude}/${action.payload.longitude}`);
        yield put({type: 'SET_WEATHER', payload: response.data});
    }catch(e){console.log('error getting weather', e)}
}

function* weatherSaga() {
    yield takeEvery('GET_WEATHER', getWeather)
}

export default weatherSaga;