'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*В JavaScript объекты имеют специальное скрытое свойство "[[Prototype]]", которое либо равно null, либо ссылается на 
другой объект. Этот объект называется "прототип". Когда мы хотим прочитать свойство из какого-то объекта, а оно 
отсутствует, то JavaScript автоматически берет его из объекта-прототипа. В программировании такой механизм называется 
"прототипным наследованием".*/

/*Свойство "[[Prototype]]" является внутренним и скрытым, но есть много способов задать его. Одним из них является 
использование свойства "__proto__". Есть только два ограничения:
1) Ссылки не могут идти по кругу. JavaScript выдаст ошибку, если мы попытаемся назначить "__proto__" по кругу.
2) Значение __proto__ может быть объектом или null. Другие типы игнорируются.
3) Может быть только одно свойство "[[Prototype]]". 
4) Объект не может наследоваться от двух или больше других объектов.*/
let obj01 = { a: 1 };

let obj02 = {
    method01: () => { console.log('OK'); },
    __proto__: obj01
};

let obj03 = { b: 3 };
obj03.__proto__ = obj02;
obj03.method01(); // 'OK', берется через наследование у объекта "obj02"
console.log(obj03.a); // 1, берется через наследование у объекта "obj01"

let obj04 = {};
let obj05 = {};
obj04.__proto__ = obj05;
// obj05.__proto__ = obj04; // Uncaught TypeError: can't set prototype: it would cause a prototype chain cycle
// obj04.__proto__ = obj04; // Uncaught TypeError: can't set prototype: it would cause a prototype chain cycle

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Свойство "__proto__" — это исторически обусловленный геттер/сеттер для "[[Prototype]]". Свойство "__proto__" - это 
не то же самое, что и внутреннее свойство "[[Prototype]]". Свойство "__proto__" немного устарело, оно существует по 
историческим причинам. Современный JavaScript предполагает, что мы должны использовать функции 
"Object.getPrototypeOf()" или "Object.setPrototypeOf()" вместо того, чтобы получать или устанавливать объект-прототип. 
По спецификации свойство "__proto__" должен поддерживаться только браузерами, но по факту все среды, включая серверную, 
поддерживают его.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Объект-прототип используется только для чтения свойств. Операции записи/удаления работают напрямую с объектом.*/
let obj06 = { a: 1 };
let obj07 = { __proto__: obj06 };

obj07.a = 3;
console.log(obj06.a); // 1
console.log(obj07.a); // 3
console.log(' ');

delete obj07.a;
console.log(obj06.a); // 1
console.log(obj07.a); // 1
console.log(' ');

delete obj07.a;
console.log(obj06.a); // 1
console.log(obj07.a); // 1
console.log(' ');

/*Свойства-аксессоры - исключение, так как запись в него обрабатывается функцией-сеттером. То есть это фактически 
вызов функции.*/
let obj08 = {
    a: 'a',
    b: 'b',

    get ab() {
        return `${this.a} ${this.b}`;
    },

    set ab(value) {
        [this.a, this.b] = value.split(' ');
    }
};

let obj09 = {
    __proto__: obj08,
};

console.log(obj09.ab); // "a b"
console.log(obj09); // Object {  }
obj09.ab = 'c d'; // Срабатывает сеттер из объекта "obj08", но свойства создаются в объекте "obj09"
console.log(obj08); // Object { a: "a", b: "b", ab: Getter & Setter }
console.log(obj09); // Object { a: "c", b: "d" }
console.log(obj09.ab); // "c d", сабатывает геттер из объекта "obj08", но свойства берутся из объекта "obj09"

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Объекта-прототипы никак не влияют на this. Неважно, где находится метод: в объекте или его объекте-прототипе. При 
вызове метода this - это всегда объект перед точкой.*/
let obj10 = {
    a: 'a',
    b: 'b',

    get ab() {
        return `${this.a} ${this.b}`;
    },

    set ab(value) {
        [this.a, this.b] = value.split(' ');
    },

    method01: function () {
        console.log(this);
        this.c = 'd';
    }
};

let obj11 = {
    c: 'c',
    __proto__: obj10,
};

obj11.method01(); // obj11
console.log(obj10.c); // undefined
console.log(obj11.c); // "d"

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Цикл "for..in" проходит не только по собственным, но и по унаследованным свойствам объекта. Если унаследованные 
свойства нам не нужны, то мы можем отфильтровать их при помощи встроенного метода объектов "hasOwnProperty(key)", он 
возвращает true, если у объекта есть собственное, не унаследованное, свойство с именем key.*/
let obj12 = {
    a: 'a',
    b: 'b',
};

let obj13 = {
    c: 'c',
    __proto__: obj12,
};

console.log(Object.keys(obj13)); // [ "c" ]

for (const key in obj13) {
    console.log(key); // "c" => "a" => "b"
};

console.log(' ');

for (let key in obj13) {
    let isOwn = obj13.hasOwnProperty(key);

    if (isOwn) {
        console.log(`${key} is our`);
    } else {
        console.log(`${key} is not ours`);
    };
};

console.log(Object.prototype);

/*Метод "obj13.hasOwnProperty()" берется из "Object.prototype.hasOwnProperty()". То есть он унаследован. Этот метод не 
появляется в цикле "for..in" так, как у него внутренний флаг "enumerable" стоит false, как и у других свойств в
"Object.prototype". 

Почти все остальные методы, получающие ключи/значения, такие как "Object.keys()", "Object.values()" и другие - 
игнорируют унаследованные свойства. Они учитывают только свойства самого объекта, не его объекта-прототипа.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*С точки зрения производительности, для современных движков неважно, откуда берется свойство - из объекта или из 
объекта-прототипа. Они запоминают, где было найдено свойство, и повторно используют его в следующем запросе.*/