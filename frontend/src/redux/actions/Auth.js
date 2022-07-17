import { HIDE_AUTH_MESSAGE, SET_TOKEN, SHOW_AUTH_MESSAGE, SIGNIN, AUTHENTICATED, SIGNOUT } from "../constants/Auth";

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    };
};


export const signIn = (user) => {
    return {
        type: SIGNIN,
        payload: user
    };
};

export const showAuthMessage = (message) => {
    return {
        type: SHOW_AUTH_MESSAGE,
        payload: message
    };
};

export const hideAuthMessage = () => {
    return {
        type: HIDE_AUTH_MESSAGE
    };
};

export const authenticated = (token) => {
    return {
      type: AUTHENTICATED,
      payload : token
    }
  };
  export const logout = () => {
    return {
      type: SIGNOUT
    }
  };
  