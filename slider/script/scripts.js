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
              menuLinks = menu.querySelectorAll('ul>li a');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.querySelector('body').addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('close-btn') || 
                target.classList.contains('menu') || 
                target.parentNode.classList.contains('menu') || 
                [...menuLinks].includes(target)) {
                handlerMenu();
            } else {
                target = target.closest('menu');
                if(!target && menu.classList.contains('active-menu')) {
                    handlerMenu();
                }
            }
        })
    };

    toggleMenu();

    // popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
              popupBtns = document.querySelectorAll('.popup-btn'),
              mobileTest = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if(!mobileTest) {
            popup.style.display = 'block';
            popup.style.opacity = 0;
            popup.style.transform = 'translateY(-200%)';
            popup.style.transition = 'opacity .5s ease 0s';
        }

        const popupCloseAnimation = () => {
            popup.style.opacity = 0;
            setTimeout(function() {
                popup.classList.remove('active');
                popup.style.transform = 'translateY(-200%)';
            }, 500);
        };
        
        const popupHandler = () => {
            if(popup.style.transform == 'translateY(-200%)') {
                popup.style.transform = 'translateY(0)';
                popup.style.opacity = 1;
            } else {
                popupCloseAnimation();
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
        } else {
            popupBtns.forEach((elem) => elem.addEventListener('click', popupHandlerMobile));
        }

        popup.addEventListener('click', (event) => {
            let target = event.target;
            
            if(target.classList.contains('popup-close')) {
                !mobileTest ? popupCloseAnimation() : popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if(!target) {
                    !mobileTest ? popupCloseAnimation() : popup.style.display = 'none';
                }
            }
        });
    };

    togglePopup();

    // tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
              tab = tabHeader.querySelectorAll('.service-header-tab'),
              tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if(target) {
                tab.forEach((item, i) => {
                    if( item === target) {
                        toggleTabContent(i)
                    }
                });
            }

        })
    };

    tabs();

    // slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
              btn = document.querySelectorAll('.portfolio-btn'),
              slider = document.querySelector('.portfolio-content'),
              dotsWrapper = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            interval;

        const createDots = () => {
            let dotsQuantity = slide.length,
                dotsStr = '';

            for(let i = 0; i < dotsQuantity; i++) {
                dotsStr += '<li class="dot"></li>'
            }
            dotsWrapper.innerHTML=dotsStr;
        };

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn, .dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn, .dot')) {
                startSlide();
            }
        });
        
        createDots();
        const dot = document.querySelectorAll('.dot');
        startSlide(1500);
    };

    slider();

});