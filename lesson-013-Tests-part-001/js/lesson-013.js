'use strict';

/*-------------------------------------------------------------------------------------------------------------*/

function sum(a, b) {
    // if (a < 0 || a > 9 || b < 0 || b > 9) {
    //     return null;
    // };

    return a + b;
};

function test01(sumExample) {
    let result = sumExample(1, 2);

    if (result === 3) {
        console.log('test01 is fine');
    } else {
        console.log('test01 is not fine');
    };
};

function test02(sumExample) {
    let result = sumExample(-1, 2);

    if (result === null) {
        console.log('test02 is fine');
    } else {
        console.log('test02 is not fine');
    };
};

test01(sum);
test02(sum);

console.log('--------------------------------------');