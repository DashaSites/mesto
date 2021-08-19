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

