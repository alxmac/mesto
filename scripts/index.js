import { initialCards, formFields } from "../configs/index.js";

const innerLayout = document.querySelector(".inner-layout");
const cards = document.querySelector(".cards");

const userName = document.querySelector(".user__name");
const userDescription = document.querySelector(".user__description");

const addButton = document.querySelector(".user__button_type_add");
const editButton = document.querySelector(".user__button_type_edit");

const closePopup = () => {
  const popup = innerLayout.querySelector(".popup");

  popup.classList.remove("popup_type_image", "popup_type_form", "popup_opened");
  popup.querySelector(".close-button").parentElement.remove();
};

const formSubmitHandler = (evt, type, ...inputValues) => {
  evt.preventDefault();

  const [firstValue, secondValue] = inputValues;

  if (type === "editForm") {
    userName.textContent = firstValue;
    userDescription.textContent = secondValue;
  } else {
    const newCard = addCard(firstValue, secondValue);
    cards.prepend(newCard);
  }

  closePopup();
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

  if (type === "editForm") {
    firstInput.value = userName.textContent;
    secondInput.value = userDescription.textContent;
  }

  const popup = innerLayout.querySelector(".popup");
  popup.append(formWrapper);

  const closeButton = popup.querySelector(".close-button");
  const form = popup.querySelector(".form");

  closeButton.addEventListener("click", closePopup);
  form.addEventListener("submit", (evt) =>
    formSubmitHandler(evt, type, firstInput.value, secondInput.value)
  );
};

const renderImagePreview = (evt) => {
  const imagePreviewWrapperTemplate = document.querySelector(
    "#image-preview-wrapper"
  ).content;
  const imagePreviewWrapper = imagePreviewWrapperTemplate
    .querySelector(".image-preview-wrapper")
    .cloneNode(true);

  const image = imagePreviewWrapper.querySelector(
    ".image-preview-container__image"
  );
  const caption = imagePreviewWrapper.querySelector(
    ".image-preview-container__caption"
  );
  image.alt = evt.target.alt;
  image.src = evt.target.src;
  caption.textContent = evt.target.alt;

  const popup = innerLayout.querySelector(".popup");
  popup.append(imagePreviewWrapper);

  const closeButton = popup.querySelector(".close-button");
  closeButton.addEventListener("click", closePopup);
};

const openPopup = (type, evt) => {
  const popup = innerLayout.querySelector(".popup");
  popup.classList.add("popup_opened");

  if (type === "imagePreview") {
    popup.classList.add("popup_type_image");
    renderImagePreview(evt);
  } else {
    popup.classList.add("popup_type_form");
    renderFrom(type);
  }
};

const addCard = (name, link) => {
  const cardTemplate = document.querySelector("#card").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);

  card.querySelector(".card__title").textContent = name;

  const image = card.querySelector(".card__image");
  const likeButton = card.querySelector(".card__button_type_like");
  const trashButton = card.querySelector(".card__button_type_trash");

  image.src = link;
  image.alt = name;

  image.addEventListener("click", (evt) => openPopup("imagePreview", evt));

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__button_type_like-active")
  );

  trashButton.addEventListener("click", () =>
    trashButton.parentElement.remove()
  );

  return card;
};

const renderInitialCards = () => {
  const сardsArray = initialCards.map(({ name, link }) => addCard(name, link));

  cards.append(...сardsArray);
};

const renderPopup = () => {
  const popupTemplate = document.querySelector("#popup").content;
  const popup = popupTemplate.querySelector(".popup").cloneNode(true);

  innerLayout.append(popup);
};

renderInitialCards();
renderPopup();
addButton.addEventListener("click", () => openPopup("addForm"));
editButton.addEventListener("click", () => openPopup("editForm"));
