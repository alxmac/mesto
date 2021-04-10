export class Card {
  constructor(
    { _id, likes, link, name },
    cardSelector,
    handleCardClick,
    handleCardDeleteClick
  ) {
    this._cardId = _id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._likes = likes;
    this._link = link;
    this._name = name;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__button_type_trash")
      .addEventListener("click", () => {
        this._handleCardDeleteClick(this._cardElement, this._cardId);
      });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__button_type_like-active");
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(
      ".card__button_type_like"
    );
    this._likesCount = this._cardElement.querySelector(".card__likes-count");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._likesCount.textContent = this._likes.length;

    this._setEventListeners();

    return this._cardElement;
  }
}
