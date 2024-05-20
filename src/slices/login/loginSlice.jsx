import { createSlice } from "@reduxjs/toolkit";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
    credentials: null,
    checking: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        authenticate: ( state, action ) => {
            state.credentials = action.payload
        },
        finishCheckig: ( state, action ) => {
            state.checking = action.payload
        }
    }
});

const {
    authenticate,
    finishCheckig
} = loginSlice.actions;

const startLogin = ( loginEmail, loginPassword ) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('auth', { email: loginEmail, password: loginPassword }, 'POST');
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem('token', body.userToken );
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( authenticate( body ) );
        }else{
            return body;
        }
    }
}

const startChecking = () => {
    return async( dispatch ) => {
        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();

        if ( body.ok ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( authenticate( {
                uid: body.uid,
                email: body.email,
                userToken: body.userToken
            } ) );
        }else{
            dispatch( finishCheckig( false ) );
            dispatch( authenticate( null ) );
        }
    }

}

export function storeLogin(){
    const dispatch = useDispatch();

    const credentialsData = useSelector((state) => state.login.credentials);

    return {
        credentialsData,
        setLogin: ({ loginEmail, loginPassword }) => dispatch(startLogin( loginEmail, loginPassword)),
        setChecking: () => dispatch( startChecking(),)
    };
}

export default loginSlice.reducer