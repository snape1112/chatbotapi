const dev = {
	API_ENDPOINT_URL: 'http://127.0.0.1:8000',
};

const prod = {
	API_ENDPOINT_URL: '',
};

const test = {
	API_ENDPOINT_URL: 'http://127.0.0.1:8000',
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}
// console.log(process.env.NODE_ENV)
export const env = getEnv()
