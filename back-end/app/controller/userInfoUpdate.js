'use strict';
/**
 * @description 用户信息修改controller
 */
const Controller = require('egg').Controller;

class userInfoUpdateController extends Controller {

    async userNameUpdate() {        // 修改用户名

        let userId = this.ctx.request.body.userId
        let userName = this.ctx.request.body.userName
        // userName = userName.replaceAll("'", "");
        // console.log('userId:'+userId);
        // console.log('userName:'+userName);
        const results = await this.app.mysql.query('update user set userName = ? where userId = ?', [userName, userId]);
        // console.log('resultslength:'+results);
        this.ctx.body = { 'data': '修改用户名成功', 'res': results }

    }

    async sexUpdate() {             // 修改用户性别

        let userId = this.ctx.request.body.userId
        let sex = this.ctx.request.body.sex
        console.log('userId:' + userId);
        console.log('sex:' + sex);
        const results = await this.app.mysql.query('update user set sex = ? where userId = ?', [sex, userId]);
        // console.log('resultslength:'+results);
        this.ctx.body = { 'data': '修改用户性别成功', 'res': results }

    }

    async personalizedSigUpdate() {        // 修改用户个性签名

        let userId = this.ctx.request.body.userId
        let personalizedSig = this.ctx.request.body.personalizedSig
        // personalizedSig = personalizedSig.replaceAll("'", "");
        console.log('userId:' + userId);
        console.log('personalizedSig:' + personalizedSig);
        const results = await this.app.mysql.query('update user set personalizedSig = ? where userId = ?', [personalizedSig, userId]);
        console.log('resultslength:' + results);
        this.ctx.body = { 'data': '修改用户个性签名成功', 'res': results }

    }

    async passwordUpdate() {         // 修改用户密码

        let userId = this.ctx.request.body.userId
        let password = this.ctx.request.body.password
        // password = password.replaceAll("'", "");
        let newPassword = this.ctx.request.body.newPassword
        // newPassword = newPassword.replaceAll("'", "");
        console.log('password:' + password);
        console.log('newPassword:' + newPassword);

        const sql = " SELECT password FROM user WHERE userId = '" + userId + "'"
        const res = await this.app.mysql.query(sql)
        if (res[0].password == password) {
            const results = await this.app.mysql.query('update user set password = ? where userId = ?', [newPassword, userId]);
            console.log('resultslength:' + results);
            this.ctx.body = { 'data': '修改用户密码成功', 'res': results }
        } else {
            this.ctx.body = { 'data': '修改用户密码失败' }
        }

    }

    async birthUpdate() {           // 修改用户生日

        let userId = this.ctx.request.body.userId
        let brith = this.ctx.request.body.brith
        console.log('userId:' + userId);
        console.log('brith:' + brith);
        const results = await this.app.mysql.query('update user set brith = ? where userId = ?', [brith, userId]);
        console.log('resultslength:' + results);
        this.ctx.body = { 'data': '修改用户生日成功', 'res': results }

    }

    async headPicUpdate() {         // 修改用户头像
        const path = require('path')
        const fs = require('fs')

        const { ctx } = this;      
        // console.log('this:',this);
        let userId = this.ctx.request.body.userId
        // console.log('userId:',userId);
        const file = ctx.request.files[0]
        // console.log('file:'+file);

        // 生成路径名
        const toFileName = '/public/upload/' + Date.now() + file.filename;
        const to = path.dirname(__dirname) + toFileName;

        // 拷贝图片至本地
        // console.log('file.filepath:'+file.filepath);
        await fs.copyFileSync(file.filepath, to)
        // await fs.unlinkSync(file.filepath)
        
        // 返回前端路径
        const newUrl = "http://localhost:7001" + toFileName;
        // const newUrl = "http://zengjichaoren.xyz:7001" + toFileName;
        // console.log(this.ctx.request.files[0])
        
        // 存储到数据库
        const results = await this.app.mysql.query('update user set headPicPath = ? where userId = ?', [newUrl, userId]);
        ctx.body = {
            msg: '图片上传成功',
            url: newUrl
        }
        // ctx.redirect('http://localhost:3000/index/my/myDetail');
    }
}

module.exports = userInfoUpdateController;
