let money,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    mission = 100000,
    deposit = confirm('Есть ли у вас депозит в банке?');

let start = function() {

    do{
        money = prompt('Ваш месячный доход?', 50000);
    }while(isNaN(money) || money === '' || money === null);
}

start();

let showTypeOf = function(data) {
    console.log(data, typeof(data))
};
showTypeOf(money);
showTypeOf(addExpenses);
showTypeOf(deposit);


let monthlyExpenses,
    monthlyExpenses2;

let getExpensesMonth = function() {
    let sum = 0;

    for(let i = 0; i < 2; i++) {
        if(i === 0) {
            monthlyExpenses = prompt('Введите обязательную статью расходов', 'food')
        }
        if(i === 1) {
            monthlyExpenses2 = prompt('Введите обязательную статью расходов', 'flatRent')
        }

        let cost = prompt('Во сколько это обойдется?', 2500);
        while(isNaN(cost) || cost === '' || cost === null) {
            cost = prompt('Во сколько это обойдется?', 2500);
        }

        sum += +cost;
    }
    return sum;
}

let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц: ', expensesAmount);

function getAccumulatedMonth() {
    return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за период: ', accumulatedMonth);

function getTargetMonth() {
    return Math.floor(mission / accumulatedMonth) > 0 ? 'Цель будет достигнута' : 'Цель не будет достигнута';
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