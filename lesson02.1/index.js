const num = 266219;
let numChanged = num.toString();
let numResult = 1;

for (key of numChanged) {
    numResult *= +key;
}

console.log(numResult);

let numPow = +(numResult ** 3).toString().slice(0,2);

console.log(numPow);