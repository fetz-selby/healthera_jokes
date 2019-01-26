import * as actionTypes from './tagActionTypes';

export const fetchAllTags = () => (
    {type: actionTypes.TAG_FETCH_ALL, payload: {email, password}}
) 

export const fetchAllTagsFulfilled = (tags) => (
    {type: actionTypes.TAG_FETCH_ALL_FULFILLED, payload: tags}
) 

export const fetchAllTagsFailed = () => (
    {type: actionTypes.TAG_FETCH_ALL_FAILED}
) 

export const createTag = (name) => (
    {type: actionTypes.TAG_CREATE, payload: name}
) 

export const createTagFulfilled = (tag) => (
    {type: actionTypes.TAG_CREATE, payload: tag}
) 