'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/login', controller.login.login)
  router.post('/checkLogin',controller.login.checkLogin)
  router.post('/register',controller.register.register)
};
