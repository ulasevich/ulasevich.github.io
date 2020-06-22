var App={win:$(window),doc:$(document),is_mobile:detectmob(),ms_ie:/(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent),max_mobile_width:992,wheeling:!1,currentX:"",currentY:"",current_lang:$("body").attr("lang")};function detectmob(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))}function debounce(t,s,a){var n;return function(){var e=this,r=arguments,o=a&&!n;clearTimeout(n),n=setTimeout(function(){n=null,a||t.apply(e,r)},s),o&&t.apply(e,r)}}function fileBoxesInit(e){Array.prototype.forEach.call(e,function(e){var o=e.parentNode,t=o.innerHTML;e.addEventListener("change",function(e){var r="";(r=this.files&&1<this.files.length?(this.getAttribute("data-multiple-caption")||"").replace("{count}",this.files.length):e.target.value.split("\\").pop())?o.querySelector("span").innerHTML=r:o.innerHTML=t}),e.addEventListener("focus",function(){e.classList.add("has-focus")}),e.addEventListener("blur",function(){e.classList.remove("has-focus")})})}function check_scroll(){0==$(window).scrollTop()?$("body").addClass("scrollTop"):$(window).scrollTop()+$(window).height()==$(document).height()?$("body").addClass("scrollBottom"):$("body").removeClass("scrollTop scrollBottom")}function parallaxIt(e,r,o){var t=$(".section"),s=e.pageX-t.offset().left,a=e.pageY-t.offset().top;TweenMax.to(r,1,{x:(s-t.width()/2)/t.width()*o,y:(a-t.height()/2)/t.height()*o})}App.Other=function(){App.is_mobile&&$("html").addClass("is_mobile"),check_scroll(),$(document).scroll(function(){check_scroll()})},App.HeaderMenuMobile=function(){function e(){this.render()}var a;e.prototype={el:{sidr_selector:".sidr",h_menu_selector:".site-menu",mobile_btn_selector:".mobile-mainmenu-btn",sidr_class:"sidr-mobile-mainmenu"},render:function(){if(a=this,!$(a.el.mobile_btn_selector).length)return!1;a.sidrInit(),a.sidrSwipe(),a.sidrResize()},sidrInit:function(){void 0!==$.fn.sidr?($(a.el.mobile_btn_selector).sidr({name:a.el.sidr_class,source:a.el.h_menu_selector,displace:!1,body:".virtracker-fullpage",side:"right"}),App.doc.on("click",".sidr a",function(){$(".sidr a").removeClass("sidr-class-active"),$(this).addClass("sidr-class-active")}),$(document).mouseup(function(e){0===$(".header").has(e.target).length&&0===$(".sidr").has(e.target).length&&a.sidrClose()})):console.info("required jquery.sidr(.min).js")},sidrClose:function(){$.sidr("close",a.el.sidr_class)},sidrSwipe:function(){void 0!==$.fn.swipe&&$(a.el.sidr_selector).swipe({excludedElements:"button, input, select, textarea, .noSwipe",swipeRight:function(e,r,o,t,s){a.sidrClose()}})},sidrResize:function(){var e=debounce(function(){App.win.width()>App.max_mobile_width&&a.sidrClose()},250);App.win.resize(e)}},new e},App.FullPage=function(){var e=!1,r=!1,o=[],t=[];$("#menu li.fp-link").each(function(e){o.push($(this).data("menuanchor")),t.push($(this).text())}),App.is_mobile&&(r=e=!1),$("#virtracker-fullpage").fullpage({autoScrolling:e,scrollOverflow:r,anchors:o,menu:"#menu",navigationPosition:"right",navigationTooltips:t,navigation:!0,css3:!0,scrollBar:!0,afterRender:function(){App.RemoveMainPreloader()},afterLoad:function(e,r,o){App.currentX="",App.currentY=""}})},App.RemoveMainPreloader=function(){$(".preloader").fadeOut("slow")};var messages_values={country:{required:"Please enter the country name",maxlength:"Maximum of 50 characters"},organization:{required:"Please enter name of the organization",maxlength:"Maximum of 100 characters"},name:{required:"Please introduce yourself",maxlength:"Maximum of 50 characters"},email:{required:"Enter your email address",email:"Enter the correct address"},message:{required:"Enter your message",maxlength:"Maximum of 1000 characters"}},response_text={success_short:"Thanks!",success:"Thanks! We will contact you.",error:"Error sending email"},close_popup_text="Close";function update_captcha_tokens(){grecaptcha.ready(function(){grecaptcha.execute("6Ld5zPkUAAAAAO-7N4XtyLZIDcT2hjJPVcafq2QR",{action:"order"}).then(function(e){document.getElementById("g-recaptcha-response-order").value=e})}),grecaptcha.ready(function(){grecaptcha.execute("6Ld5zPkUAAAAAO-7N4XtyLZIDcT2hjJPVcafq2QR",{action:"contact"}).then(function(e){document.getElementById("g-recaptcha-response-contact").value=e})})}App.Translations=function(){switch(App.current_lang){case"id":messages_values={country:{required:"Silakan masukkan nama negara",maxlength:"Maksimal 50 karakter"},organization:{required:"Silakan masukkan nama organisasi",maxlength:"Maksimal 100 karakter"},name:{required:"Mohon perkenalkan diri Anda",maxlength:"Maksimal 50 karakter"},email:{required:"Masukkan alamat email Anda",email:"Masukkan alamat yang benar"},message:{required:"Masukkan pesan Anda",maxlength:"Maksimal 1000 karakter"}},response_text={success_short:"Terima kasih!",success:"Terima kasih! Kami akan menghubungi Anda.",error:"Kesalahan mengirim email"},close_popup_text="Menutup";break;case"pt":messages_values={country:{required:"Digite o nome do país",maxlength:"Máximo de 50 caracteres"},organization:{required:"Digite o nome da organização",maxlength:"Máximo de 100 caracteres"},name:{required:"Apresente-se, por favor",maxlength:"Máximo de 50 caracteres"},email:{required:"Insira o seu endereço de email",email:"Digite o endereço correto"},message:{required:"Digite sua mensagem",maxlength:"Máximo de 1000 caracteres"}},response_text={success_short:"Obrigado!",success:"Obrigado! Nós entraremos em contato com você.",error:"Erro ao enviar email"},close_popup_text="Fechar";break;case"tr":messages_values={country:{required:"Lütfen ülke adını girin",maxlength:"En fazla 50 karakter"},organization:{required:"Lütfen kuruluşun adını girin",maxlength:"En fazla 100 karakter"},name:{required:"Lütfen kendini tanıt",maxlength:"En fazla 50 karakter"},email:{required:"E-posta adresinizi giriniz",email:"Doğru adresi girin"},message:{required:"Mesajınızı giriniz",maxlength:"En fazla 1000 karakter"}},response_text={success_short:"Teşekkürler!",success:"Teşekkürler! Sizinle iletişime geçeceğiz.",error:"E-posta gönderilirken hata oluştu"},close_popup_text="Kapat";break;case"ru":messages_values={country:{required:"Пожалуйста, введите название страны",maxlength:"Максимум 50 символов"},organization:{required:"Пожалуйста, введите название организации",maxlength:"Максимум 100 символов"},name:{required:"Пожалуйста, представьтесь",maxlength:"Максимум 50 символов"},email:{required:"Введите ваш адрес электронной почты",email:"Введите правильный адрес"},message:{required:"Введите ваше сообщение",maxlength:"Максимум 1000 символов"}},response_text={success_short:"Спасибо!",success:"Спасибо! Мы свяжемся с вами.",error:"Ошибка при отправке электронной почты"},close_popup_text="Закрыть"}},App.Popups=function(){function e(){this.render()}e.prototype={el:{},render:function(){this.popupForm()},popupForm:function(){$(".js-popup").magnificPopup({type:"inline",preloader:!1,focus:"#name",tClose:close_popup_text,fixedContentPos:!1,fixedBgPos:!0,removalDelay:300,mainClass:"my-mfp-zoom-in",autoFocusLast:!1,callbacks:{beforeOpen:function(){$(window).width()<992?this.st.focus=!1:this.st.focus="#name"},beforeClose:function(){}}})}},new e},App.FormOrder=function(){function e(){this.render()}var o;e.prototype={el:{application_form_selector:".application_form_order",form_response_selector:".application_form_order .form-response",form_submit_selector:".application_form_order :submit"},render:function(){(o=this).applicationForm()},applicationForm:function(){$(o.el.application_form_selector).submit(function(e){$(o.el.form_response_selector).removeClass("color-green color-red").html("&nbsp;").slideUp("fast"),e.preventDefault()}),$(o.el.application_form_selector).validate({rules:{country:{required:!0,maxlength:50},organization:{required:!0,maxlength:100},name:{required:!0,maxlength:50},email:{required:!0,email:!0}},messages:messages_values,focusInvalid:!1,showErrors:function(e,r){0<r.length?$(o.el.form_submit_selector).prop("disabled",!0):$(o.el.form_submit_selector).prop("disabled",!1),this.defaultShowErrors()},submitHandler:function(r){$(o.el.form_submit_selector).prop("disabled",!0),$(o.el.form_submit_selector).addClass("btn-preloader"),$.ajax({url:$(o.el.application_form_selector).attr("action"),type:"POST",dataType:"json",cache:!1,data:$(r).serialize(),success:function(e){console.log(e),1==e.success?($(o.el.form_response_selector).html(response_text.success_short).addClass("color-green"),$("#link-demo-web").attr("href",e.demo_web),$("#link-demo-file").attr("href",e.demo_file),$(".demo-links").show(),setTimeout(function(){$(".demo-links").addClass("demo-links-show")},1e3)):($(o.el.form_response_selector).html(response_text.error).addClass("color-red"),console.log(e.ErrorInfo))},error:function(e){console.log(e),$(o.el.form_response_selector).html(response_text.error).addClass("color-red"),e.hasOwnProperty("responseJSON")?($(r).find(o.el.form_response_selector).html(e.responseJSON.message).addClass("color-red"),console.log("error: "+e.responseJSON.message)):(console.log("Error: "+e.status),console.log("Status: "+e.statusText))},complete:function(){$(o.el.form_response_selector).slideDown("fast"),$(o.el.form_submit_selector).prop("disabled",!1).removeClass("btn-preloader"),$(o.el.form_response_selector).is(":visible")&&$("body,html").animate({scrollTop:$(o.el.form_response_selector).offset().top-100},800),update_captcha_tokens()}})}})}},new e},App.FormContact=function(){function e(){this.render()}var o;e.prototype={el:{application_form_selector:".application_form_contact",form_response_selector:".application_form_contact .form-response",form_submit_selector:".application_form_contact :submit"},render:function(){(o=this).applicationForm()},applicationForm:function(){$(o.el.application_form_selector).submit(function(e){$(o.el.form_response_selector).removeClass("color-green color-red").html("&nbsp;").slideUp("fast"),e.preventDefault()}),$(o.el.application_form_selector).validate({rules:{country:{required:!0,maxlength:50},organization:{required:!0,maxlength:100},name:{required:!0,maxlength:50},email:{required:!0,email:!0},message:{required:!0,maxlength:1e3}},messages:messages_values,focusInvalid:!1,showErrors:function(e,r){0<r.length?$(o.el.form_submit_selector).prop("disabled",!0):$(o.el.form_submit_selector).prop("disabled",!1),this.defaultShowErrors(),$(o.el.application_form_selector).find("label.error:visible").length&&$("body,html").animate({scrollTop:$("label.error:visible").offset().top-100},800)},submitHandler:function(r){$(o.el.form_submit_selector).prop("disabled",!0),$(o.el.form_submit_selector).addClass("btn-preloader"),$.ajax({url:$(o.el.application_form_selector).attr("action"),type:"POST",dataType:"json",cache:!1,data:$(r).serialize(),success:function(e){1==e.success?$(o.el.form_response_selector).html(response_text.success).addClass("color-green"):($(o.el.form_response_selector).html(response_text.error).addClass("color-red"),console.log(e.ErrorInfo))},error:function(e){console.log(e),$(o.el.form_response_selector).html(response_text.error).addClass("color-red"),e.hasOwnProperty("responseJSON")?($(r).find(o.el.form_response_selector).html(e.responseJSON.message).addClass("color-red"),console.log("error: "+e.responseJSON.message)):(console.log("Error: "+e.status),console.log("Status: "+e.statusText))},complete:function(){$(o.el.form_response_selector).slideDown("fast"),$(o.el.form_submit_selector).prop("disabled",!1).removeClass("btn-preloader"),$(o.el.form_response_selector).is(":visible")&&$("body,html").animate({scrollTop:$(o.el.form_response_selector).offset().top-100},800),update_captcha_tokens()}})}})}},new e},App.Lang=function(){$("#site-lang option[value="+App.current_lang+"]").attr("selected","selected"),$("#site-lang").on("change",function(){var e=$(this).val();if(console.log(e),e==App.current_lang)return!1;var r="en"!=e?"/index-"+e+".html":"/";window.location.href=r})},$(document).ready(function(){(new WOW).init(),App.Other(),App.HeaderMenuMobile(),App.FullPage(),App.Translations(),App.Popups(),App.FormOrder(),App.FormContact(),App.Lang()});