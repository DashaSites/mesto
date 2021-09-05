
const openPopupEditProfileButton = document.querySelector('.profile__edit-button'); //КНОПКА ОТКРЫТИЯ ПОПАПА-1
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //КОНСТАНТА ДЛЯ ПОПАПА-1 (ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ):
const userName = document.querySelector('.profile__name');
const userOccupation = document.querySelector('.profile__occupation');
const nameInput = popupEditProfile.querySelector('.popup__form-input-item_type_name');
const jobInput = popupEditProfile.querySelector('.popup__form-input-item_type_occupation');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formSubmitEditProfileButton = popupEditProfile.querySelector('.popup__submit-button');

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА-1
function openPopupEditProfile() {
  if (!popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userOccupation.textContent;
  }

  openPopup(popupEditProfile);
}

// ОТМЕНА ОТПРАВКИ ДАННЫХ ФОРМЫ НА СЕРВЕР
function formSubmitHandler(event) {
  event.preventDefault();
}

openPopupEditProfileButton.addEventListener('click', openPopupEditProfile); //СЛУШАТЕЛЬ КЛИКОВ НА КНОПКЕ ОТКРЫТИЯ ПОПАПА-1

// ФУНКЦИЯ ДЛЯ РЕДАКТИРОВАНИЯ ДАННЫХ В ПОПАПЕ-1
formEditProfile.addEventListener(
  'submit',
  function formSubmitHandler(event) {
    event.preventDefault();
    popupEditProfile.classList.toggle('popup_opened');
    userName.textContent = nameInput.value;
    userOccupation.textContent = jobInput.value;
  }
);

//////////////////// ОСНОВНОЙ КОД 5-ГО СПРИНТА //////////////////////


// МАССИВ ИЗ 6 ФОТОГРАФИЙ
const initialCards = [ // СОБСТВЕННО МАССИВ

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

const cardsElement = document.querySelector('.elements'); // КОНТЕЙНЕР ДЛЯ ЗАПИХИВАНИЯ МАССИВА ФОТОГРАФИЙ
const elementTemplate = document.querySelector('#card-template').content;


// ФУНКЦИИ
// ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ КАРТОЧЕК ИЗ ФОТОГАЛЕРЕИ
const removeElementHandler = (event) => {
  event.target.closest('.element').remove();
};

// ФУНКЦИЯ ДЛЯ ВЫКЛАДЫВАНИЯ ФОТКИ ИЗ МАССИВА НА САЙТ ЧЕРЕЗ ШАБЛОН
const addElement = (data) => {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = data.image;
  cardElement.querySelector('.element__image').alt = 'Фотография на карточке';
  cardElement.querySelector('.element__caption').textContent = data.caption;
  cardElement.querySelector('.element__like-button').addEventListener('click', likeButtonHandler);
  cardElement.querySelector('.element__button-remove').addEventListener('click', removeElementHandler);
  cardElement.querySelector('.element__image').addEventListener('click', openImagePopup); // ПРИВЯЗАЛИ К КАРТИНКЕ НА КАРТОЧКЕ СЛУШАТЕЛЬ КЛИКОВ ПО ЭТОЙ КАРТИНКЕ

  cardsElement.prepend(cardElement);
};

const popup = document.querySelector('.popup'); // ОБЩАЯ КОНСТАНТА ДЛЯ ПОПАПА

const closePopupButtons = document.querySelectorAll('.popup__close-button'); // ОБЩАЯ КНОПКА ЗАКРЫТИЯ ПОПАПОВ

// СЛУШАТЕЛЬ КЛИКОВ ПО ВСЕЙ КОЛЛЕКЦИИ КНОПОК ЗАКРЫТИЯ ПОПАПА
closePopupButtons.forEach((item) => {
  item.addEventListener('click', closePopup);
});

// ОБЩАЯ ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
function closePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
};

