import * as actionTypes from './appActionTypes';

export const login = (email, password) => (
    {type: actionTypes.APP_LOG_IN, payload: {email, password}}
) 

export const loginFulfilled = (id,name,token) => (
    {type: actionTypes.APP_LOGGED_IN, payload: {id, name, token}}
) 