import AddressComponent from '../mutil/address.component'
import pinyin from 'pinyin'
import Cities from '../models/cities'
const citiesModel = new Cities()
class CityHandle extends AddressComponent {
    constructor() {
        super();
        this.getCity = this.getCity.bind(this)
    }
    async getCity(ctx) {
        let type = ctx.query.type;
        let cityInfo;
        try {
            switch (type) {
                case 'guess':
                    const city = await this.getCityName(ctx)
                    cityInfo = await citiesModel.cityGuess(city);
                    break;
                case 'hot':
                    cityInfo = await citiesModel.cityHot();
                    break;
                case 'group':
                    cityInfo = await citiesModel.cityGroup();
                    break;
                default:
                    cityInfo={
                        name: 'ERROR_QUERY_TYPE',
                        message: '参数错误',
                    } 
            }
        } catch (error) {

        }
        ctx.body = cityInfo;
    }
    async getCityById(ctx){
        let city_id = ctx.params.id;
        let cityInfo;
        if(isNaN(city_id)){
            cityInfo={
                name: 'ERROR_PARAM_TYPE',
				message: '参数错误', 
            }
        }else{
            try{
                cityInfo = await citiesModel.getCityById(city_id);
            }catch(err){
                cityInfo={
                    name: 'ERROR_DATA',
                    message: '获取数据失败', 
                }
            }
        }
        ctx.body = cityInfo;   
    }
    async getCityName(ctx) {
        try {
            const cityInfo = await this.guessPosition(ctx)
            console.log('cityInfo',cityInfo)
            /*
            汉字转换成拼音
             */
            const pinyinArr = pinyin(cityInfo.city, {
                style: pinyin.STYLE_NORMAL,
            });
            let cityName = '';
            pinyinArr.forEach(item => {
                cityName += item[0];
            })
            return cityName;
        } catch (error) {
            return '上海'
        }
    }
}
export default new CityHandle()