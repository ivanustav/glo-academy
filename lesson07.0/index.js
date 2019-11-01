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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function() {

        if(confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome = appData.validate('string', 'Какой у вас есть дополнительный заработок?', 'Таксую'),
                cashIncome = appData.validate('number', 'Сколько в месяц вы на этом зарабатываете?', 10000);
                
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for(let i = 0; i < 2; i++) {
            let question = appData.validate('string', 'Во сколько это обойдется?', 'food'),
                cost = appData.validate('number', 'Во сколько это обойдется?', 2500);

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
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            appData.percentDeposit = appData.validate('number', 'Какой годовой процент?', 10);
            appData.moneyDeposit = appData.validate('number', 'Какая сумма заложена?', 10000);
        }
    },
    calcSaveMoney: function() {
        return appData.budgetMonth * appData.period;
    },
    validate: function(type, question, defaultValue) {
        let answer;

        switch(type){
            case 'number':
                do{
                    answer = prompt(question, defaultValue);
                }
                while(isNaN(answer) || answer === '' || answer === null);
                break;
            case 'string':
                do{
                    answer = prompt(question, defaultValue);
                }
                while(!isNaN(answer) || answer === '' || answer === null);
                break;
        }

        return answer;
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

let expensesString = appData.addExpenses.reduce(function(accum, item, index){
    let separator = ', ';
    if(index == 0) {
        separator = '';
    }
    return accum += separator + item[0].toUpperCase() + item.slice(1);
}, '');

console.log(expensesString);

// appData.getInfoDeposit(); 
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());