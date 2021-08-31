let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = popup.querySelector('.popup__close-button');

let userName = document.querySelector('.profile__name');
let userOccupation = document.querySelector('.profile__occupation');
let nameInput = popup.querySelector('.popup__form-input-item_type_name');
let jobInput = popup.querySelector('.popup__form-input-item_type_occupation');

let form = popup.querySelector('.popup__form');
let formSubmitButton = popup.querySelector('.popup__submit-button');

function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userOccupation.textContent;
  }

  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
}

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup);

form.addEventListener(
  'submit',
  function formSubmitHandler (event) {
    event.preventDefault();
    popup.classList.toggle('popup_opened');
    userName.textContent = nameInput.value;
    userOccupation.textContent = jobInput.value;
  }
);

//////////////////// 5 СПРИНТ //////////////////////

// ПЕРЕМЕННЫЕ ДЛЯ КЕПШЕНА ФОТОГРАФИИ И ЛАЙКА-СЕРДЕЧКА - СКОРЕЕ ВСЕГО ЗДЕСЬ НЕ НУЖНЫ
//const elementCaption = document.querySelector('.element__caption').textContent;
//const elementLikeButton = document.querySelector('.element__like-button'); // ОН НАЙДЕТ BACKGROUND-IMAGE С СЕРДЕЧКОМ ЧЕРЕЗ ПОИСК ПО QUERYSELECTOR?
//const elementLikeButton = document.querySelector('.element__like-button[style*="background: url(../../../images/button-heart.svg) center no-repeat;"]'); // ИЛИ BACKGROUND-IMAGE С СЕРДЕЧКОМ НАДО ИСКАТЬ ВОТ ТАК?


// ПЕРЕМЕННЫЕ ДЛЯ КАРТОЧКИ С ФОТОГРАФИЕЙ И САМОЙ ФОТОГРАФИИ
 const cardImage = document.querySelector('.element__image'); // ПЕРЕМЕННАЯ ФОТОГРАФИИ


// МАССИВ ИЗ 6 ФОТОГРАФИЙ

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

//ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ КАРТОЧКИ
/*const removeElementHandler = (event) => {
  event.target.closest('.element').remove();
}; */


const addElement = (data) => { // ОБЪЯВЛЯЕМ ФУНКЦИЮ ДЛЯ ВЫКЛАДЫВАНИЯ ФОТКИ (ИЗ МАССИВА) НА САЙТ.
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = data.image;
  cardElement.querySelector('.element__image').alt = 'Фотография';
  cardElement.querySelector('.element__caption').textContent = data.caption;
  cardElement.querySelector('.element__like-button').src = data.elementLikeButton;
  //cardElement.querySelector('.element__button-remove').addEventListener('click', removeElementHandler);
 // КНОПКА ДЛЯ УДАЛЕНИЯ КАРТОЧКИ (ЭТА КНОПКА ПОКА НЕ СОЗДАНА).

  cardsElement.prepend(cardElement);
};

/*const addingElementHandler = (event) => { ЭТО СКОРЕЕ ВСЕГО НЕ НУЖНО
  event.preventDefault();

  addElement({
    image: cardImage,
    caption: elementCaption,
    likeButton: elementLikeButton
  });
} */

initialCards.forEach((element) => { // ДЛЯ МАССИВА ВЫЗЫВАЕМ ФУНКЦИЮ, ЧТОБЫ ПРОЙТИСЬ ПО ВСЕМУ МАССИМУ И ВЫЛОЖИТЬ ВСЕ ЕГО ФОТКИ НА САЙТ. АРГУМЕНТ ФУНКЦИИ СЕМАНТИЧНО ОБОЗНАЧАЕМ КАК ЭЛЕМЕНТ ЭТОГО МАССИВА.
  addElement(element);
});
