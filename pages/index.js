// элементы блока user
const userElement = document.querySelector(".user");
const userName = userElement.querySelector(".user__name");
const userDescription = userElement.querySelector(".user__description");
const editButton = userElement.querySelector(".user__button_type_edit");

// элементы блока popup
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-button");

// элементы блока form
const formElement = document.querySelector(".form");
const nameInput = formElement.querySelector(".form__item_el_name");
const descriptionInput = formElement.querySelector(
  ".form__item_el_description"
);

const togglePopupVisibility = () => popup.classList.toggle("popup_opened");

const showPopup = () => {
  togglePopupVisibility();

  nameInput.value = userName.innerHTML;
  descriptionInput.value = userDescription.innerHTML;
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  userName.textContent = `${nameValue}`;
  userDescription.textContent = `${descriptionValue}`;

  togglePopupVisibility();
};

editButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", togglePopupVisibility);
formElement.addEventListener("submit", formSubmitHandler);
