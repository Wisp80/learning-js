'use strict';

/*-------------------------------------------------------------------------------------------------------------*/

/*Основной концепцией управления памятью в JavaScript является принцип достижимости.
"Достижимые значения" – это те, которые доступны или используются. Они гарантированно находятся в памяти.
1. Существует базовое множество достижимых значений, которые не могут быть удалены:
- Выполняемая в данный момент функция, её локальные переменные и параметры.
- Другие функции в текущей цепочке вложенных вызовов, их локальные переменные и параметры.
- Глобальные переменные.
- (некоторые другие внутренние значения)

Эти значения называются корнями.

2. Любое другое значение считается достижимым, если оно доступно из корня по ссылке или по цепочке ссылок.*/

/*Как только какие-то данные становятся недостижимыми, то сборщик мусора их удаляет из памяти.*/

console.log('--------------------------------------');