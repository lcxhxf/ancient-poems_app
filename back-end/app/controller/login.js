'use strict';
/**
 * @description 登录controller
 */
const Controller = require('egg').Controller;

class LoginController extends Controller {

  async login() {   // 登录
    //获取用户表的数据

    let result = await this.app.mysql.get("user",{})
    console.log(result)
    this.ctx.body=result
  }

  //判断用户名密码是否正确
  async checkLogin(){
    var jwt = require('jsonwebtoken');
    const crypto = require('crypto');
    
    let userName = this.ctx.request.body.userName
    // userName = userName.replaceAll("'", "");
    let password = this.ctx.request.body.password
    // password = password.replaceAll("'", "");
    const pwd = crypto.createHash('md5').update(password).digest('hex');
    const sql = " SELECT userId, userName, headPicPath, personalizedSig, sex, brith FROM user WHERE userName = '"+userName +
                "' AND password = '"+pwd+"'"

    const res = await this.app.mysql.query(sql)
    console.log('res：'+res[0]);
    if(res.length>0){
        //登录成功,进行session缓存
        let openId=new Date().getTime()
        const token = jwt.sign({ name: userName, pwd: password}, '123456');
        // console.log('token:',token);
        this.ctx.session.openId={ 'openId':openId }
        this.ctx.body={'data':'登录成功','openId':openId,'res':res, 'token':token}

    }else{
        this.ctx.body={data:'登录失败'}
    } 
}

}

module.exports = LoginController;
