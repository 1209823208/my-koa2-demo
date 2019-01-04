/**
 * 主页子路由
 */

// const router = require('koa-router')()
// const index = require('../controllers/index')

// module.exports = router
//   .get('/', index)


  // const router = require('koa-router')
import Router from 'koa-router'
import index from '../controllers/index'
const router = new Router();
router.get('/',index)
export default router;