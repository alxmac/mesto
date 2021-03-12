import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards, validationSettings } from "../utils/constants.js";

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

const previewImage = previewPopup.querySelector(".preview-image__image");
const previewImageCaption = previewPopup.querySelector(
  ".preview-image__caption"
);

const formList = Array.from(document.querySelectorAll(".form"));
const addForm = addPopup.querySelector(".form");
const editForm = editPopup.querySelector(".form");

const createCard = (data) => {
  const card = new Card(data, "#card", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
};

const renderInitialCards = (arr) => {
  arr.map((data) => {
    const cardElement = createCard(data);

    cards.append(cardElement);
  });
};

const openPopup = (popup) => {
  popup.classList.add("popup_fade-in");

  document.addEventListener("keydown", handleEscButton);
};

const openAddForm = () => {
  openPopup(addPopup);
  addForm.reset();
};

const openEditForm = () => {
  openPopup(editPopup);
  editForm.reset();

  userNameInput.value = userName.textContent;
  userDescriptionInput.value = userDescription.textContent;
};

const closePopup = () => {
  const popupOpened = document.querySelector(".popup_fade-in");

  popupOpened.classList.remove("popup_fade-in");
  popupOpened.classList.add("popup_fade-out");

  document.removeEventListener("keydown", handleEscButton);
};

const handleEscButton = (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
};

const handleAddSubmit = () => {
  const cardElement = createCard({
    name: nameInput.value,
    link: linkInput.value,
  });

  cards.prepend(cardElement);
  closePopup();
};

const handleEditSubmit = () => {
  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;

  closePopup();
};

const handleCardClick = (name, link) => {
  openPopup(previewPopup);

  previewImage.src = link;
  previewImageCaption.textContent = name;
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

formList.forEach((formElement) => {
  const validator = new FormValidator(validationSettings, formElement);

  validator.enableValidation();
});

renderInitialCards(initialCards);
