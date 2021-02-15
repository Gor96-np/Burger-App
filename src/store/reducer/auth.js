import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
}

const authFaiL = (state,action) => {
    return updatedObject(state, { error:action.error, loading:false });
};
const authLogout = (state,action) => {
    return updatedObject(state, {token:null,ueserId:null})
}

const authStart = (state,action) => {
    return updatedObject(state, {loading:true,error:null});
};
const authSuccess = (state,action) => {
    return updatedObject(state, {token:action.idToken,userId:action.userId,loading:false,error:null});
};
const setOutRedirectPath = (state,action) => {
    return updatedObject(state, {authRedirectPath:action.path})
}
    
const reducer = (state = initialState,action) => {
    switch(action.type) {
     case actionTypes.AUTH_FAIL: return authFaiL(state,action);
      case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
       case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
         case  actionTypes.SET_OUT_REDIRECT_PATH: return setOutRedirectPath(state,action)
          default: return state;
    }
}

export default reducer;