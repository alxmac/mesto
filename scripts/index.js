// элементы блока user
let userName = document.querySelector(".user__name");
let userDescription = document.querySelector(".user__description");
let editButton = document.querySelector(".user__button_type_edit");

// элементы блока popup
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-button");

// элементы блока form
let formElement = document.querySelector(".form");
let nameInput = formElement.querySelector(".form__item_el_name");
let descriptionInput = formElement.querySelector(".form__item_el_description");

const togglePopupVisibility = () => popup.classList.toggle("popup_opened");

const showPopup = () => {
  togglePopupVisibility();

  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  userName.textContent = `${nameInput.value}`;
  userDescription.textContent = `${descriptionInput.value}`;

  togglePopupVisibility();
};

editButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", togglePopupVisibility);
formElement.addEventListener("submit", formSubmitHandler);
