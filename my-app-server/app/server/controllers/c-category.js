import BaseComponent from '../mutil/base.component'
import CategoryM from '../models/category'
const CategoryModel = new CategoryM()
class Category extends BaseComponent{
    constructor(){
        super()
    }
    async findById(id){
        try{
            const categoryInfo = await CategoryModel.findOne(id)
            return categoryInfo&&categoryInfo.name?categoryInfo.name:'' 
        }catch(err){

        }
    }
    async getCategories(ctx){
        let resData, level = ctx.request.query.level,parent_id=ctx.request.query.parent_id;
        try{
            if(level){
                resData = await CategoryModel.getCategories(level)
            }else{
                resData = await CategoryModel.getSecondCategories(parent_id)
            }
           
        }catch(err){
            resData = {
                status: 0,
				type: 'ERROR_DATA',
				message: '获取categories失败' 
            }
        }
        ctx.body = resData;   
    }
}
export default new Category()