function parseString(data) {
    if( typeof(data) != 'string' ) {
        alert("It's not a string");
        return;
    }

    let string = data.trim();
    let stringEnd = '...';

    if(string.length > 30) {
        string = string.slice(0, 30).concat(stringEnd);
    }
    return string;
}

let askString = prompt('Введите строку');
console.log(parseString(askString));