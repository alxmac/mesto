import { initialCards, popupFields } from "../config.js";

const userName = document.querySelector(".user__name");
const userDescription = document.querySelector(".user__description");
const addButton = document.querySelector(".user__button_type_add");
const editButton = document.querySelector(".user__button_type_edit");
const cards = document.querySelector(".cards");
const popup = document.querySelector(".popup");

const renderCards = () => {
  const cardTemplate = document.querySelector("#card").content;

  // получаем массив карточек для отображения в блоке cards
  const сardsArray = initialCards.map(({ name, link }) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__image").alt = name;
    cardElement.querySelector(".card__title").textContent = name;

    return cardElement;
  });

  cards.append(...сardsArray);
};

const togglePopupVisibility = () => popup.classList.toggle("popup_opened");

const openPopup = (type) => {
  togglePopupVisibility();
  renderPopupContainer(type);
};

const closePopup = () => {
  togglePopupVisibility();
  popup.querySelector(".popup__container").remove();
};

const addCard = (name, link) => {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  cards.prepend(cardElement);
};

const formSubmitHandler = (evt, type, ...rest) => {
  evt.preventDefault();

  const [firstValue, secondValue] = rest;

  if (type === "edit") {
    userName.textContent = firstValue;
    userDescription.textContent = secondValue;
  } else {
    addCard(firstValue, secondValue);
  }

  togglePopupVisibility();
  popup.querySelector(".popup__container").remove();
};

const renderPopupContainer = (type) => {
  const { heading, firstField, secondField } = popupFields[type];

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

renderCards();
addButton.addEventListener("click", () => openPopup("add"));
editButton.addEventListener("click", () => openPopup("edit"));
