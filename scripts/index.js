import { initialCards } from "../configs/index.js";

const innerLayout = document.querySelector(".inner-layout");
const cards = document.querySelector(".cards");

const userName = document.querySelector(".user__name");
const userDescription = document.querySelector(".user__description");
const addButton = document.querySelector(".user__button_type_add");
const editButton = document.querySelector(".user__button_type_edit");

const addPopup = document.querySelector(".popup_type_add-form");
const editPopup = document.querySelector(".popup_type_edit-form");
const previewPopup = document.querySelector(".popup_type_preview-image");

const addSubmitButton = addPopup.querySelector(".form__submit-button");
const nameInput = addPopup.querySelector(".form__input_el_place-name");
const linkInput = addPopup.querySelector(".form__input_el_link");

const editSubmitButton = editPopup.querySelector(".form__submit-button");
const userNameInput = editPopup.querySelector(".form__input_el_user-name");
const userDescriptionInput = editPopup.querySelector(
  ".form__input_el_description"
);

const image = previewPopup.querySelector(".preview-image__image");
const caption = previewPopup.querySelector(".preview-image__caption");

const handleEscButton = (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
};

const openPopup = (popup) => {
  popup.classList.add("popup_fade-in");

  document.addEventListener("keydown", handleEscButton);
};

const openAddForm = () => {
  openPopup(addPopup);
  addPopup.querySelector(".form").reset();
};

const openEditForm = () => {
  openPopup(editPopup);
  editPopup.querySelector(".form").reset();

  userNameInput.value = userName.textContent;
  userDescriptionInput.value = userDescription.textContent;
};

const closePopup = () => {
  const popupOpened = document.querySelector(".popup_fade-in");

  popupOpened.classList.remove("popup_fade-in");
  popupOpened.classList.add("popup_fade-out");

  document.removeEventListener("keydown", handleEscButton);
};

const handleAddSubmit = () => {
  const newCard = getCardElement(nameInput.value, linkInput.value);
  cards.prepend(newCard);

  closePopup();
};

const handleEditSubmit = () => {
  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;

  closePopup();
};

const handlePreviewImage = (target) => {
  openPopup(previewPopup);

  image.alt = target.alt;
  image.src = target.src;
  caption.textContent = target.alt;
};

const handleLikeButton = (target) =>
  target.classList.toggle("card__button_type_like-active");

const handleDeleteCard = (target) => target.closest(".card").remove();

const getCardElement = (name, link) => {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const image = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = name;
  image.src = link;
  image.alt = name;

  return cardElement;
};

const renderInitialCards = (arr) => {
  const сardsArray = arr.map(({ name, link }) => getCardElement(name, link));

  cards.append(...сardsArray);
};

addButton.addEventListener("click", openAddForm);
editButton.addEventListener("click", openEditForm);

addSubmitButton.addEventListener("click", handleAddSubmit);
editSubmitButton.addEventListener("click", handleEditSubmit);

innerLayout.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("close-button")
  ) {
    closePopup();
  }
});

cards.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    handlePreviewImage(evt.target);
  }

  if (evt.target.classList.contains("card__button_type_like")) {
    handleLikeButton(evt.target);
  }

  if (evt.target.classList.contains("card__button_type_trash")) {
    handleDeleteCard(evt.target);
  }
});

renderInitialCards(initialCards);
