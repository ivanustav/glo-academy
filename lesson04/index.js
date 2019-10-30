let money = +prompt('Ваш месячный доход?'),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    mission = 100000,
    deposit = confirm('Есть ли у вас депозит в банке?');

let showTypeOf = function(data) {
    console.log(data, typeof(data))
};
showTypeOf(money);
showTypeOf(addExpenses);
showTypeOf(deposit);


let monthlyExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    monthlyExpensesPrice = +prompt('Во сколько это обойдется?'),
    monthlyExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    monthlyExpensesPrice2 = +prompt('Во сколько это обойдется?');

function getExpensesMonth() {
    return monthlyExpensesPrice + monthlyExpensesPrice2;
}

function getAccumulatedMonth() {
    return money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за период: ', accumulatedMonth);

function getTargetMonth() {
    return Math.floor(mission / accumulatedMonth);
}

console.log('Cрок достижения цели: ', getTargetMonth());

let budgetDay = Math.floor(accumulatedMonth / 30);

let getStatusIncome = function() {
    if(budgetDay < 300) {
        return('Низкий уровень дохода');
    } else if (budgetDay <=800) {
        return('Средний уровень дохода');
    } else {
        return('Высокий уровень дохода');
    }
}

console.log('getStatusIncome: ', getStatusIncome());