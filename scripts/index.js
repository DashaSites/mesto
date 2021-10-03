import Card from './Card.js';
import { initialCards } from './data.js';
import { enableValidation } from './FormValidator.js';


////////// ПЕРЕМЕННЫЕ //////////

const buttonPopupEditProfileOpen = document.querySelector('.profile__edit-button'); //КНОПКА ОТКРЫТИЯ ПОПАПА-1
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //КОНСТАНТА ДЛЯ ПОПАПА-1 (ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ):
const userName = document.querySelector('.profile__name');
const userOccupation = document.querySelector('.profile__occupation');
const nameInput = popupEditProfile.querySelector('.popup__form-input-item_type_name');
const jobInput = popupEditProfile.querySelector('.popup__form-input-item_type_occupation');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formSubmitEditProfileButton = popupEditProfile.querySelector('.popup__submit-button');
const buttonsPopupClose = document.querySelectorAll('.popup__close-button'); // ОБЩАЯ КНОПКА ЗАКРЫТИЯ ПОПАПОВ
const buttonPopupAddCardOpen = document.querySelector('.profile__add-button'); // КОНСТАНТА ДЛЯ КНОПКИ ОТКРЫТИЯ ПОПАПА-2 (ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ)
const popupAddCard = document.querySelector('.popup_type_add-card'); // КОНСТАНТА ДЛЯ ПОПАПА-2
const formAddCard = popupAddCard.querySelector('.popup__form'); //ФОРМА В ПОПАПЕ-2
const formSubmitAddCardButton = popupAddCard.querySelector('.popup__submit-button'); //КНОПКА САБМИТА В ПОПАПЕ-2
const imagePopup = document.querySelector('.popup_type_large-image'); // КОНСТАНТА ДЛЯ ПОПАПА-3

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input-item',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__form-input-item_type_error',
  errorClass: 'error_visible'
};


const cardsElement = document.querySelector('.elements'); // КОНТЕЙНЕР ДЛЯ ЗАПИХИВАНИЯ МАССИВА ФОТОК
const cardTemplate = document.querySelector('#card-template').content;




////////// ФУНКЦИИ //////////
/*
//ФУНКЦИЯ СОЗДАНИЯ НОВОЙ КАРТОЧКИ, ЧТОБЫ НЕ ДУБЛИРОВАТЬ КОД.
  // Надо применить ее в цикле по массиву и в попапе по сабмиту формы
  const createCard = (data) => {
    return new Card(data.name, data.link);
  }
*/

// ПОДКЛЮЧЕНИЕ МАССИВА
// Обойдем весь массив initialCards и для каждого его элемента:
// 1) создадим новый экземпляр класса Card,
// 2) подготовим карточку к публикации
// 3) и добавим новую карточку в DOM:
initialCards.forEach((cardData) => {
  // Создаем экземпляр карточки:
  //const card = createCard(cardData);
  const card = new Card(cardData, '#card-template', clickPreviewImage);
  // Создаем карточку и возвращаем ее:
  const cardElement = card.generateCard();
  // Добавляем в DOM:
  cardsElement.prepend(cardElement);
});



// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА-1
function openPopupEditProfile() {
  if (!popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userOccupation.textContent;
  }

  openPopup(popupEditProfile);
}


// СЛУШАТЕЛЬ КЛИКОВ ПО ВСЕЙ КОЛЛЕКЦИИ КНОПОК ЗАКРЫТИЯ ПОПАПА
buttonsPopupClose.forEach((item) => {
  item.addEventListener('click', closePopup);
});


// ОБЩАЯ ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
function closePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEsc); // СНИМАЕМ СЛУШАТЕЛЬ КЛИКОВ ПО ESC ДЛЯ СВОРАЧИВАНИЯ ПОПАПА
};

// ФУНКЦИЯ ДЛЯ РЕДАКТИРОВАНИЯ ДАННЫХ В ПОПАПЕ-1
formEditProfile.addEventListener(
  'submit',
  function formSubmitHandler(event) {
    event.preventDefault();
    closePopup(event);
    userName.textContent = nameInput.value;
    userOccupation.textContent = jobInput.value;
  }
);


// ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ КАРТОЧЕК ИЗ ФОТОГАЛЕРЕИ
//const removeElementHandler = (event) => {
//event.target.closest('.element').remove();
//};


// ФУНКЦИЯ ДЛЯ ВЫКЛАДЫВАНИЯ ФОТКИ ИЗ МАССИВА НА САЙТ ЧЕРЕЗ ШАБЛОН

