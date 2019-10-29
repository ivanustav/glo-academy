const weeksDayRu = 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье';
const weeksDayEng = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday';

const lang = prompt('Язык?');
if (lang == 'ru') {
    console.log(weeksDayRu);
} else if (lang == 'eng') {
    console.log(weeksDayEng);
}

const lang2 = prompt('Язык?');
switch (lang2) {
    case 'ru':
        console.log(weeksDayRu);
        break;
    case 'eng':
        console.log(weeksDayEng);
        break;
}

const lang3 = prompt('Язык?');
let langAnswer = lang3 == 'ru' ? 0 : 1;
let arr = [
    ['ru', weeksDayRu], 
    ['eng', weeksDayEng]
];

console.log(arr[langAnswer][1]);

// ---

let namePerson = prompt('Имя?');
let nameResult = namePerson == 'Артем' ? 
                    console.log('директор') : namePerson == 'Максим' ? 
                    console.log('преподаватель') : console.log('студент');