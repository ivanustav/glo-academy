let money,
    start = function() {
        do{
            money = prompt('Ваш месячный доход?', 50000);
        }
        while(isNaN(money) || money === '' || money === null);
}

start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for(let i = 0; i < 2; i++) {
            let question = prompt('Введите обязательную статью расходов', 'food');

            let cost = prompt('Во сколько это обойдется?', 2500);
            while(isNaN(cost) || cost === '' || cost === null) {
                cost = prompt('Во сколько это обойдется?', 2500);
            }

            appData.expenses[question] = +cost;
        }
    },
    getExpensesMonth: function() {
        let sum = 0;
        for( key in appData.expenses) {
            sum += appData.expenses[key];
        }

        appData.expensesMonth = sum;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30)
    },
    getTargetMonth: function() {
        return Math.floor(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function() {
        if(appData.budgetDay < 300) {
            return('Низкий уровень дохода');
        } else if (appData.budgetDay <=800) {
            return('Средний уровень дохода');
        } else {
            return('Высокий уровень дохода');
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
console.log('Уровень дохода: ' + appData.getStatusIncome());

for( key in appData ) {
    console.log('Наша программа включает в себя данные: ' + key);
}