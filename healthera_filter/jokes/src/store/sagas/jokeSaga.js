import * as tagActionTypes from '../actions/tags/tagActionTypes';
import {fetchJokesWithTagFulfilled,fetchJokeFulfilled,createJokeFulfilled,updateJokeFulfilled} from '../actions/jokes/jokeActionCreators';

import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {BASE_URL, API_RES_BASE, JOKES_ENDPOINT} from '../../config';
import cookies from 'react-cookies';

function* getJokeAsync(action){
       
    const url = BASE_URL+API_RES_BASE+JOKES_ENDPOINT;
    const token = cookies.load('token');

    const session = yield axios.get(url, {params:{token}});

    if(session.data.success){
        const {results} = session.data;

        yield put(fetchAllTagsFulfilled(results));
    }else{
        // yield put(appActionCreators.networkError('could not retreive user session'))
    }
}

function* getJokeWithTagsAsync(action){
       
    const url = BASE_URL+API_RES_BASE+JOKES_ENDPOINT;
    const token = cookies.load('token');

    const session = yield axios.get(url, {params:{token}});

    if(session.data.success){
        const {results} = session.data;

        yield put(fetchAllTagsFulfilled(results));
    }else{
        // yield put(appActionCreators.networkError('could not retreive user session'))
    }
}

function* createJokeAsync(action){
       
    const url = BASE_URL+API_RES_BASE+JOKES_ENDPOINT;
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

function* updateJokeAsync(action){
       
    const token = cookies.load('token');
    const {id,joke} = action.payload;
    const url = BASE_URL+API_RES_BASE+JOKES_ENDPOINT+`/${id}`;

    const session = yield axios.put(url, joke);

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