'use strict';

/** 
 * @type Egg.EggPlugin 
 * @description 插件引入文件
*/
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};

module.exports.multipart  = {      // config 中启用 file 模式
  mode: 'file',
}
module.exports.mysql = {    // mysql插件
  enable: true,
  package: 'egg-mysql'
}
module.exports.cors = {     // cors插件
  enable: true,
  package: 'egg-cors'
}
module.exports.jwt = {       // jwt插件
  enable: true,
  package: "egg-jwt"
};
