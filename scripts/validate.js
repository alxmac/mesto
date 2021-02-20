import { validationSettings } from "../configs/index.js";

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const hideErrors = (formElement, inputErrorClass, errorClass) => {
  const inputErrorList = Array.from(
    formElement.querySelectorAll(`.${inputErrorClass}`)
  );
  const errorElementList = Array.from(
    formElement.querySelectorAll(`.${errorClass}`)
  );

  inputErrorList.forEach((inputError) =>
    inputError.classList.remove(inputErrorClass)
  );
  errorElementList.forEach((errorElement) =>
    errorElement.classList.remove(errorClass)
  );
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  openFormButtonSelector,
  inputErrorClass,
  errorClass,
  inactiveButtonClass
) => {
  // Все поля внутри формы
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // Все кнопки открытия попапа с формой
  const openFormButtonList = Array.from(
    document.querySelectorAll(openFormButtonSelector)
  );
  // Кнопка отправки формы
  const buttonElement = formElement.querySelector(submitButtonSelector);

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  formElement.addEventListener("reset", () => {
    hideErrors(formElement, inputErrorClass, errorClass);
  });

  openFormButtonList.forEach((openButtonElement) => {
    openButtonElement.addEventListener("click", () =>
      toggleButtonState(inputList, buttonElement, inactiveButtonClass)
    );
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);

      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({
  formSelector,
  inputSelector,
  openFormButtonSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass,
  inactiveButtonClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      openFormButtonSelector,
      inputErrorClass,
      errorClass,
      inactiveButtonClass
    );
  });
};

enableValidation(validationSettings);
