import EntryM from '../../models/entry'
const EntryModel = new EntryM()
class Entry{
    constructor(){

    }
    async getEntry(ctx){
        let resData;
        try{
            resData = await EntryModel.getEntry()
        }catch(err){
            resData = {
                status: 0,
				type: 'ERROR_DATA',
				message: '获取数据失败'
            }
        }
        ctx.body = resData;   
    }
}
export default new Entry()