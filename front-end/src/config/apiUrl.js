let ipUrl = 'http://127.0.0.1:7001/' 

let servicePath = {
    checkLogin:ipUrl + 'checkLogin' ,  //  登录检查用户名密码是否正确
    register:ipUrl + 'register' ,  //  注册
}
export default servicePath;