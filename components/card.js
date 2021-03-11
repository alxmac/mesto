export class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;

    this._handleEscButton = this._handleEscButton.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _getPopupElements() {
    const previewPopup = document.querySelector(".popup_type_preview-image");
    const previewImage = previewPopup.querySelector(".preview-image__image");
    const imageCaption = previewPopup.querySelector(".preview-image__caption");

    return { previewPopup, previewImage, imageCaption };
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__button_type_trash")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".card__button_type_like")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", ({ target }) => {
        this._handlePreviewImage(target);
      });
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeButton() {
    this._element
      .querySelector(".card__button_type_like")
      .classList.toggle("card__button_type_like-active");
  }

  _handlePreviewImage(target) {
    const {
      previewPopup,
      previewImage,
      imageCaption,
    } = this._getPopupElements();

    this._openPreviewPopup();

    previewImage.alt = target.alt;
    previewImage.src = target.src;
    imageCaption.textContent = target.alt;

    document.addEventListener("keydown", this._handleEscButton);
  }

  _handleEscButton(evt) {
    if (evt.key === "Escape") {
      this._closePreviewPopup();
    }
  }

  _openPreviewPopup() {
    const { previewPopup } = this._getPopupElements();

    previewPopup.classList.add("popup_fade-in");
  }

  _closePreviewPopup() {
    const { previewPopup } = this._getPopupElements();

    previewPopup.classList.remove("popup_fade-in");
    previewPopup.classList.add("popup_fade-out");

    document.removeEventListener("keydown", this._handleEscButton);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const image = this._element.querySelector(".card__image");
    image.src = this._link;
    image.alt = this._name;

    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
