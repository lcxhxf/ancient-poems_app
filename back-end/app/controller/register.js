'use strict';
/**
 * @description 注册controller
 */
const Controller = require('egg').Controller;

class RegisterController extends Controller {

  async register() {    // 注册
    const crypto = require('crypto');
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const pwd = crypto.createHash('md5').update(password).digest('hex');
    const sql = " SELECT userName, headPicPath, personalizedSig, sex, brith FROM user WHERE userName = '" + userName +  // 查询数据库是否已经注册
      "' AND password = '" + pwd + "'"

    const res = await this.app.mysql.query(sql)
    // console.log('res：'+res[0]);
    if (res.length == 0) {     // 未注册则进行数据库写入

      let userProps = this.ctx.request.body
      userProps.password = pwd
      const res = await this.app.mysql.insert('user', userProps)
      this.ctx.body = { 'data': '注册成功', 'res': res,'jiami':pwd }

    } else {
      this.ctx.body = { data: '注册失败' }
    }
  }

}

module.exports = RegisterController;
