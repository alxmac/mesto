import "./pages/index.css";
import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import {
  addButton,
  editButton,
  formList,
  selectors,
  validationSettings,
  userNameInput,
  userDescriptionInput,
} from "./utils/constants.js";

const {
  addPopupSelector,
  avatarSelector,
  descriptionSelector,
  editPopupSelector,
  nameSelector,
  previewPopupSelector,
} = selectors;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
  headers: {
    authorization: "b840dc47-080d-4028-b958-7f9f9e1effeb",
    "Content-Type": "application/json",
  },
});

const userUnfo = new UserInfo({
  nameSelector,
  descriptionSelector,
  avatarSelector,
});

api
  .getUserInfo()
  .then((data) => {
    userUnfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  });

const cardsList = new Section(
  {
    renderer: (data) => {
      const cardElement = createCard(data);
      cardsList.addItem(cardElement);
    },
  },
  ".cards"
);

api
  .getInitialCards()
  .then((data) => {
    cardsList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

const createCard = (data) => {
  const card = new Card(data, "#card", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
};

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

addButton.addEventListener("click", openAddForm);
editButton.addEventListener("click", openEditForm);

formList.forEach((formElement) => {
  const validator = new FormValidator(validationSettings, formElement);

  validator.enableValidation();
});
