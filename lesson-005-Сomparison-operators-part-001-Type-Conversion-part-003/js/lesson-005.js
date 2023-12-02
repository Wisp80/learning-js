'use strict';

/*-------------------------------------------------------------------------------------------------------------*/

/*Строки сравниваются посимвольно.*/

console.log('F' > 'Л'); // false
console.log('Д' > 'V'); // true
console.log('КодЫ' > 'Кодавыаывааыава'); // false
console.log('Сонный' > 'Сон'); // true

console.log('--------------------------------------');

console.log('2' > 1); // true
console.log('01' == 1); // true
console.log(true == 1); // true
console.log(true === 1); // false
console.log(null == undefined); // true
console.log(null === undefined); // false

console.log('--------------------------------------');

console.log(null > 0);  // false
console.log(null >= 0); // true
console.log(null < 0); // false
console.log(null <= 0); // true

console.log(null == 0); // false
console.log(null === 0); // false
console.log(null != 0); // true
console.log(null !== 0); // true

console.log('--------------------------------------');

console.log(undefined > 0);  // false
console.log(undefined >= 0); // false
console.log(undefined < 0); // false
console.log(undefined <= 0); // false

console.log(undefined == 0); // false
console.log(undefined === 0); // false
console.log(undefined != 0); // true
console.log(undefined !== 0); // true

5 > 4 // true
"ананас" > "яблоко" // false
"2" > "12" // true
undefined == null // true
undefined === null // false
null == "\n0\n" // false
null === +"\n0\n" // false