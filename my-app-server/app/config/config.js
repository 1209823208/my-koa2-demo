import Koa from 'koa'
const app = new Koa();
const env = app.env;
console.log('app.get(env)',app.env )
//本地启动服务
const localhost_config = {
    port:3000,
    database:{
        DATABASE: 'koa_demo',
        USERNAME: 'root',
        PASSWORD: 'root123456',
        PORT: '3306',
        HOST: 'localhost'
    }
}
//本地docker
const development_config = {
    database:{
        DATABASE: 'test1',
        USERNAME: 'root',
        PASSWORD: 'password',
        PORT: '3306',
        HOST: 'mysql_inst'
    }
}
// 生产环境docker
const production_config = {
    database:{
        DATABASE: 'koa_demo',
        USERNAME: 'root',
        PASSWORD: 'root123456',
        PORT: '3306',
        HOST: 'mysql-react'
    }
}
let config;
if(env ==='localhost'){
    config = localhost_config;
}else if(env ==='development'){
    config = development_config;
}else{
    config = production_config;
}
export default config