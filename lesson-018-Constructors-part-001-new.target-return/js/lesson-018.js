'use strict';

/*-------------------------------------------------------------------------------------------------------------*/

/*Используя специальное свойство "new.target" внутри функции, мы можем проверить, вызвана ли функция при помощи 
оператора "new" или без него. В случае обычного вызова функции "new.target" будет undefined. Если же она была 
вызвана при помощи "new", "new.target" будет равен самой функции.*/
function constructor1(a) {
    try {
        this.a = a;
    } catch (error) {
        console.log(error);
    };

    console.log('new.target is ' + new.target);
};

constructor1(1); // TypeError: this is undefined

let obj1 = new constructor1(1);

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

/*Вызванные функции не как конструкторы без отдельного указания return всегда возвращают undefined.*/
function func1() { };
console.log(func1()); // undefined

/*Вызванные функции как конструкторы без отдельного указания return всегда возвращают объект.*/
function constructor2(a) {
    this.a = a;
};

let obj2 = new constructor2(1);
console.log(obj2); // { a: 1 }

/*Вызванные функции как конструкторы, в которых отдельно указано, что return возвращает какие-то непримитивные 
данные, возвращают эти непримитивные данные.*/
function constructor3(a) {
    this.a = a;

    return { b: 2 };
};

let obj3 = new constructor3(1);
console.log(obj3); // { b: 2 }

function constructor4(a) {
    this.a = a;

    return 3;
};

let obj4 = new constructor4(1);
console.log(obj4); // { a: 1 }