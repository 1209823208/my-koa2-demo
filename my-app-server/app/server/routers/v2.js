// const router = require('koa-router')
import Router from 'koa-router'
import Entry from '../controllers/v2/entry'
import SearchPlace from '../controllers/v1/search'
const router = new Router();
router.get('/index_entry',Entry.getEntry)
router.get('/pois/:latitude_longitude',SearchPlace.getPois)
export default router;