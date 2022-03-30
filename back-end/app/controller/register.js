'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {

  async index() {
    const { ctx } = this;
    ctx.body = 'hi, register';
  }

}

module.exports = RegisterController;
