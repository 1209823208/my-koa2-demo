import MUtil from './axios-service.js';
const _mm = new MUtil();
export default class User {
    login(params_obj) {
        let url = 'signin/handle_login',
            params = { ...params_obj,
                pip_type: 1
            };
        return _mm.post(url, params, false).then((res) => {
            return res;
            // if (res.status === 1) {
            //     return this.getUserInfo();
            // } else {
            //     return res
            // }
        });
    }
}