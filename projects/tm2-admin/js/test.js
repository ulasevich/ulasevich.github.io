// Тестовый набор скриптов только для демонстрации шаблонов
// ----------------------- //
function test_show_form_add_user() { // появление формы Add User
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-user");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
		
	// нужно будет для корректной прокрутки
	document.getElementsByTagName("html")[0].style.overflow = 'hidden';
	
	// нужно чтобы определить, есть ли полоса прокрутки у страницы
	var scrollDiv = document.createElement("div");
	scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
	document.body.appendChild(scrollDiv);
	var scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
	
	if (document.documentElement.scrollHeight>window.innerHeight) {
		document.getElementsByTagName("html")[0].style.marginRight = scrollbarSize+'px';
	}
	
	// нужно будет для плавной анимации появления (Важно. По умолчанию класс "pform-show" должен отсутствовать у этих элементов)	
	setTimeout(function() {
		form_bg.classList.add("pform-show");
		form_wrapper.classList.add("pform-show");
	}, 16);
	
	return false;
}


function test_show_form_final_example() {
	//
	// Здесь должен быть код добавления блоков .pform-bg и .pform-wrapper
	// Важно. По умолчанию, в отличие от тестовой верстки у них не должно быть класса "pform-show"
	//
	
	var form_bg = document.getElementsByClassName('pform-bg')[0];
	var form_wrapper = document.getElementsByClassName('pform-wrapper')[0];	
		
	// нужно будет для корректной прокрутки
	document.getElementsByTagName("html")[0].style.overflow = 'hidden';
	
	// нужно чтобы определить, есть ли полоса прокрутки у страницы
	var scrollDiv = document.createElement("div");
	scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
	document.body.appendChild(scrollDiv);
	var scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
	
	if (document.documentElement.scrollHeight>window.innerHeight) {
		document.getElementsByTagName("html")[0].style.marginRight = scrollbarSize+'px';
	}
	
	// нужно будет для плавной анимации появления (Важно. По умолчанию класс "pform-show" должен отсутствовать у этих элементов)	
	setTimeout(function() {
		form_bg.classList.add("pform-show");
		form_wrapper.classList.add("pform-show");
	}, 16);
}




function test_close_form_add_user() { // закрыть форму Add User
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-user");
		
	form_bg.classList.remove("pform-show");
	form_wrapper.classList.remove("pform-show");
	
	setTimeout(function() {
		document.getElementsByTagName("html")[0].style.overflow = 'visible';
		document.getElementsByTagName("html")[0].style.marginRight = '0';
		
		form_bg.style.display = "none";
		form_wrapper.style.display = "none";
	}, 300);
	
	return false;
}


function test_close_form_final_example() {
	var form_bg = document.getElementsByClassName('pform-bg')[0];
	var form_wrapper = document.getElementsByClassName('pform-wrapper')[0];	
	
	form_bg.classList.remove("pform-show");
	form_wrapper.classList.remove("pform-show");
	
	setTimeout(function() {
		
		document.getElementsByTagName("html")[0].style.overflow = 'visible';
		document.getElementsByTagName("html")[0].style.marginRight = '0';
		
		//
		// Здесь должен быть код окончательного скрытия\удаления формы
		//
		
	}, 300);
}


function test_show_points_dropdown(dropdown_id) { // появление выподающего меню
	if (dropdown_id === undefined) {
		dropdown_id = "test-points-dropdown";
	}
	var points_dropdown = document.getElementById(dropdown_id);
	points_dropdown.style.display = "block";
}

function test_show_info_dropdown() { // появление выподающего меню
	var points_dropdown = document.getElementById("test-info-dropdown");
	points_dropdown.style.display = "block";
}


function test_show_form_confirm() { // появление формы Confirm
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-confirm");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	// нужно будет для корректной прокрутки
	// document.getElementsByTagName("html")[0].style.overflow = 'hidden';
	
	// нужно будет для плавной анимации появления (Важно. По умолчанию класс "pform-show" должен отсутствовать у этих элементов)	
	//	setTimeout(function() {
	//		form_bg.classList.add("pform-show");
	//		form_wrapper.classList.add("pform-show");
	//	}, 16);
}



