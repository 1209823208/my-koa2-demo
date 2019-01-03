import MUtil from './axios-service.js';
import axios from 'axios';
const _mm = new MUtil();
export default class City {
    getCurrentCity() {
        let url = 'v1/cities/?type=guess';
        return _mm.get(url,{},false);
    }
    getHotCity() {
        let url = 'v1/cities/?type=hot';
        return _mm.get(url,{},false);
    }
    getAllCity() {
        let url = 'v1/cities/?type=group';
        return _mm.get(url,{},false);
    }
    getCityAllInfo() {
        return axios.all([this.getCurrentCity(), this.getHotCity(),this.getAllCity()])
            .then(axios.spread(function (currentCityInfo, hotCityInfo,allCityInfo) {
                let info = {
                    currentCityInfo: currentCityInfo,
                    hotCityInfo: hotCityInfo,
                    allCityInfo:allCityInfo
                }
                return Promise.resolve(info);
            }));
    }
    searchPlaceInfo(params){
        let url = '/v1/pois/';
        return _mm.get(url,params,false); 
    }
}