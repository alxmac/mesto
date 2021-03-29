import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import {
  formList,
  initialCards,
  validationSettings,
} from "../utils/constants.js";

const cards = document.querySelector(".cards");
const addButton = document.querySelector(".user__button_type_add");
const editButton = document.querySelector(".user__button_type_edit");
const userName = document.querySelector(".user__name");
const userDescription = document.querySelector(".user__description");

const openAddForm = () => {
  addPopup.open();
  addPopup.setEventListeners();
};

const openEditForm = () => {
  editPopup.open();
  editPopup.setEventListeners();
};

const handleCardClick = (caption, link) => {
  const previewPopup = new PopupWithImage(".popup_type_preview-image");

  previewPopup.open({ caption, link });
  previewPopup.setEventListeners();
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#card", handleCardClick);
      const cardElement = card.generateCard();

      cardsList.addItem(cardElement);
    },
  },
  ".cards"
);

// отрисовка карточек
cardsList.renderItems();

const addPopup = new PopupWithForm(".popup_type_add-form", (data) => {
  const card = new Card(data, "#card", handleCardClick);
  const cardElement = card.generateCard();

  cards.prepend(cardElement);
});

const editPopup = new PopupWithForm(".popup_type_edit-form", (data) => {
  userName.textContent = data.name;
  userDescription.textContent = data.description;
});

formList.forEach((formElement) => {
  const validator = new FormValidator(validationSettings, formElement);

  validator.enableValidation();
});

addButton.addEventListener("click", openAddForm);
editButton.addEventListener("click", openEditForm);
