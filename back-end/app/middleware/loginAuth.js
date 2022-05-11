/**
 * @description 路由守卫，检查是否已经登录
 *  
 */
 module.exports = (options) =>{
    
    return async function loginAuth(ctx,next){
        var jwt = require('jsonwebtoken');
        let token = ctx.request.body.token
        console.log(token);
        try {
            var decoded = jwt.verify(token, '123456');
            // console.log(decoded.name);
            await next()
          } catch(err) {
            ctx.body = {
                data:'没有token'
            }
          }
    }
}