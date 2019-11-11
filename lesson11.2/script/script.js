const startBtn = document.getElementById('start'),
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
    depositCheck = document.querySelector('#deposit-check'),
    salaryAmount = document.querySelector('.salary-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

class AppData {
    constructor() {
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.budget = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }

    start () {
        if(salaryAmount.value === '') {
            return;
        }
        
        this.budget = +salaryAmount.value;

        this.getExpInc();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getIncomeMonth();
        this.getAddExpInc();
        this.getBudget();
        this.showResult();
        this.disableInputs();
    }

    showResult() {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        targetMonth.value = Math.ceil(this.getTargetMonth());
        incomePeriod.value = this.calcSaveMoney();
    }

    disableInputs() {
        const inputsData = document.querySelectorAll('.data input[type=text]');
        for(let item of inputsData) {
            item.setAttribute("disabled", true);
        }
    
        startBtn.style.display='none';
        resetBtn.style.display='inline-block';
        periodSelect.setAttribute("disabled", true);
        depositPercent.setAttribute("disabled", true);
        depositCheck.setAttribute("disabled", true);
        depositBank.setAttribute("disabled", true);
    }

    reset() {
        const emptyData = {
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
    
        const inputs = document.querySelectorAll('input[type=text]');
        for(let item of inputs) {
            item.value = '';
        }
    
        const inputsData = document.querySelectorAll('.data input[type=text]');
        for(let item of inputsData) {
            item.removeAttribute("disabled");
        }
        periodSelect.removeAttribute("disabled");
    
        startBtn.style.display='inline-block';
        resetBtn.style.display='none';
    
        periodAmount.innerText='1';
        periodSelect.value = 1;
    
        expensesItems = document.querySelectorAll('.expenses-items');
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
    
        depositBank.removeAttribute("disabled");
        depositBank.value=0;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositCheck.removeAttribute("disabled");
        depositCheck.checked = false;
    }

    addExpIncBlock() {
        let str = this.classList[1].split('_')[0],
            items = document.querySelectorAll(`.${str}-items`),
            cloneItem = items[0].cloneNode(true);
    
        items[0].parentNode.insertBefore(cloneItem, this);
        str == 'income' ? incomeItems = document.querySelectorAll(`.${str}-items`) 
                        : expensesItems = document.querySelectorAll(`.${str}-items`);
        if(items.length+1 === 3) {
            this.style.display='none';
        }
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        }
    
        expensesItems.forEach(count);
        incomeItems.forEach(count);
    }

    getInfoDeposit() {
        if(this.deposit) {
            this.percentDeposit = +depositPercent.value;
            this.moneyDeposit = +depositAmount.value;
        }
    }

    getAddExpInc() {
        const count = item => {
            let value,
                incomeType = '';
    
            if(typeof item == 'string') {
                value = item;
                incomeType = 'addExpenses';
            } else {
                value = item.value;
                incomeType = 'addIncome';
            }
            value.trim();
    
            if (value !== '') {
                this[incomeType].push(value);
            }
        }
    
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(count);
        additionalIncomeItem.forEach(count);
    }

    getExpensesMonth() {
        let sum = 0;
        for(let key in this.expenses) {
            sum += this.expenses[key];
        }
    
        this.expensesMonth = sum;
    }

    getIncomeMonth() {
        let sum = 0;
        for(let key in this.income) {
            sum += this.income[key];
        }
    
        this.incomeMonth = sum;
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12;
        this.budgetDay = Math.floor(this.budgetMonth / 30)
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

    calcSaveMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    changePeriod(event) {
        let selectValue = event.target.value;
    
        periodAmount.innerText=selectValue;
    }

    depositHandler() {
        if(depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
            this.deposit = false;
        }
    }

    depositBankChange() {
        let selectIndex = this.options[this.selectedIndex].value;
        if(selectIndex === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = selectIndex;
        }
    }

    eventListeners() {
        startBtn.addEventListener('click', this.start.bind(this));
        resetBtn.addEventListener('click', this.reset.bind(this));
        
        expensesPlus.addEventListener('click', this.addExpIncBlock);
        incomePlus.addEventListener('click', this.addExpIncBlock);
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositBank.addEventListener('change', this.depositBankChange);
        periodSelect.addEventListener('change', this.changePeriod);
    }
}

const appData = new AppData();

appData.eventListeners();