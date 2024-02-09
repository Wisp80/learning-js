'use strict';

/*-------------------------------------------------------------------------------------------------------------*/

/*Символ нижнего подчеркивания – это "синтаксический сахар", который делает число более читабельным.*/

let number1 = 1000000000;
let number2 = 1_000_000_000;
console.log(number1 === number2); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Чтобы укоротить запись числа, мы можем добавить к нему букву "e" и указать необходимое количество нулей.*/

let number3 = 1e9;
console.log(number1 === number3); // true

let number4 = 0.000001;
let number5 = 1e-6;
console.log(number4 === number5); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Для записи 16-х чисел можно использовать "0x".*/

let number6 = 0xff;
let number7 = 255;
console.log(number6); // 255
console.log(number6 === number7); // true

/*Для записи 2-х чисел можно использовать "0b".*/

let number8 = 0b11111111;
console.log(number8); // 255
console.log(number8 === number7); // true

/*Для записи 8-х чисел можно использовать "0o".*/

let number9 = 0o377;
console.log(number9); // 255
console.log(number9 === number7); // true

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Метод "num.toString(base)" возвращает строковое представление числа num в системе счисления base. base может 
варьироваться от 2 до 36 (по умолчанию 10).*/

let number10 = 255;
console.log(number10.toString(16)); // 'ff'
console.log(number10.toString(2)); // '11111111'

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Поскольку при попытке обратиться к свойствам примитивов, которые не находятся в переменных, не создается
объект-обертка, мы получаем ошибку. Но чтобы решить эту проблему можно использовать ".." для целых чисел. Для
дробных и так все работает нормально.*/

let number11 = 255;
console.log(number11.a); // undefined
console.log(255..a); // undefined

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

let number12 = 3.4;
console.log(Math.floor(number12)); // 3

let number13 = 3.4;
console.log(Math.ceil(number13)); // 4

let number14 = 3.4;
console.log(Math.round(number14)); // 3, округляет к ближайшему целому числу 
let number15 = 3.5;
console.log(Math.round(number15)); // 4

let number16 = 3.4;
console.log(Math.trunc(number16)); // 3, удаляет дробную часть

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Как округлить число до n-ого количества цифр в дробной части.*/

/*Способ №1.*/

function roundTo(num, d) {
    return Math.round(num * Math.pow(10, d)) / Math.pow(10, d);
};

console.log(roundTo(3245.245239857, 2)); // 3245.25
console.log(roundTo(6.35, 1)); // 6.4

/*Способ №2.*/

console.log(3245.245239857.toFixed(2)); // '3245.25'

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Внутри JavaScript число представлено в виде 64-битного формата IEEE-754. Для хранения числа используется 64 
бита: 52 из них используется для хранения цифр, 11 для хранения положения десятичной точки и один бит отведен на 
хранение знака.*/

/*Если число слишком большое, оно переполнит 64-битное хранилище, JavaScript вернет бесконечность.*/

console.log(1e500); // Infinity
console.log(-1e500); // -Infinity
console.log(typeof NaN); // number
console.log(typeof Infinity); // number
console.log(typeof -Infinity); // number

/*Наиболее часто встречающаяся ошибка при работе с числами в JavaScript – это потеря точности.*/
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2); // 0.30000000000000004

/*Числовой формат IEEE-754 решает эту проблему путём округления до ближайшего возможного числа. Правила 
округления обычно не позволяют нам увидеть эту "крошечную потерю точности", но она существует. И когда мы 
суммируем 2 числа, их "неточности" тоже суммируются.*/
console.log(0.1.toFixed(20)); // 0.10000000000000000555
console.log(0.2.toFixed(20)); // 0.20000000000000001110
console.log(Number(0.1.toFixed(20)) + Number(0.2.toFixed(20))); // 0.30000000000000004

/*Ни один из двух указанных выше способов округления десятичной части на самом деле не решает проблему до 
конца.*/

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

console.log(9999999999999999); // 10000000000000000, из-за переполнения памяти число увеличится.

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

console.log(0); // 0
console.log(-0); // -0

if (-0) {
    console.log(`You shouldn't see me`);
};

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Значение NaN уникально тем, что оно не является равным ничему другому, даже самому себе.*/

console.log(NaN === NaN); // false

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Метод "isNaN()" преобразует значение в число и проверяет является ли оно NaN. При этом этот метод корректно
проверяет NaN.*/

console.log(isNaN(NaN)); // true NaN === NaN
console.log(isNaN('abc')); // true 'abc' === NaN --- NaN === NaN
console.log(isNaN('123')); // false '123' === NaN --- 123 === NaN
console.log(isNaN(123)); // false 123 === NaN
console.log(isNaN(Infinity)); // false Infinity === NaN
/*Пустая строка интерпретируется как 0 во всех числовых функциях.*/
console.log(isNaN('')); // false '' === NaN --- 0 === NaN

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Метод "isFinite()" преобразует аргумент в число и возвращает true, если оно является обычным числом, т.е. не 
NaN/Infinity/-Infinity.*/

