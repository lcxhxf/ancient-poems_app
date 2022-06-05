'use strict';

/**
 * @param {Egg.Application} app - egg application
 * @description 后端路由文件
 */
module.exports = app => {
  const { router, controller } = app;
  let loginAuth = app.middleware.loginAuth()
  
  // 登录注册
  router.get('/login', controller.login.login)
  router.post('/checkLogin',controller.login.checkLogin)
  router.post('/register',controller.register.register)

  // 用户个人信息修改
  router.post('/userNameUpdate',controller.userInfoUpdate.userNameUpdate)
  router.post('/passwordUpdate',controller.userInfoUpdate.passwordUpdate)
  router.post('/sexUpdate',controller.userInfoUpdate.sexUpdate)
  router.post('/personalizedSigUpdate',controller.userInfoUpdate.personalizedSigUpdate)
  router.post('/birthUpdate',controller.userInfoUpdate.birthUpdate)
  router.post('/headPicUpdate',controller.userInfoUpdate.headPicUpdate)

  // 查询诗词
  router.post('/QuerySomeonePoems',controller.queryPoems.QuerySomeonePoems)
  router.post('/QueryRandomTenPoems',controller.queryPoems.QueryRandomTenPoems)
  router.post('/QuerySomeTypePoem',controller.queryPoems.QuerySomeTypePoem)

  // 搜索功能
  router.post('/FuzzySearch',loginAuth,controller.search.FuzzySearch)
  router.post('/Search',loginAuth,controller.search.Search)
  router.post('/NameSearch',controller.search.NameSearch)
  router.post('/SearchType',controller.search.SearchType)
  router.post('/SearchPoet',controller.search.SearchPoet)
  router.post('/SearchDynasty',controller.search.SearchDynasty)

  // 查询诗人
  router.post('/QueryADynastyPoets',controller.queryPoets.QueryADynastyPoets)
  router.post('/QuerySortDynastyPoets',controller.queryPoets.QuerySortDynastyPoets)

  // 收藏
  router.post('/AddCollection', controller.collection.AddCollecions)
  router.post('/QueryCollection', controller.collection.QueryCollections)

  // 浏览记录
  router.post('/AddHistory', controller.browseHistory.AddHistory) // 添加历史记录
  router.post('/SearchHistory', controller.browseHistory.SearchHistory) //搜索某用户id的历史记录 

  // 诗单的创建
  router.post('/CreateList', controller.poemList.CreateList);
  router.post('/UpdateList', controller.poemList.UpdateList);
  router.post('/DeleteList', controller.poemList.DeleteList);
  router.post('/CheckList', controller.poemList.CheckList)  // 查看某用户的所以诗单

  // 添加诗词到诗单
  router.post('/AddPoemToList', controller.poemList.AddPoemToList);
  router.post('/CheckPoemList', controller.poemList.CheckPoemList);
  router.post('/DeletePoemList', controller.poemList.DeletePoemList);

  // 用户自创作品 
  router.post('/CreateWork', controller.forum.CreateWork);  // 创建作品,保存在草稿箱中, 默认状态为0，在草稿箱中
  router.post('/CreateComment', controller.forum.CreateComment); // 创建评论
  router.post('/CheckWork', controller.forum.CheckWork); // 按时间顺序 查看论坛中 state = 1 的发布作品
  router.post('/PostWork', controller.forum.PostWork)  // 发布作品，将草稿箱中的作品进行发布 state改为1
  
  // 添加考一考题目路由
  router.post('/AddTest', controller.test.AddTest)
  router.get('/QueryTest', controller.test.QueryTest)

  // 飞花令
  router.post('/GetAnswer', controller.feiHuaLing.GetAnswer)  // 用来根据随机数活得答案
  router.post('/CheckAnswer', controller.feiHuaLing.CheckAnswer) // 用来检测用户的答案
  router.get('/ChangeAllAnswer', controller.feiHuaLing.ChangeAllAnswer) // 用来改变所有答案状态，飞花令结束时候出触发

};
