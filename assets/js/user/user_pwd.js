$(function() {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return "新密码与旧密码不能相同"
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次输入的密码不一致"
            }
        }


    })
    $(".layui-form").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                } else {
                    layui.layer.msg('恭喜您，密码修改成功')
                    $('.layui-form')[0].reset();
                }

            }
        })
    })
})