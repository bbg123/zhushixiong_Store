function post(url, data, fn) {
  $.ajax({
    url: url,
    type: 'post',
    data: data,
    dataType: 'json',
    success: fn
  })
}