import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".form");
    this._handleSubmit = handleSubmit;

    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._handleSubmit(this._card, this._cardId);
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", this._submitEvtHandler);
  }
}
