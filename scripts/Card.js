
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

    // Объявим классовую переменную для картинки карточки, чтобы не искать картинку несколько раз:
    this._cardImage = this._element.querySelector('.element__image');
    // Объявлю классовую переменную this._likeButton (= сделаю ее полем класса), чтобы искать этот элемент только 1 раз:
    this._likeButton = this._element.querySelector('.element__like-button');

    //Подключим к this-карточке все обработчики слушателей:
    this._setEventListeners();

    // Добавим данные:
    this._cardImage.src = this._image;
    this._cardImage.alt = this._caption;
    this._element.querySelector('.element__caption').textContent = this._caption;

   // И вернем элемент:
   return this._element;
  }


 // СЛУШАТЕЛИ КЛИКОВ ПО КАРТОЧКЕ
  _setEventListeners() {

    // Слушатель лайков:
    this._likeButton.addEventListener('click', () => {
      this._likeButtonHandler();
    });

    // Слушатель кликов по мусорке:
    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._removeElementHandler();
  });

  // Слушатель кликов по картинке -> вызов функции открытия попапа-3:
  this._cardImage.addEventListener('click', () => {
      this._clickPreviewImage(this._image, this._caption);
    });
  }

// ФУНКЦИИ
  // Лайк
  _likeButtonHandler() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  // Удаление карточки
  _removeElementHandler() {
    this._element.closest('.element').remove();
  }

} // Конец класса Card



