/*
class FormValidator {
    constructor() {

  }
}
*/

const showInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const hasNotInputValues = (inputList) => {
  return inputList.every(inputElement => {
    return inputElement.value.length === 0;
  });
};

const disableSubmitButton = (buttonElement, disabledButtonClass) => {
  buttonElement.classList.add(disabledButtonClass);
};

const enableSubmitButton = (buttonElement, disabledButtonClass) => {
  buttonElement.classList.remove(disabledButtonClass);
};

const toggleButtonState = (formElement, inputList, submitButtonSelector, disabledButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList) || hasNotInputValues(inputList)) {
    disableSubmitButton(buttonElement, disabledButtonClass);
  } else {
    enableSubmitButton(buttonElement, disabledButtonClass);
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, disabledButtonClass) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    // ПРИ САБМИТЕ ФОРМЫ ДЕАКТИВИРУЕМ КНОПКУ САБМИТА:
    toggleButtonState(formElement, inputList, submitButtonSelector, disabledButtonClass);
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, inputList, submitButtonSelector, disabledButtonClass);
    });
  });

  toggleButtonState(formElement, inputList, submitButtonSelector, disabledButtonClass);
};

// ФУНКЦИЯ ВАЛИДАЦИИ ВСЕХ ФОРМ

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(formElement => {
    setEventListeners(
      formElement,
      config.inputSelector,
      config.submitButtonSelector,
      config.inputErrorClass,
      config.errorClass,
      config.disabledButtonClass
    );
  });
};


