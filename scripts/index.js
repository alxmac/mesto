import { initialCards, formFields } from "../config.js";

const cards = document.querySelector(".cards");
const popup = document.querySelector(".popup");

const userName = document.querySelector(".user__name");
const userDescription = document.querySelector(".user__description");

const addButton = document.querySelector(".user__button_type_add");
const editButton = document.querySelector(".user__button_type_edit");

const togglePopupVisibility = () => popup.classList.toggle("popup_opened");

const removePopupContent = () =>
  popup.querySelector(".close-button").parentElement.remove();

const closePopup = () => {
  togglePopupVisibility();
  removePopupContent();
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

const renderFrom = (type) => {
  const { heading, firstField, secondField } = formFields[type];

  const formWrapperTemplate = document.querySelector("#form-wrapper").content;
  const formWrapper = formWrapperTemplate
    .querySelector(".form-wrapper")
    .cloneNode(true);

  const [firstInput, secondInput] = formWrapper.querySelectorAll(".form__item");

  firstInput.name = firstField.name;
  firstInput.placeholder = firstField.placeholder;
  secondInput.name = secondField.name;
  secondInput.placeholder = secondField.placeholder;
  formWrapper.querySelector(".form__heading").textContent = heading;

  if (type === "edit") {
    firstInput.value = userName.textContent;
    secondInput.value = userDescription.textContent;
  }

  popup.append(formWrapper);

  const closeButton = popup.querySelector(".close-button");
  const formElement = popup.querySelector(".form");

  closeButton.addEventListener("click", closePopup);
  formElement.addEventListener("submit", (evt) =>
    formSubmitHandler(evt, type, firstInput.value, secondInput.value)
  );
};

const renderFullImage = (evt) => {
  const imageWrapperTemplate = document.querySelector("#image-full-wrapper")
    .content;
  const imageWrapper = imageWrapperTemplate
    .querySelector(".image-full-wrapper")
    .cloneNode(true);

  const imageFull = imageWrapper.querySelector(".image-full-container__image");
  const caption = imageWrapper.querySelector(".image-full-container__caption");
  imageFull.alt = evt.target.alt;
  imageFull.src = evt.target.src;
  caption.textContent = evt.target.alt;

  popup.append(imageWrapper);

  const closeButton = popup.querySelector(".close-button");
  closeButton.addEventListener("click", closePopup);
};

const openPopup = (type, evt) => {
  togglePopupVisibility();

  type === "zoom" ? renderFullImage(evt) : renderFrom(type);
};

const addCard = (name, link) => {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;

  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__button_type_like");
  const trashButton = cardElement.querySelector(".card__button_type_trash");

  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener("click", (evt) => openPopup("zoom", evt));

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

renderInitialCards();
addButton.addEventListener("click", () => openPopup("add"));
editButton.addEventListener("click", () => openPopup("edit"));
