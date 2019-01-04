import initData from '../initData/shopping'
export default class Shopping{
    constructor(){

    }
    async getAllData(params){
        let offset = params.offset,limit=params.limit,
            start=offset*limit,
            end = start+limit;
        return initData.slice(start,end)
    }

}