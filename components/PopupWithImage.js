import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ caption, link }) {
    super.open();

    const previewImage = this._popup.querySelector(".preview-image__image");
    const previewImageCaption = this._popup.querySelector(
      ".preview-image__caption"
    );

    previewImage.src = link;
    previewImageCaption.textContent = caption;
  }
}
