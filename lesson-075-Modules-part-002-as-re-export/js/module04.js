'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

function func01() {
    console.log(6);
};

/*Это тоже самое, как если бы мы добавили "export default" перед функцией.*/
export { func01 as default };