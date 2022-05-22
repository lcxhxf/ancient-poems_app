'use strict';
/**
 * @description 用户诗单功能controller
 */
const Controller = require('egg').Controller;

class PoemListController extends Controller {

    async CreateList() { // 创建诗单，没有做查重处理
        const { name, userId } = this.ctx.request.body;
        const sql = `INSERT INTO t_total_list(name,userId) VALUES ('${name}',${userId})`
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { "result": "创建表单成功", 'res': res };
    }

    async DeleteList() { // 传参，传入list表的主键, 删除是删除当前选择诗单的表
        const { listId } = this.ctx.request.body;
        const sql = `DELETE FROM t_total_list WHERE id = ${listId}`;
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { 'result': "删除表单成功", 'res': res };
    }

    async UpdateList() {
        const { listId, name } = this.ctx.request.body;
        const sql = `UPDATE	t_total_list  SET name = '${name}' WHERE id = ${listId};`
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { "result": "更新成功", 'res': res };
    }

    async CheckList() {
        const { userId } = this.ctx.request.body;
        const sql = `SELECT id,title FROM t_total_list WHERE userId = ${userId}`;
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { "result": "查看成功", 'res': res }
    }

    async AddPoemToList() {
        const { userId, listId, poemId } = this.ctx.request.body;
        const sql = `INSERT INTO t_poem_list(poemId,userId,listId) VALUES (${poemId},${userId},${listId})`
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { 'result': '添加诗单成功', 'res': res }
    }

    async CheckPoemList() {
        const { userId, listId } = this.ctx.request.body
        const sql = `SELECT t_poem_list.id, t_poems_poem.name, t_poems_poem.author as description FROM t_poem_list INNER JOIN t_poems_poem ON t_poem_list.poemId = t_poems_poem.id WHERE userId=${userId} AND listId = ${listId}`;
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { 'result': "查看诗单列表成功", 'res': res };
    }

    async DeletePoemList() {
        const { id } = this.ctx.request.body;
        const sql = `DELETE FROM t_poem_list WHERE  id =${id}`;
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { 'result': "删除诗单列表成功", 'res': res };

    }

}

module.exports = PoemListController;
