import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".form");
    this._submitButton = this._formElement.querySelector(
      ".form__submit-button"
    );
    this._initialValueSubmitButton = this._submitButton.value;
    this._handleFormSubmit = handleFormSubmit;

    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(".form__input");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  close() {
    super.close();

    this._formElement.reset();
    this._formElement.removeEventListener("submit", this._submitEvtHandler);
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.value = "Coхранение ...";
    } else {
      this._submitButton.value = this._initialValueSubmitButton;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", this._submitEvtHandler);
  }
}
