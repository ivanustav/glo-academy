let money = +prompt('Ваш месячный доход?'),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    mission = 100000,
    deposit = confirm('Есть ли у вас депозит в банке?');

console.log(addExpenses.split(', '))

console.log(typeof money);
console.log(typeof addExpenses);
console.log(typeof deposit);

let monthlyExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    monthlyExpensesPrice = +prompt('Во сколько это обойдется?'),
    monthlyExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    monthlyExpensesPrice2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - monthlyExpensesPrice - monthlyExpensesPrice2;
console.log('Накопления за период: ', budgetMonth);

let missionComplete = Math.ceil(mission / budgetMonth);
console.log('Cрок достижения цели: ', missionComplete);

let budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay: ', budgetDay);

if(budgetDay < 300) {
    console.log('Низкий уровень дохода');
} else if (budgetDay <=800) {
    console.log('Средний уровень дохода');
} else {
    console.log('Высокий уровень дохода');
}