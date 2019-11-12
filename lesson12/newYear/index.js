const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      currentTime = document.querySelector('.currentTime'),
      remainTime = document.querySelector('.remainTime'),
      weekDay = document.querySelector('.weekDay'),
      dayTime = document.querySelector('.dayTime');

let date = new Date(),
    day = date.getDay(),
    currentDate = date.toLocaleTimeString('en'),
    deadline = new Date('1 january 2020'),
    remainDate = Math.ceil((deadline.getTime() - date.getTime()) / 1000 / 60 / 60 / 24),
    hours = new Date().getHours(),
    dayTimeNow = '';

if(hours > 3 && hours < 18) {
    dayTimeNow = 'Доброе утро';
} else if(hours >= 18 && hours < 23) {
    dayTimeNow = 'Доброго вечер';
} else {
    dayTimeNow = 'Доброй ночи';
}

weekDay.innerText = week[day-1];
currentTime.innerText = currentDate;
remainTime.innerText = remainDate;
dayTime.innerText = dayTimeNow;