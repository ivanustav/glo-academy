let startBtn = document.getElementById('start'),
    resetBtn = document.getElementById('cancel'),
    incomePlus = document.querySelector('.income_add'),
    expensesPlus = document.querySelector('.expenses_add'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDay = document.querySelector('.budget_day-value'),
    expensesMonth = document.querySelector('.expenses_month-value'),
    additionalIncome = document.querySelector('.additional_income-value'),
    additionalExpenses = document.querySelector('.additional_expenses-value'),
    incomePeriod = document.querySelector('.income_period-value'),
    targetMonth = document.querySelector('.target_month-value'),
    budgetMonth = document.querySelector('.budget_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items');


let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        if(salaryAmount.value === '') {
            return;
        }

        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        
        appData.showResult();
        appData.disableInputs();
    },
    showResult: function() {
        budgetMonth.value = appData.budgetMonth;
        budgetDay.value = appData.budgetDay;
        expensesMonth.value = appData.expensesMonth;
        additionalExpenses.value = appData.addExpenses.join(', ');
        additionalIncome.value = appData.addIncome.join(', ');
        targetMonth.value = Math.ceil(appData.getTargetMonth());
        incomePeriod.value = appData.calcSaveMoney();
    },
    disableInputs: function() {
        salaryAmount.setAttribute("disabled", true);
        incomeItems.forEach(function(item){
            item.querySelector('.income-title').setAttribute("disabled", true);
            item.querySelector('.income-amount').setAttribute("disabled", true);
        });
        additionalIncomeItem.forEach(function(item){
            item.setAttribute("disabled", true);
        });
        expensesItems.forEach(function(item){
            item.querySelector('.expenses-title').setAttribute("disabled", true);
            item.querySelector('.expenses-amount').setAttribute("disabled", true);
        });
        additionalExpensesItem.setAttribute("disabled", true);
        targetAmount.setAttribute("disabled", true);
        periodSelect.setAttribute("disabled", true);

        startBtn.style.display='none';
        resetBtn.style.display='inline-block';
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value='';
        cloneExpensesItem.querySelector('.expenses-amount').value='';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display='none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value='';
        cloneIncomeItem.querySelector('.income-amount').value='';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display='none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        })
    },
    getExpensesMonth: function() {
        let sum = 0;
        for(let key in appData.expenses) {
            sum += appData.expenses[key];
        }

        appData.expensesMonth = sum;
    },
    getIncomeMonth: function() {
        let sum = 0;
        for(let key in appData.income) {
            sum += appData.income[key];
        }

        appData.incomeMonth = sum;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30)
    },
    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
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
    calcSaveMoney: function() {
        return appData.budgetMonth * periodSelect.value;
    },
    changePeriod: function(event) {
        let selectValue = event.target.value;

        periodAmount.innerText=selectValue;
    }
};

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.changePeriod);

// console.log('Уровень дохода: ' + appData.getStatusIncome());