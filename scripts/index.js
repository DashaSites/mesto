let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');

let userName = document.querySelector('.profile__name');
let userOccupation = document.querySelector('.profile__occupation');
let nameInput = document.querySelector('.popup__form-name');
let jobInput = document.querySelector('.popup__form-occupation');

let form = document.querySelector('.popup__form');
let formSubmitButton = document.querySelector('.popup__submit-button');

function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userOccupation.textContent;
  }

  popup.classList.toggle('popup_opened');
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

