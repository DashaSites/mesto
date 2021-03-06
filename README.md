
# Mesto Russia. Приложение, на которое, возможно, жителям России придется перейти с инстаграма

https://dashasites.github.io/mesto/

Адаптивный сайт с удобным интерфейсом на экранах всех основных устройств, включая мобильные.


## С какими технологиями выполнен проект и как он работает

Сайт выполнен на HTML5, CSS3 и JavaScript. Дизайн с элементами резиновой верстки адаптирован к четырем размерам экранов — к разрешениям 1280, 1024, 768 и 320. Это **интерактивное** приложение. При наведении курсора на ссылки и иконки они плавно темнеют. Сайт гибкий благодаря сеткам **Flex** и **Grid Layout**, размерам блоков и элементов в относительных единицах и динамичным CSS-правилами, прописанным в медиазапросах для разных экранов. Приложение выполняет несколько функций социальной сети. У пользователя есть небольшой профайл (включает в себя фото, имя и род занятий), который можно редактировать через форму в попапе, а новые данные — сохранять. Через JavaScript, который реагирует на действия пользователей, пользователи могут работать с сайтом через еще два окна: 1) окно для добавления новой карточки, через которое можно загружать данные и добавлять их в фотогалерею на сайте, и эти новые карточки сохранятся; 2) и окно для просмотра карточки в полном размере (открывается по клику по превью). Модальные окна открываются и закрываются плавно. Через JavaScript добавлены функции лайков на карточках и функция удаления каточек. Через JavaScript настроена валидация форм в двух модальных окнах. Попапы можно закрывать тремя способами — кликом по крестику, клавишей Esc, кликом по оверлею.

На нынешней, четвертой стадии разработки значительная часть кода переписала и реорганизована по принципам ООП. Созданы два класса — Card, в котором собран код, имеющий отношение к функциям карточки, и FormValidator, в котором организована валидация двух форм. Задействованы JS-модули. Оба класса импортированы в файл index.js. В файле index.js по образцу обоих классов созданы объекты, а у этих объектов вызваны методы (таким образом использованы публичные методы обоих классов).

Файлы сгруппированы, а стили описаны по методологии **БЭМ** (nested). Все элементы хорошо смотрятся в браузерах Firefox, Google Chrome и Yandex Browser.


## Смысл и задачи проекта

Сайт сделан в рамках курса веб-разработки на **Яндекс Практикуме**. Это моя седьмая проектная работа. В этой работе функционал не поменялся, но код JavaScript переписан по принципам ООП.


Сайт разделен на несколько **секций**:

1. Шапка, **header**, с логотипом приложения.

2. **Profile**: здесь — данные пользователя (фото, имя, род занятий), кнопка редактирования профайла (работает через JS) и кнопка для добавления нового профайла.

3. **Elements** — фотогалерея, в которой картинки снабжены кэпшенами и лайками-сердцами (эти элементы пока не активны).

4. **Footer** —  копирайт.

4. **Popup** - окно формы, скрытое по умолчанию и открывающееся при клике на кропку редактирования профиля.


## Планы
Проект будет усовершенствован. Область взаимодействия с пользователем расширится: в частности, заработает отправка данных формы на сервер.
