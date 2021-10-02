// ПР 7

  // ПЕРЕМЕННЫЕ - ТОЖЕ ВО ВНЕШНЕЙ ОБЛАСТИ ПО ОТНОШЕНИЮ К КЛАССУ:
  //const imagePopup = document.querySelector('.popup_type_large-image'); // КОНСТАНТА ДЛЯ ПОПАПА-3
  //const buttonsPopupClose = document.querySelectorAll('.popup__close-button'); // ОБЩАЯ КНОПКА ЗАКРЫТИЯ ПОПАПОВ



// КЛАСС ДЛЯ ОБРАБОТКИ КАРТОЧЕК
 export default class Card {
  // КОНСТРУКТОР
  constructor(data, cardSelector) {
    this._image = data.image; // Приватные поля для наполнения конкретной карточки: они нужны только внутри класса
    this._caption = data.caption; // Приватные поля для наполнения конкретной карточки: они нужны только внутри класса
    this._cardSelector = cardSelector; // А это селектор шаблона разметки
  }

  // ШАБЛОН РАЗМЕТКИ КАРТОЧКИ (Для наполнения разметки данными и публикации карточки на странице — ниже другие методы)
  _getTemplate() {
    // Заберем шаблон из HTML и клонируем ее элемент:
    const cardElement = document
    .querySelector(this._cardSelector) // Тут селектор шаблона разметки
    .content
    .querySelector('.element')
    .cloneNode(true);

    // Вернем DOM-элемент карточки:
    return cardElement;
  }

  // Подготовим карточку к публикации (наполним контентом) и настроим ее поведение:
  generateCard() {
    // Вставим шаблон разметки в приватное поле _element:
    this._element = this._getTemplate();
    //Подключим к this-карточке все обработчики слушателей:
    this._setEventListeners();

    // Добавим данные:
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._caption;
    this._element.querySelector('.element__caption').textContent = this._caption;

   // И вернем элемент:
   return this._element;
  }

 // СЛУШАТЕЛИ КЛИКОВ
  _setEventListeners() {
    // Слушатель лайков:
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._likeButtonHandler();
    });

    // Слушатель кликов по мусорке:
    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._removeElementHandler();
  });

  }
// ФУНКЦИИ
  // Функция лайка карточки
  _likeButtonHandler() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  // Функция удаления карточки кликом по мусорке. Эта функция работает из Card с массивом,
  // но не с новыми карточками, добавленными через попап-2
  _removeElementHandler() {
    this._element.closest('.element').remove();
  }

} // Конец класса Card



















/*
// РАБОТАЮЩИЙ ПРЕЖНИЙ КОД

// МАССИВ ИЗ 6 ФОТОГРАФИЙ

const initialCards = [

  {
  caption: 'Болото',
  image: './images/hippos.jpg'
},
{
  caption: 'Нида',
  image: './images/nida.png'
},
{
  caption: 'Яффо',
  image: './images/jaffa.jpg'
},
{
  caption: 'Эфиопия',
  image: './images/ethiopia.jpg'
},
{
  caption: 'Серенгети',
  image: './images/serengeti.jpg'
},
{
  caption: 'Тарангире',
  image: './images/tarangire.jpg'
}
];


// ДЛЯ МАССИВА КАРТОЧЕК ВЫЗЫВАЕМ ФУНКЦИЮ, ЧТОБЫ ПРОЙТИСЬ ПО ВСЕМУ МАССИМУ И
//ВЫЛОЖИТЬ ВСЕ ЕГО ФОТКИ НА САЙТ. АРГУМЕНТ ФУНКЦИИ ОБОЗНАЧАЕМ КАК ЭЛЕМЕНТ ЭТОГО МАССИВА
initialCards.forEach((element) => {
  cardsElement.prepend(createCard(element));
});
*/

