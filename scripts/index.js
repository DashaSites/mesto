/* А закрытие попапа — оно одно, и не зависит от карточки или чего-то еще.
Навешиваем на крестик обработчик клика, в котором
делаем event.target.closest('.popup').classList.remove('popup_opened'); (edited) */





const openPopupEditProfileButton = document.querySelector('.profile__edit-button'); //КНОПКА ОТКРЫТИЯ ПОПАПА-1
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //КОНСТАНТА ДЛЯ ПОПАПА-1 (РЕДАКТИРОВАНИЕ ПРОФИЛЯ):

const userName = document.querySelector('.profile__name');
const userOccupation = document.querySelector('.profile__occupation');
const nameInput = popupEditProfile.querySelector('.popup__form-input-item_type_name');
const jobInput = popupEditProfile.querySelector('.popup__form-input-item_type_occupation');

const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formSubmitEditProfileButton = popupEditProfile.querySelector('.popup__submit-button');

function openPopupEditProfile() {
  if (!popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userOccupation.textContent;
  }

  openPopup(popupEditProfile);
}

function formSubmitHandler(event) {
  event.preventDefault();
}

openPopupEditProfileButton.addEventListener('click', openPopupEditProfile); //ОТКРЫТИЕ ПОПАПА

// closePopupEditProfileButton.addEventListener('click', togglePopupEditProfile); //ЗАКРЫТИЕ ПОПАПА

formEditProfile.addEventListener(
  'submit',
  function formSubmitHandler(event) {
    event.preventDefault();
    popupEditProfile.classList.toggle('popup_opened');
    userName.textContent = nameInput.value;
    userOccupation.textContent = jobInput.value;
  }
);

//////////////////// 5 СПРИНТ //////////////////////

//////// МАССИВ ИЗ 6 ФОТОГРАФИЙ ////////

const initialCards = [ // МАССИВ

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

// ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ КАРТОЧЕК
const removeElementHandler = (event) => {
  event.target.closest('.element').remove();
};




// ПОПАП-3






const addElement = (data) => { // ФУНКЦИЯ ДЛЯ ВЫКЛАДЫВАНИЯ ФОТКИ ИЗ МАССИВА НА САЙТ ЧЕРЕЗ ШАБЛОН
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = data.image;
  cardElement.querySelector('.element__image').alt = 'Фотография на карточке';
  cardElement.querySelector('.element__caption').textContent = data.caption;
  cardElement.querySelector('.element__like-button').addEventListener('click', likeButtonHandler);
  cardElement.querySelector('.element__button-remove').addEventListener('click', removeElementHandler);
  cardElement.querySelector('.element__image').addEventListener('click', openImagePopup); // ПРИВЯЗАЛИ К КАРТИНКЕ НА КАРТОЧКЕ СЛУШАТЕЛЬ КЛИКОВ ПО ЭТОЙ КАРТИНКЕ

  cardsElement.prepend(cardElement);
};

const popup = document.querySelector('.popup'); // КОНСТАНТА ДЛЯ ОБЩЕГО ПОПАПА

const closePopupButtons = document.querySelectorAll('.popup__close-button');

closePopupButtons.forEach((item) => {
  item.addEventListener('click', closePopup);
});

function closePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
};


// ФУНКЦИЯ ОТКРЫТИЯ ОБЩЕГО ПОПАПА
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА-3 ПО КЛИКУ НА КАРТИНКУ

