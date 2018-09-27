// 提示框
function toast(msg, type, timer = 1000, fn = function(){}) {
  $('.tips_msg').html(msg)
  $('.tips_ok').html(`<img src="./img/${type}.png" alt="租师兄官网|提示标志">`)
  $('.tips').show(function() {
    let time = setTimeout(() => {
      clearTimeout(time)
      $('.tips').hide(fn)
    }, timer)
  })
}

// 移动端点击导航栏
function mobile_tap_nav() {
  $('.zsx_home_nav_right_m').on('click', function () {
    $('.zsx_home_nav_right_m_nav').stop().slideToggle()
    return false
  })
}

mobile_tap_nav()