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
        
        default:{
            return{
                ...state
            }
        }
    }
}

export default reducer;