import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { initialCards, validationSettings } from "../utils/constants.js";

const innerLayout = document.querySelector(".inner-layout");
const cards = document.querySelector(".cards");

const userName = document.querySelector(".user__name");
const userDescription = document.querySelector(".user__description");
const addButton = document.querySelector(".user__button_type_add");
const editButton = document.querySelector(".user__button_type_edit");

//const addPopup = document.querySelector(".popup_type_add-form");
//const editPopup = document.querySelector(".popup_type_edit-form");

//const addSubmitButton = addPopup.querySelector(".form__submit-button");
//const nameInput = addPopup.querySelector(".form__input_el_place-name");
//const linkInput = addPopup.querySelector(".form__input_el_link");

//const editSubmitButton = editPopup.querySelector(".form__submit-button");
//const userNameInput = editPopup.querySelector(".form__input_el_user-name");
//const userDescriptionInput = editPopup.querySelector(
//   ".form__input_el_description"
// );

const formList = Array.from(document.querySelectorAll(".form"));
//const addForm = addPopup.querySelector(".form");
//const editForm = editPopup.querySelector(".form");

const openAddForm = () => {
  addPopup.open();
  //addForm.reset();
};

const openEditForm = () => {
  editPopup.open();
  // editForm.reset();

  // userNameInput.value = userName.textContent;
  // userDescriptionInput.value = userDescription.textContent;
};

// const handleAddSubmit = () => {
//   const cardElement = createCard({
//     name: nameInput.value,
//     link: linkInput.value,
//   });

//   cards.prepend(cardElement);
//   closePopup();
// };

// const handleEditSubmit = () => {
//   userName.textContent = userNameInput.value;
//   userDescription.textContent = userDescriptionInput.value;

//   closePopup();
// };

const handleCardClick = (caption, link) => {
  const previewPopup = new PopupWithImage(
    { link, caption },
    ".popup_type_preview-image"
  );

  previewPopup.open();
  previewPopup.setEventListeners();
};

//addSubmitButton.addEventListener("click", handleAddSubmit);
//editSubmitButton.addEventListener("click", handleEditSubmit);

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

formList.forEach((formElement) => {
  const validator = new FormValidator(validationSettings, formElement);

  validator.enableValidation();
});

const addPopup = new PopupWithForm(".popup_type_add-form", () => {});
const editPopup = new PopupWithForm(".popup_type_edit-form", () => {});

addButton.addEventListener("click", openAddForm);
editButton.addEventListener("click", openEditForm);
