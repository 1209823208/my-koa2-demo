import error from '../controllers/error'
import Router from 'koa-router'
const router = new Router();

router.get('*', error)
export default router;
 