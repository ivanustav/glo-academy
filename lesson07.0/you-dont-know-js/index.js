const books = document.querySelector('.books');
let bookItems = books.querySelectorAll('.book');
console.log(bookItems);

books.insertBefore(bookItems[1], bookItems[0]);
books.insertBefore(bookItems[4], bookItems[2]);
books.insertBefore(bookItems[3], bookItems[2]);
books.insertBefore(bookItems[5], bookItems[2]);

document.querySelector('body').setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');

bookItems[4].querySelector('a').innerText="Книга 3. this и Прототипы Объектов";

document.querySelector('.adv').remove();

const book2List = bookItems[0].querySelector('ul');
let book2Items = book2List.querySelectorAll('li');

book2List.insertBefore(book2Items[6], book2Items[4]);
book2List.insertBefore(book2Items[8], book2Items[4]);
book2List.insertBefore(book2Items[2], book2Items[10]);

const book5List = bookItems[5].querySelector('ul');
let book5Items = book5List.querySelectorAll('li');

book5List.insertBefore(book5Items[9], book5Items[2]);
book5List.insertBefore(book5Items[3], book5Items[2]);
book5List.insertBefore(book5Items[4], book5Items[2]);
book5List.insertBefore(book5Items[5], book5Items[8]);

const book6List = bookItems[2].querySelector('ul');
let book6Items = book6List.querySelectorAll('li');
let chapter8 = document.createElement('li');
chapter8.textContent="Глава 8: За пределами ES6";
book6List.insertBefore(chapter8, book6Items[9]);