
// КЛАСС ДЛЯ ОБРАБОТКИ КАРТОЧЕК
 export default class Card {
  // КОНСТРУКТОР
  constructor(data, cardSelector, clickPreviewImage) {
    this._image = data.image; // Приватные поля для наполнения конкретной карточки
    this._caption = data.caption; // Приватные поля для наполнения конкретной карточки
    this._cardSelector = cardSelector; // Селектор шаблона разметки
    this._clickPreviewImage = clickPreviewImage; // Обработчик клика по картинке -> открывает попап
  }

  // СОЗДАДИМ ШАБЛОН РАЗМЕТКИ КАРТОЧКИ (наполнять разметку данными и публиковать карточку на странице будем ниже другими методами)
  _getTemplate() {
    // Заберем шаблон из HTML и клонируем его элемент:
    const cardElement = document
    .querySelector(this._cardSelector) // Тут селектор шаблона разметки: он же выше в конструкторе
    .content
    .querySelector('.element')
    .cloneNode(true);

    // Вернем DOM-элемент карточки:
    return cardElement;
  }


  // ПОДГОТОВИМ КАРТОЧКУ К ПУБЛИКАЦИИ: НАПОЛНИМ ЕЕ КОНТЕНТОМ И НАСТРОИМ ЕЕ ПОВЕДЕНИЕ
  generateCard() {
    // Вставим созданный шаблон разметки в приватное поле _element:
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


 // СЛУШАТЕЛИ КЛИКОВ ПО КАРТОЧКЕ
  _setEventListeners() {

    // Слушатель лайков:
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._likeButtonHandler();
    });

    // Слушатель кликов по мусорке:
    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._removeElementHandler();
  });

  // Слушатель кликов по картинке -> вызов функции открытия попапа-3:
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._clickPreviewImage(this._image, this._caption);
    });
  }

// ФУНКЦИИ
  // Лайк
  _likeButtonHandler() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  // Удаление карточки
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

