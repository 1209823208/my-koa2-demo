// const router = require('koa-router')
import Router from 'koa-router'
import CityHandle from '../controllers/c-city'
import SearchPlace from '../controllers/v1/search'
const router = new Router();
router.get('/cities',CityHandle.getCity)
router.get('/cities/:id',CityHandle.getCityById)
router.get('/pois',SearchPlace.search)
export default router;