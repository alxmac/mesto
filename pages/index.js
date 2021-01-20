const closeButton = document.querySelector(".popup__close-button");
const editButton = document.querySelector(".user__button_type_edit");
const popup = document.querySelector(".popup");

// функция открытия и закрытия попапа
const togglePopupVisibility = () => popup.classList.toggle("popup_opened");

const showPopup = () => {
  togglePopupVisibility();

  const name = document.querySelector(".user__name").innerHTML;
  const description = document.querySelector(".user__description").innerHTML;

  const popupName = document.querySelector(".form__item_el_name");
  const popupDescription = document.querySelector(".form__item_el_description");

  popupName.value = name;
  popupDescription.value = description;

};

editButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", togglePopupVisibility);
