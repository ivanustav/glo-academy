let money = +prompt('Ваш месячный доход?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let mission = 100000;

let deposit = confirm('Есть ли у вас депозит в банке?');

let showTypeOf = function(data) {
    console.log(data, typeof(data))
};
showTypeOf(money);
showTypeOf(addExpenses);
showTypeOf(deposit);


let monthlyExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let monthlyExpensesPrice = +prompt('Во сколько это обойдется?');
let monthlyExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let monthlyExpensesPrice2 = +prompt('Во сколько это обойдется?');

function getExpensesMonth() {
    return monthlyExpensesPrice + monthlyExpensesPrice2;
}

function getAccumulatedMonth() {
    return money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();
console.log('accumulatedMonth: ', accumulatedMonth);

function getTargetMonth() {
    return Math.floor(mission / accumulatedMonth);
}

console.log('getTargetMonth: ', getTargetMonth());

let budgetDay = Math.floor(accumulatedMonth / 30);

let getStatusIncome = function() {
    if(budgetDay >= 800) {
        return('Высокий уровень дохода');
    } else if (budgetDay < 800 && budgetDay >= 300) {
        return('Средний уровень дохода');
    } else if (budgetDay < 300 && budgetDay > 0) {
        return('Низкий уровень дохода')
    } else if (budgetDay <= 0) {
        return('Что то пошло не так');
    }
}

console.log('getStatusIncome: ', getStatusIncome());