"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				document.querySelector("html").classList.add("fixed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("fixed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '[name="homeTitle"]');
					setValue(data.mainTitle, '.form-wrap__title');
					setValue(data.mainTitle, '[name="type"]'); // setValue(data.text, '.after-headline');
					// setValue(data.btn, '.btn');
					// setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var toggle = this.btnToggleMenuMobile;
		var menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			var toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(function (el) {
				return el.classList.toggle("on");
			});
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.toggle("fixed");
			});
		}, {
			passive: true
		});
	},
	closeMenu: function closeMenu() {
		if (!this.menuMobile) return;
		this.btnToggleMenuMobile.forEach(function (element) {
			return element.classList.remove("on");
		});
		this.menuMobile.classList.remove("active");
		[document.body, document.querySelector('html')].forEach(function (el) {
			return el.classList.remove("fixed");
		});
	},
	mobileMenu: function mobileMenu() {
		var _this = this;

		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".menu-mobile--js.active"); // (1)

			var link = event.target.closest(".navMenu__link"); // (1)

			if (!container || link) _this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', function () {
			if (window.matchMedia("(min-width: 992px)").matches) _this.closeMenu();
		}, {
			passive: true
		});
	},
	// /mobileMenu
	// tabs  .
	tabscostume: function tabscostume(tab) {
		var tabs = document.querySelectorAll(tab); // const indexOf = element => Array.from(element.parentNode.children).indexOf(element);

		tabs.forEach(function (element) {
			var tabs = element;
			var tabsCaption = tabs.querySelector(".tabs__caption");
			var tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			var tabsWrap = tabs.querySelector(".tabs__wrap");
			var tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			var random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach(function (el, index) {
				var data = "tab-content-".concat(random, "-").concat(index);
				el.dataset.tabBtn = data;
				var content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;
				var active = content.classList.contains('active') ? 'active' : '';
				console.log(el.innerHTML);
				content.insertAdjacentHTML("beforebegin", "<div class=\"tabs__btn-accordion  btn btn-primary d-block mb-1 ".concat(active, "\" data-tab-btn=\"").concat(data, "\">").concat(el.innerHTML, "</div>"));
			});
			tabs.addEventListener('click', function (element) {
				var btn = element.target.closest("[data-tab-btn]:not(.active)");
				if (!btn) return;
				var data = btn.dataset.tabBtn;
				var tabsAllBtn = this.querySelectorAll("[data-tab-btn");
				var content = this.querySelectorAll("[data-tab-content]");
				tabsAllBtn.forEach(function (element) {
					element.dataset.tabBtn == data ? element.classList.add('active') : element.classList.remove('active');
				});
				content.forEach(function (element) {
					element.dataset.tabContent == data ? (element.classList.add('active'), element.previousSibling.classList.add('active')) : element.classList.remove('active');
				});
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /tabs
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			return element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top - 60;
			$('html, body').animate({
				scrollTop: destination
			}, 0);
			return false;
		});
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl;

	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile(); 

	var x = window.location.host;
	var screenName;
	screenName = 'index.png';

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	}

	function whenResize() {
		var topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.addEventListener('scroll', function (e) {
			this.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
		}, {
			passive: true
		});
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true // renderBullet: function (index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// }

	}), _defaultSl);
	var swiper4 = new Swiper('.headerBlock__slider--js', {
		loop: true,
		pagination: {
			el: '.headerBlock .swiper-pagination',
			clickable: true // renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }

		},
		on: {
			realIndexChange: function realIndexChange(swiper) {
				photos_change(swiper4);
			}
		}
	});
	var counter = $('.headerBlock .headerBlock__numb');
	var currentCount = $('.headerBlock__count');

	function photos_change(swiper) {
		var index = swiper.realIndex + 1,
				$current = $(".headerBlock__slide").eq(index),
				dur = 0.8;
		currentCount.text(index);
	}

	var swiper1 = new Swiper('.sAbout__sliderWrap--firstSlider .sAbout__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 1,
		pagination: {
			el: '.sAbout__sliderWrap--firstSlider .swiper-pagination',
			type: 'fraction',
			clickable: true // renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }

		},
		navigation: {
			nextEl: '.sAbout__sliderWrap--firstSlider .swiper-button-next',
			prevEl: '.sAbout__sliderWrap--firstSlider .swiper-button-prev'
		}
	}));
	var swiper2 = new Swiper('.sAbout__sliderWrap--secondSlider .sAbout__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 1,
		pagination: {
			el: '.sAbout__sliderWrap--secondSlider .swiper-pagination',
			type: 'fraction',
			clickable: true // renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }

		},
		navigation: {
			nextEl: '.sAbout__sliderWrap--secondSlider .swiper-button-next',
			prevEl: '.sAbout__sliderWrap--secondSlider .swiper-button-prev'
		}
	}));
	var swiper3 = new Swiper('.sPlaning .sPlaning__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 1,
		pagination: {
			el: '.sPlaning .swiper-pagination',
			type: 'fraction',
			clickable: true // renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }

		},
		navigation: {
			nextEl: '.sPlaning .swiper-button-next',
			prevEl: '.sPlaning .swiper-button-prev'
		}
	}));
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		var popoverContent = {
			status: popoverTriggerEl.dataset.status,
			square: popoverTriggerEl.dataset.square,
			area: popoverTriggerEl.dataset.area,
			price: popoverTriggerEl.dataset.price,
			title: popoverTriggerEl.dataset.title,
			subtitle: popoverTriggerEl.dataset.subtitle,
			numb: popoverTriggerEl.dataset.numb
		};
		var popoverInner = "\n\t\t<div class=\"sPlan__popover\">\n\n\t\t\t<span class=\"sPlan__hide\">+</span>\n\t\t\t<div class=\"sPlan__numb \">".concat(popoverContent.numb, " </div>\n\t\t\t<div class=\"sPlan__subtitle\">").concat(popoverContent.title, " </div>\n\t\t\t<div class=\"sPlan__subtitle\">").concat(popoverContent.subtitle, "</div>\n\t\t\t<div class=\"sPlan__table\">\n\t\t\t\t<div class=\"sPlan__tr\">\n\t\t\t\t\t<div class=\"sPlan__td\">\u0421\u0442\u0430\u0442\u0443\u0441</div>\n\t\t\t\t\t<div class=\"sPlan__td\">").concat(popoverContent.status, "</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"sPlan__tr\">\n\t\t\t\t\t<div class=\"sPlan__td\">\u041F\u043B\u043E\u0449\u0430\u0434\u044C</div>\n\t\t\t\t\t<div class=\"sPlan__td\">").concat(popoverContent.area, " \u043C<sup>2</sup></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"sPlan__tr\">\n\t\t\t\t\t<div class=\"sPlan__td\">\u0423\u0447\u0430\u0441\u0442\u043E\u043A</div>\n\t\t\t\t\t<div class=\"sPlan__td\">").concat(popoverContent.square, " \u043C<sup>2</sup></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"sPlan__tr\">\n\t\t\t\t\t<div class=\"sPlan__td\">\u0426\u0435\u043D\u0430</div>\n\t\t\t\t\t<div class=\"sPlan__td sPlan__price\">").concat(popoverContent.price, " P</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<a class=\"sPlan__btn\" href=\"#modal-call\" data-main-title=\"\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\">\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440</a>\n\t\t</div>");
		var popover = new bootstrap.Popover(popoverTriggerEl, {
			template: "<div class=\"popover\" role=\"tooltip\">\n\t\t\t<h3 class=\"popover-header\"></h3>\n\t\t\t<div class=\"popover-body\"></div>\n\t\t\t".concat(popoverInner),
			container: '.sPlan',
			trigger: 'manual',
			placement: 'auto' // offset: 0,

		}); // var exampleTriggerEl = document.getElementById('example')

		popoverTriggerEl.addEventListener('mouseover', function () {
			// var popoverTest = bootstrap.Popover.getInstance(popoverTriggerEl);
			var popoverElement = this.getAttribute('aria-describedby');
			$('[rel=popover]').not('#' + $(this).attr('id')).hide();
			$(".popover:not(#".concat(popoverElement, ")")).remove();
			popover.show();
			var popoverId = document.querySelectorAll("path:not([aria-describedby=".concat(popoverElement, "])")); // console.log(popoverElement);

			popoverId.forEach(function (ell) {});
		});
		document.querySelector('.sPlan').addEventListener('click', function (element) {
			var btn = element.target.closest(".sPlan__hide");
			if (!btn) return;
			popover.hide();
		});
	});
	$(document).on('click', '.sPlan__btn', function () {
		var homeTitle = $(this).parents('.sPlan__popover').find('.sPlan__title').text();
		var homePrice = $(this).parents('.sPlan__popover').find('.sPlan__price').text();
		var homeNumb = $(this).parents('.sPlan__popover').find('.sPlan__numb').text();
		$('#modal-call').find('[name="homeTitle"]').val(homeTitle);
		$('#modal-call').find('[name="homePrice"]').val(homePrice);
		$('#modal-call').find('[name="homeNumb"]').val(homeNumb);
		$.fancybox.open({
			type: 'inline',
			src: '#modal-call'
		});
	}); // modal window
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }