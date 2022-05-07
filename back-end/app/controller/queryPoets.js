'use strict'
/**
 * @description 查询诗人controller
 */
const Controller = require('egg').Controller;

class QueryPoetsController extends Controller {

    async QueryADynastyPoets() {    // 查询某个朝代的诗人
        let dynasty = this.ctx.request.body.dynasty

        const sql = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '" + dynasty + "' LIMIT 20 "
        const res = await this.app.mysql.query(sql)

        if (res.length > 0) {
            this.ctx.body = { 'data': '查询某朝代的诗人成功', 'res': res }
        } else {
            this.ctx.body = { 'data': '该朝代的诗人不存在', 'res': [{
                "id": 0,
                "name": "暂无",
                "dynasty": "暂无",
                "intro": "暂无",
                "masterwork": "暂无"
            }]}
        }
    }

    async QuerySortDynastyPoets() {     // 查询分类部分的各个朝代的诗人

        // 先秦
        const sql1 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '先秦' or t_poems_dynasty.name = '夏朝' or t_poems_dynasty.name = '商朝' or t_poems_dynasty.name = '西周' or t_poems_dynasty.name = '东周' or t_poems_dynasty.name = '秦朝' or t_poems_dynasty.name = '楚汉相争' LIMIT 20 "
        const res1 = await this.app.mysql.query(sql1)

        // 两汉
        const sql2 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '西汉' or t_poems_dynasty.name = '东汉' LIMIT 20 "
        const res2 = await this.app.mysql.query(sql2)

        // 魏晋
        const sql3 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '曹魏' or t_poems_dynasty.name = '西晋' or t_poems_dynasty.name = '东晋' LIMIT 20 "
        const res3 = await this.app.mysql.query(sql3)

        // 南北朝
        const sql4 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '南朝' or t_poems_dynasty.name = '北朝' LIMIT 20 "
        const res4 = await this.app.mysql.query(sql4)

        // 隋朝
        const sql5 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '隋朝'  LIMIT 20 "
        const res5 = await this.app.mysql.query(sql5)

        // 唐朝
        const sql6 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '隋朝'  LIMIT 20 "
        const res6 = await this.app.mysql.query(sql6)

        // 五代
        const sql7 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '隋朝'  LIMIT 20 "
        let res7 = await this.app.mysql.query(sql7)
        if(res7.length <= 0) {
            res7 = [{
                "id": 0,
                "name": "暂无",
                "dynasty": "暂无",
                "intro": "暂无",
                "masterwork": "暂无"
            }]
        }

        // 南宋
        const sql8 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '南宋'  LIMIT 20 "
        const res8 = await this.app.mysql.query(sql8)

        // 北宋
        const sql9 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '隋朝'  LIMIT 20 "
        const res9 = await this.app.mysql.query(sql9)

        // 金朝
        const sql10 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '金朝'  LIMIT 20 "
        let res10 = await this.app.mysql.query(sql10)
        if(res10.length <= 0) {
            res10 = [{
                "id": 0,
                "name": "暂无",
                "dynasty": "暂无",
                "intro": "暂无",
                "masterwork": "暂无"
            }]
        }

        // 元朝
        const sql11 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '元朝'  LIMIT 20 "
        let res11 = await this.app.mysql.query(sql11)
        if(res11.length <= 0) {
            res11 = [{
                "id": 0,
                "name": "暂无",
                "dynasty": "暂无",
                "intro": "暂无",
                "masterwork": "暂无"
            }]
        }

        // 明朝
        const sql12 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '明朝'  LIMIT 20 "
        let res12 = await this.app.mysql.query(sql12)
        if(res12.length <= 0) {
            res12 = [{
                "id": 0,
                "name": "暂无",
                "dynasty": "暂无",
                "intro": "暂无",
                "masterwork": "暂无"
            }]
        }

        // 清朝
        const sql13 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '清朝'  LIMIT 20 "
        let res13 = await this.app.mysql.query(sql13)
        if(res13.length <= 0) {
            res13 = [{
                "id": 0,
                "name": "暂无",
                "dynasty": "暂无",
                "intro": "暂无",
                "masterwork": "暂无"
            }]
        }

        // 近现代
        const sql14 = " SELECT t_poems_poet.id, t_poems_poet.name, t_poems_dynasty.name as dynasty, t_poems_poet.intro, t_poems_poet.masterwork FROM t_poems_poet INNER JOIN t_poems_dynasty ON t_poems_poet.dynastyid = t_poems_dynasty.id where t_poems_dynasty.name = '近现代'  LIMIT 20 "
        let res14 = await this.app.mysql.query(sql14)
        if(res14.length <= 0) {
            res14 = [{
                "id": 0,
                "name": "暂无",
                "dynasty": "暂无",
                "intro": "暂无",
                "masterwork": "暂无"
            }]
        }

        if (res1.length > 0) {
            this.ctx.body = { 'data': '查询分类部分的各个朝代的诗人成功', 'res': {xianqin:res1,lianghan:res2,weijin:res3,nanbeichao:res4,suichao:res5,tangchao:res6,wudai:res7,nansong:res8,beisong:res9,jinchao:res10,yuanchao:res11,mingchao:res12,qingchao:res13,jinxiandai:res14} }
        } else {
            this.ctx.body = { 'data': '该朝代的诗人不存在', 'res': [{
                "id": 0,
                "name": "暂无",
                "dynasty": "暂无",
                "intro": "暂无",
                "masterwork": "暂无"
            }]}
        }
    }
}

module.exports = QueryPoetsController