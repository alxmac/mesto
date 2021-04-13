import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popup.querySelector(".preview-image__caption");
    this._image = this._popup.querySelector(".preview-image__image");
  }

  open({ caption, link }) {
    super.open();

    this._image.src = link;
    this._image.alt = caption;
    this._caption.textContent = caption;
  }
}
