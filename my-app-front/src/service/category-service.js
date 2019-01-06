import MUtil from './axios-service.js';
import axios from 'axios';
const _mm = new MUtil();
export default class Category {
    getCategoryList(params) {
        let url = '/shopping/v2/restaurants/category';
        return _mm.get(url,params,false);
    }
}