console.log(isFinite(NaN)); // false NaN !== NaN/Infinity/-Infinity
console.log(isFinite('abc')); // false 'abc' !== NaN/Infinity/-Infinity --- NaN !== NaN/Infinity/-Infinity
console.log(isFinite('123')); // true '123' !== NaN/Infinity/-Infinity --- 123 !== NaN/Infinity/-Infinity
console.log(isFinite(123)); // true 123 !== NaN/Infinity/-Infinity
console.log(isFinite(Infinity)); // false Infinity !== NaN/Infinity/-Infinity
console.log(isFinite(-Infinity)); // false -Infinity !== NaN/Infinity/-Infinity
console.log(isFinite('')); // true '' !== NaN/Infinity/-Infinity --- 0 !== NaN/Infinity/-Infinity

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Методы "Number.isNaN()" и "Number.isFinite()" – это более строгие версии функций "isNaN()" и "isFinite()". 
Они не занимаются преобразованием, а проверяют аргумент как есть, то есть первым делом проверяют, является ли 
аргумент числом.*/

/*Метод "Number.isNaN()" возвращает true только в том случае, если аргумент принадлежит к типу number и является 
NaN. Во всех остальных случаях возвращает false.*/
console.log(Number.isNaN(NaN)); // true NaN === number --> NaN === NaN
console.log(Number.isNaN('abc')); // false 'abc' === number
console.log(Number.isNaN('123')); // false '123' === number
console.log(Number.isNaN(123)); // false 123 === number --> 123 === NaN
console.log(Number.isNaN(Infinity)); // false Infinity === number --> Infinity === NaN
console.log(Number.isNaN('')); // false '' === number

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*"Number.isFinite()" возвращает true только в том случае, если аргумент принадлежит к типу number и не является 
NaN/Infinity/-Infinity. Во всех остальных случаях возвращает false.*/
console.log(Number.isFinite(NaN)); // false NaN === number --> NaN !== NaN/Infinity/-Infinity
console.log(Number.isFinite('abc')); // false 'abc' === number
console.log(Number.isFinite('123')); // false '123' === number
console.log(Number.isFinite(123)); // true 123 === number --> 123 !== NaN/Infinity/-Infinity
console.log(Number.isFinite(Infinity)); // false Infinity === number --> Infinity !== NaN/Infinity/-Infinity
console.log(Number.isFinite(-Infinity)); // false -Infinity === number --> -Infinity !== NaN/Infinity/-Infinity
console.log(Number.isFinite('')); // false '' === number

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

console.log(0 === -0); // true

/*Есть метод "Object.is()", который сравнивает значения примерно как ===, но более надежен в двух особых 
ситуациях.*/

console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*При преобразовании строки, которая содержит числа и пробелы по бокам, пробелы будут проигнорированы.*/
console.log(Number('   123')); // 123
console.log(Number(' 1 23')); // NaN
console.log(Number(' 1 2 3')); // NaN
console.log(Number(' 12 3')); // NaN
console.log(Number(' 12 3 ')); // NaN
console.log(Number('123 ')); // 123
console.log(Number(' 123 ')); // 123
console.log(Number('12 3')); // NaN

/*Методы "parseInt()" и "parseFloat()" читают числа из строки слева направо и если в процессе чтения возникает 
ошибка, то они возвращают полученное до ошибки число. Эти методы вернут NaN, если не смогли прочитать ни одну 
цифру.*/

console.log(parseInt('4523g23')); // 4523
console.log(parseInt('452.3g23')); // 452
console.log(parseInt(' 452g23')); // 452
console.log(parseInt(' 452g23 ')); // 452
console.log(parseFloat('452.3g23')); // 452.3
console.log(parseFloat('452.3g23 ')); // 452.3
console.log(parseFloat(' 452.3g23 ')); // 452.3
console.log(parseFloat('452g23')); // 452
console.log(parseFloat('4522.32.4')); // 4522.32

console.log(parseInt('g4522.32.4')); // NaN
console.log(parseFloat('g4522.32.4')); // NaN

/*-------------------------------------------------------------------------------------------------------------------*/

/*Метод "Math.random()" возвращает псевдослучайное число в диапазоне от 0 (включительно) до 1 (но не включая 1).*/

console.log(Math.random());

/*Методы "Math.max()" и "Math.min()" возвращают наибольшее/наименьшее число из перечисленных аргументов.*/

console.log(Math.max(-1, 2, -5, 0, -10)); // 2
console.log(Math.min(-1, 2, -5, 0, -10)); // -10

/*Метод "Math.pow()" возводит число в степень power.*/

console.log(Math.pow(2, 6)); // 64