function test_close_form_confirm() { // закрыть форму Confirm
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-confirm");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";	
}


function test_show_form_sign_in() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-sign-in");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_sign_in() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-sign-in");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_register() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-register");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_register() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-register");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_avatar_dropdown() {
	var points_dropdown = document.getElementById("test-avatar-dropdown");
	points_dropdown.style.display = "block";
}


function test_show_form_forgot_psw() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-forgot-psw");
	//var form_wrapper_old = document.getElementById("test-pform-sign-in");
	
	form_bg.style.display = "block";
	//form_wrapper_old.style.display = "none";
	form_wrapper.style.display = "block";
	
	console.log(111);
	
	return false;
}

function test_close_form_forgot_psw() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-forgot-psw");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_edit_profile() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-edit-profile");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_edit_profile() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-edit-profile");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_add_coins() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-coins");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_add_coins() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-coins");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}


function test_show_form_add_tokens() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-tokens");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}
function test_close_form_add_tokens() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-tokens");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_discharge() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-discharge");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}
function test_close_form_discharge() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-discharge");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}


function test_show_preloader_screen() {
	//
	// Здесь должен быть код добавления блока .preloader-screen
	//
	var preloader = document.getElementsByClassName('preloader-screen')[0];
	preloader.style.display = "block";
	
	setTimeout(function() {
		preloader.classList.add("preloader-screen-show");
		document.getElementsByTagName("html")[0].classList.add("page-blurred"); // нужно для эффекта размытия
	}, 16);
	
	return false;
}
function test_hide_preloader_screen() {
	var preloader = document.getElementsByClassName('preloader-screen')[0];
	preloader.classList.remove("preloader-screen-show");
	
	setTimeout(function() {
		preloader.style.display = "none";
		document.getElementsByTagName("html")[0].classList.remove("page-blurred");
		
		//
		// Здесь должен быть код окончательного скрытия\удаления формы
		//
	}, 300);
}

function test_show_preloader_block(block_id) {
	var block = document.getElementById(block_id);
	block.style.display = "block";
	return false;
}

function test_make_blur(block_id) {
	var block = document.getElementById(block_id);
	block.classList.add("block-blurred");
	return false;
}

function test_show_form_search() {
	var form = document.getElementById("test-search-line");
	
	form.classList.add("search-line--active");
	
	return false;
}

function test_close_form_search() {
	var form = document.getElementById("test-search-line");
	
	form.classList.remove("search-line--active");
	
	return false;
}


function test_show_form_trade() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-trade");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_trade() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-trade");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}


function test_show_form_trade_sell() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-trade-sell");
	var form_wrapper_old = document.getElementById("test-pform-trade");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	form_wrapper_old.style.display = "none";
	
	return false;
}

function test_close_form_trade_sell() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-trade-sell");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_trade_buy() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-trade-buy");
	var form_wrapper_old = document.getElementById("test-pform-trade");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	form_wrapper_old.style.display = "none";
	
	return false;
}

function test_close_form_trade_buy() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-trade-buy");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_redeem() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-redeem");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}
function test_close_form_redeem() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-redeem");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}


function test_show_form_redeem_confirm() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-redeem-confirm");
	var form_wrapper_old = document.getElementById("test-pform-redeem");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	form_wrapper_old.style.display = "none";
	
	return false;
}
function test_close_form_redeem_confirm() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-redeem-confirm");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_redeem_finish_1() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-redeem-finish-1");
	var form_wrapper_old = document.getElementById("test-pform-redeem-confirm");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	form_wrapper_old.style.display = "none";
	
	return false;
}
function test_close_form_redeem_finish_1() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-redeem-finish-1");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_redeem_finish_2() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-redeem-finish-2");
	var form_wrapper_old = document.getElementById("test-pform-redeem-confirm");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	form_wrapper_old.style.display = "none";
	
	return false;
}
function test_close_form_redeem_finish_2() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-redeem-finish-2");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}



