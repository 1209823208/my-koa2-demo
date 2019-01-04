import  md5 from 'md5';
import userModel from '../lib/mysql.js'
class Csign{
    async getSignin (ctx){
        await ctx.render('signin', {
            title: '登录'
        })
    }
    async postSignin (ctx){
        let formData = ctx.request.body,
            allow = false;
        let result = {
            code: '',
            message: '',
            data: null
        }
        let {
            name,
            password
        } = ctx.request.body
        await userModel.findDataByName(name)
            .then(result => {
                let res = result;
                if (res.length && name == res[0]['name'] && md5(password) === res[0]['password']) {
                    ctx.session = {
                        user: res[0]['name'],
                        id: res[0]['id']
                    }
                    result = {
                        code: 200,
                        message: 'sucess',
                    }
                    console.log('ctx.session.id', ctx.session.id);
                    console.log('ctx.session', ctx.session);
                } else if (res.length && name == res[0]['name'] && md5(password) !== res[0]['password']) {
                    result = {
                        code: 500,
                        message: '密码错误',
                    }
                } else if (res.length === 0) {
                    allow = true;
                }
                ctx.body = result
            }).catch(err => {
                console.log('err', err);
            })
        if (allow) {
            let params = [
                name,
                md5(password)
            ]
            await userModel.insertData(params)
                .then(res => {
                    ctx.session = {
                        user: name,
                        id: res['insertId']
                    }
                    result = {
                        code: 200,
                        message: 'sucess',
                    }
                    console.log('ctx.session.id', ctx.session.id);
                    console.log('ctx.session', ctx.session);
                })
        }
    }
}
export default new Csign()