function openImagePopup(event) {
  const imagePopup = document.querySelector('.popup_type_large-image'); // КОНСТАНТА ДЛЯ ПОПАПА-3
  const imagePopupElement = imagePopup.querySelector('.popup__image'); // КАРТИНКА В ПОПАПЕ-3
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



initialCards.forEach((element) => { // ДЛЯ МАССИВА ВЫЗЫВАЕМ ФУНКЦИЮ, ЧТОБЫ ПРОЙТИСЬ ПО ВСЕМУ МАССИМУ И ВЫЛОЖИТЬ ВСЕ ЕГО ФОТКИ НА САЙТ. АРГУМЕНТ ФУНКЦИИ СЕМАНТИЧНО ОБОЗНАЧАЕМ КАК ЭЛЕМЕНТ ЭТОГО МАССИВА.
  addElement(element);
});


//////// ПОПАП-2: ОТКРЫТИЕ-ЗАКРЫТИЕ ФОРМЫ + ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ////////

const openPopupAddCardButton = document.querySelector('.profile__add-button'); //ОТКРЫТИЕ ПОПАПА   - КОНСТАНТА ДЛЯ КНОПКИ ОТКРЫТИЯ ПОПАПА-2 (ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ)

const popupAddCard = document.querySelector('.popup_type_add-card'); // КОНСТАНТА ДЛЯ ПОПАПА-2
// const closePopupAddCardButton = popupAddCard.querySelector('.popup__close-button'); //ЗАКРЫТИЕ ПОПАПА - КНОПКА ДЛЯ ЗАКРЫТИЯ ПОПАПА-2

const elementCaption = document.querySelector('.element__caption');
const elementImage = document.querySelector('.element__image');
const titleInput = popupAddCard.querySelector('.popup__form-input-item_type_title'); // !!! ПОЛЕ ВВОДА "НАЗВАНИЕ"
const imageLinkInput = popupAddCard.querySelector('.popup__form-input-item_type_image-link'); // !!! ПОЛЕ ВВОДА "ССЫЛКА НА КАРТИНКУ"

const formAddCard = popupAddCard.querySelector('.popup__form'); //ФОРМА В ПОПАПЕ-2
const formSubmitAddCardButton = popupAddCard.querySelector('.popup__submit-button'); //КНОПКА "СОЗДАТЬ" В ПОПАПЕ-2

function openPopupAddCard() { // ФУНКЦИЯ ВКЛЮЧЕНИЯ ПОПАПА-2
  openPopup(popupAddCard);
}

openPopupAddCardButton.addEventListener('click', openPopupAddCard); //ОТКРЫТИЕ ПОПАПА - СОБЫТИЕ ДЛЯ ОТКРЫТИЯ ПОПАПА-2 ПО КЛИКУ ПО КНОПКЕ

// closePopupAddCardButton.addEventListener('click', togglePopupAddCard); //ЗАКРЫТИЕ ПОПАПА - СОБЫТИЕ ДЛЯ ЗАКРЫТИЯ ПОПАПА-2 ПО КЛИКУ ПО КНОПКЕ


//////// ДОБАВЛЕНИЕ И СОХРАНЕНИЕ НОВОЙ КАРТОЧКИ /////////
const cardCaption = formAddCard.querySelector('.popup__form-input-item_type_title');
const cardImage = formAddCard.querySelector('.popup__form-input-item_type_image-link');
const cardElement = elementTemplate.querySelector('.element').cloneNode(true);


// ФУНКЦИЯ СОХРАНЕНИЯ КАРТОЧКИ ИЗ ПОПАПА
const addingElementHandler = (event) => {
  event.preventDefault(); //ОТМЕНЯЕМ ОТПРАВКУ ДАННЫХ НА СЕРВЕР

  addElement({ //ВСТАВЛЯЕМ НА САЙТ ФОТКУ И ПОДПИСЬ ИЗ ФОРМЫ
    image: cardImage.value,
    caption: cardCaption.value
    });

    formAddCard.reset(); //СБРАСЫВАЕМ ПОЛЯ ФОРМЫ

  popupAddCard.classList.remove('popup_opened'); //СРАЗУ ПОСЛЕ ЭТОГО ПРИКРЫВАЕМ ПОПАП
};

formAddCard.addEventListener('submit', addingElementHandler); //ВЫЗОВ ОПИСАННОЙ ВЫШЕ ФУНКЦИИ


/////////// ПОПАП-3 С БОЛЬШОЙ КАРТИНКОЙ ///////////////

// НИЖЕ ТО, ЧТО РАБОТАЕТ ТОЛЬКО С ПЕРВОЙ КАРТОЧКОЙ

/*const imagePopup = document.querySelector('.popup_type_large-image'); // КОНСТАНТА ДЛЯ ПОПАПА-3
const imagePopupElement = imagePopup.querySelector('.popup__image'); // КАРТИНКА В ПОПАПЕ-3
const captionPopupElement = imagePopup.querySelector('.popup__caption'); // ПОДПИСЬ В ПОПАПЕ-3
const closeImagePopupButton = imagePopup.querySelector('.popup__close-button'); // КНОПКА ЗАКРЫТИЯ ПОПАПА-3


const removeImagePopupHandler = (event) => {
  event.target.closest('.popup_type_large-image').remove();
};

closeImagePopupButton.addEventListener('click', removeImagePopupHandler);

const openImagePopup = (imagePopup) => { // ФУНКЦИЯ-ПЕРЕКЛЮЧАТЕЛЬ ПОПАПА-3 (ОТКРЫТИЕ/ЗАКРЫТИЕ)
  imagePopup.classList.add('popup_opened');
};

elementImage.addEventListener('click', (event) => {
  imagePopupElement.src = event.target.src;
  captionPopupElement.textContent = event.target
  .closest('.element')
  .querySelector('.element__caption')
  .textContent;

  openImagePopup (imagePopup);
});*/

/*imagePopup.addEventListener('click', () => { // А ЭТО, КАЖЕТСЯ, ВООБЩЕ НЕ НУЖНО!
  openImagePopup (imagePopup);
});*/

/*/// НИЖЕ - ЭКСМЕРИМЕНТ, ЧТОБЫ ОТКРЫВАЛИСЬ ВСЕ КАРТОЧКИ /////// // НЕ СРАБОТАВШИЙ

const imagePopup = document.querySelector('.popup_type_large-image'); // КОНСТАНТА ДЛЯ ПОПАПА-3
const imagePopupElement = imagePopup.querySelector('.popup__image'); // КАРТИНКА В ПОПАПЕ-3
const captionPopupElement = imagePopup.querySelector('.popup__caption'); // ПОДПИСЬ В ПОПАПЕ-3
const closeImagePopupButton = imagePopup.querySelector('.popup__close-button'); // КНОПКА ЗАКРЫТИЯ ПОПАПА-3

const openImagePopup = (imagePopup) => {
  imagePopup.classList.add('popup_opened');
  item.src = imagePopupElement.src; // item = elementImage
  elementCaption.textContent = captionPopupElement.textContent;
  openImagePopup();
};

const elementImages = document.querySelectorAll('.element__image');
elementImages.forEach((item) => { // item = elementImage
  item.addEventListener('click', openImagePopup); // item = elementImage
});

*/

/// ВЫШЕ - ЭКСМЕРИМЕНТ, ЧТОБЫ ОТКРЫВАЛИСЬ ВСЕ КАРТОЧКИ



////////// TESTING




/*imagePopup.addEventListener('click', () => {
  if (!imagePopup.classList.contains('popup_opened')) {
    toggleImagePopup (imagePopup);
  }
});*/


/*
// const imagePopupElement = imagePopup.querySelector('.popup__image');
const captionPopupElement = imagePopup.querySelector('.popup__caption');

const togglePopup = (popup) => { // ФУНКЦИЯ, К КОТОРОЙ ПРИВОДИТ ОБРАБОТЧИК СОБЫТИЯ КЛИКА НА ПОПАП (КОТОРЫЙ НИЖЕ)
  popup.classList.toggle('.popup_opened');
};

imagePopup.addEventListener('click', () => { // ОБРАБОТЧИК СОБЫТИЯ КЛИКА НА КАРТИНКУ ПОПАПА (ОТСЫЛАЕТ К ФУНКЦИИ ВЫШЕ)
  togglePopup(imagePopup);
});*/


// КОНСТАНТА ДЛЯ КАРТИНКИ В КАРТОЧКЕ НА САЙТЕ
/*const cardElementImage = document.querySelector('.element__image');
const imagePopupElement = imagePopup.querySelector('.popup__image');

// ФУНКЦИЯ: ЧТО ПРОИСХОДИТ ПРИ КЛИКЕ НА КАРТИНКУ В КАРТОЧКЕ
cardElementImage.addEventListener('click', (event) => {
  imagePopupElement.src = event.target.src;
  captionPopupElement.textContent = event.target
    .closest('.element')
    .querySelector('.element__caption')
    .textContent;

  togglePopup(imagePopup);
});*/

