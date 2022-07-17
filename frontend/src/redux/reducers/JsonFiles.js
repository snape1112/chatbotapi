import { SET_CURRENT_JSON_CODE,RESET_STATE, SET_CURRENT_TAG_TO_EDIT, SET_LOADING, SET_CURRENT_JSON_FILE, SET_CURRENT_MODE, SET_EDITED_TAG } from '../constants/JsonFiles';

const initJsonFiles = {
    selected_file: "",
    mode: "",
    current_json_code: [],
    tag_to_edit: null,
    edited_tag: null,
    loading: false
};

const jsonfiles = (state = initJsonFiles, action) => {
    switch (action.type) {
        case SET_CURRENT_JSON_FILE:
            return {
                ...state,
                selected_file: action.payload
            };
        case SET_CURRENT_JSON_CODE:
            return {
                ...state,
                current_json_code: action.payload
            };
        case SET_CURRENT_MODE:
            return {
                ...state,
                mode: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SET_CURRENT_TAG_TO_EDIT:
            return {
                ...state,
                tag_to_edit: action.payload
            };
        case SET_EDITED_TAG:
            return {
                ...state,
                edited_tag: action.payload
            };
        case RESET_STATE:
            return {
                selected_file: "",
                mode: "",
                current_json_code: [],
                tag_to_edit: null,
                edited_tag: null,
                loading: false
            };

        default:
            return state;
    }
};

export default jsonfiles