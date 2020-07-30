//设置路径（测试）
var baseURL = 'http://ajax.frontend.itheima.net'
    //设置路径（生产）
    //var baseURL="http://www.itcast.cn"
$.ajaxPrefilter(function(options) {
    options.url = baseURL + options.url

});