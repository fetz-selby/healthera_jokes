import * as actionTypes from '../actions/jokes/jokeActionTypes';

const initial = {
   jokes:[]
}

const reducer = (state = initial, action) => {
    switch(action.type){
        case actionTypes.JOKE_FETCH_FULFILLED:{
            const jokes = action.payload;

            return{
                ...state,
                jokes
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