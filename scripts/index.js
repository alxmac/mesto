import { initialCards } from "../configs/index.js";

const cards = document.querySelector(".cards");

const userName = document.querySelector(".user__name");
const userDescription = document.querySelector(".user__description");

const addButton = document.querySelector(".user__button_type_add");
const editButton = document.querySelector(".user__button_type_edit");

const addPopup = document.querySelector(".popup_type_add-form");
const addSubmitButton = addPopup.querySelector(".form__submit-button");

const editPopup = document.querySelector(".popup_type_edit-form");
const userNameInput = editPopup.querySelectorAll(".form__item")[0];
const userDescriptionInput = editPopup.querySelectorAll(".form__item")[1];
const editSubmitButton = editPopup.querySelector(".form__submit-button");

const previewPopup = document.querySelector(".popup_type_preview-image");
const closeButtons = document.querySelectorAll(".close-button");

const openPopup = (popup) => popup.classList.add("popup_opened");

const openAddPopup = () => {
  openPopup(addPopup);

  userNameInput.value = userName.textContent;
  userDescriptionInput.value = userDescription.textContent;
};

const closePopup = (evt) => {
  const popupOpened = evt.target.closest(".popup_opened");

  popupOpened.classList.remove("popup_opened");
};

const handlePreviewImage = (evt) => {
  openPopup(previewPopup);

  const image = previewPopup.querySelector(".preview-image__image");
  const caption = previewPopup.querySelector(".preview-image__caption");

  image.alt = evt.target.alt;
  image.src = evt.target.src;
  caption.textContent = evt.target.alt;
};

const handleLikeButton = (evt) =>
  evt.target.classList.toggle("card__button_type_like-active");

const handleDeleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

const getCardElement = (name, link) => {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;

  const image = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__button_type_like");
  const trashButton = cardElement.querySelector(".card__button_type_trash");

  image.src = link;
  image.alt = name;

  image.addEventListener("click", (evt) => handlePreviewImage(evt));
  likeButton.addEventListener("click", (evt) => handleLikeButton(evt));
  trashButton.addEventListener("click", (evt) => handleDeleteCard(evt));

  return cardElement;
};

const handleAddSubmit = (evt) => {
  evt.preventDefault();

  const nameInput = addPopup.querySelectorAll(".form__item")[0];
  const linkInput = addPopup.querySelectorAll(".form__item")[1];

  const newCard = getCardElement(nameInput.value, linkInput.value);
  cards.prepend(newCard);

  closePopup(evt);

  nameInput.value = "";
  linkInput.value = "";
};

const handleEditSubmit = (evt) => {
  evt.preventDefault();

  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;

  closePopup(evt);
};

const renderInitialCards = (arr) => {
  const сardsArray = arr.map(({ name, link }) => getCardElement(name, link));

  cards.append(...сardsArray);
};

renderInitialCards(initialCards);

addButton.addEventListener("click", openAddPopup);
editButton.addEventListener("click", () => openPopup(editPopup));

addSubmitButton.addEventListener("click", (evt) => handleAddSubmit(evt));
editSubmitButton.addEventListener("click", (evt) => handleEditSubmit(evt));

closeButtons.forEach((button) =>
  button.addEventListener("click", (evt) => {
    closePopup(evt);
  })
);
