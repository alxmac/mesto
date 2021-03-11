import { Card } from "../components/card.js";
import { initialCards } from "../utils/constants.js";

const innerLayout = document.querySelector(".inner-layout");
const cards = document.querySelector(".cards");

const userName = document.querySelector(".user__name");
const userDescription = document.querySelector(".user__description");
const addButton = document.querySelector(".user__button_type_add");
const editButton = document.querySelector(".user__button_type_edit");

const addPopup = document.querySelector(".popup_type_add-form");
const editPopup = document.querySelector(".popup_type_edit-form");

const addSubmitButton = addPopup.querySelector(".form__submit-button");
const nameInput = addPopup.querySelector(".form__input_el_place-name");
const linkInput = addPopup.querySelector(".form__input_el_link");

const editSubmitButton = editPopup.querySelector(".form__submit-button");
const userNameInput = editPopup.querySelector(".form__input_el_user-name");
const userDescriptionInput = editPopup.querySelector(
  ".form__input_el_description"
);

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
  const card = new Card(
    {
      name: nameInput.value,
      link: linkInput.value,
    },
    "#card"
  );

  const cardElement = card.generateCard();
  cards.prepend(cardElement);

  closePopup();
};

const handleEditSubmit = () => {
  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;

  closePopup();
};

const renderInitialCards = (arr) => {
  arr.map((data) => {
    const card = new Card(data, "#card");
    const cardElement = card.generateCard();

    cards.append(cardElement);
  });
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

renderInitialCards(initialCards);
