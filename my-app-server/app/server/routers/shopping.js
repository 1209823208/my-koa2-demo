// const router = require('koa-router')
import Router from 'koa-router'
import Shopping from '../controllers/shopping'
import Category from '../controllers/c-category'
const router = new Router();
router.get('/restaurants',Shopping.getRestaurants)
router.get('/v2/restaurants/category',Category.getCategories)
export default router;