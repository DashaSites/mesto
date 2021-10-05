
export default class FormValidator {
  // Конструктор
    constructor(validationConfig, formElement) {
      // Настройки объекта конфиг
      this._inputSelector = validationConfig.inputSelector;
      this._submitButtonSelector = validationConfig.submitButtonSelector;
      this._disabledButtonClass = validationConfig.disabledButtonClass;
      this._inputErrorClass = validationConfig.inputErrorClass;
      this._errorClass = validationConfig.errorClass;

      // Параметр для проверяемого элемента формы:
      this._formElement = formElement;
      // Объявили переменную для кнопки сабмита в данной форме:
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
      // В переменную inputList сложили массив-коллекцию всех полей проверяемой формы:
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }


  // Функция "добавить сообщение об ошибке", если инпут невалиден
_showInputError = (inputElement, errorElement) => {
  // Добавляем класс со стилями ошибки для инпута
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(this._errorClass);
};

// Функция "спрятать сообщение об ошибке", если инпут валиден
_hideInputError = (inputElement, errorElement) => {
  // Убираем класс со стилями ошибки для инпута
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

// Функция проверки инпута на валидность:
_checkInputValidity = (inputElement) => {
  // Объявляем переменную, в которую кладем сообщение об ошибке:
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  // Если инпут невалиден, то покажем стиль ошибочного инпута и сообщение ошибки через вызов функции showInputError
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, errorElement);
    // А если инпут валиден, то не покажем = вызов функции hideInputError:
  } else {
    this._hideInputError(inputElement, errorElement);
  }
};

// Функция проверки: есть ли хотя бы один невалидный инпут?
_hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    // Методом some чекаем, можем ли мы хотя бы для одного инпута данной формы вернуть значение "невалидно":
    return !inputElement.validity.valid;
  });
};

// Функция проверки: а если все поля формы пустые?
_hasNotInputValues = (inputList) => {
  return inputList.every(inputElement => {
    return inputElement.value.length === 0;
  });
};

// Функция выключения кнопки сабмита:
_disableSubmitButton() {
  // Добавляем класс модификатора, дизейблящий кнопку
  this._buttonElement.classList.add(this._disabledButtonClass);
};

// Функция включения кнопки сабмита:
_enableSubmitButton() {
  // Удаляем класс модификатора, который дизейблил кнопку
  this._buttonElement.classList.remove(this._disabledButtonClass);
};

// Метод - переключатель состояния кнопки сабмита:
_toggleButtonState = () => {

  if (this._hasInvalidInput(this._inputList) || this._hasNotInputValues(this._inputList)) {
    this._disableSubmitButton();
  } else {
    this._enableSubmitButton();
  }
};

// Навешиваем обработчики событий на проверяемую форму:
_setEventListeners() {

  // Вешаем на эту форму слушатель сабмита:
  this._formElement.addEventListener('submit', (event) => {
    // Отменяем действие сабмита по умолчанию
    event.preventDefault();
    // При событии сабмита формы деактивируем кнопку сабмита
    this._toggleButtonState();
  });


  // К каждому из полей формы (все поля собраны в массив-коллекцию, которая лежит в конструкторе)
  // применим слушатель события инпута. При инпутах будет каждый раз
  // вызываться метод _checkInputValidity (этот метод объявлен выше),
  // а затем - переключатель состояния кнопки сабмита всей формы (он тоже объявлена выше)
  this._inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });

  this._toggleButtonState();
};

// Публичный метод, который вызывается в index.js у каждой формы и с которого начинается валидация:

enableValidation() {
  // Вызываем слушатели
  this._setEventListeners();
}

} // Конец класса FormValidator











// /////////// ВАРИАНТ, КОТОРЫЙ РАБОТАЛ ДО ООП //////////////////

/*
// Функция "добавить сообщение об ошибке", если инпут невалиден
const showInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  // Добавляем класс со стилями ошибки для инпута
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

// Функция "спрятать сообщение об ошибке", если инпут валиден
const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  // Убираем класс со стилями ошибки для инпута
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Функция проверки инпута на валидность:
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  // Объявляем переменную, в которую кладем сообщение об ошибке:
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // Если инпут невалиден, то покажем стиль ошибочного инпута и сообщение ошибки через вызов функции showInputError
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
    // А если инпут валиден, то не покажем = вызов функции hideInputError:
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
};

// Функция проверки: есть ли хотя бы один невалидный инпут?
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    // Методом some чекаем, можем ли мы хотя бы для одного инпута данной формы вернуть значение "невалидно":
    return !inputElement.validity.valid;
  });
};

// Функция проверки: а если все поля формы пустые?
const hasNotInputValues = (inputList) => {
  return inputList.every(inputElement => {
    return inputElement.value.length === 0;
  });
};

// Функция выключения кнопки сабмита:
const disableSubmitButton = (buttonElement, disabledButtonClass) => {
  // Добавляем класс модификатора, дизейблящий кнопку
  buttonElement.classList.add(disabledButtonClass);
};

// Функция включения кнопки сабмита:
const enableSubmitButton = (buttonElement, disabledButtonClass) => {
  // Удаляем класс модификатора, который дизейблил кнопку
  buttonElement.classList.remove(disabledButtonClass);
};

// Функция — переключатель состояния кнопки сабмита:
const toggleButtonState = (formElement, inputList, submitButtonSelector, disabledButtonClass) => {
  // Объявляем переменную для кнопки сабмита в данной форме:
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList) || hasNotInputValues(inputList)) {
    disableSubmitButton(buttonElement, disabledButtonClass);
  } else {
    enableSubmitButton(buttonElement, disabledButtonClass);
  }
};

// Функция навешивания всяких обработчиков событий
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, disabledButtonClass) => {

  // Слушатель сабмита формы:
  formElement.addEventListener('submit', (event) => {
    // Отменяем действие сабмита по умолчанию
    event.preventDefault();
    // При событии сабмита формы деактивируем кнопку сабмита
    toggleButtonState(formElement, inputList, submitButtonSelector, disabledButtonClass);
  });

  // Соберем в переменную inputList массив-коллекцию всех полей из формы (не из документа):
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // Переберем всю эту коллекцию методом forEach и к каждому из полей применим слушатель события инпута:
  // При каждом инпуте вызовем функцию checkInputValidity (эта функция объявлена выше),
  // и вызовем функцию — переключатель состояния кнопки сабмита всей формы (она тоже объявлена выше)
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, inputList, submitButtonSelector, disabledButtonClass);
    });
  });

  toggleButtonState(formElement, inputList, submitButtonSelector, disabledButtonClass);
};


// Первой создаем функцию валидации всех форм.
// В нее складываем все селекторы, которые будем вытаскивать из конфига (объект config c селекторами лежит в index.js)
// Ее мы вызываем в index.js после того, как объявили ее и все остальные функции здесь.
export const enableValidation = (config) => {
  // Объявляем переменную для коллекции всех форм на странице. Так наш валидатор будет работать на любых формах:
  const formList = document.querySelectorAll(config.formSelector);
  // Пройдемся по всей коллекции форм методом forEach, навесив на каждую форму коллекции слушатели событий = функцию setEventListeners.
  // А аргументами этой функции передадим все селекторы из конфига:
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
*/

