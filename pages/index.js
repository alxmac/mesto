import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  addButton,
  editButton,
  formList,
  initialCards,
  selectors,
  validationSettings,
  userNameInput,
  userDescriptionInput,
} from "../utils/constants.js";

const {
  nameSelector,
  descriptionSelector,
  addPopupSelector,
  editPopupSelector,
  previewPopupSelector,
} = selectors;

const userUnfo = new UserInfo({
  nameSelector,
  descriptionSelector,
});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardsList.addItem(cardElement);
    },
  },
  ".cards"
);

const addPopup = new PopupWithForm(addPopupSelector, (data) => {
  const cardElement = createCard(data);

  cardsList.addItem(cardElement, "prepend");
  addPopup.close();
});

const editPopup = new PopupWithForm(editPopupSelector, (data) => {
  userUnfo.setUserInfo(data);
  editPopup.close();
});

const previewPopup = new PopupWithImage(previewPopupSelector);

const createCard = (data) => {
  const card = new Card(data, "#card", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
};

const handleCardClick = (caption, link) => {
  previewPopup.open({ caption, link });
};

const openAddForm = () => {
  addPopup.open();
};

const openEditForm = () => {
  const { name, description } = userUnfo.getUserInfo();

  userNameInput.value = name;
  userDescriptionInput.value = description;

  editPopup.open();
};

cardsList.renderItems();

addButton.addEventListener("click", openAddForm);
editButton.addEventListener("click", openEditForm);

formList.forEach((formElement) => {
  const validator = new FormValidator(validationSettings, formElement);

  validator.enableValidation();
});
