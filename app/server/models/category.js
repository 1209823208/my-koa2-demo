import categoryData from '../initData/category'
import {
    query
} from '../lib/mysql'
class Category {
    constructor() {

    }
    async initData() {
        let m = '';
        let new_arr = [];
        categoryData.forEach(item => {
            if (item.sub_categories) {
                new_arr = [...new_arr, ...item.sub_categories]
            }
        })
        new_arr = [...new Set(new_arr)]
        let new_sql = ''
        new_arr.forEach(obj => {
            let sql = `INSERT INTO Category set `;
            for (let i in obj) {
                if (obj[i] instanceof Array) {
                    sql += `${i}='${JSON.stringify(obj[i])}',`
                } else {
                    if (typeof obj[i] === 'string') {
                        sql += `${i}="${obj[i]}",`
                    } else {
                        sql += `${i}=${obj[i]},`
                    }
                }
            }
            new_sql += sql.substring(0, sql.length - 1) + ';' + '\n'
        })

        console.log('allData', new_sql)
    }
    async findOne(id) {
        let _sql = `select * from Category where id="${id}";`
        return query(_sql)
    }
    async getCategories(){
        let _sql = `select * from Category;`
        return query(_sql) 
    }
}
export default Category