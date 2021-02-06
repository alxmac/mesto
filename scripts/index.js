import { initialCards, formFields } from "../config.js";

const cards = document.querySelector(".cards");
const popup = document.querySelector(".popup");

const userName = document.querySelector(".user__name");
const userDescription = document.querySelector(".user__description");

const addButton = document.querySelector(".user__button_type_add");
const editButton = document.querySelector(".user__button_type_edit");

const addCard = (name, link) => {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  const likeButton = cardElement.querySelector(".card__button_type_like");
  const trashButton = cardElement.querySelector(".card__button_type_trash");

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__button_type_like-active")
  );

  trashButton.addEventListener("click", () =>
    trashButton.parentElement.remove()
  );

  return cardElement;
};

const renderInitialCards = () => {
  const сardsArray = initialCards.map(({ name, link }) => addCard(name, link));

  cards.append(...сardsArray);
};

const togglePopupVisibility = () => popup.classList.toggle("popup_opened");

const removePopupContent = () =>
  popup.querySelector(".popup__close-button").parentElement.remove();

const closePopup = () => {
  togglePopupVisibility();
  removePopupContent();
};

const renderPopupContent = (type) => {
  const { heading, firstField, secondField } = formFields[type];

  const popupTemplate = document.querySelector("#popup__container").content;
  const popupContainer = popupTemplate
    .querySelector(".popup__container")
    .cloneNode(true);

  const [firstInput, secondInput] = popupContainer.querySelectorAll(
    ".form__item"
  );

  firstInput.name = firstField.name;
  firstInput.placeholder = firstField.placeholder;
  secondInput.name = secondField.name;
  secondInput.placeholder = secondField.placeholder;
  popupContainer.querySelector(".form__heading").textContent = heading;

  if (type === "edit") {
    firstInput.value = userName.textContent;
    secondInput.value = userDescription.textContent;
  }

  popup.append(popupContainer);

  const closeButton = popup.querySelector(".popup__close-button");
  const formElement = popup.querySelector(".form");

  closeButton.addEventListener("click", closePopup);
  formElement.addEventListener("submit", (evt) =>
    formSubmitHandler(evt, type, firstInput.value, secondInput.value)
  );
};

const openPopup = (type) => {
  togglePopupVisibility();
  renderPopupContent(type);
};

const formSubmitHandler = (evt, type, ...inputValues) => {
  evt.preventDefault();

  const [firstValue, secondValue] = inputValues;

  if (type === "edit") {
    userName.textContent = firstValue;
    userDescription.textContent = secondValue;
  } else {
    const newCard = addCard(firstValue, secondValue);
    cards.prepend(newCard);
  }

  togglePopupVisibility();
  removePopupContent();
};

renderInitialCards();
addButton.addEventListener("click", () => openPopup("add"));
editButton.addEventListener("click", () => openPopup("edit"));
