import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer',() => {
    it('should return initialstate',() => {
       expect(reducer(undefined,{})).toEqual({
        token:null,
        userId:null,
        error:null,
        loading:false,
        authRedirectPath:'/'
    })
    });
    it('should store token upon login',() => {
        expect(reducer({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath:'/'
        },{
            type:actionTypes.AUTH_SUCCESS,
            userId:'some-user-id',
            idToken:'some-token'}))
            .toEqual({
                token:'some-token',
                userId:'some-user-id',
                error:null,
                loading:false,
                authRedirectPath:'/'
            })
    });
});