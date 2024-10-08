'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*До изобретения модулей в самом JS, появились библиотеки для динамической подгрузки модулей, например:
1) AMD - одна из самых старых модульных систем, изначально реализована библиотекой require.js.
2) CommonJS - модульная система, созданная для сервера Node.js.
3) UMD - модульная система, которая предлагается как универсальная, совместима с AMD и CommonJS.*/

/*Система модулей на уровне языка появилась в стандарте JavaScript в 2015 году.*/

/*Модуль - это просто файл. Один скрипт - это один модуль. Модули могут загружать друг друга и использовать директивы
"export" и "import", чтобы обмениваться функциональностью, вызывать функции одного модуля из другого:
    1) "export" отмечает переменные и функции, которые должны быть доступны вне текущего модуля.
    2) "import" позволяет импортировать функциональность из других модулей.*/

/*Так как модули поддерживают ряд специальных ключевых слов, и у них есть ряд особенностей, то необходимо явно сказать
браузеру, что скрипт является модулем, при помощи атрибута "<script type="module">".*/

/*Весь код в модуле выполняется только один раз при импорте. Если один и тот же модуль используется в нескольких местах,
то его код выполнится только один раз, после чего экспортируемая функциональность передается всем импортерам.*/

/*Сначала запустится весь импортированный модуль "module01.js", а затем уже текущий скрипт.*/
console.log(' ');
console.log('--- we are in season-4-lesson-073.js ---');

/*"module01.js" запускается полностью здесь один раз до выполнения кода в текущем файле.*/
import { func01FromModule01 } from './module01.js';

console.log('code from season-4-lesson-073.js');

func01FromModule01(); // "module01 a"

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Модули не работают локально. Только через HTTP(s).*/

/*В модулях всегда используется режим "use strict".*/

/*Каждый модуль имеет свою собственную область видимости.*/

/*В браузере также существует независимая область видимости для каждого скрипта "<script type="module">".*/

/*Если нам нужно сделать глобальную переменную уровня всей страницы, можно явно присвоить ее объекту "window". Но так
лучше не делать.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Все импортеры получат один-единственный объект "obj01FromModule01". Если что-то изменится в объекте 
"obj01FromModule01", то другие модули тоже увидят эти изменения. Такое поведение позволяет конфигурировать модули при 
первом импорте. Мы можем установить его свойства один раз, и в дальнейших импортах он будет уже настроенным.*/
import { obj01FromModule01 } from './module01.js';
obj01FromModule01.a = 2;

/*-------------------------------------------------------------------------------------------------------------------*/

/*Объект import.meta содержит информацию о текущем модуле. Содержимое зависит от окружения. В браузере он содержит 
ссылку на скрипт или ссылку на текущую веб-страницу, если модуль встроен в HTML.*/
console.log(import.meta); // Object { url: "http://127.0.0.1:5500/season-4-lesson-073/js/season-4-lesson-073.js", resolve: resolve() }

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*В модуле "this" не определен. В не-модульных скриптах "this" это глобальный объект "window".*/
console.log(this); // undefined

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Модули всегда выполняются в отложенном (deferred) режиме, точно так же, как скрипты с атрибутом "defer". Это верно и
для внешних ("<script src="..." type="module"></script>") и встроенных скриптов-модулей
("<script type="module">code</script>"). Атрибут "defer" сообщает браузеру, что он должен продолжать обрабатывать
страницу и загружать скрипт в фоновом режиме, а затем запустить этот скрипт, когда DOM дерево будет полностью
построено.

Другими словами:
    1) Загрузка внешних модулей, таких как "<script src="..." type="module">", не блокирует обработку HTML.
    2) Модули, даже если загрузились быстро, ожидают полной загрузки HTML документа, и только затем выполняются.
    3) Сохраняется относительный порядок скриптов: скрипты, которые идут раньше в документе, выполняются раньше.

Как побочный эффект, модули всегда видят полностью загруженную HTML-страницу, включая элементы под ними.*/

