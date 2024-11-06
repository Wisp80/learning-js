'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*В статических импортах и экспортах мы не можем динамически задавать никакие из параметров "import". Также путь к 
модулю должен быть строковым примитивом и не может быть вызовом функции.*/
function func01() { return './module01.js' };
// import { a } from func01(); // Uncaught SyntaxError: missing module specifier after 'from' keyword

/*Также в статических импортах и экспортах мы не можем делать импорт в зависимости от условий или в процессе 
выполнения.*/
// if (true) { import { a } from './module01.js' }; //  Uncaught SyntaxError: import declarations may only appear at top level of a module

/*Все это работает именно так потому, что цель директив "import"/"export" - задать костяк структуры кода. Благодаря им
она может быть проанализирована, модули могут быть собраны в один файл специальными инструментами, а неиспользуемые 
экспорты удалены. Это возможно только благодаря тому, что все статично.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Динамческие импорты и экспорты можно создавать при помощи "import()". Выражение "import(module)" загружает модуль и 
возвращает промис, результатом которого становится объект модуля, содержащий все его экспорты. Использовать его мы 
можем динамически в любом месте кода.*/
function func02() { return './module02.js' };
import(
    func02()
)
    .then(module => console.log(module)) // Object { b: 2, c: 3, Symbol(Symbol.toStringTag): "Module" }
    .catch(error => console.log(error));

/*Также можно использовать "await" с "import()". Здесь "await" работает вне async-функции, так как этот файл является
модулем.*/
let module03 = await import('./module03.js');
console.log(module03); // Object { d: 4, e: 5, Symbol(Symbol.toStringTag): "Module" }

// (async () => {    
//     let module03 = await import('./module03.js');
//     console.log(module03); // Object { d: 4, e: 5, Symbol(Symbol.toStringTag): "Module" }
// })();

/*Также "import()" можно использовать в условных конструкциях.*/
let module04;

if (true) {
    import('./module04.js')
        .then(
            (module) => {
                module04 = module;
                console.log(module04); // Object { f: 6, g: 7, Symbol(Symbol.toStringTag): "Module" }
            }
        )
};

/*-------------------------------------------------------------------------------------------------------------------*/

/*Динамический импорт работает в обычных скриптах, он не требует указания " script type="module" .*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Хотя "import()" и выглядит похоже на вызов функции, на самом деле это специальный синтаксис, так же, как, например,
"super()". Так что мы не можем скопировать "import" в другую переменную или вызвать при помощи "call()"/"apply()". Это
не функция.*/

// console.log(import); // Uncaught SyntaxError: unexpected token: ')'
// let importCopy = import; // Uncaught SyntaxError: unexpected token: ')'
// import.call(null) // Uncaught SyntaxError: expected meta, got identifier