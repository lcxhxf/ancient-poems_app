'use strict';
/**
 * @description 登录controller
 */
const Controller = require('egg').Controller;

class QueryPoemsController extends Controller {

    async QuerySomeonePoems() {   // 查询某个诗人的诗文
        
        let author = this.ctx.request.body.author

        // let author = '李白'
        const sql = " SELECT name, dynasty, content, annotation, translation, analyse, background FROM t_poems_poem_tang1 WHERE author = '" + author + "' LIMIT 10 OFFSET 0 "
        const res = await this.app.mysql.query(sql)

        if (res.length > 0) {
            this.ctx.body = { 'data': '查询诗词十首成功', 'res': res }
        }
    }


}

module.exports = QueryPoemsController;
