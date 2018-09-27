'use strict'
let timer = 0
let activity_arr = []
let middle_num = 0
let num = 0

window.onload = function () {
	
	get_activity_list()

	top_yuan()

	// 鼠标已入停止,移除自动轮播
	mouseover_cleartime()

	select_carousel()

	this.onscroll = function() {
		if (num >= 3) {
			return false
		}
		let win_top = (document.documentElement.scrollTop || document.body.scrollTop) + (document.documentElement.clientHeight || document.body.clientHeight)
		let ele_top = $('.zsx_home_content_intro_animation').eq(num).offset().top + $('.zsx_home_content_intro_animation').eq(0).height()
		if (win_top >= ele_top) {
			$('.zsx_home_content_intro_animation').eq(num).children().children('.zsx_home_content_intro_active').removeClass('zsx_home_content_intro_active')
			num++
		}
	}
	
	function get_activity_list() {
		post('/api/offic/activity_list', {}, function (res) {
			activity_arr = count_arr(res.data)
			let html = ''
			res.data.forEach((item, index) => {
				html += `<div class="zsx_home_content_activity_carousel_item" data-index="${index}">
				<div class="zsx_home_content_activity_carousel_item_img">
					<img src="${item.img}" alt="${item.name}">
					<div class="zsx_home_content_activity_carousel_item_img_ewm">
						<img src="${item.qrcode}" alt="${item.name}小程序二维码">
					</div>
				</div>
				<div class="zsx_home_content_activity_carousel_item_text">
					${item.name}：${item.title}
				</div>
			</div>`
			})
			$('.zsx_home_content_activity_carousel').html(html)
				// 初始化位置
				carousel(activity_arr)
				// 自动轮播
				carouselAuto()
		})
	}
	
	function count_arr(arr) {
		let temp = []
		middle_num = parseInt(arr.length / 2)
		let middle_ele = {
			id: middle_num,
			opacity: 1,
			width: 50,
			left: 50,
			zIndex: 4
		}
	
		for (let i = 0; i < arr.length; i++) {
			let num_index = Math.abs(middle_num - i)
			if (i == middle_num) {
				temp.push(middle_ele)
				continue
			}
			let temp_obj = {
				id: i,
				opacity: middle_ele.opacity - num_index * 0.3,
				width: middle_ele.width - num_index * 10,
				left: middle_ele.left,
				zIndex: middle_ele.zIndex - num_index
			}
	
			for (let j = 0; j < num_index; j++) {
				temp_obj.left = temp_obj.left / 2
			}
			if (i - middle_num > 0) {
				temp_obj.left = (temp_obj.left + temp[i - 1].left)
			}
			temp.push(temp_obj)
		}
		return temp
	}

	// 点击选中
	function select_carousel() {
		$('.zsx_home_content_activity_carousel').on('click', '.zsx_home_content_activity_carousel_item', function () {
			if (!$(this).hasClass('zsx_home_content_activity_carousel_item_active')) {
				let index = parseInt($(this).attr('data-index'))
				if (index < middle_num) {
					index += activity_arr.length
				} else {
					index = index
				}
				carousel_qh(index, 'click')
			}
		})
	}

	// 鼠标已入停止,移除自动轮播
	function mouseover_cleartime() {
		// 鼠标悬浮停止轮播
		$('.zsx_home_content_activity_carousel').on('mouseover', '.zsx_home_content_activity_carousel_item', function () {
			clearInterval(timer)
			$(this).children('.zsx_home_content_activity_carousel_item_img').children('.zsx_home_content_activity_carousel_item_img_ewm').stop().fadeIn()
		})
		// 鼠标离开开始轮播
		$('.zsx_home_content_activity_carousel').on('mouseout', '.zsx_home_content_activity_carousel_item', function () {
			carouselAuto()
			$(this).children('.zsx_home_content_activity_carousel_item_img').children('.zsx_home_content_activity_carousel_item_img_ewm').stop().fadeOut()
		})
	}

	// 自动轮播
	function carouselAuto() {
		timer = setInterval(() => {
			carousel_qh()
		}, 5000)
	}

	// 切换数组
	function carousel_qh(index = 0, type = 'auto') {
		let last
		if (type == 'auto') {
			last = activity_arr[index]
			activity_arr.push(last)
			activity_arr.splice(index, 1)
		} else if (type == 'click') {
			for (let i = 0; i < index - middle_num; i++) {
				last = activity_arr[activity_arr.length - 1]
				activity_arr.unshift(last)
				activity_arr.splice(-1, 1)
			}
		}
		carousel(activity_arr)
	}

	// 循环出位置
	function carousel(arr) {
		arr.forEach((item, index) => {
			$('.zsx_home_content_activity_carousel_item').eq(index).css({
				zIndex: item.zIndex
			})
			if (item.id == middle_num) {
				$('.zsx_home_content_activity_carousel_item').eq(index).addClass('zsx_home_content_activity_carousel_item_active').siblings().removeClass('zsx_home_content_activity_carousel_item_active')
			}
			$('.zsx_home_content_activity_carousel_item').eq(index).attr('data-index', item.id).stop().animate({
				zIndex: item.zIndex,
				left: item.left + '%',
				opacity: item.opacity,
				width: item.width + '%'
			}, 800)
		})
	}

	// 圆圈翻转
	function top_yuan() {
		$('.zsx_home_content_circle_box').on('mouseover', function () {
			$(this).children('.zsx_home_content_circle_box_1').addClass('activeIn')
			let timeOut = setTimeout(() => {
				$(this).children('.zsx_home_content_circle_box_1').children('.zsx_home_content_circle_box_1_icon').show().siblings().hide()
				clearTimeout(timeOut)
			}, 200)
		})

		$('.zsx_home_content_circle_box').on('mouseout', function () {
			$(this).children('.zsx_home_content_circle_box_1').removeClass('activeIn')
			let timeOut = setTimeout(() => {
				$(this).children('.zsx_home_content_circle_box_1').children('.zsx_home_content_circle_box_1_icon').hide().siblings().show()
				clearTimeout(timeOut)
			}, 200)
		})
	}

}

window.unload = function () {
	clearInterval(timer)
}