/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 * @description 插件配置文件
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1648260168545_2989';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.multipart = {  // 配置上传文件插件
    mode: 'file'
  };
  config.jwt = {      // 配置jwt
    secret: "123456"
  };
  config.mysql = {    // 配置mysql数据库
    // database configuration
    // client: {
    //   // host
    //   host: '127.0.0.1',
    //   // port
    //   port: '3306',
    //   // username
    //   user: 'root',
    //   // password
    //   password: '',
    //   // database
    //   database: 'ancientpoems',
    // },
    client: {
      // host
      host: '127.0.0.1',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '',
      // database
      database: 'ancientpoems',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  config.security = {
    csrf: { enable: false },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: ctx => ctx.get('origin'),
    // origin: '*', //只允许这个域进行访问接口
    credentials: true,   // 开启认证 支持cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  return {
    ...config,
    ...userConfig,
  };
};
exports.multipart = {
  mode: 'file',
};
// exports.jwt = {
//   secret: "123456"
// };

