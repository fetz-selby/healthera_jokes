import * as tagActionTypes from '../actions/tags/tagActionTypes';
import {fetchAllTagsFulfilled} from '../actions/tags/tagActionCreators';

import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {BASE_URL, API_RES_BASE, TAGS_ENDPOINT} from '../../config';
import cookies from 'react-cookies';

function* getTagsAsync(action){
       
    const url = BASE_URL+API_RES_BASE+TAGS_ENDPOINT;
    const token = cookies.load('token');

    const session = yield axios.get(url, {params:{token}});

    if(session.data.success){
        const {results} = session.data;

        yield put(fetchAllTagsFulfilled(results));
    }else{
        // yield put(appActionCreators.networkError('could not retreive user session'))
    }
}

function* createTagsAsync(action){
       
    const url = BASE_URL+API_RES_BASE+TAGS_ENDPOINT;
    const token = cookies.load('token');
    const data = {name: action.payload, token}

    const session = yield axios.post(url, data);

    if(session.data.success){
        const {results} = session.data;

        yield put(fetchAllTagsFulfilled(results));
    }else{
        // yield put(appActionCreators.networkError('could not retreive user session'))
    }
}


export default function* watchApp(){
    yield takeLatest(tagActionTypes.TAG_FETCH_ALL, getTagsAsync);
    yield takeLatest(tagActionTypes.TAG_CREATE, createTagsAsync);

}