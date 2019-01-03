import AddressComponent from '../../mutil/address.component'
import Cities from '../../models/cities'
const citiesModel = new Cities()
class SearchPlace extends AddressComponent {
    constructor(){
        super()
        this.search = this.search.bind(this)
        this.getPois = this.getPois.bind(this)
    }
    async search(ctx){
        let {city_id,keyword} =  ctx.query;
        let resData,type='search';
        if(!keyword){
            resData={
                name:'ERROR_QUERY_TYPE',
                message:'参数错误'
            }
        }else if(isNaN(city_id)){
            try{
                const city = await this.getCityName(ctx)
                const cityInfo = await citiesModel.cityGuess(city);
                city_id = cityInfo.id
            }catch(err){
                console.log('搜索地址时，获取定位失败');
                resData={
                    name:'ERROR_GET_POSITION',
                    message:'获取数据失败'
                }
                return;
            }
        }
        try{
            const cityInfo =  await citiesModel.getCityById(city_id);
            const resObj = await this.searchPlace(keyword,cityInfo.name,type);
            const cityList = [];
            resObj.data.forEach((item,index)=>{
                cityList.push({
                    name: item.title,
					address: item.address,
					latitude: item.location.lat,
					longitude: item.location.lng,
					geohash: item.location.lat + ',' + item.location.lng,  
                })
                ctx.body = cityList;   
            })

        }catch(err){
            resData={
                name:'GET_ADDRESS_ERROR',
                message:'获取地址信息错误'
            }
            ctx.body = resData;   
        }
    }
    async getPois(ctx){ 
        try{
            const geohash= ctx.params.latitude_longitude;
			if (geohash.indexOf(',') == -1) {
				res.send({
					status: 0,
					type: 'ERROR_PARAMS',
					message: '参数错误',
				})
				return;
			}
			const poisArr = geohash.split(',');
			const result = await this.getpois(poisArr[0], poisArr[1]);
			const address = {
				address: result.result.address,
				city: result.result.address_component.province,
				geohash,
				latitude: poisArr[0],
				longitude: poisArr[1],
				name: result.result.formatted_addresses.recommend,
			}
			res.send(address);
		}catch(err){
			console.log('getpois返回信息失败', err);
			res.send({
				status: 0,
				type: 'ERROR_DATA',
				message: '获取数据失败',
			})
		}
    }
}
export default new SearchPlace()