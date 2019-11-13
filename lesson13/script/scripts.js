window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = ~~(dateStop - dateNow) / 1000,
                seconds = ~~(timeRemaining % 60),
                minutes = ~~((timeRemaining / 60) % 60),
                hours = ~~(timeRemaining / 60 / 60);

            if( timeRemaining > 0 ){
                seconds < 10 ? seconds = '0' + seconds : seconds = seconds; 
                minutes < 10 ? minutes = '0' + minutes : minutes = minutes; 
                hours < 10 ? hours = '0' + hours : hours = hours; 
            } else {
                seconds = '00';
                minutes = '00';
                hours = '00';
            }

            return {timeRemaining, hours, minutes, seconds};
        }

        function updateClock() {
            let timer = getTimeRemaining();

            timerHours.textContent=timer.hours;
            timerMinutes.textContent=timer.minutes;
            timerSeconds.textContent=timer.seconds;

            if(timer.timeRemaining <= 0) {
                clearInterval(clockInterval);
            }
        }

        let clockInterval = setInterval(updateClock, 1000);

        updateClock();
    }

    countTimer('14 november 2019');

    // menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
              menu = document.querySelector('menu'),
              closeBtn = document.querySelector('.close-btn'),
              menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    // popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
              popupBtns = document.querySelectorAll('.popup-btn'),
              popupClose = document.querySelector('.popup-close'),
              mobileTest = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if(!mobileTest) {
            popup.style.display = 'block';
            popup.style.opacity = 0;
            popup.style.transform = 'translateY(-200%)';
            popup.style.transition = 'opacity .5s ease 0s';
        }
        
        const popupHandler = () => {
            if(popup.style.transform == 'translateY(-200%)') {
                popup.style.transform = 'translateY(0)';
                popup.style.opacity = 1;
            } else {
                popup.style.opacity = 0;
                setTimeout(function() {
                    popup.classList.remove('active');
                    popup.style.transform = 'translateY(-200%)';
                }, 500);
            }
        };

        const popupHandlerMobile = () => {
            if(popup.style.display == '' || popup.style.display == 'none') {
                popup.style.display = 'block';
            } else {
                popup.style.display = 'none';
            }
        };

        if(!mobileTest) {
            popupBtns.forEach((elem) => elem.addEventListener('click', popupHandler));
            popupClose.addEventListener('click', popupHandler);
        } else {
            popupBtns.forEach((elem) => elem.addEventListener('click', popupHandlerMobile));
            popupClose.addEventListener('click', popupHandlerMobile);
        }
    };

    togglePopup();

});