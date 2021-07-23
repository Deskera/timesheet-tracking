import * as ActionTypes from './ActionTypes';


export const loginLoading = () => ({
    type: ActionTypes.LOGIN_LOADING
})

export const loginFailed = () => ({
    type: ActionTypes.LOGIN_FAILED
})

export const registerUser = () => (dispatch) => {
    dispatch(userRegistering(true));

    return fetch()
}

export const userRegistering = () => ({
    type: ActionTypes.USER_REGISTERING
})

export const userRegistrationFailed = () => ({
    type: ActionTypes.USER_REGISTRATION_FAILED
})

export const addUser = () => ({
    type: ActionTypes.ADD_USER
})
