// 合买定制滚屏翻页-向前翻
		$('.article').on('click', '.mover-next-ico', function (e) {
			e.preventDefault();
			var $container = $(this).parents('.hot-hm-scroll').find('.hot-hm');
			var $ceil = $container.find('.hot-hm-item,.hot-gd-item');
			var ceil_width = $ceil.width() + 30;
			var roll_num = 5-$('.follow .current').index();
			var i=0;
			var scroll = function () {
				var $first = $container.find('.hot-hm-item:eq(0),.hot-gd-item:eq(0)');
				$first.animate({
					'margin-left' : ceil_width * -1
				}, 5, 'linear', function () {
					$container.find('.hot-hm-item:last,.hot-gd-item:last').after($first.clone().css('margin-left', 0));
					$first.remove();
					i++;
					if(i<roll_num){
						scroll();
					}
				});
			}
			scroll();
		});
		
		// 合买定制滚屏翻页-向后翻
		$('.article').on('click', '.mover-pre-ico', function (e) {
			e.preventDefault();
			var $container = $(this).parents('.hot-hm-scroll').find('.hot-hm');
			var $ceil = $container.find('.hot-hm-item,.hot-gd-item');
			var ceil_width = $ceil.width() + 30;
			var roll_num = 5-$('.follow .current').index();
			var i=0;
			var scroll = function () {
				var $last = $container.find('.hot-hm-item:last,.hot-gd-item:last');
				$container.find('.hot-hm-item:first,.hot-gd-item:first').before($last.clone().css('margin-left', ceil_width*-1));
				$last.remove();
				$container.find('.hot-hm-item:first,.hot-gd-item:first').animate({
					'margin-left' : 0
				}, 5, 'linear', function () {
					i++;
					if(i<roll_num){
						scroll();
					}
				});
			}
			scroll();
		});
		