const createCard = (data) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  elementImage.src = data.image;
  elementImage.alt = ' ';
  cardElement.querySelector('.element__caption').textContent = data.caption;

  //cardElement.querySelector('.element__like-button').addEventListener('click', likeButtonHandler);
  //cardElement.querySelector('.element__button-remove').addEventListener('click', removeElementHandler);
  //cardElement.querySelector('.element__image').addEventListener('click', clickPreviewImage); // Слушатель кликов по картинке на карточке для открытия попапа-3

  return cardElement;
};



// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ НАЖАТИЕМ НА ESC
const closePopupByEsc = (event) => {

  if (event.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
};


// ОБЩАЯ ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА, КОТОРАЯ ИСПОЛЬЗУЕТСЯ В ДРУГИХ ФУНКЦИЯХ ОТКРЫТИЯ
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEsc); // ВЕШАЕМ СЛУШАТЕЛЬ КЛИКОВ ПО ESC ДЛЯ СВОРАЧИВАНИЯ ПОПАПА
}


// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА-3 ПО КЛИКУ НА КАРТИНКУ
  function clickPreviewImage(image, caption) {
    document.querySelector('.popup__image').src = image;
    document.querySelector('.popup__caption').textContent = caption;
    document.querySelector('.popup__image').alt = caption;

    openPopup(imagePopup);
  }



// ФУНКЦИЯ АКТИВИЗАЦИИ ЛАЙКОВ НА КАРТОЧКАХ
//function likeButtonHandler(event) {
//  const elementLikeButton = event.target; // ТАРГЕТ = КНОПКА ЛАЙКА, ПО КОТОРОЙ КЛИКНУЛИ
//  elementLikeButton.classList.toggle('element__like-button_active'); // ЕЙ ДОБАВЛЯЕТСЯ МОДИФИКАТОР ЛАЙКНУТОЙ КНОПКИ
// };



//////// ПОПАП-2: ОТКРЫТИЕ-ЗАКРЫТИЕ ФОРМЫ + ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ////////

// ФУНКЦИЯ ВКЛЮЧЕНИЯ ПОПАПА-2
function openPopupAddCard() {
  openPopup(popupAddCard);
}

buttonPopupAddCardOpen.addEventListener('click', openPopupAddCard); // СЛУШАТЕЛЬ КЛИКОВ ПО КНОПКЕ ОТКРЫТИЯ ПОПАПА-2



//ДОБАВЛЕНИЕ И СОХРАНЕНИЕ НОВОЙ КАРТОЧКИ

// ФУНКЦИЯ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА
const addNewCardData = (event) => {
  event.preventDefault();

  const cardImage = formAddCard.querySelector('.popup__form-input-item_type_image-link');
  const cardCaption = formAddCard.querySelector('.popup__form-input-item_type_title');

  // Кладем значения попапа в "сундук" для их передачи в конструктор
  const data = {
    image: cardImage.value,
    caption: cardCaption.value
  };

  // Создаем объект карточки по образцу класса Card:
  const card = new Card(data, '#card-template', clickPreviewImage);

  // Готовим карточку к печати, используя публичный метод класса Card:
  const cardElement = card.generateCard();
  // Добавляем ее в DOM:
  cardsElement.prepend(cardElement);

  //Сбрасываем поля формы:
  formAddCard.reset();

  closePopup(event);
  // КНОПКУ САБМИТА ПОСЛЕ САБМИТА ФОРМЫ ДЕАКТИВИРУЕМ В ФАЙЛЕ VALIDATE.JS
}



// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ОВЕРЛЕЙ
const popupsAll = document.querySelectorAll('.popup'); // КОНСТАНТА ДЛЯ ВСЕХ ПОПАПОВ СРАЗУ

popupsAll.forEach((item) => { // ПРОХОДИМСЯ ПО КАЖДОМУ ИЗ ПОПАПОВ, ОТСЛЕЖИВАЯ КЛИКИ, И СВОРАЧИВАЕМ КЛИКНУТЫЙ ПОПАП
  item.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(event);
    }
  });
});


////////// ВЫЗОВЫ ФУНКЦИЙ //////////

buttonPopupEditProfileOpen.addEventListener('click', openPopupEditProfile); //СЛУШАТЕЛЬ КЛИКОВ НА КНОПКЕ ОТКРЫТИЯ ПОПАПА-1

