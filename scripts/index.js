const openPopupEditProfileButton = document.querySelector('.profile__edit-button'); //КНОПКА ОТКРЫТИЯ ПОПАПА-1
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //КОНСТАНТА ДЛЯ ПОПАПА-1 (РЕДАКТИРОВАНИЕ ПРОФИЛЯ): popupEditProfile = popup
const closePopupEditProfileButton = popupEditProfile.querySelector('.popup__close-button');//КНОПКА ЗАКРЫТИЯ ПОПАПА

const userName = document.querySelector('.profile__name');
const userOccupation = document.querySelector('.profile__occupation');
const nameInput = popupEditProfile.querySelector('.popup__form-input-item_type_name');
const jobInput = popupEditProfile.querySelector('.popup__form-input-item_type_occupation');

const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formSubmitEditProfileButton = popupEditProfile.querySelector('.popup__submit-button');

function togglePopupEditProfile() {
  if (!popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userOccupation.textContent;
  }

  popupEditProfile.classList.toggle('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
}

openPopupEditProfileButton.addEventListener('click', togglePopupEditProfile); //ОТКРЫТИЕ ПОПАПА

closePopupEditProfileButton.addEventListener('click', togglePopupEditProfile); //ЗАКРЫТИЕ ПОПАПА

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

// ПЕРЕМЕННЫЕ ДЛЯ КЕПШЕНА ФОТОГРАФИИ И ЛАЙКА-СЕРДЕЧКА - СКОРЕЕ ВСЕГО ЗДЕСЬ НЕ НУЖНЫ
//const elementLikeButton = document.querySelector('.element__like-button'); // ОН НАЙДЕТ BACKGROUND-IMAGE С СЕРДЕЧКОМ ЧЕРЕЗ ПОИСК ПО QUERYSELECTOR?
//const elementLikeButton = document.querySelector('.element__like-button[style*="background: url(../../../images/button-heart.svg) center no-repeat;"]'); // ИЛИ BACKGROUND-IMAGE С СЕРДЕЧКОМ НАДО ИСКАТЬ ВОТ ТАК?


// ПЕРЕМЕННЫЕ ДЛЯ КАРТОЧКИ С ФОТОГРАФИЕЙ
 //const cardImage = document.querySelector('.element__image'); // ПЕРЕМЕННАЯ ФОТОГРАФИИ
 //const cardCaption = document.querySelector('.element__caption'); // ПЕРЕМЕННАЯ ПОДПИСИ К ФОТО


//////// МАССИВ ИЗ 6 ФОТОГРАФИЙ ////////

const initialCards = [ // МАССИВ С 6 КАРТОЧКАМИ

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

const cardsElement = document.querySelector('.elements'); // ИНИЦИАЛИЗИРУЕМ КОНТЕЙНЕР ДЛЯ ЗАПИХИВАНИЯ В НЕГО МАССИВА ФОТОГРАФИЙ
const elementTemplate = document.querySelector('#card-template').content;

// ФУНКЦИИ

//////// АКТИВИЗИРУЕМ ЛАЙКИ НА КАРТОЧКАХ ////////

const elementLikeButton = document.querySelector('.element__like-button');

// ФУНКЦИЯ ДЛЯ ЛАЙКАНЬЯ КАРТИНОК - не работает
function toggleLikeButton() {
  elementLikeButton.classList.toggle('element__like-button_active');
}

const removeElementHandler = (event) => {
  event.target.closest('.element').remove();
};

const addElement = (data) => { // ОБЪЯВЛЯЕМ ФУНКЦИЮ ДЛЯ ВЫКЛАДЫВАНИЯ ФОТКИ (ИЗ МАССИВА) НА САЙТ.
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = data.image;
  cardElement.querySelector('.element__image').alt = 'Фотография';
  cardElement.querySelector('.element__caption').textContent = data.caption;
  cardElement.querySelector('.element__like-button').addEventListener('click', toggleLikeButton);
  cardElement.querySelector('.element__button-remove').addEventListener('click', removeElementHandler);
 // КНОПКА ДЛЯ УДАЛЕНИЯ КАРТОЧКИ (ЭТА КНОПКА ПОКА НЕ СОЗДАНА).

  cardsElement.prepend(cardElement);
};


initialCards.forEach((element) => { // ДЛЯ МАССИВА ВЫЗЫВАЕМ ФУНКЦИЮ, ЧТОБЫ ПРОЙТИСЬ ПО ВСЕМУ МАССИМУ И ВЫЛОЖИТЬ ВСЕ ЕГО ФОТКИ НА САЙТ. АРГУМЕНТ ФУНКЦИИ СЕМАНТИЧНО ОБОЗНАЧАЕМ КАК ЭЛЕМЕНТ ЭТОГО МАССИВА.
  addElement(element);
});


//////// ПОПАП-2: ОТКРЫТИЕ-ЗАКРЫТИЕ ФОРМЫ + ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ////////

const openPopupAddCardButton = document.querySelector('.profile__add-button'); //ОТКРЫТИЕ ПОПАПА   - КОНСТАНТА ДЛЯ КНОПКИ ОТКРЫТИЯ ПОПАПА-2 (ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ)
const popupAddCard = document.querySelector('.popup_type_add-card'); // КОНСТАНТА ДЛЯ ПОПАПА-2
const closePopupAddCardButton = popupAddCard.querySelector('.popup__close-button'); //ЗАКРЫТИЕ ПОПАПА - КНОПКА ДЛЯ ЗАКРЫТИЯ ПОПАПА-2

const elementCaption = document.querySelector('.element__caption');
const elementImage = document.querySelector('.element__image');
const titleInput = popupAddCard.querySelector('.popup__form-input-item_type_title'); // !!! ПОЛЕ ВВОДА "НАЗВАНИЕ"
const imageLinkInput = popupAddCard.querySelector('.popup__form-input-item_type_image-link'); // !!! ПОЛЕ ВВОДА "ССЫЛКА НА КАРТИНКУ"

const formAddCard = popupAddCard.querySelector('.popup__form'); //ФОРМА В ПОПАПЕ-2
const formSubmitAddCardButton = popupAddCard.querySelector('.popup__submit-button'); //КНОПКА "СОЗДАТЬ" В ПОПАПЕ-2

function togglePopupAddCard() { // ФУНКЦИЯ ВКЛЮЧЕНИЯ-ВЫКЛЮЧЕНИЯ ПОПАПА-2
  popupAddCard.classList.toggle('popup_opened');
}

openPopupAddCardButton.addEventListener('click', togglePopupAddCard); //ОТКРЫТИЕ ПОПАПА - СОБЫТИЕ ДЛЯ ОТКРЫТИЯ ПОПАПА-2 ПО КЛИКУ ПО КНОПКЕ

closePopupAddCardButton.addEventListener('click', togglePopupAddCard); //ЗАКРЫТИЕ ПОПАПА - СОБЫТИЕ ДЛЯ ЗАКРЫТИЯ ПОПАПА-2 ПО КЛИКУ ПО КНОПКЕ


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

  popupAddCard.classList.toggle('popup_opened'); //СРАЗУ ПОСЛЕ ЭТОГО ПРИКРЫВАЕМ ПОПАП
};

formAddCard.addEventListener('submit', addingElementHandler); //ВЫЗОВ ОПИСАННОЙ ВЫШЕ ФУНКЦИИ





/* /////// АКТИВИЗИРУЕМ ЛАЙКИ НА КАРТОЧКАХ ////////

//const elementLikeButton = document.querySelector('.element__like-button');

// ФУНКЦИЯ ДЛЯ ЛАЙКАНЬЯ КАРТИНОК
function toggleLikeButton() {
  elementLikeButton.classList.toggle('element__like-button_active');
}

// ОБРАБОТЧИК (= ВЫЗОВ) ФУНКЦИИ ДЛЯ ЛАЙКАНЬЯ КАРТИНОК
//elementLikeButton.addEventListener('click', toggleLikeButton);

*/






