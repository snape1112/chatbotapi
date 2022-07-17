import fetch from '../utils/FetchInterceptors'
// import fetch from 'hooks/useAxios';
const APIService = {}


APIService.list_all_json_files = function () {
	return fetch({
		url: '/api/list-json-files',
		method: 'get',
	})
}

APIService.show_single_json_file = function (data) {
	return fetch({
		url: '/api/read-single-json-file',
		method: 'post',
		data: data
	})
}

APIService.add_new_tag_to_existing_file = function (data) {
	return fetch({
		url: '/api/add_new_tag',
		method: 'post',
		data: data
	})
}

APIService.add_folder_and_new_json_file = function (data) {
	return fetch({
		url: '/api/create-new-json-file',
		method: 'post',
		data: data
	})
}
APIService.edit_file = function (data) {
	return fetch({
		url: '/api/edit_file',
		method: 'post',
		data: data
	})
}
APIService.train_model_from_json_file = function (data) {
	return fetch({
		url: '/api/train-model',
		method: 'post',
		data: data
	})
}

APIService.login = function (data) {
	return fetch({
		url: '/auth/login',
		method: 'post',
		headers: {
			'public-request': 'true'
		},
		data: data
	})
}

// APIService.single_folder_detail = function (data) {
// 	return fetch({
// 		url: '/api/single-folder-detail',
// 		method: 'post',
// 		data: data
// 	})
// }

export default APIService
