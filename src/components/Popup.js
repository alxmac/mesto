export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    this._handleClose = this._handleClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleClose(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("close-button")
    ) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _removeEventListeners() {
    this._popup.removeEventListener("click", this._handleClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_fade-in");
    this._popup.classList.add("popup_fade-out");
    this._removeEventListeners();
  }

  open() {
    this._popup.classList.add("popup_fade-in");
    this._popup.classList.remove("popup_fade-out");
    this.setEventListeners();
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleClose);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
