import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
         idToken:token,
          userId:userId
    };
};

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
         error:error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
     localStorage.removeItem('expirationDate');
      localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeouth = (expiraTionTime) => {
    return dispatch => {
        setTimeout(() => {
          dispatch(logout())
        },expiraTionTime *1000)
    };
};

export const  auth = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
         const orderData = {email:email,password:password,returnSecureToken:true};
          let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyVwKFz9jHLmR6X4iNwhEMKUd9EDlzfOE';
           if(!isSignUp) {
             url = 'https://identitytoolkit.googleapis.co   m/v1/accounts:signInWithPassword?key=AIzaSyDyVwKFz9jHLmR6X4iNwhEMKUd9EDlzfOE'
        };
        axios.post(url,orderData)
        .then(response => {
             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn *1000)
              localStorage.setItem('token',response.data.idToken);
               localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',response.data.localId)
                 dispatch(authSuccess(response.data.idToken,response.data.localId));
                  dispatch(checkAuthTimeouth(response.data.expiresIn))
        }).catch(err => {
            dispatch(authFail(err.response.data.error));

        })
    }
};

export const setOutRedirectPath = (path) => {
    return {
        type:actionTypes.SET_OUT_REDIRECT_PATH,
         path:path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeouth((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};