/*При использовании модулей стоит иметь в виду, что HTML-страница будет показана браузером до того, как выполнятся
модули и JavaScript-приложение будет готово к работе. Некоторые функции могут еще не работать. Следует размещать
"индикатор загрузки" или что-то еще.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Атрибут "async" означает, что скрипт абсолютно независим:
    1) Страница не ждет асинхронных скриптов, содержимое обрабатывается и отображается.

    2) Событие "DOMContentLoaded" (это событие запускается когда первоначальный HTML документ будет полностью
    загружен и разобран, без ожидания полной загрузки таблиц стилей, изображений и фреймов) и асинхронные скрипты не
    ждут друг друга:
        а) событие "DOMContentLoaded" может произойти как до асинхронного скрипта (если асинхронный скрипт завершит
        загрузку после того, как страница будет готова),
        б) так и после асинхронного скрипта (если он короткий или уже содержится в HTTP-кеше).

    3) Остальные скрипты не ждут скрипты с атрибутом "async", и скрипты c атрибутами "async" не ждут другие скрипты.*/

/*Для не-модульных скриптов атрибут "async" работает только на внешних скриптах. Скрипты с ним запускаются сразу по
готовности, они не ждут другие скрипты или HTML-документ.*/

/*Для модулей атрибут "async" работает на любых скриптах.*/

/*Атрибут "async" полезен, когда модуль ни с чем не связан, например для счетчиков, рекламы, обработчиков событий.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Внешние модули с одинаковым атрибутом "src" запускаются только один раз.*/

/*Внешний модуль, который загружается с другого домена, требует указания заголовков CORS. Другими словами, если
модульный скрипт загружается с другого домена, то удаленный сервер должен установить заголовок
"Access-Control-Allow-Origin" означающий, что загрузка скрипта разрешена.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*В браузере "import" должен содержать относительный или абсолютный путь к модулю. Модули без пути называются "голыми"
(bare). Они не разрешены в "import".*/
// import { obj02FromModule01 } from ''; // error

/*Другие окружения, например Node.js, допускают использование "голых" модулей, без путей, так как в них есть свои 
правила, как работать с такими модулями и где их искать.*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*Старые браузеры не понимают атрибут " type="module" ". Скрипты с неизвестным атрибутом "type" просто игнорируются. Мы
можем сделать для них "резервный" скрипт при помощи атрибута "nomodule".*/

/*-------------------------------------------------------------------------------------------------------------------*/

/*В реальной жизни модули в браузерах редко используются в "сыром" виде. Обычно, мы объединяем модули вместе, 
используя специальный инструмент, например сборщик "Webpack" и после выкладываем код на рабочий сервер.

Одно из преимуществ использования сборщика - он предоставляет больший контроль над тем, как модули ищутся, позволяет
использовать "голые" модули и многое другое "свое", например CSS/HTML-модули.

Сборщик делает следующее:
    1) Берет "основной" модуль, который мы собираемся поместить в <script type="module"> в HTML.
    2) Анализирует зависимости (импорты, импорты импортов и так далее).
    3) Собирает один файл со всеми модулями (или несколько файлов, это можно настроить), перезаписывает встроенный
    "import" функцией импорта от сборщика, чтобы все работало. "Специальные" типы модулей, такие как HTML/CSS тоже 
    поддерживаются.
    4) В процессе могут происходить и другие трансформации и оптимизации кода:
        а) Недостижимый код удаляется.
        б) Неиспользуемые экспорты удаляются ("tree-shaking").
        в) Специфические операторы для разработки, такие как "console" и "debugger", удаляются.
        г) Современный синтаксис JavaScript также может быть трансформирован в предыдущий стандарт, с похожей 
        функциональностью, например, с помощью транспилятор "Babel".
        д) Полученный файл можно минимизировать (удалить пробелы, заменить названия переменных на более короткие и так 
        далее).*/

/*Если мы используем инструменты сборки, то они объединяют модули вместе в один или несколько файлов, и заменяют 
"import"/"export" на свои вызовы. Поэтому итоговую сборку можно подключать и без атрибута " type="module" ", как 
обычный скрипт.*/