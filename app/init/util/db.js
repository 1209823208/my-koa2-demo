const mysql = require('mysql')
const sql_config = require('../../config/config')

const pool = mysql.createPool({
  host     :  sql_config.database.HOST,
  user     :  sql_config.database.USERNAME,
  password :  sql_config.database.PASSWORD,
  database :  sql_config.database.DATABASE
})

let query = function( sql, values ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  }).catch(error => console.log('catch', error))

}

module.exports = {
  query
}