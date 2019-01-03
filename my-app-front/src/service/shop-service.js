import MUtil from './axios-service.js';
const _mm = new MUtil();
export default class Shop {
   getCategorylist(){
    let url = 'v2/index_entry/';
    return _mm.get(url,{},false);
   }
   getShopList(params){
      let url = 'shopping/restaurants';
      return _mm.get(url,params,false);
   }
}