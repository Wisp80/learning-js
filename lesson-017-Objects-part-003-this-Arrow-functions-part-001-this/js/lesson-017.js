'use strict';

/*-------------------------------------------------------------------------------------------------------------*/

let obj1 = {
    /*Сокращенная запись создания метода.*/
    doSomething1() { }
};

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

function doSomething2() {
    console.log(this);
}

doSomething2(); // В строгом режиме будет "undefined", а не в строгом режиме будет глобальный объект "Window".

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------*/

let obj3 = {
    a: 'xyz',

    arrowFunction: () => {
        console.log(this);
    },

    doSomething6() {
        console.log(this);
    }
};

let obj2 = {
    a: 'abc',

    doSomething3() {
        /*У стрелочных функций нет собственного контекста "this". Если мы ссылаемся на "this" внутри такой 
        функции, то оно берется из внешней нестрелочной функции.*/
        let arrowFunction = () => console.log(this.a);

        /*Здесь, при использовании Functional Expression, "this" ни на что не ссылается, то есть равен 
        "undefined", а у него нет свойства "a".*/
        // let arrowFunction = function () { console.log(this.a) };

        arrowFunction();
    },

    doSomething4() {
        let arrowFunction = () => {
            let arrowFunction2 = () => {
                console.log(this.a);
            };

            arrowFunction2();
        };

        arrowFunction();
    },

    doSomething5() {
        obj3.arrowFunction();
    }
};

obj2.doSomething3(); // 'abc'
obj2.doSomething4(); // 'abc'
obj2.doSomething5(); // глобальный объект "Window", так как это контекст некой глобальной функции, которая запускает изначально весь код.
obj3.arrowFunction(); // глобальный объект "Window"
obj3.doSomething6(); // объект "obj3"

let obj4 = {
    a: 'aa',

    obj5: {
        a: 'bb',

        arrowFunction: () => {
            console.log(this);
        }
    }
};

obj4.obj5.arrowFunction(); // глобальный объект "Window"

/*В общем можно описать работу стрелочной функции так: стрелочная функция ищет контекст "this" во внешних функция 
по порядку до тех пор, пока не встретит какую-то нестрелочную функцию и возьмет ее контекст.*/