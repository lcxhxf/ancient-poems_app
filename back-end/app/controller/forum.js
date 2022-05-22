'use strict';
/**
 * @description 用户收藏诗词controller
 */
const Controller = require('egg').Controller;

class ForumController extends Controller {

    async CreateWork() {  // 创建作品，需要传入 title 标题， userId 用户id(若能从token上拿到则不用传),text文本, state状态  0 表示草稿， 1表示完成， 2表示废品,commentNum 评论数，默认值为0
        const { title, userId, text } = this.ctx.request.body


        console.log(title, userId, text);
        const sql = `INSERT INTO t_work_poem(title,userId,text,commentNum,state) VALUES('${title}',${userId},'${text}', 0, 0)  `
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { 'result': "创建成功", 'res': res }; //返回的insertId 可以作为发布的
    }

    async CreateComment() { // 传入作品workid (在哪个作品下评论的), CommentText 作品文章， userId(用户id 外键，若token能拿到可不传) 评论表有触发器
        const { workId, userId, commentText } = this.ctx.request.body;
        console.log(workId, userId, commentText);
        const sql = `INSERT INTO t_comment(commentText,userId,workId) VALUES('${commentText}',${userId},${workId})`
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { 'result': '创建成功，保存在草稿箱中' };
    }

    async CheckWork() { // 查询作品，以论坛方式，按照时间来排序 order by modifyTime,  并且只查看作品状态为 state = 1的作品, 参数为page， 一次显示5条作品
        const { page } = this.ctx.request.body;
        const limit = 5;
        const sql = `SELECT workId,title,userId,text,commentNum from t_work_poem where state = 1  ORDER BY  modifyTime limit ${(page - 1) * limit}, ${page * limit} `;
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { "result": '查询成功', 'res': res };
    }

    async PostWork() {  // 发布作品， 将草稿箱的作品 发布成为能在论坛中查询到的作品
        const { workId } = this.ctx.request.body;
        const sql = `UPDATE	t_work_poem  SET state = 1 WHERE workId = ${workId};`
        const res = await this.app.mysql.query(sql);
        this.ctx.body = { "result": "发布成功", 'res': res };


    }

}

module.exports = ForumController;
