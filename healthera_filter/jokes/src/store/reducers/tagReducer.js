import * as actionTypes from '../actions/tags/tagActionTypes';

const initial = {
   tags:[]
}

const reducer = (state = initial, action) => {
    switch(action.type){
        case actionTypes.TAG_FETCH_ALL_FULFILLED:{
            const tags = action.payload;

            return{
                ...state,
                tags
            }
        }

        case actionTypes.APP_USER_LOGOUT:{
           
            return {
                ...state,
                token,
                userId
            }
        }
        
        default:{
            return{
                ...state
            }
        }
    }
}

export default reducer;