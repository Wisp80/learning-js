'use strict';

/*-------------------------------------------------------------------------------------------------------------*/

/*Это стрелочная фукнция.*/
let func001 = (a, b) => a + b;

console.log(func001(1, 2)); // 3, return не требуется

function func002(a, b) {
    a + b;
};

console.log(func002(1, 2)); // undefined, нужен return

let func003 = (a, b) => {
    a + b;
};

console.log(func003(1, 2)); // undefined, нужен return

console.log('--------------------------------------');