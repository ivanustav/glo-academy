let money = 1000;
let income = 'striptease';
let addExpenses = 'Gym, Food, CAT food';
let deposit = true;
let mission = 10000;
let period = 4;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(income.length);
console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');
console.log(addExpenses.toLocaleLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);