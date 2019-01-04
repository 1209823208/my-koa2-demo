

import Router from 'koa-router'
import Cposts from '../controllers/c-posts'

const router = new Router();
router
.get('/', Cposts.getRedirectPosts)
.get('/all',Cposts.getPosts)
.get('/add',Cposts.addPosts)
.post('/add_handle',Cposts.addPostsHandle)
.get('/edit/:postId',Cposts.getEditPage)
.post('/edit/:postId',Cposts.getEditHandle)
.get('/delete',Cposts.getDeleteHandle)
export default router;