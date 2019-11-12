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

    countTimer('13 november 2019');

});