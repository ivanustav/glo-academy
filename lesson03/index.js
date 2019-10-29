let money = +prompt('Ваш месячный доход?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let mission = 10000;

console.log(addExpenses.split(', '))
let deposit = confirm('Есть ли у вас депозит в банке?');

console.log(typeof money);
console.log(typeof addExpenses);
console.log(typeof deposit);

let monthlyExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let monthlyExpensesPrice = +prompt('Во сколько это обойдется?');
let monthlyExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let monthlyExpensesPrice2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - monthlyExpensesPrice - monthlyExpensesPrice2;
console.log('budgetMonth: ', budgetMonth);

let missionComplete = Math.ceil(mission / budgetMonth);
console.log('missionComplete: ', missionComplete);

let budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay: ', budgetDay);

if(budgetDay >= 800) {
    console.log('Высокий уровень дохода');
} else if (budgetDay < 800 && budgetDay >= 300) {
    console.log('Средний уровень дохода');
} else if (budgetDay < 300 && budgetDay > 0) {
    console.log('Низкий уровень дохода')
} else if (budgetDay <= 0) {
    console.log('Что то пошло не так');
}