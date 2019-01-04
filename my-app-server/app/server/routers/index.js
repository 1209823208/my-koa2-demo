/**
 * 整合所有子路由
 */

// const router = require('koa-router')()
// const home = require('./home')
// const signin = require('./signin')
// const posts = require('./posts')
// const cities = require('./cities')
// const error = require('./error')

// router.use('/', home.routes(), home.allowedMethods())
// router.use('/signin', signin.routes(), signin.allowedMethods())
// router.use('/posts', posts.routes(), posts.allowedMethods())
// router.use('/cities', cities, cities.allowedMethods())
// router.use('/error', error.routes(), error.allowedMethods())

// module.exports = router

import Router from 'koa-router'
const router = new Router();
import home from './home'
import signin from './signin'
import posts from './posts'
import cities from './cities'
import v2 from './v2'
import shopping from './shopping'
import error from './error'
router.use('/',home.routes())
router.use('/signin',signin.routes())
router.use('/posts',posts.routes())
router.use('/v1',cities.routes())
router.use('/v2',v2.routes())
router.use('/shopping',shopping.routes())
router.use('/error',error.routes())
export default router
