// const router = require('koa-router')()
// const controllers = require('../controllers/c-signin')

// const routers = router
// .get('/login', controllers.getSignin)
// .post('/handle_login', controllers.postSignin)

// module.exports = routers


// const router = require('koa-router')
import Router from 'koa-router'
import Controllers from '../controllers/c-signin'
const router = new Router();
router
.get('/login', Controllers.getSignin)
.post('/handle_login', Controllers.postSignin)
export default router;