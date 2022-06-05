'use strict';
/**
 * @description 搜索controller
 */
const Controller = require('egg').Controller;

class SearchController extends Controller {

    async FuzzySearch() {   // 模糊查询诗词出推荐结果
        let input = this.ctx.request.body.input
        // input = input.replaceAll("'", "");

        const sql1 = " SELECT author FROM t_poems_poem WHERE author LIKE '%" + input + "%'  LIMIT 3 OFFSET 0 "
        const res1 = await this.app.mysql.query(sql1)

        const sql2 = " SELECT name FROM t_poems_poem WHERE name LIKE '%" + input + "%'  LIMIT 3 OFFSET 0 "
        const res2 = await this.app.mysql.query(sql2)

        if (res1.length > 0) {
            this.ctx.body = { 'data': '模糊查询成功', 'res1': res1, 'res2': res2 }
        } else {
            this.ctx.body = { 'data': '模糊查询失败' }
        }
    }

    async Search() {   // 按输入关键字查询诗词
        let input = this.ctx.request.body.input
        // input = input.replaceAll("'", "");

        // const sql1 = " SELECT * FROM t_poems_poem WHERE CONCAT(author, name, dynasty, content, annotation, type, translation ) LIKE '%" + input + "%'  LIMIT 10 OFFSET 0 "
        // const sql1 = " SELECT * FROM t_poems_poem,t_poems_poem_tang1 WHERE CONCAT(t_poems_poem.author, t_poems_poem.name, t_poems_poem.dynasty, t_poems_poem.content, t_poems_poem.type, t_poems_poem_tang1.author, t_poems_poem_tang1.name, t_poems_poem_tang1.dynasty, t_poems_poem_tang1.content, t_poems_poem_tang1.type) LIKE '%" + input + "%'  LIMIT 10 OFFSET 0 "
        const sql1 = " SELECT * FROM t_poems_poem WHERE CONCAT(t_poems_poem.author, t_poems_poem.name, t_poems_poem.dynasty, t_poems_poem.content, t_poems_poem.type) LIKE '%" + input + "%'  LIMIT 10 OFFSET 0 "
        const res1 = await this.app.mysql.query(sql1)


        if (res1.length > 0) {
            this.ctx.body = { 'data': '搜索框查询成功', 'res1': res1 }
        } else {

        }

    }

    async NameSearch() {   // 按输入诗名查询一首诗词
        let name = this.ctx.request.body.name
        // name = name.replaceAll("'", "");

        const sql1 = " SELECT * FROM t_poems_poem,t_poems_poem_tang1 WHERE CONCAT(t_poems_poem.name, t_poems_poem_tang1.name) LIKE '%" + name + "%'  LIMIT 1 OFFSET 0 "
        const res1 = await this.app.mysql.query(sql1)


        if (res1.length > 0) {
            this.ctx.body = { 'data': '按输入诗名查询一首诗词成功', 'res1': res1 }
        } else {

        }

    }

    async SearchType() {    // 查询类型表的所有类型
        const sql = "SELECT name FROM t_poems_type"
        const res = await this.app.mysql.query(sql)

        if (res.length > 0) {
            this.ctx.body = { 'data': '查询诗词的类型成功', 'res': res }
        }
    }

    async SearchPoet() {    // 查询诗人表的所有诗人
        const sql = "SELECT name FROM t_poems_poet"
        const res = await this.app.mysql.query(sql)

        if (res.length > 0) {
            this.ctx.body = { 'data': '查询所有诗人的名字成功', 'res': res }
        }
    }

    async SearchDynasty() {    // 查询朝代表的所有朝代
        const sql = "SELECT name FROM t_poems_dynasty"
        const res = await this.app.mysql.query(sql)

        if (res.length > 0) {
            this.ctx.body = { 'data': '查询所有朝代成功', 'res': res }
        }
    }


}

module.exports = SearchController;
