let date = new Date();

let dateObj = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
}

let formatDate = function() {
    let dateString = '',
        separator = ''
    
    for( key in dateObj ) {
        switch(key) {
            case 'minutes':
                separator = ':';
                break;
            case 'day':
                separator = ' ';
                break;
            case 'month':
                separator = '.';
                break;
        }

        let value = dateObj[key] > 10 ? dateObj[key] : '0' + dateObj[key];

        dateString += separator + value;
    }

    return dateString;
}

let myString = document.createElement('div');
myString.innerText=formatDate();

document.querySelector('body').append(myString);