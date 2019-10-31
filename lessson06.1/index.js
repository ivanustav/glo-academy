const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const currentDay = week[new Date().getDay() - 1];
let weekEdited = '';

for( key of week ) {
    switch (key) {
        case currentDay:
            weekEdited += '<b>' + key + '</b><br/>';
            break;
        case 'Суббота':
        case 'Воскресенье':
            weekEdited += '<i>' + key + '</i><br/>';
            break;
        default:
            weekEdited += key + '<br/>';
            break;
    }
}

document.querySelector('.weeks').innerHTML=weekEdited;