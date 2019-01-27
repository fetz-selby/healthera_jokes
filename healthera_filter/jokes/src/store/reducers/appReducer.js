import * as actionTypes from '../actions/app/appActionTypes';
import cookies from 'react-cookies';

const initial = {
    logout: false,
    // Set default app view to locations for test purposes
    module: 'Locations',
    name:'',
    userId:0,
    token:''
}

const reducer = (state = initial, action) => {
    switch(action.type){
        case actionTypes.APP_LOGGED_IN:{
            const logout = false;
            const {id: userId,name,token} = action.payload;

            cookies.save('token', token);
            cookies.save('userId', userId);
            cookies.save('name', name);

            console.log(userId, name, token);

            return{
                ...state,
                logout,
                userId,
                name,
                token
            }
        }

        case actionTypes.APP_LOGGED_OUT:{
            const logout = true;
            const token = '';
            const userId = '';

            cookies.remove('token');
            cookies.remove('userId');
            cookies.remove('name');

            return{
                ...state,
                logout,
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