'use strict';

/*В строгом режиме нельзя объявить переменную без let, const или var.*/

// num = 10; // Ошибка

/*-------------------------------------------------------------------------------------------------------------*/

let a = { b: 1 },
    b = {},
    c = 0;

console.log(a);
console.log(b);
console.log(c);

/*-------------------------------------------------------------------------------------------------------------*/

const y = {h: 7};

// y = {}; // Переопределение, будет ошибка
y.h = 8; // Изменение

/*-------------------------------------------------------------------------------------------------------------*/

/*Имя переменной должно содержать только буквы, цифры или символы $ и _.*/