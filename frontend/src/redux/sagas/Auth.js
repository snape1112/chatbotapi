import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { message } from 'antd';
import { SIGNIN } from '../constants/Auth';
import APIService from '../../services';
import { showAuthMessage, authenticated } from '../actions';
import { AUTH_TOKEN } from '../constants/Auth';
export function* signInWithJwt() {


	yield takeEvery(SIGNIN, function* ({ payload }) {

		try {
			const response = yield call(APIService.login, payload);


			if (response.detail) {
                
				yield put(showAuthMessage(response.detail));
			} else {

				localStorage.setItem(AUTH_TOKEN, response.token);
				message.success("Logged In Successfully")

				yield put(authenticated(response.token));
			}

		} catch (err) {
			yield put(showAuthMessage(err.response.data.detail));
		}
	});
}


export default function* rootSaga() {
	yield all([
		// fork(signOut),
		fork(signInWithJwt),
		// fork(loadUserSaga),
		// fork(signUpWithFBEmail),
		// fork(signInWithFBGoogle),
		// fork(signInWithFacebook)
	]);
}