formAddCard.addEventListener('submit', addNewCardData); // ВЫЗОВ ФУНКЦИИ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА

enableValidation(validationConfig); // ВЫЗОВ ФУНКЦИИ ВАЛИДАЦИИ ВСЕХ ФОРМ




































/*

//РАБОТАЮЩИЙ ПРЕЖНИЙ КОД

////////// ПЕРЕМЕННЫЕ //////////

const buttonPopupEditProfileOpen = document.querySelector('.profile__edit-button'); //КНОПКА ОТКРЫТИЯ ПОПАПА-1
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //КОНСТАНТА ДЛЯ ПОПАПА-1 (ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ):
const userName = document.querySelector('.profile__name');
const userOccupation = document.querySelector('.profile__occupation');
const nameInput = popupEditProfile.querySelector('.popup__form-input-item_type_name');
const jobInput = popupEditProfile.querySelector('.popup__form-input-item_type_occupation');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formSubmitEditProfileButton = popupEditProfile.querySelector('.popup__submit-button');
const buttonsPopupClose = document.querySelectorAll('.popup__close-button'); // ОБЩАЯ КНОПКА ЗАКРЫТИЯ ПОПАПОВ
const buttonPopupAddCardOpen = document.querySelector('.profile__add-button'); // КОНСТАНТА ДЛЯ КНОПКИ ОТКРЫТИЯ ПОПАПА-2 (ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ)
const popupAddCard = document.querySelector('.popup_type_add-card'); // КОНСТАНТА ДЛЯ ПОПАПА-2
const formAddCard = popupAddCard.querySelector('.popup__form'); //ФОРМА В ПОПАПЕ-2
const formSubmitAddCardButton = popupAddCard.querySelector('.popup__submit-button'); //КНОПКА САБМИТА В ПОПАПЕ-2
const imagePopup = document.querySelector('.popup_type_large-image'); // КОНСТАНТА ДЛЯ ПОПАПА-3

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input-item',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__form-input-item_type_error',
  errorClass: 'error_visible'
};


const cardsElement = document.querySelector('.elements'); // КОНТЕЙНЕР ДЛЯ ЗАПИХИВАНИЯ МАССИВА ФОТОГРАФИЙ
const cardTemplate = document.querySelector('#card-template').content;



////////// ФУНКЦИИ //////////

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА-1
function openPopupEditProfile() {
  if (!popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userOccupation.textContent;
  }

  openPopup(popupEditProfile);
}


// СЛУШАТЕЛЬ КЛИКОВ ПО ВСЕЙ КОЛЛЕКЦИИ КНОПОК ЗАКРЫТИЯ ПОПАПА
buttonsPopupClose.forEach((item) => {
  item.addEventListener('click', closePopup);
});


// ОБЩАЯ ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
function closePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEsc); // СНИМАЕМ СЛУШАТЕЛЬ КЛИКОВ ПО ESC ДЛЯ СВОРАЧИВАНИЯ ПОПАПА
};

// ФУНКЦИЯ ДЛЯ РЕДАКТИРОВАНИЯ ДАННЫХ В ПОПАПЕ-1
formEditProfile.addEventListener(
  'submit',
  function formSubmitHandler(event) {
    event.preventDefault();
    closePopup(event);
    userName.textContent = nameInput.value;
    userOccupation.textContent = jobInput.value;
  }
);


// ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ КАРТОЧЕК ИЗ ФОТОГАЛЕРЕИ
const removeElementHandler = (event) => {
  event.target.closest('.element').remove();
};

// ФУНКЦИЯ ДЛЯ ВЫКЛАДЫВАНИЯ ФОТКИ ИЗ МАССИВА НА САЙТ ЧЕРЕЗ ШАБЛОН

const createCard = (data) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  elementImage.src = data.image;
  elementImage.alt = ' ';
  cardElement.querySelector('.element__caption').textContent = data.caption;
  cardElement.querySelector('.element__like-button').addEventListener('click', likeButtonHandler);
  cardElement.querySelector('.element__button-remove').addEventListener('click', removeElementHandler);
  cardElement.querySelector('.element__image').addEventListener('click', clickPreviewImage); // ПРИВЯЗАЛИ К КАРТИНКЕ НА КАРТОЧКЕ СЛУШАТЕЛЬ КЛИКОВ ПО ЭТОЙ КАРТИНКЕ

  return cardElement;
};


// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ НАЖАТИЕМ НА ESC
const closePopupByEsc = (event) => {

  if (event.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
};


// ОБЩАЯ ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА, КОТОРАЯ ИСПОЛЬЗУЕТСЯ В ДРУГИХ ФУНКЦИЯХ ОТКРЫТИЯ
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEsc); // ВЕШАЕМ СЛУШАТЕЛЬ КЛИКОВ ПО ESC ДЛЯ СВОРАЧИВАНИЯ ПОПАПА
}


// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА-3 (УВЕЛИЧЕННАЯ КАРТОЧКА) ПО КЛИКУ НА КАРТИНКУ
function clickPreviewImage(event) {
  const imagePopupElement = imagePopup.querySelector('.popup__image'); // ФОТОГРАФИЯ В ПОПАПЕ-3
  const captionPopupElement = imagePopup.querySelector('.popup__caption'); // ПОДПИСЬ В ПОПАПЕ-3

  openPopup(imagePopup);

  const item = event.target;
  imagePopupElement.src = item.src;
  captionPopupElement.textContent = event.target
  .closest('.element')
  .querySelector('.element__caption')
  .textContent;
  imagePopupElement.alt = event.target
  .closest('.element')
  .querySelector('.element__caption')
  .textContent;
};


// ФУНКЦИЯ АКТИВИЗАЦИИ ЛАЙКОВ НА КАРТОЧКАХ
function likeButtonHandler(event) {
  const elementLikeButton = event.target; // ТАРГЕТ = КНОПКА ЛАЙКА, ПО КОТОРОЙ КЛИКНУЛИ
  elementLikeButton.classList.toggle('element__like-button_active'); // ЕЙ ДОБАВЛЯЕТСЯ МОДИФИКАТОР ЛАЙКНУТОЙ КНОПКИ
};



//////// ПОПАП-2: ОТКРЫТИЕ-ЗАКРЫТИЕ ФОРМЫ + ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ////////

// ФУНКЦИЯ ВКЛЮЧЕНИЯ ПОПАПА-2
function openPopupAddCard() {
  openPopup(popupAddCard);
}

buttonPopupAddCardOpen.addEventListener('click', openPopupAddCard); // СЛУШАТЕЛЬ КЛИКОВ ПО КНОПКЕ ОТКРЫТИЯ ПОПАПА-2


//ДОБАВЛЕНИЕ И СОХРАНЕНИЕ НОВОЙ КАРТОЧКИ
const cardCaption = formAddCard.querySelector('.popup__form-input-item_type_title');
const cardImage = formAddCard.querySelector('.popup__form-input-item_type_image-link');
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);


// ФУНКЦИЯ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА

const addNewCardData = event => {
  event.preventDefault(); // ОТМЕНЯЕМ ОТПРАВКУ ДАННЫХ НА СЕРВЕР
  const image = cardImage.value,
  caption = cardCaption.value
  cardsElement.prepend(createCard({ image, caption }));

  formAddCard.reset(); // ПОСЛЕ ЧЕГО СБРАСЫВАЕМ ПОЛЯ ФОРМЫ

  closePopup(event);
  // КНОПКУ САБМИТА ПОСЛЕ САБМИТА ФОРМЫ ДЕАКТИВИРУЕМ В ФАЙЛЕ VALIDATE.JS
};

// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ОВЕРЛЕЙ
const popupsAll = document.querySelectorAll('.popup'); // КОНСТАНТА ДЛЯ ВСЕХ ПОПАПОВ СРАЗУ

popupsAll.forEach((item) => { // ПРОХОДИМСЯ ПО КАЖДОМУ ИЗ ПОПАПОВ, ОТСЛЕЖИВАЯ КЛИКИ, И СВОРАЧИВАЕМ ПРИ КЛИКЕ СООТВЕТСТВУЮЩИЙ ПОПАП
  item.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(event);
    }
  });
});


////////// ВЫЗОВЫ ФУНКЦИЙ //////////

buttonPopupEditProfileOpen.addEventListener('click', openPopupEditProfile); //СЛУШАТЕЛЬ КЛИКОВ НА КНОПКЕ ОТКРЫТИЯ ПОПАПА-1

formAddCard.addEventListener('submit', addNewCardData); // ВЫЗОВ ФУНКЦИИ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА

enableValidation(validationConfig); // ВЫЗОВ ФУНКЦИИ ВАЛИДАЦИИ ВСЕХ ФОРМ
*/
