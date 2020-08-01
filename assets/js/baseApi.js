//设置路径（测试）
var baseURL = 'http://ajax.frontend.itheima.net'
    //设置路径（生产）
    //var baseURL="http://www.itcast.cn"
$.ajaxPrefilter(function(options) {
    options.url = baseURL + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || " "
        }
    }
    options.complete = function(res) {
        var data = res.responseJSON;
        console.log(data);
        if (data.status == 1 && data.message == "身份认证失败！") {
            //删除本地缓存token
            localStorage.removeItem('token')
                //退出到首页
            location.href = "/login.html"
        }
    }

});