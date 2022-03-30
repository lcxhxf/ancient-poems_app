'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
module.exports.mysql = {    // mysql插件
  enable: true,
  package: 'egg-mysql'
}
module.exports.cors = {     // cors插件
  enable: true,
  package: 'egg-cors'
}
