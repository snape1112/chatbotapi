import { combineReducers } from 'redux';
import Auth from './Auth';
import JsonFiles from './JsonFiles';
const reducers = combineReducers({
    jsonFilesReducer: JsonFiles,
    auth: Auth,
    // filelist: set_file_listReducer,
    // leads_export: leads_export_Reducer
});

export default reducers;