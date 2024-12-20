'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Каррирование - это трансформация функций таким образом, чтобы они принимали аргументы не как "f(a, b, c)", а как
"f(a)(b)(c)". Каррирование не вызывает функцию. Оно просто трансформирует ее.*/
function curryFunc01(f) { // Функция каррирования.

    return function (a) {

        return function (b) {

            return f(a, b);

        };

    };

};

function func01(a, b) { return a + b }; // Функция для каррирования.
let curriedFunc01 = curryFunc01(func01); // Трансформированная функция.
console.log(curriedFunc01(1)(2)); // 3

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Трансформированную функцию необязательно вызывать сразу со всеми остальными вызовами. Можно сделать только первый
вызов, сохранить его результат в переменную и переиспользовать его много раз.*/
function func02(a, b) { return a * b };
let curriedFunc02 = curryFunc01(func02);
let curryFunc01MultiplyTwo = curriedFunc02(2); // Частично примененная или частичная функция.
console.log(curryFunc01MultiplyTwo(3)); // 6
console.log(curryFunc01MultiplyTwo(4)); // 8
console.log(curryFunc01MultiplyTwo(5)); // 10

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Реализуем каррирование для функций с множеством аргументов. Для каррирования здесь необходима функция с фиксированным
количеством аргументов. Функцию, которая использует остаточные параметры, типа "func(...args)", так каррировать не 
получится.*/
function curryFunc02(func) {

    return function curried(...args) {

        /*Если количество переданных аргументов "args" совпадает с количеством аргументов при объявлении функции 
        "func()" или больше, то вызываем функцию "func()" c параметрами "args" в рамках текущего контекста this и 
        возвращаем наружу результат этого вызова.*/
        if (args.length >= func.length) {

            return func.apply(this, args);

            /*Иначе происходит частичное примененение, то есть возвращается другая функция-обертка, которая снова 
            вызовет функцию "curried()", передав ей предыдущие аргументы вместе с новыми. Затем при новом вызове 
            функции "curried()" мы опять получим либо новое частичное применение (если аргументов недостаточно) либо,
            наконец, результат.*/
        } else {

            return function (...args2) {

                return curried.apply(this, args.concat(args2));

            };

        };

    };

};

function func03(a, b, c) { return a + b + c };
let curriedFunc03 = curryFunc02(func03);

console.log(curriedFunc03(1, 2, 3)); // 6, все еще можно вызывать нормально
console.log(curriedFunc03(1)(2, 3)); // 6, каррирование первого аргумента
console.log(curriedFunc03(1)(2)(3)); // 6, каррирование всех аргументов