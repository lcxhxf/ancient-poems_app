'use strict';
/**
 * @description 用户收藏诗词controller
 */
const Controller = require('egg').Controller;

class TestController extends Controller {

    async QueryTest() {  // 获取题库题目 以及  答案
        const sql = `SELECT * FROM   t_exam_test ORDER BY ID LIMIT 0,10`
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { 'result': '获取考题成功', 'res': res };
    }

    async AddTest() {  // 添加题库题目
        const { type, question, answer } = this.ctx.request.body;
        console.log(type, question, answer, "---------------------------------");

        const sql = `INSERT INTO t_exam_test(type,examQuestion,answer) VALUES(${type},'${question}','${answer}')`
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { 'result': '添加考题成功', 'res': `{type:${type},question:${question},answer:${answer}}` }
    }

}

module.exports = TestController;
