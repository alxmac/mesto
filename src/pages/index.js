import "./index.css";
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  addButton,
  addForm,
  addFormSubmitButton,
  authToken,
  baseUrl,
  editButton,
  editForm,
  editFormSubmitButton,
  selectors,
  validationSettings,
  updateButton,
  updateForm,
  updateFormSubmitButton,
  userNameInput,
  userDescriptionInput,
} from "../utils/constants.js";
import { renderLoading, finishLoading } from "../utils/utils.js";

const {
  addPopupSelector,
  avatarSelector,
  cardsSelector,
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

const userInfo = new UserInfo({
  nameSelector,
  descriptionSelector,
  avatarSelector,
});

const cardsList = new Section(
  {
    renderer: (data) => {
      const cardElement = createCard(data);
      cardsList.addItem(cardElement);
    },
  },
  cardsSelector
);

api
  .getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;

    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

const addPopup = new PopupWithForm(addPopupSelector, (data) => {
  const initialValueSubmitButton = addFormSubmitButton.value;
  renderLoading(addFormSubmitButton);

  api
    .addCard(data)
    .then((data) => {
      cardsList.addItem(createCard(data), "prepend");
    })
    .then(() => addPopup.close())
    .catch((err) => console.log(err))
    .finally(() => {
      finishLoading(addFormSubmitButton, initialValueSubmitButton);
    });
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
      .then(() => confirmationPopup.close())
      .catch((err) => console.log(err));
  }
);

const editPopup = new PopupWithForm(editPopupSelector, (data) => {
  const initialValueSubmitButton = editFormSubmitButton.value;
  renderLoading(editFormSubmitButton);

  api
    .editUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .then(() => editPopup.close())
    .catch((err) => console.log(err))
    .finally(() => {
      finishLoading(editFormSubmitButton, initialValueSubmitButton);
    });
});

const previewPopup = new PopupWithImage(previewPopupSelector);

const updatePopup = new PopupWithForm(updatePopupSelector, (data) => {
  const initialValueSubmitButton = updateFormSubmitButton.value;
  renderLoading(updateFormSubmitButton);

  api
    .editUserAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .then(() => updatePopup.close())
    .catch((err) => console.log(err))
    .finally(() => {
      finishLoading(updateFormSubmitButton, initialValueSubmitButton);
    });
});

const createCard = (data) => {
  const isOwner = data.owner._id === userId;

  const card = new Card(data, "#card", userId, isOwner, {
    addLike: (cardId) => {
      api
        .addLike(cardId)
        .then(({ likes }) => {
          card.updateLikes(likes);
          card.toggleLikeButton();
        })
        .catch((err) => console.log(err));
    },
    removeLike: (cardId) => {
      api
        .removeLike(cardId)
        .then(({ likes }) => {
          card.updateLikes(likes);
          card.toggleLikeButton();
        })
        .catch((err) => console.log(err));
    },
    handleCardClick,
    handleCardDeleteClick,
  });
  const cardElement = card.generateCard();

  return cardElement;
};

const handleCardClick = (caption, link) => previewPopup.open({ caption, link });

const handleCardDeleteClick = (card, cardId) =>
  confirmationPopup.open(card, cardId);

const openAddForm = () => addPopup.open();

const openEditForm = () => {
  const { name, description } = userInfo.getUserInfo();

  userNameInput.value = name;
  userDescriptionInput.value = description;

  editPopup.open();
};

const openUpdateForm = () => updatePopup.open();

addButton.addEventListener("click", openAddForm);
editButton.addEventListener("click", openEditForm);
updateButton.addEventListener("click", openUpdateForm);

const addCardFormValidator = new FormValidator(validationSettings, addForm);
const editProfileFormValidator = new FormValidator(
  validationSettings,
  editForm
);
const updateAvatarFormValidator = new FormValidator(
  validationSettings,
  updateForm
);

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();
