import Koa from 'koa'
import path from 'path'
import views from 'koa-views'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session-minimal'
import MysqlSession from 'koa-mysql-session'
import cors from 'koa2-cors'

import sql_config from '../config/config'
const app = new Koa();


const store = new MysqlSession({
  host     :  sql_config.database.HOST,
  user     :  sql_config.database.USERNAME,
  password :  sql_config.database.PASSWORD,
  database :  sql_config.database.DATABASE
})

app.use(cors());
import routers from './routers/index'
import router from './routers/cities';
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'
app.use(koaStatic(
  path.join( __dirname,  staticPath)
))
// 使用session中间件
app.use(session({
  key: 'SESSION_ID',
  store: store,
}))
// 使用ctx.body解析中间件
app.use(bodyParser())

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// response
// app.use(ctx => {
//   ctx.body = 'Hello Koa'
// })
// 初始化路由中间件
app.use(routers.routes())
app.listen(3002)