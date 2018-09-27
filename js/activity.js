function get_activity_list() {
	post('/api/offic/activity_list', {}, function (res) {
		let html = ''
		res.data.forEach((item, index) => {
			html += `<div class="zsx_home_content_main_box clearfix">
      <div class="zsx_home_content_main_box_img fl">
        <img src="${item.img}" alt="租师兄官网|${item.name}">
      </div>
      <div class="zsx_home_content_main_box_content fl">
        <div class="zsx_home_content_main_box_content_ewm">
          <img src="${item.qrcode}" alt="租师兄官网|${item.name}小程序二维码">
        </div>
        <div class="zsx_home_content_main_box_content_text">
          扫二维码 了解更多
        </div>
      </div>
    </div>`
		})
		$('.zsx_home_content_main').html(html)
	})
}

get_activity_list()