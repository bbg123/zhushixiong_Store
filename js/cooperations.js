'use strict'
get_captcha()

// 提交
$('.zsx_home_content_checkbox_bottombox_btn').on('click',function() {
  let name = $('input[name=name]').val()
  let mobile = $('input[name=mobile]').val()
  let company = $('input[name=company]').val()
  let address = $('input[name=address]').val()
  let ways = $('input[name=ways]:checked').val()
  let other = $('input[name=other]').val()
  let captcha = $('input[name=captcha]').val()
  if (name == '') {
    toast('姓名不能为空', 'no', 1000)
    return false
  } else if (mobile == '') {
    toast('电话不能为空', 'no', 1000)
    return false
  } else if (company == '') {
    toast('公司不能为空', 'no', 1000)
    return false
  } else if (captcha == '') {
    toast('验证码不能为空', 'no', 1000)
    return false
  }

  post('/api/offic/biz',{
    name: name,
    mobile:　mobile,
    company: company,
    address: address,
    ways: ways,
    other: ways == 3 ? other : '',
    captcha: captcha
  },function(res) {
    if (res.code == 0) {
      toast(res.msg, 'ok', 1000, function() {
        location.reload()
      })
    } else {
      toast(res.msg, 'no', 1000, function() {
        $('input[name=captcha]').val('')
        get_captcha()
      })
    }
  })
  return false
})

$('input[name=ways]').on('click',function() {
  if ($(this).val() == 3) {
    $('.other').show()
  } else {
    $('.other').hide()
  }
})

$('.zsx_home_content_checkbox_bottombox_captcha_img').on('click',function() {
  get_captcha()
  return false
})

// 获取验证码
function get_captcha() {
  post('/api/offic/get_captcha',{},function(res) {
    $('.zsx_home_content_checkbox_bottombox_captcha_img').html(res.data.img)
  })
}