function test_show_form_add_funds() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-funds");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_add_funds() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-funds");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}


function test_show_form_buttons() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-buttons");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_buttons() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-buttons");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}


function test_show_form_profile() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-profile");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_profile() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-profile");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}


function test_show_form_profile_final() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-profile-final");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
		
	// нужно будет для корректной прокрутки
	document.getElementsByTagName("html")[0].style.overflow = 'hidden';
	
	// нужно чтобы определить, есть ли полоса прокрутки у страницы
	var scrollDiv = document.createElement("div");
	scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
	document.body.appendChild(scrollDiv);
	var scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
	
	if (document.documentElement.scrollHeight>window.innerHeight) {
		document.getElementsByTagName("html")[0].style.marginRight = scrollbarSize+'px';
	}
	
	// нужно будет для плавной анимации появления (Важно. По умолчанию класс "pform-show" должен отсутствовать у этих элементов)	
	setTimeout(function() {
		form_bg.classList.add("pform-show");
		form_wrapper.classList.add("pform-show");
	}, 16);
	
	return false;
}

function test_close_form_profile_final() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-profile-final");
		
	form_bg.classList.remove("pform-show");
	form_wrapper.classList.remove("pform-show");
	
	setTimeout(function() {
		
		document.getElementsByTagName("html")[0].style.overflow = 'visible';
		document.getElementsByTagName("html")[0].style.marginRight = '0';
		
		form_bg.style.display = "none";
		form_wrapper.style.display = "none";
		
	}, 300);
	
	return false;
}

function test_show_form_add_vault() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-vault");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}
function test_close_form_add_vault() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-vault");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_info_vault() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-info-vault");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}
function test_close_form_info_vault() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-info-vault");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_OTC() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-OTC");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
		
	// нужно будет для корректной прокрутки
	document.getElementsByTagName("html")[0].style.overflow = 'hidden';
	
	// нужно чтобы определить, есть ли полоса прокрутки у страницы
	var scrollDiv = document.createElement("div");
	scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
	document.body.appendChild(scrollDiv);
	var scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
	
	if (document.documentElement.scrollHeight>window.innerHeight) {
		document.getElementsByTagName("html")[0].style.marginRight = scrollbarSize+'px';
	}
	
	// нужно будет для плавной анимации появления (Важно. По умолчанию класс "pform-show" должен отсутствовать у этих элементов)	
	setTimeout(function() {
		form_bg.classList.add("pform-show");
		form_wrapper.classList.add("pform-show");
	}, 16);
	
	return false;
}

function test_close_form_OTC() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-OTC");
		
	form_bg.classList.remove("pform-show");
	form_wrapper.classList.remove("pform-show");
	
	setTimeout(function() {
		
		document.getElementsByTagName("html")[0].style.overflow = 'visible';
		document.getElementsByTagName("html")[0].style.marginRight = '0';
		
		form_bg.style.display = "none";
		form_wrapper.style.display = "none";
		
	}, 300);
	
	return false;
}


function test_show_form_confirm_balance() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-confirm-balance");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_confirm_balance() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-confirm-balance");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}


function test_show_form_balance() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-balance");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_balance() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-balance");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}


