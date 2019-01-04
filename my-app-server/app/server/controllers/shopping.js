import AddressComponent from '../mutil/address.component'
import ShopM from '../models/shopping'
const ShopModel = new ShopM()
class Shopping extends AddressComponent {
    constructor(){
        super()
        this.getRestaurants = this.getRestaurants.bind(this)
    }
    async getRestaurants(ctx){
		let resData;
		let params = ctx.query;;
       try{
			resData = await ShopModel.getAllData(params)
		   
	   }catch(err){
		   resData={
			   name:'',
			   message:'数据获取错误'
		   }
	   }
	   ctx.body = resData;
    }

}
export default new Shopping()