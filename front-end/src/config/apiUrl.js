/**
 * @description 前端请求的路径配置文件，方便后期修改
 */
let ipUrl = 'http://127.0.0.1:7001/' 
// let ipUrl = 'http://zengjichaoren.xyz:7001/' 

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
    QueryRandomTenPoems:ipUrl + 'QueryRandomTenPoems',  // 查询随机的十首诗词
    QuerySomeTypePoem:ipUrl + 'QuerySomeTypePoem',  // 查询某种类型十首诗词
    FuzzySearch:ipUrl + 'FuzzySearch',  // 模糊查询，推荐
    Search:ipUrl + 'Search',  // 搜索框查询诗词
    NameSearch:ipUrl + 'NameSearch',  // 按输入诗名查询一首诗词
    SearchType:ipUrl + 'SearchType',  // 搜索诗词的所有类别
    SearchPoet:ipUrl + 'SearchPoet',  // 查询诗人表的所有诗人
    SearchDynasty:ipUrl + 'SearchDynasty',  // 查询朝代表的所有朝代
    QueryADynastyPoets:ipUrl + 'QueryADynastyPoets',  // 查询某个朝代的诗人
    QuerySortDynastyPoets:ipUrl + 'QuerySortDynastyPoets',  // 查询分类部分的各个朝代的诗人
    AddCollection:ipUrl + 'AddCollection', // 收藏某首诗词
    QueryCollection:ipUrl + 'QueryCollection', // 查询所有收藏记录
    AddHistory:ipUrl + 'AddHistory', // 推荐浏览记录
    SearchHistory:ipUrl + 'SearchHistory', // 查询浏览记录
    CheckList:ipUrl + 'CheckList', // 查询诗单记录
    CheckPoemList:ipUrl + 'CheckPoemList', // 查询诗单的诗词
    CreateList:ipUrl + 'CreateList', // 创建诗单
    DeleteList:ipUrl + 'DeleteList', // 删除诗单
    UpdateList:ipUrl + 'UpdateList', // 修改诗单
    AddPoemToList:ipUrl + 'AddPoemToList', // 添加诗词到诗单  
    GetAnswer:ipUrl + 'GetAnswer' // 添加诗词到诗单  
}
export default servicePath;