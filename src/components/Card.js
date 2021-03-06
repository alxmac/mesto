export class Card {
  constructor(
    { _id, likes, link, name },
    cardSelector,
    userId,
    isOwner,
    { addLike, removeLike, handleCardClick, handleCardDeleteClick }
  ) {
    this._cardSelector = cardSelector;
    this._cardId = _id;
    this._userId = userId;
    this._isOwner = isOwner;
    this._addLike = addLike;
    this._removeLike = removeLike;
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

  _removeTrashButton() {
    this._trashButton.remove();
    this._trashButton = null;
  }

  _renderLikes() {
    this._likesCount.textContent = this._likes.length;
    this._setLikedState();

    if (this._isLiked) {
      this._likeButton.classList.add("card__button_type_like-active");
    }
  }

  _setEventListeners() {
    this._isOwner &&
      this._trashButton.addEventListener("click", () => {
        this._handleCardDeleteClick(this._cardElement, this._cardId);
      });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._isLiked
        ? this._removeLike(this._cardId)
        : this._addLike(this._cardId);
    });
  }

  _setLikedState() {
    if (!this._likes.length) return (this._isLiked = false);

    return this._likes.some(({ _id }) =>
      _id === this._userId ? (this._isLiked = true) : (this._isLiked = false)
    );
  }

  toggleLikeButton() {
    this._likeButton.classList.toggle("card__button_type_like-active");
  }

  updateLikes(likes) {
    this._likes = likes;
    this._likesCount.textContent = this._likes.length;
    this._isLiked = !this._isLiked;
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(
      ".card__button_type_like"
    );
    this._likesCount = this._cardElement.querySelector(".card__likes-count");
    this._trashButton = this._cardElement.querySelector(
      ".card__button_type_trash"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    !this._isOwner && this._removeTrashButton();
    this._renderLikes();
    this._setEventListeners();

    return this._cardElement;
  }
}
