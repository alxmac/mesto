import "./pages/index.css";
import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import {
  authToken,
  addButton,
  baseUrl,
  editButton,
  formList,
  selectors,
  validationSettings,
  updateButton,
  userNameInput,
  userDescriptionInput,
} from "./utils/constants.js";

const {
  addPopupSelector,
  avatarSelector,
  confirmationPopupSelector,
  descriptionSelector,
  editPopupSelector,
  nameSelector,
  previewPopupSelector,
  updatePopupSelector,
} = selectors;

let userId = "";

const api = new Api({
  baseUrl,
  headers: {
    authorization: authToken,
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
    userId = data._id;
  })
  .catch((err) => console.log(err));

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
  .catch((err) => console.log(err));

const addPopup = new PopupWithForm(addPopupSelector, (data) => {
  api
    .addCard(data)
    .then((data) => {
      cardsList.addItem(createCard(data), "prepend");
    })
    .catch((err) => console.log(err))
    .finally(() => addPopup.close());
});

const confirmationPopup = new PopupWithConfirmation(
  confirmationPopupSelector,
  (card, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.remove();
        card = null;
      })
      .catch((err) => console.log(err))
      .finally(() => confirmationPopup.close());
  }
);

const editPopup = new PopupWithForm(editPopupSelector, (data) => {
  api
    .editUserInfo(data)
    .then((data) => {
      userUnfo.setUserInfo(data);
    })
    .catch((err) => console.log(err))
    .finally(() => editPopup.close());
});

const previewPopup = new PopupWithImage(previewPopupSelector);

const updatePopup = new PopupWithForm(updatePopupSelector, (data) => {
  api
    .editUserAvatar(data)
    .then((data) => {
      userUnfo.setUserInfo(data);
    })
    .catch((err) => console.log(err))
    .finally(() => updatePopup.close());
});

const createCard = (data) => {
  const card = new Card(
    data,
    "#card",
    userId,
    (cardId) => {
      api
        .addLike(cardId)
        .then(({ likes }) => {
          card.updateLikes(likes);
          card.toggleLikeButton();
        })
        .catch((err) => console.log(err));
    },
    (cardId) => {
      api
        .removeLike(cardId)
        .then(({ likes }) => {
          card.updateLikes(likes);
          card.toggleLikeButton();
        })
        .catch((err) => console.log(err));
    },
    handleCardClick,
    handleCardDeleteClick
  );
  const cardElement = card.generateCard();

  return cardElement;
};

const handleCardClick = (caption, link) => previewPopup.open({ caption, link });

const handleCardDeleteClick = (card, cardId) =>
  confirmationPopup.open(card, cardId);

const openAddForm = () => addPopup.open();

const openEditForm = () => {
  const { name, description } = userUnfo.getUserInfo();

  userNameInput.value = name;
  userDescriptionInput.value = description;

  editPopup.open();
};

const openUpdateForm = () => updatePopup.open();

addButton.addEventListener("click", openAddForm);
editButton.addEventListener("click", openEditForm);
updateButton.addEventListener("click", openUpdateForm);

formList.forEach((formElement) => {
  if (formElement.id === "confirm") return;

  const validator = new FormValidator(validationSettings, formElement);

  validator.enableValidation();
});
