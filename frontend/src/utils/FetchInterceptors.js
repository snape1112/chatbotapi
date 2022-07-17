import axios from 'axios'
import { message, notification } from 'antd';
// import jwt_decode from 'jwt-decode'
// import dayjs from 'dayjs'
import { API_BASE_URL } from '../config/AppConfig';
import { AUTH_TOKEN } from '../redux/constants/Auth';
const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000
})

const TOKEN_PAYLOAD_KEY = 'authorization'
const PUBLIC_REQUEST_KEY = 'public-request'
const ENTRY_ROUTE = "/login"
import history from "../history"
// API Request interceptor
service.interceptors.request.use(async config => {
    let token = localStorage.getItem(AUTH_TOKEN) ?localStorage.getItem(AUTH_TOKEN) : null

    console.log("Request Interceptor: ",token)

    const jwtToken = token


    // // console.log("Token ",jwtToken)

    // if (jwtToken) {
    // 	const user = jwt_decode(jwtToken)
    // 	console.log(user)
    // 	const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    // 	console.log(isExpired)
    // 	if (!isExpired) {
    // 		config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + jwtToken
    // 	} else {
    // 		localStorage.removeItem(AUTH_TOKEN)

    // 	}

    // }

    config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + jwtToken

    if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
        localStorage.removeItem(AUTH_TOKEN)
        history.push(ENTRY_ROUTE)
        window.location.reload();

        // notification.error({
        //     message: 'Missing or Invalid Token'
        // })
    }
    return config
}, error => {
    // Do something with request error here
    notification.error({
        message: 'Error'
    })
    Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use((response) => {

    return response.data
}, (error) => {

    if (error.response.status === 401) {
        localStorage.removeItem(AUTH_TOKEN)
        // notification.error({
        // 	message: 'Authentication Fail here',
        // 	description : 'Please login again'
        // })

        message.error("Authentication Failure")
        history.push(ENTRY_ROUTE)
        window.location.reload();
    }

    // Remove token and redirect 
    if (error.response.status === 400 || error.response.status === 403) {
        notification.error({
            message: 'Authentication Fail 2',
            description: 'Please login again'
        })

        // localStorage.removeItem(AUTH_TOKEN)
    }

    if (error.response.status === 404) {
        notification.error({
            message: '404 Not Found',
        })
    }

    if (error.response.status === 500) {
        notification.error({
            message: '500 Internal Server Error',
        })
    }

    if (error.response.status === 508) {
        notification.error({
            message: 'Time Out',
        })
    }

    return Promise.reject(error);
});

export default service