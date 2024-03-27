'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*WeakMap не предотвращает удаление объектов сборщиком мусора, когда эти объекты выступают в качестве ключей. Также
WeakMap отличается от Map в том, что ключи в WeakMap должны быть объектами, а не примитивными значениями.*/
let weakMap01 = new WeakMap();
let obj01 = { a: 1 };
weakMap01.set(obj01, 'a');
// weakMap01.set('b', 1); // Uncaught TypeError: WeakMap key "b" must be an object or an unregistered symbol

/*Если мы используем объект в качестве ключа и если больше нет ссылок на этот объект, то он будет удален из памяти 
и из объекта WeakMap автоматически.*/
console.log(weakMap01);
obj01 = null; // Объект "obj01" удален из памяти.
console.log(weakMap01); // Но нет информации, в какой момент произойдет эта очистка.
// weakMap01.clear() //  Uncaught TypeError: weakMap01.clear is not a function

/*Решение о том, когда делать сборку мусора, принимает движок JavaScript. Он может посчитать необходимым как удалить 
объект прямо сейчас, так и отложить эту операцию, чтобы удалить большее количество объектов за раз позже. Так что 
технически количество элементов в коллекции WeakMap неизвестно. Движок может произвести очистку сразу или потом, или 
сделать это частично. По этой причине методы "keys()", "values()", "entries()" для доступа ко всем сразу 
ключам/значениям недоступны. Также нет свойства "size" и метода "clear()".*/

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*В WeakMap присутствуют только следующие методы:
1) weakMap.get(key).
2) weakMap.set(key, value).
3) weakMap.delete(key).
4) weakMap.has(key).*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*В основном, WeakMap используется в качестве дополнительного хранилища данных. Если мы работаем с объектом, который 
"принадлежит" другому коду, может быть даже сторонней библиотеке, и хотим сохранить у себя какие-то данные для него, 
которые должны существовать лишь пока существует этот объект, то WeakMap – как раз то, что нужно. Мы кладем эти данные 
в WeakMap, используя объект как ключ, и когда сборщик мусора удалит объекты из памяти, ассоциированные с ними данные 
тоже автоматически исчезнут.*/
let weakMap02 = new WeakMap();
let obj02 = { a: 1 };
weakMap02.set(obj02, 'very important data');
obj02 = null; // Очень важные данные были удалены.

/*-------------------------------------------------------------------------------------------------------------------*/

/*Другая частая сфера применения WeakMap – это кеширование, когда результат вызова функции должен где-то запоминаться 
('кешироваться') для того, чтобы дальнейшие ее вызовы на том же объекте могли просто брать уже готовый результат, 
повторно используя его.*/

let cache = new WeakMap();

/*Вычисляем и запоминаем результат.*/
function process(obj) {
    if (!cache.has(obj)) {
        let result = obj.a * 2; // Ну очень сложные вычисления!
        cache.set(obj, result);
    }

    return cache.get(obj);
};

let obj03 = { a: 1 };
let result03_01 = process(obj03); // Высчитали результат.
let result03_02 = process(obj03); // Взяли результат из кэша.
obj03 = null; // Очистили "кэш".

/*-------------------------------------------------------------------------------------------------------------------*/

/*Коллекция WeakSet ведет себя похоже:
1) Она аналогична Set, но мы можем добавлять в WeakSet только объекты (не примитивные значения).
2) Объект присутствует в множестве только до тех пор, пока доступен где-то еще.
3) Как и Set, она поддерживает "add()", "has()" и "delete()", но не "size", "keys()" и не является перебираемой.*/

/*WeakSet тоже служит в качестве дополнительного хранилища. Но не для произвольных данных, а скорее для значений типа 
"да/нет". Присутствие во множестве WeakSet может что-то сказать нам об объекте.*/

let usedObjectsSet = new WeakSet();

let obj04 = { a: 1 };
let obj05 = { b: 2 };
let obj06 = { c: 3 };

usedObjectsSet.add(obj04);
usedObjectsSet.add(obj05);
usedObjectsSet.add(obj04);

console.log(usedObjectsSet); // "usedObjectsSet" сейчас содержит два объекта.

console.log(usedObjectsSet.has(obj04)); // true
console.log(usedObjectsSet.has(obj05)); // true
console.log(usedObjectsSet.has(obj06)); // false

obj04 = null;

console.log(usedObjectsSet); // "usedObjectsSet" сейчас содержит один объект.

/*Структура данных "usedObjectsSet" будет очищена автоматически.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Наиболее значительным ограничением WeakMap и WeakSet является то, что их нельзя перебрать или взять все содержимое.*/