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
const formSubmitAddCardButton = popupAddCard.querySelector('.popup__submit-button'); //КНОПКА "СОЗДАТЬ" В ПОПАПЕ-2

const imagePopup = document.querySelector('.popup_type_large-image'); // КОНСТАНТА ДЛЯ ПОПАПА-3

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__form-input-item_type_error',
  errorClass: 'error_visible'
};

enableValidation(validationConfig);

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

const cardsElement = document.querySelector('.elements'); // КОНТЕЙНЕР ДЛЯ ЗАПИХИВАНИЯ МАССИВА ФОТОГРАФИЙ
const cardTemplate = document.querySelector('#card-template').content;


// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА-1
function openPopupEditProfile() {
  if (!popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userOccupation.textContent;
  }

  openPopup(popupEditProfile);
}

buttonPopupEditProfileOpen.addEventListener('click', openPopupEditProfile); //СЛУШАТЕЛЬ КЛИКОВ НА КНОПКЕ ОТКРЫТИЯ ПОПАПА-1


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
  cardElement.querySelector('.element__image').src = data.image;
  cardElement.querySelector('.element__image').alt = ' ';
  cardElement.querySelector('.element__caption').textContent = data.caption;
  cardElement.querySelector('.element__like-button').addEventListener('click', likeButtonHandler);
  cardElement.querySelector('.element__button-remove').addEventListener('click', removeElementHandler);
  cardElement.querySelector('.element__image').addEventListener('click', openImagePopup); // ПРИВЯЗАЛИ К КАРТИНКЕ НА КАРТОЧКЕ СЛУШАТЕЛЬ КЛИКОВ ПО ЭТОЙ КАРТИНКЕ

  return cardElement;
};


// ДЛЯ МАССИВА КАРТОЧЕК ВЫЗЫВАЕМ ФУНКЦИЮ, ЧТОБЫ ПРОЙТИСЬ ПО ВСЕМУ МАССИМУ И
//ВЫЛОЖИТЬ ВСЕ ЕГО ФОТКИ НА САЙТ. АРГУМЕНТ ФУНКЦИИ СЕМАНТИЧНО ОБОЗНАЧАЕМ КАК ЭЛЕМЕНТ ЭТОГО МАССИВА
initialCards.forEach((element) => {
  cardsElement.prepend(createCard(element));
});


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
function openImagePopup(event) {
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

const addingElementHandler = event => {
  event.preventDefault(); // ОТМЕНЯЕМ ОТПРАВКУ ДАННЫХ НА СЕРВЕР

  const image = cardImage.value,
  caption = cardCaption.value
  cardsElement.prepend(createCard({ image, caption }));

  formAddCard.reset(); // ПОСЛЕ ЧЕГО СБРАСЫВАЕМ ПОЛЯ ФОРМЫ

  closePopup(event);
};

formAddCard.addEventListener('submit', addingElementHandler); // ВЫЗОВ ОПИСАННОЙ ВЫШЕ ФУНКЦИИ


// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ОВЕРЛЕЙ

const popupsAll = document.querySelectorAll('.popup'); // КОНСТАНТА ДЛЯ ВСЕХ ПОПАПОВ СРАЗУ

popupsAll.forEach((item) => { // ПРОХОДИМСЯ ПО КАЖДОМУ ИЗ ПОПАПОВ, ОТСЛЕЖИВАЯ КЛИКИ, И СВОРАЧИВАЕМ ПРИ КЛИКЕ СООТВЕТСТВУЮЩИЙ ПОПАП
  item.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(event);
    }
  });
});

