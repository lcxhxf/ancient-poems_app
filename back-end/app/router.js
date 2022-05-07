'use strict';

/**
 * @param {Egg.Application} app - egg application
 * @description 后端路由文件
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/login', controller.login.login)
  router.post('/checkLogin',controller.login.checkLogin)
  router.post('/register',controller.register.register)

  router.post('/userNameUpdate',controller.userInfoUpdate.userNameUpdate)
  router.post('/passwordUpdate',controller.userInfoUpdate.passwordUpdate)
  router.post('/sexUpdate',controller.userInfoUpdate.sexUpdate)
  router.post('/personalizedSigUpdate',controller.userInfoUpdate.personalizedSigUpdate)
  router.post('/birthUpdate',controller.userInfoUpdate.birthUpdate)
  router.post('/headPicUpdate',controller.userInfoUpdate.headPicUpdate)

  router.post('/QuerySomeonePoems',controller.queryPoems.QuerySomeonePoems)
  router.post('/QueryRandomTenPoems',controller.queryPoems.QueryRandomTenPoems)
  router.post('/QuerySomeTypePoem',controller.queryPoems.QuerySomeTypePoem)

  router.post('/FuzzySearch',controller.search.FuzzySearch)
  router.post('/Search',controller.search.Search)
  router.post('/SearchType',controller.search.SearchType)
  router.post('/SearchPoet',controller.search.SearchPoet)
  router.post('/SearchDynasty',controller.search.SearchDynasty)

  router.post('/QueryADynastyPoets',controller.queryPoets.QueryADynastyPoets)
  router.post('/QuerySortDynastyPoets',controller.queryPoets.QuerySortDynastyPoets)
};