// ОБЩАЯ ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА, КОТОРАЯ ИСПОЛЬЗУЕТСЯ В ДРУГИХ ФУНКЦИЯХ ОТКРЫТИЯ
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА-3 (УВЕЛИЧЕННАЯ КАРТОЧКА) ПО КЛИКУ НА КАРТИНКУ
function openImagePopup(event) {
  const imagePopup = document.querySelector('.popup_type_large-image'); // КОНСТАНТА ДЛЯ ПОПАПА-3
  const imagePopupElement = imagePopup.querySelector('.popup__image'); // ФОТОГРАФИЯ В ПОПАПЕ-3
  const captionPopupElement = imagePopup.querySelector('.popup__caption'); // ПОДПИСЬ В ПОПАПЕ-3

  openPopup(imagePopup);

  const item = event.target;
  imagePopupElement.src = item.src;
  captionPopupElement.textContent = event.target
  .closest('.element')
  .querySelector('.element__caption')
  .textContent;
};


// ФУНКЦИЯ АКТИВИЗАЦИИ ЛАЙКОВ НА КАРТОЧКАХ
function likeButtonHandler(event) {
  const elementLikeButton = event.target; // ТАРГЕТ = КНОПКА ЛАЙКА, ПО КОТОРОЙ КЛИКНУЛИ
  elementLikeButton.classList.toggle('element__like-button_active'); // ЕЙ ДОБАВЛЯЕТСЯ МОДИФИКАТОР ЛАЙКНУТОЙ КНОПКИ
};


initialCards.forEach((element) => { // ДЛЯ МАССИВА КАРТОЧЕК ВЫЗЫВАЕМ ФУНКЦИЮ, ЧТОБЫ ПРОЙТИСЬ ПО ВСЕМУ МАССИМУ И ВЫЛОЖИТЬ ВСЕ ЕГО ФОТКИ НА САЙТ. АРГУМЕНТ ФУНКЦИИ СЕМАНТИЧНО ОБОЗНАЧАЕМ КАК ЭЛЕМЕНТ ЭТОГО МАССИВА
  addElement(element);
});


//////// ПОПАП-2: ОТКРЫТИЕ-ЗАКРЫТИЕ ФОРМЫ + ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ////////

const openPopupAddCardButton = document.querySelector('.profile__add-button'); // КОНСТАНТА ДЛЯ КНОПКИ ОТКРЫТИЯ ПОПАПА-2 (ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ)
const popupAddCard = document.querySelector('.popup_type_add-card'); // ПОПАП-2

const formAddCard = popupAddCard.querySelector('.popup__form'); //ФОРМА В ПОПАПЕ-2
const formSubmitAddCardButton = popupAddCard.querySelector('.popup__submit-button'); //КНОПКА "СОЗДАТЬ" В ПОПАПЕ-2


// ФУНКЦИЯ ВКЛЮЧЕНИЯ ПОПАПА-2
function openPopupAddCard() {
  openPopup(popupAddCard);
}

openPopupAddCardButton.addEventListener('click', openPopupAddCard); // СЛУШАТЕЛЬ КЛИКОВ ПО КНОПКЕ ОТКРЫТИЯ ПОПАПА-2

//КОНСТАНТЫ ДЛЯ ДОБАВЛЕНИЯ И СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ
const cardCaption = formAddCard.querySelector('.popup__form-input-item_type_title');
const cardImage = formAddCard.querySelector('.popup__form-input-item_type_image-link');
const cardElement = elementTemplate.querySelector('.element').cloneNode(true);


// ФУНКЦИЯ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА

const addingElementHandler = (event) => {
  event.preventDefault(); // ОТМЕНЯЕМ ОТПРАВКУ ДАННЫХ НА СЕРВЕР

  addElement({ // ВСТАВЛЯЕМ НА САЙТ ФОТКУ И ЕЕ ПОДПИСЬ ИЗ ФОРМЫ
    image: cardImage.value,
    caption: cardCaption.value
    });

    formAddCard.reset(); // ПОСЛЕ ЧЕГО СБРАСЫВАЕМ ПОЛЯ ФОРМЫ

  popupAddCard.classList.remove('popup_opened'); // И СРАЗУ ПОСЛЕ ВСЕГО ЭТОГО ЗАКРЫВАЕМ ПОПАП
};

formAddCard.addEventListener('submit', addingElementHandler); // ВЫЗОВ ОПИСАННОЙ ВЫШЕ ФУНКЦИИ
