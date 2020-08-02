$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称应该在1-6位之间'
                }
            }
        })
        //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)

                }
                //快速展示用户信息
                form.val('formUserInfo', res.data)

            }
        })
    }
    initUserInfo()
        //表单重置事件
    $("#btnReset").on('click', function(e) {
            e.preventDefault();
            initUserInfo()
        })
        //提交用户信息修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败')
                } else {
                    layer.msg('用户信息修改成功')
                        //刷新父框架的用户信息
                    window.parent.getUserInfo()
                    $('.layui-form')[0].reset();

                }

            }
        })


    })

})