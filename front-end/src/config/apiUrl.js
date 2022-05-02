/**
 * @description 前端请求的路径配置文件，方便后期修改
 */
let ipUrl = 'http://127.0.0.1:7001/' 

let servicePath = {
    checkLogin:ipUrl + 'checkLogin' ,  //  登录检查用户名密码是否正确
    register:ipUrl + 'register' ,  //  注册
    userNameUpdate:ipUrl + 'userNameUpdate' ,  //  用户名修改
    passwordUpdate:ipUrl + 'passwordUpdate' ,  //  用户密码修改
    sexUpdate:ipUrl + 'sexUpdate' ,  //  用户性别修改
    personalizedSigUpdate:ipUrl + 'personalizedSigUpdate' ,  //  用户个性签名修改
    birthUpdate:ipUrl + 'birthUpdate' ,  //  用户生日修改
    headPicUpdate:ipUrl + 'headPicUpdate',  // 用户头像修改
    QuerySomeonePoems:ipUrl + 'QuerySomeonePoems',  // 查询某人的诗词
}
export default servicePath;