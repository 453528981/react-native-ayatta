export default {
    DefaultNetworkTimeout: 30 * 1000, //网络请求默认超时时间
    DefaultPageSize: 10, //默认分页大小
    ScrollEnabledOffset: 500, //回到顶部按钮y轴偏移量
    SuggestBaseUri: "", //自动补全BaseUri
}

//App信息
export const AppInfo = {
    Name: 'xxx',
    Logo: 'http://www.xxx.com/logo.png',
    Desc: 'xx',
    Site: 'www.xx.com',
    Version: '1.0.0.0'
}


//数据接口地址
export const ApiConfig = {
    BaseUri: "",
    Timeout: 30 * 1000, //超时时间
    AccessToken: "", //接口访问令牌
    Methods: {
        SignIn: "SignIn",
        SignUp: "SignUp",
        SplashCoverGet: "misc.splash.cover.get",
    }
};