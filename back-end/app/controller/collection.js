'use strict';
/**
 * @description 用户收藏诗词controller
 */
const Controller = require('egg').Controller;

class CollectionController extends Controller {

    async AddCollecions() {   // 点击收藏按键  前端需要发送userId, CollectionId
        const { collectionId, userId } = this.ctx.request.body

        console.log(collectionId);
        const sql = " SELECT * FROM  t_collection_poem  WHERE  beCollectedId= '" + collectionId + "' AND  userId = '" + userId + "' "
        const res = await this.app.mysql.query(sql);
        if (res.length > 0) {
            const results = await this.app.mysql.query('update t_poems_poem set collection = ? where id = ?', [0, collectionId]);
            const sql4 = `DELETE FROM t_collection_poem WHERE userId = ${userId}  AND beCollectedId= ${collectionId}`
            const res4 = await this.app.mysql.query(sql4);
            this.ctx.body = { 'result': "取消收藏成功", 'res': res };
        } else {
            // const sql2 = " SELECT type FROM  t_poems_poem  WHERE  id = '" + collectionId + "' "  // 获取type 类型，用做添加操作的字段
            // const res2 = await this.app.mysql.query(sql2);

            // console.log(typeof time);
            // console.log(typeof res2[0].type);
            const results = await this.app.mysql.query('update t_poems_poem set collection = ? where id = ?', [1, collectionId]);
            const sql3 = `INSERT INTO t_collection_poem(userId,beCollectedId) VALUES(${userId},${collectionId})`
            const res3 = await this.app.mysql.query(sql3);

            this.ctx.body = { 'result': "收藏成功" };
        }

    }

    async QueryCollections() {  // 查看用户个人收藏合集, 可以进行传参 page 页面进行翻页操作
        const { userId, page } = this.ctx.request.body;
        console.log(userId, page);
        const limit = 5;  // 限制一页多少条数据

        const sql = `SELECT t_collection_poem.id, t_poems_poem.name, t_poems_poem.author as description  FROM t_collection_poem INNER JOIN t_poems_poem ON t_collection_poem.beCollectedId = t_poems_poem.id WHERE t_collection_poem.userId = ${userId} `;
        // const sql = `SELECT t_collection_poem.id, t_poems_poem.name, t_poems_poem.author as description  FROM t_collection_poem INNER JOIN t_poems_poem ON t_collection_poem.beCollectedId = t_poems_poem.id WHERE t_collection_poem.userId = ${userId} limit ${(page - 1) * limit}, ${page * limit} `;
        const res = await this.app.mysql.query(sql);
        // console.log(res.length);

        // const sql2 = `SELECT id, type, userId, beCollectedId FROM t_collection_poem WHERE userId = ${userId}`
        // const res2 = await this.app.mysql.query(sql2);
        // console.log(res2.length);

        // if (res2.length > (page - 1) * limit) {
            this.ctx.body = { 'result': "收藏合集", 'res': res }; // 传送 res.length 给前台， 除以 limit 就可以得知总共最多的 page
        // } else {
            // this.ctx.body = { 'result': "无更多数据" };
        // }

    }

}

module.exports = CollectionController;
