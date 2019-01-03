import mysql from 'mysql'
import sql_config from '../../config/config'
const pool = mysql.createPool({
  host: sql_config.database.HOST,
  user: sql_config.database.USERNAME,
  password: sql_config.database.PASSWORD,
  database: sql_config.database.DATABASE
})

export let query = function (sql, values) {

  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {

          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  }).catch(error => console.log('catch', error))
}

class MysqlClass {
  // 通过名字查找用户
   findDataByName (name){
    let _sql = `select * from user where name="${name}";`
    return query(_sql)
  }
  // 注册用户
  insertData (value){
    let _sql = "insert into user set name=?,password=?;"
    return query(_sql, value)
  }
  // 查询所有个人用户文章数量
  findPostCountByName(name) {
    let _sql = `select count(*) as count from posts where name = "${name}"`
    return query(_sql)
  }
  // 查询所有个人文章
  findAllPost (name){
    let _sql = `select * from posts where name = "${name}"`
    return query(_sql)
  }

  // 新增文章
  insertPosts(value) {
    let _sql = `insert into posts set name=?,title=?,content=?,uid=?,moment=?;`
    return query(_sql, value);
  }
  //获取单个文章详细信息
  getPostsDetail(id) {
    let _sql = `select * from posts where id = ${id}`
    return query(_sql)
  }
  // 编辑文章
  updatePosts(value){
    let _sql = `update posts set title=?,content=?where id=?; `
    return query(_sql, value)
  }
  // 删除文章
  deletePosts(id){
    let _sql = `delete from posts where id = ${id}`
    return query(_sql)
  }
}
export default new MysqlClass()