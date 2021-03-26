import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor({ link, caption }, popupSelector) {
    super(popupSelector);
    this._link = link;
    this._caption = caption;
  }

  open() {
    super.open();

    const previewImage = super._popup.querySelector(".preview-image__image");
    const previewImageCaption = super._popup.querySelector(
      ".preview-image__caption"
    );

    previewImage.src = this._link;
    previewImageCaption.textContent = this._caption;
  }
}
