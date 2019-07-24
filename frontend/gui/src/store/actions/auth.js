import * as actionTypes from './actionTypes';
import axios from 'axios';
import qs from 'qs';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    localStorage.removeItem('google_token');
    localStorage.removeItem('expirationDate_google');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password)  => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/IMGSched/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('username',username);
            dispatch(authSuccess(token,username));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2)  => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/IMGSched/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            console.log(res.data);
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('username',username);
            dispatch(authSuccess(token,username));
            dispatch(checkAuthTimeout(3600));
            console.log("User model created leaving auth signup");
            
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authGoogleLogin = (token,username) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/IMGSched/rest-auth/google/', {
            code: token
        })
        .then(res => {
            console.log(res.data);
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('username',username)
            dispatch(authSuccess(token, username));
            dispatch(checkAuthTimeout(3600));
            console.log("Google model created leaving auth signup");
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate<=new Date()) {
                dispatch(logout());
            }
            else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000))
            }
        }
    }
}