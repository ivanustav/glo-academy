let arr = [23636, 55623, 463535, 656, 211, 3, 4321];

arr.forEach(function(item) {
    if(item.toString()[0] == 2 || item.toString()[0] == 4) {
        console.log(item);
    }
})

// ---

for(let i = 0; i < 100; i++) {
    if( i == 2 || i == 3 || i == 5 || i == 7 || i != 1 && i % 2 != 0 && i % 3 != 0 && i % 5 != 0 && i % 7 != 0  ) {
        console.log('Делитель этого числа: 1 и ' + i);
    }
}