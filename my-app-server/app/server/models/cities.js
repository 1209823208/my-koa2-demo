import cityData from '../initData/cities'
export default class Cities{
    constructor(){
    }
    cityGuess(name){
        return new Promise(async (resolve,reject)=>{
            let firstWord = name.substr(0,1).toUpperCase();
            try{
                Object.entries(cityData).forEach((item)=>{
                    if(firstWord===item[0]){
                        for(let i=0;i<item[1].length;i++){
                            if(item[1][i].pinyin ===name ){
                                resolve(item[1][i]);
                                break;
                            }
                        }
                    }
                })
            }catch(err){
                reject({
                    name: 'ERROR_DATA',
                    message: '查找数据失败',
                })
            }
        })  
    }
    async getCityById(city_id){
       return new Promise((resolve,reject)=>{
           try{
            Object.entries(cityData).forEach((item)=>{
                for(let i=0;i<item[1].length;i++){
                    if(item[1][i].id.toString() ===city_id ){
                        resolve(item[1][i]);
                        break;
                    }
                }
            })
           }catch(err){
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败',
            })
           }
       })
    }
    async cityHot(){
        return new Promise((resolve,reject)=>{
           resolve([...cityData.hotCities])
        })
    }
    async cityGroup(){
        let new_data = JSON.stringify(cityData)
        delete(new_data._id)
		delete(new_data.hotCities)
        return new_data
    }
}