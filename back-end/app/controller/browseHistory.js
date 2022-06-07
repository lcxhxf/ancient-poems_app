'use strict';
/**
 * @description 用户浏览历史controller
 */
const Controller = require('egg').Controller;

class BrowseHistoryController extends Controller {

    async AddHistory() { // 添加进入历史记录   传参为 poemId 浏览诗词的id， userId 浏览人的id 若能从token拿到则不需传参
        const { poemId, userId } = this.ctx.request.body;

        const sql = `INSERT INTO t_history_watch(poemId,userId) VALUES(${poemId},${userId})`
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { 'result': "插入历史数据成功", 'res': res };
    }

    async SearchHistory() { // 返回的 res 是一个对象，里面存放着poemId,要调用查找poemId的接口查询详细的poem数据
        const { userId, page } = this.ctx.request.body;
        const limit = 1000;
        // const sql = `SELECT t_history_watch.id, t_poems_poem.name, t_poems_poem.author as description from t_history_watch INNER JOIN t_poems_poem ON t_history_watch.poemId = t_poems_poem.id where userId = ${userId} Order by inputTime desc limit  ${(page - 1) * limit}, ${page * limit}`
        const sql = `SELECT * from t_history_watch INNER JOIN t_poems_poem ON t_history_watch.poemId = t_poems_poem.id where userId = ${userId} Order by inputTime desc limit  ${(page - 1) * limit}, ${page * limit}`
        const res = await this.app.mysql.query(sql);
        if (res.length > 0) {
            this.ctx.body = { 'result': '查询历史记录成功', 'res': res };
        } else {
            this.ctx.body = { 'result': "暂无历史记录" }
        }
    }

}

module.exports = BrowseHistoryController;
