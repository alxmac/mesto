export class FormValidator {
  constructor(validationSettings, formElement) {
    this._settings = validationSettings;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(inputElement, inputErrorClass, errorClass) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
  }

  _isValid(inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        inputErrorClass,
        errorClass
      );
    } else {
      this._hideInputError(inputElement, inputErrorClass, errorClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _hideErrors(inputErrorClass, errorClass) {
    const inputErrorList = Array.from(
      this._formElement.querySelectorAll(`.${inputErrorClass}`)
    );
    const errorElementList = Array.from(
      this._formElement.querySelectorAll(`.${errorClass}`)
    );

    inputErrorList.forEach((inputError) =>
      inputError.classList.remove(inputErrorClass)
    );
    errorElementList.forEach((errorElement) =>
      errorElement.classList.remove(errorClass)
    );
  }

  _toggleButtonState(inputList, submitButton, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(inactiveButtonClass);
    } else {
      submitButton.classList.remove(inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const {
      inputSelector,
      submitButtonSelector,
      inputErrorClass,
      errorClass,
      inactiveButtonClass,
    } = this._settings;

    // Все поля внутри формы
    const inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );
    // Кнопка открытия попапа с формой
    const openFormButton = document.querySelector(
      `.user__button_type_${this._formElement.id}`
    );
    // Кнопка отправки формы
    const submitButton = this._formElement.querySelector(submitButtonSelector);

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._formElement.addEventListener("reset", () => {
      this._hideErrors(inputErrorClass, errorClass);
    });

    openFormButton.addEventListener("click", () =>
      this._toggleButtonState(inputList, submitButton, inactiveButtonClass)
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement, inputErrorClass, errorClass);

        this._toggleButtonState(inputList, submitButton, inactiveButtonClass);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
