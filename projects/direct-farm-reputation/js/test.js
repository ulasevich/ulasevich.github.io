// Тестовый набор скриптов только для демонстрации шаблонов
// ----------------------- //

function test_accordeon() {
	var dropdown = document.getElementById("test-dropdown-1");
	var accordeon = document.getElementById("test-accordeon-1");
	
	if (dropdown.classList.contains("col-title-dropdown-opened")) {
		dropdown.classList.remove("col-title-dropdown-opened");
		accordeon.classList.add("col-accordeon-rolled");
	} else {
		dropdown.classList.add("col-title-dropdown-opened");
		accordeon.classList.remove("col-accordeon-rolled");
	}
}

function test_show_form_comment() { // появление формы comment
	var form_bg = document.getElementById("test-pform-bg"); // фон формы
	var form_wrapper = document.getElementById("test-pform-comment"); 
	
	form_bg.style.display = "block";
	form_wrapper.style.display = "block";
	
}
function test_close_form_comment() { // закрыть форму comment
	var form_bg = document.getElementById("test-pform-bg");
	var form_wrapper = document.getElementById("test-pform-comment");
	
	form_bg.style.display = "none";
	form_wrapper.style.display = "none";
		
}
