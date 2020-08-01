$(function() {
    var layer = layui.layer

    //获取用户的基本信息
    function getUserInfo(options) {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            //jquery中的ajax，专门设置请求头 信息属性
            // headers属性区分大小写
            //setRequestHeader

            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)

                }

                renderAvatar(res.data)

            }
        })

    }
    getUserInfo()
        //用户渲染函数
    function renderAvatar(user) {
        // 渲染用户名
        var uname = user.nickname || user.username
        $("#welcome").html("欢迎&nbsp&nbsp" + uname)
            // 渲染头像
        if (user.user_pic !== null) {
            $('.layui-nav-img').show().attr('src', user.user_pic)
            $('.text-avater').hide()


        } else {
            $('.layui-nav-img').hide()
            $('.text-avater').show().html(uname[0].toUpperCase())

        }

    }
    //退出登录
    $('#btnLogout').on('click', function() {
        layer.confirm('您确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something

            layer.close(index);
            //删除本地缓存token
            localStorage.removeItem('token')
                //退出到首页
            location.href = "/login.html"
        });
    })




})