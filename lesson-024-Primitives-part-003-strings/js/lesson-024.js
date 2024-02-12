'use strict';

/*-------------------------------------------------------------------------------------------------------------*/

/*В JS любые текстовые данные являются строками. Не существует отдельного типа "символ". Внутренний формат для 
строк всегда UTF-16, вне зависимости от кодировки страницы.*/

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Обратные кавычик могут занимать более одной строки.*/
console.log(`1
2
3
`);

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Обратные кавычки также позволяют задавать "шаблонную функцию" перед первой обратной кавычкой. Используемый 
синтаксис: "func`string`". Автоматически вызываемая функция func получает строку и встроенные в нее выражения и 
может их обработать. Если перед строкой есть выражение, то шаблонная строка называется "теговым шаблоном".*/

let a = 1;
let b = 2;

function doSomething1(strings, a, b) {
    console.log(strings);
    console.log(strings[0]);
    console.log(strings[1]);
    console.log(strings[2]);
    console.log(a);
    console.log(b);
};

doSomething1`A ${a} and B ${b}`;

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*При использовании "" или '' можно использовать спецсимвол "\n", чтобы сделать многострочную строку.*/

let string1 = "1\n2\n3";
console.log(string1);
let string2 = `1
2
3`;
console.log(string1 === string2); // true

let string3 = '123';
console.log(string3);
console.log(string2 === string3);


/*Спецсимвол "\r" - перевод строки для Windows.*/

let string4 = "a\"bc";
console.log(string4);
let string5 = 'a\'bc';
console.log(string5);
let string6 = `a\`bc`;
console.log(string6);

let string7 = 'ab\\c'; // обратный слеш.
console.log(string7);

let string8 = 'ab\tc'; // табуляция.
console.log(string8);

/*"\b", "\f", "\v" - это Backspace, Form Feed и Vertical Tab, оставлены для обратной совместимости, сейчас не 
используются.*/

/*Обратный слэш в спецсимволах называется символов экранирования.*/

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Получить какой-то символ из строки можно при помощи "[]" или метода "at()".*/
console.log('abc'[1]); // b
console.log('abc'.at(1)); // b
console.log('abc'.at(-1)); // c, в этом методе можно указывать отрицательную позицию.
console.log('abc'[-1]); // undefined

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Цикл "for..of" пробегает по символам строки.*/

for (const char of 'abc') {
    console.log(char); // a => b => c 
}

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Содержимое строки в JavaScript нельзя изменить.*/

let string9 = 'abc';
// string9[2] = 'C'; // Uncaught TypeError: 2 is read-only
string9 = string9.toUpperCase();
console.log(string9);

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Метод "indexOf()" находит позицию в строке, с которой начинается какая-то подстрока. Если ничего не будет 
найдено, то вернется -1. Есть второй необязательный параметр, который указывает с какой позции надо начинать 
поиск.*/

let string10 = 'aabbcc';
console.log(string10.indexOf('abb')); // 1
console.log(string10.indexOf('abc')); // -1
console.log(string10.indexOf('b')); // 2
console.log(string10.indexOf('b', 3)); // 3

/*Использование метода "indexOf()" в цикле.*/

let string11 = 'aabbaaccaadd';
let target = 'aa';
let pos = 0;

while (true) {
    let foundPos = string11.indexOf(target, pos); // 0, 4, 8, -1

    if (foundPos === -1) break;

    console.log(foundPos);
    pos = foundPos + 1; // продолжаем со следующей позиции
}

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Есть метод "str.lastIndexOf()", который ищет подстроку справа налево.*/

let string12 = 'aabbaacc';
console.log(string12.indexOf('aa')); // 0
console.log(string12.lastIndexOf('aa')); // 4

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Оператор "~" преобразует число в 32-разрядное целое со знаком. Дробная часть отбрасывается. Затем все биты 
числа инвертируются. То есть любое число превращается в "-(n+1)".*/

let string13 = 'aac';

if (~string13.indexOf('a')) {
    console.log('I found something');
}

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Метод "includes()" говорит true если есть подстрока в строке. Есть второй необязательный параметр, который 
указывает с какой позции надо начинать поиск.*/

let string14 = 'aac';
console.log(string14.includes('a', 1)); // true

/*Методы "startsWith()" и "endsWith()" проверяют начинается ли и заканчивается ли строка определенной строкой.*/

console.log(string14.startsWith('a')); // true
console.log(string14.endsWith('c')); // true