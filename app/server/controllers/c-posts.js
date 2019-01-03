import moment from 'moment'
import userModel from '../lib/mysql.js'
class Cposts{

    async getRedirectPosts (ctx){
        ctx.redirect('/posts/all');
    }
    // 文章统计页面
    async getPosts(ctx){
        let res,
            postCount = 0,
            name = ctx.session && ctx.session.user ? ctx.session.user : '';
        console.log('name', ctx.session)
        console.log('name', name)
        if (!name) {
            ctx.redirect('/signin/login');
        } else {
            await userModel.findPostCountByName(name)
                .then(result => {
                    postCount = result[0].count
                })
            await userModel.findAllPost(name)
                .then(result => {
                    res = result
                })
            console.log('res', res);
            await ctx.render('selfPosts', {
                session: ctx.session,
                posts: res,
                postsPageLength: Math.ceil(postCount / 10),
                postCount
            })
        }
    }
    // 发表文章
    async addPosts(ctx){
        await ctx.render('add', {
    
        })
    }
    // 发表文章添加库
    async addPostsHandle (ctx) {
        let formData = ctx.request.body,
            result = {
                code: '',
                message: '',
                data: null
            }
        let {
            title,
            content
        } = formData,
        name = ctx.session.user,
            id = ctx.session.id,
            time = moment().format('YYYY-MM-DD HH:mm:ss');
        await userModel.insertPosts([name, title, content, id, time])
            .then(res => {
                result.code = 200;
                result.message = '发表文章成功';
                ctx.body = result;
            }).catch(error => {
                result.code = 500;
                result.message = 'fail';
                ctx.body = result;
            })
    }
    //go edit page
    async getEditPage(ctx) {
        let title, content;
        let id = ctx.params.postId;
        await userModel.getPostsDetail(id)
            .then(res => {
                console.log('res', res);
                title = res[0].title
                content = res[0].content
            })
            .catch(error => {
                console.log('error', error);
            })
        await ctx.render('edit', {
            title,
            content,
            id
        })
    }
    // handel edit fun
    async getEditHandle(ctx) {
        let {
            title,
            content
        } = ctx.request.body,
            id = ctx.params.postId,
            result = {
                code: '',
                message: '',
                data: null
            }
        await userModel.updatePosts([title, content, id])
            .then(res => {
                console.log('res:::', res)
                result.code = 200
                result.message = 'sucess'
                ctx.body = result
            }).catch(error => {
                result.code = 500
                result.message = 'fail'
                ctx.body = result
            })
    }
    //删除文章
    async getDeleteHandle(ctx){
        let id = ctx.request.query.id,
            result = {
                code: '',
                message: '',
                data: null
            }
        await userModel.deletePosts(id)
            .then(res => {
                result.code = 200
                result.message = 'sucess'
                ctx.body = result
            }).catch(error => {
                result.code = 500
                result.message = 'fail'
                ctx.body = result
            })
    }
}
export default new Cposts()