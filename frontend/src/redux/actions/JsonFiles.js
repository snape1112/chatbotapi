import { SET_CURRENT_JSON_CODE, SET_CURRENT_JSON_FILE, SET_LOADING, SET_CURRENT_MODE, SET_CURRENT_TAG_TO_EDIT, SET_EDITED_TAG, RESET_STATE } from "../constants/JsonFiles";



export const setCurrentJsonFile = (filepath) => {
    return {
        type: SET_CURRENT_JSON_FILE,
        payload: filepath
    };
};
export const setCurrentJsonCode = (code) => {
    return {
        type: SET_CURRENT_JSON_CODE,
        payload: code
    };
};
export const setLoading = (value) => {
    return {
        type: SET_LOADING,
        payload: value
    };
};
export const setMode = (value) => {
    return {
        type: SET_CURRENT_MODE,
        payload: value
    };
};
export const setTagToEdit = (value) => {
    return {
        type: SET_CURRENT_TAG_TO_EDIT,
        payload: value
    };
};

export const setEditedTag = (value) => {
    return {
        type: SET_EDITED_TAG,
        payload: value
    };
};

export const resetState = () => {
    return {
        type: RESET_STATE
    };
};