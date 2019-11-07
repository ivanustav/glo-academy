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

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        
        this.showResult();
        this.disableInputs();
    },
    showResult: function() {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        targetMonth.value = Math.ceil(this.getTargetMonth());
        incomePeriod.value = this.calcSaveMoney();
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
    reset: function() {
        let emptyData = {
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
            moneyDeposit: 0
        };
        Object.assign(this, emptyData);

        salaryAmount.removeAttribute("disabled");
        incomeItems.forEach(function(item){
            item.querySelector('.income-title').removeAttribute("disabled");
            item.querySelector('.income-amount').removeAttribute("disabled");
        });
        additionalIncomeItem.forEach(function(item){
            item.removeAttribute("disabled");
        });
        expensesItems.forEach(function(item){
            item.querySelector('.expenses-title').removeAttribute("disabled");
            item.querySelector('.expenses-amount').removeAttribute("disabled");
        });
        additionalExpensesItem.removeAttribute("disabled");
        targetAmount.removeAttribute("disabled");
        periodSelect.removeAttribute("disabled");

        startBtn.style.display='inline-block';
        resetBtn.style.display='none';

        salaryAmount.value = '';
        additionalIncomeItem[0].value = '';
        additionalIncomeItem[1].value = '';
        additionalExpensesItem.value = '';
        targetAmount.value = '';
        periodAmount.innerText='1';
        periodSelect.value = 1;

        budgetMonth.value = 0;
        budgetDay.value = 0;
        expensesMonth.value = 0;
        additionalIncome.value = '';
        additionalExpenses.value = '';
        incomePeriod.value = 0;
        targetMonth.value = '';

        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems[0].querySelector('.expenses-title').value = '';
        expensesItems[0].querySelector('.expenses-amount').value = '';

        if(expensesItems.length > 1) {
            let i = expensesItems.length - 1;
            while(i != 0){
                expensesItems[i].remove();
                i--;
            }
        }
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesPlus.style.display == 'none') {
            expensesPlus.style.display='inline-block';
        }

        incomeItems = document.querySelectorAll('.income-items');
        incomeItems[0].querySelector('.income-title').value = '';
        incomeItems[0].querySelector('.income-amount').value = '';

        if(incomeItems.length > 1) {
            let i = incomeItems.length - 1;
            while(i != 0){
                incomeItems[i].remove();
                i--;
            }
        }
        incomeItems = document.querySelectorAll('.income-items');

        if(incomePlus.style.display == 'none') {
            incomePlus.style.display='inline-block';
        }
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display='none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
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
                this.expenses[itemExpenses] = +cashExpenses;
            }
        }, this);
    },
    getIncome: function() {
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        }, this);
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    },
    getExpensesMonth: function() {
        let sum = 0;
        for(let key in this.expenses) {
            sum += this.expenses[key];
        }

        this.expensesMonth = sum;
    },
    getIncomeMonth: function() {
        let sum = 0;
        for(let key in this.income) {
            sum += this.income[key];
        }

        this.incomeMonth = sum;
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30)
    },
    getTargetMonth: function() {
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function() {
        if(this.budgetDay < 300) {
            return('Низкий уровень дохода');
        } else if (this.budgetDay <=800) {
            return('Средний уровень дохода');
        } else {
            return('Высокий уровень дохода');
        }
    },
    calcSaveMoney: function() {
        return this.budgetMonth * periodSelect.value;
    },
    changePeriod: function(event) {
        let selectValue = event.target.value;

        periodAmount.innerText=selectValue;
    }
};

startBtn.addEventListener('click', appData.start.bind(appData));
resetBtn.addEventListener('click', appData.reset.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.changePeriod);

// console.log('Уровень дохода: ' + appData.getStatusIncome.bind(appData));