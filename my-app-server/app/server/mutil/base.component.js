
import axios from 'axios';

function getHeader() {
    let jwt = '';
    let authHeader = '';
    if (jwt) {
        authHeader = 'JWT ' + jwt;
    }
    return authHeader;
}
export default class BaseComponent {
    get(url, params = {}, withCredentials = true) {
        return axios.get(url, {
                params: params,
                withCredentials: withCredentials,
                headers: {
                    Authorization: getHeader()
                }
            })
            .then((res) => {
                return this.handleSuccess(res)
            })
            .catch((error) => {
                return this.handleError(error)
            });
    }
    post(url, params = {}, withCredentials = true) {
        return axios.post(url, params, {
                withCredentials: withCredentials,
                headers: {
                    Authorization: getHeader()
                }
            })
            .then((res) => {
                return this.handleSuccess(res)
            })
            .catch((error) => {
                return this.handleError(error)
            });
    }
    delete(url, params = {}, withCredentials = true) {
        return axios.delete(url, {
                params: params,
                withCredentials: withCredentials,
                headers: {
                    Authorization: getHeader()
                }
            })
            .then((res) => {
                return this.handleSuccess(res)
            })
            .catch((error) => {
                return this.handleError(error)
            });
    }
    // 请求成功--数据处理
    handleSuccess(res) {
        let body = res;
        if (typeof body['data'] !== 'undefined') {
            return Promise.resolve(body['data'] || []);
        }
        return Promise.resolve(body);
    }

    // 请求失败--数据处理--
    handleError(error) {
        if (error._body) {
            let errBody = JSON.parse(error._body);
            if (errBody.message) {
                error.message = errBody.message;
            } else if (errBody.detail) {
                error.message = errBody.detail;
            }
        }
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Promise.reject(errMsg);
    }
}