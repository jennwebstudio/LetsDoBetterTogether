	
$(document).ready(function() {

	//МОДАЛЬНОЕ ОКНО

		$('.open_popup').click(function() {
			$('.popup').css('display', 'block');
			return false;
		});
		
		$('.close_popup').click(function() {          //закрытие модального окна
			$('.popup').css('display', 'none');
			                           // возврат к окну авторизации
			$('#avt_form').removeClass('is-inactive').addClass('is-active');
			$('#reg_form').removeClass('is-active').addClass('is-inactive');
			$('#tab1').removeClass('is-gray').addClass('is-green');
			$('#tab2').removeClass('is-green').addClass('is-gray');
			return false;
			});
	
	//при  переходе на вкладку регистрации

		$('#tab2').click(function() {
			
			$('#avt_form').removeClass('is-active').addClass('is-inactive');
			$('#reg_form').removeClass('is-inactive').addClass('is-active');
			$('#tab1').removeClass('is-green').addClass('is-gray');
			$('#tab2').removeClass('is-gray').addClass('is-green');
			return false;
		});	

		//при  переходе на вкладку авторизации

		$('#tab1').click(function() {
			
			$('#avt_form').removeClass('is-inactive').addClass('is-active');
			$('#reg_form').removeClass('is-active').addClass('is-inactive');
			$('#tab1').removeClass('is-gray').addClass('is-green');
			$('#tab2').removeClass('is-green').addClass('is-gray');
			return false;
		});	

	//СЛАЙДЕР

	const images=document.querySelectorAll("#gallery img");
	var i =0;

	$('.prev').click(function() {
		images[i].style.display = 'none';
		i++;
		if (i>= images.length) {
		i=0;
		}
		images[i].style.display = 'block';
	});

	$('.next').click(function() {
		images[i].style.display = 'none';
		i--;
		if (i<0) {i=images.length - 1}
		images[i].style.display = 'block';
	});


	//ПЛАВНАЯ ПРОКРУТКА СТРАНИЦЫ
	 
    $("#back-top").hide();                   // прячем кнопку вначале
    
        $(function () {                      // появление кнопки при скролле через 800px
        $(window).scroll(function () {
            if ($(this).scrollTop() > 800) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        $('#back-top a[href="#top"]').click(function () {   // плавный скролл к 0 при клике на кнопку 
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
            return false;                     // чтобы страница не перезагружалась при клике
        });
    });





	//ВАЛИДАЦИЯ ПОЛЕЙ МОДАЛЬНОГО ОКНА
	
	const btn = document.querySelector('#btn');
	const email = document.querySelector('#email');                // поля для авторизации
	const password = document.querySelector('#password');
	
	const fio = document.querySelector('#fio')                      // поля для регистрации
	const email_reg = document.querySelector('#email_reg')
	const password_reg = document.querySelector('#password_reg');
	const password2 = document.querySelector('#password2');
	const btn_reg = document.querySelector('#btn_reg');


	btn.addEventListener('click', e => {       // при регистрации
	e.preventDefault(); 

	checkInputs2();

	           	
	$.ajax({
		type: "POST",
		url: "../page_ajax.php",
		data: {
			'email_ajx': emailVal,
			'password_ajx': passwordVal,
			'what': "avt"
		},
		dataType: "json",
		success: function(response) {
			if(response.result == "success") {
				alert('Форма корректна' + response.txt_success);
			} else {
				alert('Форма некорректна' + response.txt_error);
			}
		}
	})

});


btn_reg.addEventListener('click', e => {       // при регистрации
	e.preventDefault();                       
	
	checkInputs4();

	$.ajax({ 
			type : "POST",
			url : "../page_ajax.php",
			data: {
				'fio_ajx': fio.value, 
				'email_reg_ajx': email_reg.value,
				'password_reg_ajx': password_reg.value,
				'password2_ajx': password2.value,
				'what' : 'reg'
			},
			dataType : "json",
			success : function(response) {
						if (response.result == "success") {
							alert("форма корректна. " + response.txt_success);
						} else {
							alert("форма НЕ корректна. " + response.txt_error);
						}
					}
		})

});

	function checkInputs4() {                  // валидация полей при регистрации

		const fioValue = fio.value.trim();
		const emailValue = email_reg.value.trim();
		const passwordValue = password_reg.value.trim();
		const password2Value = password2.value.trim();

		if(fioValue === '') {                           //проверка поля ФИО на пустоту
		setErrorFor(fio, 'Поле ФИО не может быть пустым');
	} else if (!isFio(fioValue)) {                //проверка ФИО на правильность
		setErrorFor(fio, 'Только русские буквы');
	} else {
		setSuccessFor(fio);
	}

		if(emailValue === '') {                           //проверка поля email на пустоту
		setErrorFor(email_reg, 'Поле еmail не может быть пустым');
	} else if (!isEmail(emailValue)) {                //проверка email на правильность
		setErrorFor(email_reg, 'Некорректный email');
	} else {
		setSuccessFor(email_reg);
	}

	if(passwordValue === '') {                         //проверка пароля на пустоту
		setErrorFor(password_reg, 'Пароль не может быть пустым');
	} else {
		setSuccessFor(password_reg);
	}

	if(password2Value === '') {                         //проверка повтора пароля на пустоту
		setErrorFor(password2, 'Повтор пароля не может быть пустым');
	} else if(passwordValue !== password2Value) {       //проверка на соответствие двух паролей
		setErrorFor(password2, 'Пароль не соответствует введенному ранее');
	} else{
		setSuccessFor(password2);
	}
}

function checkInputs2() {                  // валидация полей при авторизации
		
	const emailVal = email.value.trim();
	const passwordVal = password.value.trim();
		
	if(emailVal === '') {                           //проверка поля email на пустоту
	setErrorFor(email, 'Поле еmail не может быть пустым');
		
	} else if (!isEmail(emailVal)) {                //проверка email на правильность
		setErrorFor(email, 'Некорректный email');
		
	} else {
		setSuccessFor(email);
	};

	if(passwordVal === '') {                         //проверка пароля на пустоту
		setErrorFor(password, 'Пароль не может быть пустым');
		
	} else {
		setSuccessFor(password);
	};

	
}

	function setErrorFor(input, message) {                    //для родит. div добавляется класс  error
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;                            // и выводится сообщение об ошибке
	}

	function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';       //для родит. div добавляется класс success
	}

	function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
	}
	function isFio(fio) {
	return /^[А-Яа-яЁё\s+ -]+$/.test(fio);
	}

  //  передача данных авторизации метдом AJAX


	
});
	