import { HIDE_AUTH_MESSAGE, SET_TOKEN, SHOW_AUTH_MESSAGE, SIGNIN, AUTH_TOKEN, AUTHENTICATED, SIGNOUT } from '../constants/Auth';

const initAuth = {
    token: localStorage.getItem(AUTH_TOKEN) ? localStorage.getItem(AUTH_TOKEN) : null,
    authMessage: "",
    showAuthMessage: false,
    current_user: "",
    redirect: ""
};

const auth = (state = initAuth, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                ...state,
                token: action.payload,
                redirect: "/"
            };
        // case SIGNIN:
        //     return {
        //         ...state,
        //     };
        case SHOW_AUTH_MESSAGE:
            return {
                ...state,
                showAuthMessage: true,
                authMessage: action.payload,
            };

        case HIDE_AUTH_MESSAGE:
            return {
                ...state,
                showAuthMessage: false,
                authMessage: '',
            };

        case SIGNOUT:
            return {
                ...state,
                token: "",
            };

        default:
            return state;
    }
};

export default auth