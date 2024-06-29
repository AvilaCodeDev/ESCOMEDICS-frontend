import { createSlice } from "@reduxjs/toolkit";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
    credentials: null,
    userData: null,
    checking: false,
    loginError: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        authenticate: ( state, action ) => {
            state.credentials = action.payload
        },
        userData: ( state, action ) => {
            state.userData = action.payload
        },
        finishCheckig: ( state, action ) => {
            state.checking = action.payload
        },
        setLoginError: (state, action) => {
            state.loginError = action.payload
        }

    }
});

const {
    authenticate,
    userData,
    finishCheckig,
    setLoginError
} = loginSlice.actions;

const startLogin = ( loginEmail, loginPassword ) => {
    return async( dispatch ) => {
        dispatch( setLoginError('') );
        const resp = await fetchSinToken('auth', { email: loginEmail, password: loginPassword }, 'POST');
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem('token', body.userToken );
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( authenticate( body ) );
        }else{
            dispatch( setLoginError(body.msg) );
        }
    }
}

const getUserData = ( uid, id_rol ) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('auth/obtieneDatosUsuario',{ uid, id_rol }, 'POST');
        const body = await resp.json();

        if( body.ok ){
            dispatch( userData( body ) );
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
    const userData = useSelector( (state) => state.login.userData)
    const loginErrorMsg = useSelector( ( state )=> state.loginError)
    return {
        credentialsData,
        userData,
        loginErrorMsg,
        setLogin: ({ loginEmail, loginPassword }) => dispatch(startLogin( loginEmail, loginPassword)),
        setChecking: () => dispatch( startChecking(),),
        setUserData: ({uid, id_rol}) => dispatch( getUserData( uid, id_rol ) )
    };
}

export default loginSlice.reducer