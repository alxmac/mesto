export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  close() {
    this._popup.classList.remove("popup_fade-in");
    this._popup.classList.add("popup_fade-out");

    document.removeEventListener("keydown", this._handleEscClose);
  }

  open() {
    this._popup.classList.add("popup_fade-in");

    document.addEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("close-button")
      ) {
        this.close();
      }
    });
  }
}
