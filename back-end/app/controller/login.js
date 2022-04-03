'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {

  async login() {
    //获取用户表的数据

    let result = await this.app.mysql.get("user",{})
    console.log(result)
    this.ctx.body=result
  }

  //判断用户名密码是否正确
  async checkLogin(){
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = " SELECT userName, headPicPath, personalizedSig, sex, brith FROM user WHERE userName = '"+userName +
                "' AND password = '"+password+"'"

    const res = await this.app.mysql.query(sql)
    // console.log('res：'+res[0]);
    if(res.length>0){
        //登录成功,进行session缓存
        let openId=new Date().getTime()
        this.ctx.session.openId={ 'openId':openId }
        this.ctx.body={'data':'登录成功','openId':openId,'res':res}

    }else{
        this.ctx.body={data:'登录失败'}
    } 
}

}

module.exports = LoginController;
