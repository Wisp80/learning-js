'use strict';

/*-------------------------------------------------------------------------------------------------------------*/

let age = 18;

/*При помощи тернарного оператора "?" можно реализовать много else.*/
let message =
    (age < 3) ? 'Здравствуй, малыш!' :
        (age < 18) ? 'Привет!' :
            (age < 100) ? 'Здравствуйте!' :
                'Какой необычный возраст!';