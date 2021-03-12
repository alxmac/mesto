export class FormValidator {
  constructor(validationSettings, formElement) {
    this._settings = validationSettings;
    this._formElement = formElement;
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorMessage, errorElement) {
    const { inputErrorClass, errorClass } = this._settings;

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(inputElement, errorElement) {
    const { inputErrorClass, errorClass } = this._settings;

    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
  }

  _isValid(inputElement) {
    const errorElement = this._getErrorElement(inputElement);

    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        errorElement
      );
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _hideErrors() {
    const { inputErrorClass, errorClass } = this._settings;

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

  _toggleButtonState() {
    const { inactiveButtonClass } = this._settings;

    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const { inputSelector, submitButtonSelector } = this._settings;
    // Кнопка открытия попапа с формой
    const openFormButton = document.querySelector(
      `.user__button_type_${this._formElement.id}`
    );

    // Все поля внутри формы
    this._inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );
    // Кнопка отправки формы
    this._submitButton = this._formElement.querySelector(submitButtonSelector);

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._formElement.addEventListener("reset", () => {
      this._hideErrors();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });

    openFormButton.addEventListener("click", () => this._toggleButtonState());
  }

  enableValidation() {
    this._setEventListeners();
  }
}
