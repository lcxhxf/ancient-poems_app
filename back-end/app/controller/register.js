'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {

  async register() {
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = " SELECT userName, headPicPath, personalizedSig, sex, brith FROM user WHERE userName = '" + userName +  // 查询数据库是否已经注册
      "' AND password = '" + password + "'"

    const res = await this.app.mysql.query(sql)
    // console.log('res：'+res[0]);
    if (res.length == 0) {     // 未注册则进行数据库写入

      let userProps = this.ctx.request.body
      const res = await this.app.mysql.insert('user', userProps)
      this.ctx.body = { 'data': '注册成功', 'res': res }

    } else {
      this.ctx.body = { data: '注册失败' }
    }
  }

}

module.exports = RegisterController;
