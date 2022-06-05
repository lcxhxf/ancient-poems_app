'use strict';
/**
 * @description 用户收藏诗词controller
 */
const Controller = require('egg').Controller;

class FeiHuaLingController extends Controller {

    async GetAnswer() {
        const { key } = this.ctx.request.body;
        // const sql = `SELECT id,answer FROM t_poem_answer WHERE isUse = 0 AND answer like '%${key}%' ORDER BY rand() limit 1`
        const sql = `SELECT answer FROM t_poem_answer WHERE answer like '%${key}%'`
        const res1 = await this.app.mysql.query(sql);
        let res = []
        res1.map((item, index) => {
            res.push(item.answer)
        })

        if (res.length > 0) {
            // const sql2 = `UPDATE t_poem_answer SET isUse = 1   WHERE  id = ${res[0].id} `
            // const res2 = await this.app.mysql.query(sql2);
            this.ctx.body = { 'data': '获取答案成功', 'res': res };
        } else {
            this.ctx.body = { 'data': '暂无更多数据' }
        }

    }
    async CheckAnswer() {
        const { key, answer } = this.ctx.request.body;
        const sql = `SELECT id,answer FROM t_poem_answer WHERE isUse = 0 AND answer like '%${key}%' `
        const res = await this.app.mysql.query(sql);
        // console.log(typeof answer, '---------');
        let answers = answer.replace(/\s/g, "");
        let flag = false;
        for (let i = 0; i < res.length; i++) {
            let temp = res[i].answer.replace(/\s/g, "");
            if (answer == temp) {
                const sql2 = `UPDATE t_poem_answer SET isUse = 1   WHERE  id = ${res[i].id} `
                const res2 = await this.app.mysql.query(sql2);
                flag = true;
            }
        }
        console.log(res);
        this.ctx.body = { 'data': '查询成功', 'result': flag };
    }

    async ChangeAllAnswer() {
        const sql = `UPDATE t_poem_answer SET isUse =  0`
        const res = await this.app.mysql.query(sql);
        console.log(res, '------------');
        this.ctx.body = { 'data': '更新成功', 'res': res }
    }

    
}

module.exports = FeiHuaLingController;
