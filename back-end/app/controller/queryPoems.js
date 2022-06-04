'use strict';
/**
 * @description 查询诗词controller
 */
const Controller = require('egg').Controller;

class QueryPoemsController extends Controller {

    async QuerySomeonePoems() {   // 查询某个诗人的诗文
        
        let author = this.ctx.request.body.author

        // let author = '李白'
        const sql = " SELECT id, author, name, dynasty, content, annotation, translation, analyse, background FROM t_poems_poem WHERE author = '" + author + "' ORDER BY RAND() LIMIT 10 OFFSET 0 "
        const res = await this.app.mysql.query(sql)

        if (res.length > 0) {
            this.ctx.body = { 'data': '查询诗词十首成功', 'res': res }
        }
    }

    async QuerySomeTypePoem() {   // 查询某种类型的诗文
        let type = this.ctx.request.body.type

        // type = '夏天'
        const sql = "SELECT * FROM t_poems_poem WHERE type = '" + type + "' ORDER BY RAND() LIMIT 10"
        const res = await this.app.mysql.query(sql)

        if (res.length > 0) {
            this.ctx.body = { 'data': '查询某种类型诗词十首成功', 'res': res }
        }
    }
    async QueryRandomTenPoems() {   // 随机查询十首古诗
        const sql = 'SELECT * FROM t_poems_poem ORDER BY RAND() LIMIT 10'
        const res = await this.app.mysql.query(sql)

        if (res.length > 0) {
            this.ctx.body = { 'data': '随机查询诗词十首成功', 'res': res }
        }
    }


}

module.exports = QueryPoemsController;
