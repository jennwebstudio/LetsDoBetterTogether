	
$(document).ready(function() {

	//МОДАЛЬНОЕ ОКНО

		$('.open_popup').click(function() {
			$('.popup').css('display', 'block');
		});
		
		$('.close_popup').click(function() {
			$('.popup').css('display', 'none');
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



});

	//ВАЛИДАЦИЯ ПОЛЕЙ МОДАЛЬНОГО ОКНА
	
	const email = document.querySelector('#email');
	const password = document.querySelector('#password');
	const btn = document.querySelector('#btn');

	btn.addEventListener('click', e => {
	e.preventDefault();                       //предотвращает отправку данных до проверки
	
	checkInputs();
});
	function checkInputs() {

		const emailValue = email.value.trim();
		const passwordValue = password.value.trim();

		if(emailValue === '') {                           //проверка поля email на пустоту
		setErrorFor(email, 'Поле еmail не может быть пустым');
	} else if (!isEmail(emailValue)) {                //проверка email на правильность
		setErrorFor(email, 'Некорректный email');
	} else {
		setSuccessFor(email);
	}

	if(passwordValue === '') {                         //проверка пароля на пустоту
		setErrorFor(password, 'Пароль не может быть пустым');
	} else {
		setSuccessFor(password);
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
	}

	