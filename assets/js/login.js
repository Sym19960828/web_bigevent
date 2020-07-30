$(function() {
    //去注册链接
    $("#link_reg").on('click', function() {
            $(".login-box").hide()
            $(".reg-box").show()
        })
        //去登录链接
    $("#link_login").on('click', function() {
            $(".login-box").show()
            $(".reg-box").hide()
        })
        //正则匹配
    var form = layui.form
    form.verify({
            pwd: [/^\S{6,12}$/, "密码为6-12位，不能包含字符"],
            repwd: function(value) {
                if ($("#reg-pwd").val() !== value) {
                    return "两次密码不一样"
                }

            }
        })
        //注册事件
    var layer = layui.layer
    $("#form_reg").on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'post',
                url: '/api/reguser',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);

                    }
                    layer.msg(res.message);
                    $('#link_login').click()
                    $('#form_reg')[0].reset()
                }
            })
        })
        //登录
    $("#form_login").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),

            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);

                }
                layer.msg(res.message);
                localStorage.setItem("token", res.token)
                location.href = "/index.html"
            }
        })

    })

})