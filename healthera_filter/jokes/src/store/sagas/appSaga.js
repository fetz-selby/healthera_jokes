import * as appActionTypes from '../actions/app/appActionTypes';
import {loginFulfilled} from '../actions/app/appActionCreators';

import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {BASE_URL, API_OPEN_BASE, SESSIONS_ENDPOINT} from '../../config';
import cookies from 'react-cookies';

function* getSessionAsync(action){
   
    const {email,password} = action.payload;
    
    const url = BASE_URL+API_OPEN_BASE+SESSIONS_ENDPOINT;

    const session = yield axios.get(url, {params:{email,password}});

    if(session.data.success){
        const {userId, token, name} = session.data.results;

        yield put(loginFulfilled(userId, name, token));
    }else{
        // yield put(appActionCreators.networkError('could not retreive user session'))
    }
}


export default function* watchApp(){
    yield takeLatest(appActionTypes.APP_LOG_IN, getSessionAsync);
}