function test_show_notification_1() {
	var form_bg = document.getElementById("test-notification-1");
	form_bg.style.display = "block";
	return false;
}
function test_close_notification_1() {
	var form_bg = document.getElementById("test-notification-1");
	form_bg.style.display = "none";
	return false;
}
function test_show_notification_2() {
	var form_bg = document.getElementById("test-notification-2");
	form_bg.style.display = "block";
	return false;
}
function test_close_notification_2() {
	var form_bg = document.getElementById("test-notification-2");
	form_bg.style.display = "none";
	return false;
}
function test_show_notification_3() {
	var form_bg = document.getElementById("test-notification-3");
	form_bg.style.display = "block";
	return false;
}
function test_close_notification_3() {
	var form_bg = document.getElementById("test-notification-3");
	form_bg.style.display = "none";
	return false;
}
function test_show_notification_4() {
	var form_bg = document.getElementById("test-notification-4");
	form_bg.style.display = "block";
	return false;
}
function test_close_notification_4() {
	var form_bg = document.getElementById("test-notification-4");
	form_bg.style.display = "none";
	return false;
}
function test_show_notification_5() {
	var form_bg = document.getElementById("test-notification-5");
	form_bg.style.display = "block";
	return false;
}
function test_close_notification_5() {
	var form_bg = document.getElementById("test-notification-5");
	form_bg.style.display = "none";
	return false;
}

function test_show_form_total_balance() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-total-balance");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}

function test_close_form_total_balance() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-total-balance");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_deposit() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-deposit");
	var form_wrapper_old = document.getElementById("test-pform-wire-transfer");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	form_wrapper_old.style.display = "none";
	
	return false;
}
function test_close_form_deposit() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-deposit");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_paypal() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-paypal");
	var form_wrapper_old = document.getElementById("test-pform-deposit");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	form_wrapper_old.style.display = "none";
	
	return false;
}
function test_close_form_paypal() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-paypal");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_wire_transfer() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-wire-transfer");
	var form_wrapper_old = document.getElementById("test-pform-deposit");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	form_wrapper_old.style.display = "none";
	
	return false;
}
function test_close_form_wire_transfer() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-wire-transfer");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_invoice() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-invoice");
	var form_wrapper_old = document.getElementById("test-pform-wire-transfer");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	form_wrapper_old.style.display = "none";
	
	return false;
}
function test_close_form_invoice() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-invoice");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_dropdown_block_1() {
	var form_wrapper = document.getElementById("text-dropdown-block-1");
	form_wrapper.style.display = "block";
	return false;
}
function test_close_dropdown_block_1() {
	var form_wrapper = document.getElementById("text-dropdown-block-1");
	form_wrapper.style.display = "none";
	return false;
}

function test_show_dropdown_block_2() {
	var form_wrapper = document.getElementById("text-dropdown-block-2");
	form_wrapper.style.display = "block";
	return false;
}
function test_close_dropdown_block_2() {
	var form_wrapper = document.getElementById("text-dropdown-block-2");
	form_wrapper.style.display = "none";
	return false;
}

function test_show_form_block_owner() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-block-owner");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}
function test_close_form_block_owner() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-block-owner");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_hover_show_dropdown() {
	var form_wrapper = document.getElementById("test-hover-dropdown");
	form_wrapper.style.display = "block";
}

function test_hover_close_dropdown(e) {
	var form_wrapper = document.getElementById("test-hover-dropdown");
	form_wrapper.style.display = "none";
}

function test_show_form_cancel_limit() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-cancel-limit");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}
function test_close_form_cancel_limit() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-cancel-limit");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form_add_correction() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-correction");
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}
function test_close_form_add_correction() {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-add-correction");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_form(form_id) {
	var all_forms = document.getElementsByClassName('pform-wrapper');
	for (i = 0; i < all_forms.length; i++) {
		all_forms[i].style.display = "none";
	}
	
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById(form_id);
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
	return false;
}
function test_close_form(form_id) {
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById(form_id);
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
	
	return false;
}

function test_show_tab(tab_link, tab_id) {
	var all_tab_links = document.getElementsByClassName('tab-link');
	for (i = 0; i < all_tab_links.length; i++) {
		all_tab_links[i].classList.remove("active");
	}
	tab_link.classList.add("active");
	
	var all_tabs = document.getElementsByClassName('tab-block');
	for (i = 0; i < all_tabs.length; i++) {
		all_tabs[i].style.display = "none";
	}
	var tab = document.getElementById(tab_id);
	tab.style.display = "block";
	
	return false;
}